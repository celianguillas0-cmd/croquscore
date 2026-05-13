const https = require('https');
const fs = require('fs');

const PAGE_SIZE = 100;
const DELAY_MS = 300;
const FIELDS = 'code,product_name,brands,nutriments,ingredients_text,categories_tags,categories';

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'CrocScore/1.0 (crocscore.help@gmail.com)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch(e) { reject(new Error('JSON parse error')); }
      });
    });
    req.on('error', reject);
    req.setTimeout(20000, () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

const DOG_WORDS = ['dog','chien','hund','perro','cane','hond','puppy','canin','canine','junior chien','senior chien','adult dog','large dog','small dog','medium dog'];
const CAT_WORDS = ['cat','chat','katze','gato','gatto','kat','kitten','felin','félin','chaton','adult cat','indoor cat','sterilised','sterilized','stérilisé'];
const CAT_BRANDS = ['whiskas','felix','sheba','gourmet','go-cat','kitekat','catessy'];
const DOG_BRANDS = ['pedigree','cesar','beneful','dog chow','puppy chow','chappie','butchers','bakers','wainwright','wagg'];
const PET_BRANDS = ['royal canin','purina','hills','hill\'s','farmina','monge','specific','trovet','virbac','wellness','nutro','blue buffalo','taste of the wild','orijen','acana','carnilove','josera','bosch','brit','almo nature','advance','eukanuba','iams','animonda','terra canis','forza10','forthglade','lily\'s kitchen','canagan','james wellbeloved'];

function getType(p) {
  const all = [
    (p.categories_tags || []).join(' '),
    (p.categories || ''),
    (p.product_name || ''),
    (p.brands || ''),
  ].join(' ').toLowerCase();

  const isDog = DOG_WORDS.some(k => all.includes(k));
  const isCat = CAT_WORDS.some(k => all.includes(k));
  if (isDog && !isCat) return 'chien';
  if (isCat && !isDog) return 'chat';
  if (isDog && isCat) return DOG_WORDS.some(k => (p.product_name||'').toLowerCase().includes(k)) ? 'chien' : 'chat';

  const brand = (p.brands || '').toLowerCase();
  const name = (p.product_name || '').toLowerCase();
  if (CAT_BRANDS.some(b => brand.includes(b) || name.includes(b))) return 'chat';
  if (DOG_BRANDS.some(b => brand.includes(b) || name.includes(b))) return 'chien';
  if (PET_BRANDS.some(b => brand.includes(b) || name.includes(b))) {
    return CAT_WORDS.some(k => name.includes(k)) ? 'chat' : 'chien';
  }
  return null;
}

function isValid(p) {
  if (!p.code || !p.product_name || p.product_name.trim().length < 2) return false;
  if (!getType(p)) return false;
  const n = p.nutriments || {};
  // Au moins protéines ET (lipides OU glucides) doivent être > 0
  if (!n.proteins_100g || n.proteins_100g <= 0) return false;
  if ((!n.fat_100g || n.fat_100g <= 0) && (!n.carbohydrates_100g || n.carbohydrates_100g <= 0)) return false;
  return true;
}

function format(p) {
  const n = p.nutriments || {};
  return {
    barcode: p.code,
    product_name: p.product_name.trim(),
    brands: (p.brands || '').trim(),
    _type: getType(p),
    nutriments: {
      proteins_100g: Math.round((n.proteins_100g || 0) * 10) / 10,
      fat_100g: Math.round((n.fat_100g || 0) * 10) / 10,
      carbohydrates_100g: Math.round((n.carbohydrates_100g || 0) * 10) / 10
    },
    ingredients_text: (p.ingredients_text || '').slice(0, 400).trim()
  };
}

async function fetchSource(label, baseUrl, seen) {
  console.log(`\n--- ${label} ---`);
  let first;
  try { first = await fetchPage(`${baseUrl}&page=1&page_size=${PAGE_SIZE}&fields=${FIELDS}`); }
  catch(e) { console.error(`Erreur page 1 (${label}):`, e.message); return []; }

  const total = first.count || 0;
  const pages = Math.ceil(total / PAGE_SIZE);
  console.log(`${total} produits bruts — ${pages} pages`);

  const products = [];
  const process = (data) => {
    for (const p of (data.products || [])) {
      if (!isValid(p)) continue;
      if (seen.has(p.code)) continue;
      seen.add(p.code);
      products.push(format(p));
    }
  };

  process(first);

  for (let page = 2; page <= pages; page++) {
    await sleep(DELAY_MS);
    let data;
    try { data = await fetchPage(`${baseUrl}&page=${page}&page_size=${PAGE_SIZE}&fields=${FIELDS}`); }
    catch(e) {
      await sleep(2000);
      try { data = await fetchPage(`${baseUrl}&page=${page}&page_size=${PAGE_SIZE}&fields=${FIELDS}`); }
      catch(e2) { continue; }
    }
    process(data);
    if (page % 10 === 0) console.log(`  Page ${page}/${pages} — ${products.length} valides`);
  }

  console.log(`→ ${products.length} produits valides depuis ${label}`);
  return products;
}

async function main() {
  const seen = new Set();
  const BASE = 'action=process&json=1';
  const all = [];

  // 1. OPFF — toute la base
  const opff = await fetchSource(
    'Open Pet Food Facts',
    `https://world.openpetfoodfacts.org/cgi/search.pl?${BASE}`,
    seen
  );
  all.push(...opff);

  // 2. OFF — plusieurs catégories pet food
  const offCategories = [
    ['OFF — dog-foods',    `https://world.openfoodfacts.org/cgi/search.pl?${BASE}&tagtype_0=categories&tag_contains_0=contains&tag_0=dog-foods`],
    ['OFF — cat-foods',    `https://world.openfoodfacts.org/cgi/search.pl?${BASE}&tagtype_0=categories&tag_contains_0=contains&tag_0=cat-foods`],
    ['OFF — pet-foods',    `https://world.openfoodfacts.org/cgi/search.pl?${BASE}&tagtype_0=categories&tag_contains_0=contains&tag_0=pet-foods`],
    ['OFF — dry-dog-food', `https://world.openfoodfacts.org/cgi/search.pl?${BASE}&tagtype_0=categories&tag_contains_0=contains&tag_0=dry-dog-food`],
    ['OFF — dry-cat-food', `https://world.openfoodfacts.org/cgi/search.pl?${BASE}&tagtype_0=categories&tag_contains_0=contains&tag_0=dry-cat-food`],
    ['OFF — wet-dog-food', `https://world.openfoodfacts.org/cgi/search.pl?${BASE}&tagtype_0=categories&tag_contains_0=contains&tag_0=wet-dog-food`],
    ['OFF — wet-cat-food', `https://world.openfoodfacts.org/cgi/search.pl?${BASE}&tagtype_0=categories&tag_contains_0=contains&tag_0=wet-cat-food`],
    ['OFF — aliments-chiens', `https://world.openfoodfacts.org/cgi/search.pl?${BASE}&tagtype_0=categories&tag_contains_0=contains&tag_0=aliments-pour-chiens`],
    ['OFF — aliments-chats',  `https://world.openfoodfacts.org/cgi/search.pl?${BASE}&tagtype_0=categories&tag_contains_0=contains&tag_0=aliments-pour-chats`],
  ];

  for (const [label, url] of offCategories) {
    const products = await fetchSource(label, url, seen);
    all.push(...products);
  }

  console.log(`\n=============================`);
  console.log(`TOTAL : ${all.length} produits valides sans doublons`);
  console.log(`=============================`);

  const lines = all.map(p => '  ' + JSON.stringify(p));
  const output = `// Généré depuis Open Pet Food Facts + Open Food Facts (ODbL) — ${new Date().toISOString().slice(0,10)}
// ${all.length} produits — valeurs nutritionnelles réelles (protéines > 0)
// Sources : https://world.openpetfoodfacts.org + https://world.openfoodfacts.org — Licence ODbL
const OPFF_DB = [
${lines.join(',\n')}
];
`;
  fs.writeFileSync('opff_db.js', output, 'utf8');
  console.log(`Fichier opff_db.js écrit.`);
}

main().catch(e => { console.error(e); process.exit(1); });
