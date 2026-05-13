// Génère more_products.js — sources additionnelles OFF/OPFF (licence ODbL)
const https = require('https');
const fs = require('fs');

const PAGE_SIZE = 100;
const DELAY_MS = 500;
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
    req.setTimeout(25000, () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

const DOG_WORDS = ['dog','chien','hund','perro','cane','hond','puppy','canin','canine','pour chiens','chiot','junior chien','senior chien'];
const CAT_WORDS = ['cat','chat','katze','gato','gatto','kat','kitten','felin','félin','chaton','pour chats','sterilised','sterilized','stérilisé'];
const CAT_BRANDS = ['whiskas','felix','sheba','gourmet','go-cat','kitekat','catessy','friskies','fancy feast','meow mix','cat chow','supercoat cat'];
const DOG_BRANDS = ['pedigree','cesar','beneful','dog chow','puppy chow','chappie','butchers','bakers','wainwright','wagg'];
const PET_BRANDS = ['royal canin','purina','hills','hill\'s','farmina','monge','specific','trovet','virbac','wellness','nutro','blue buffalo','taste of the wild','orijen','acana','carnilove','josera','bosch','brit','almo nature','advance','eukanuba','iams','animonda','terra canis','forza10','forthglade','lily\'s kitchen','canagan','james wellbeloved','schesir','applaws','instinct','merrick','fromm','ziwi','open farm'];

function getType(p) {
  const all = [(p.categories_tags||[]).join(' '),(p.categories||''),(p.product_name||''),(p.brands||'')].join(' ').toLowerCase();
  const isDog = DOG_WORDS.some(k => all.includes(k));
  const isCat = CAT_WORDS.some(k => all.includes(k));
  if (isDog && !isCat) return 'chien';
  if (isCat && !isDog) return 'chat';
  if (isDog && isCat) return DOG_WORDS.some(k => (p.product_name||'').toLowerCase().includes(k)) ? 'chien' : 'chat';
  const brand = (p.brands||'').toLowerCase(), name = (p.product_name||'').toLowerCase();
  if (CAT_BRANDS.some(b => brand.includes(b)||name.includes(b))) return 'chat';
  if (DOG_BRANDS.some(b => brand.includes(b)||name.includes(b))) return 'chien';
  if (PET_BRANDS.some(b => brand.includes(b)||name.includes(b))) return CAT_WORDS.some(k=>name.includes(k))?'chat':'chien';
  return null;
}

function isValid(p) {
  if (!p.code || !p.product_name || p.product_name.trim().length < 2) return false;
  if (!getType(p)) return false;
  const n = p.nutriments || {};
  if (!n.proteins_100g || n.proteins_100g <= 0) return false;
  if ((!n.fat_100g || n.fat_100g <= 0) && (!n.carbohydrates_100g || n.carbohydrates_100g <= 0)) return false;
  return true;
}

function format(p) {
  const n = p.nutriments || {};
  return {
    barcode: p.code,
    product_name: p.product_name.trim(),
    brands: (p.brands||'').trim(),
    _type: getType(p),
    nutriments: {
      proteins_100g: Math.round((n.proteins_100g||0)*10)/10,
      fat_100g: Math.round((n.fat_100g||0)*10)/10,
      carbohydrates_100g: Math.round((n.carbohydrates_100g||0)*10)/10
    },
    ingredients_text: (p.ingredients_text||'').slice(0,400).trim()
  };
}

async function fetchSource(label, baseUrl, seen) {
  process.stdout.write(`\n--- ${label} --- `);
  let first;
  try { first = await fetchPage(`${baseUrl}&page=1&page_size=${PAGE_SIZE}&fields=${FIELDS}`); }
  catch(e) {
    await sleep(3000);
    try { first = await fetchPage(`${baseUrl}&page=1&page_size=${PAGE_SIZE}&fields=${FIELDS}`); }
    catch(e2) { process.stdout.write(`ERREUR\n`); return []; }
  }
  const total = first.count || 0;
  const pages = Math.ceil(total / PAGE_SIZE);
  process.stdout.write(`${total} bruts`);
  const products = [];
  const proc = (data) => {
    for (const p of (data.products||[])) {
      if (!isValid(p) || seen.has(p.code)) continue;
      seen.add(p.code);
      products.push(format(p));
    }
  };
  proc(first);
  for (let page = 2; page <= pages; page++) {
    await sleep(DELAY_MS);
    let data;
    try { data = await fetchPage(`${baseUrl}&page=${page}&page_size=${PAGE_SIZE}&fields=${FIELDS}`); }
    catch(e) { await sleep(3000); try { data = await fetchPage(`${baseUrl}&page=${page}&page_size=${PAGE_SIZE}&fields=${FIELDS}`); } catch(e2) { continue; } }
    proc(data);
  }
  process.stdout.write(` → ${products.length} nouveaux\n`);
  return products;
}

function loadBaseline() {
  const seen = new Set();
  for (const fname of ['opff_db.js','localdb.js']) {
    try {
      const c = fs.readFileSync(fname, 'utf8');
      for (const m of c.matchAll(/"barcode":"([^"]+)"/g)) seen.add(m[1]);
      for (const m of c.matchAll(/barcode:"([^"]+)"/g)) seen.add(m[1]);
    } catch(e) {}
  }
  console.log(`Baseline (opff + localdb) : ${seen.size} codes`);
  return seen;
}

async function main() {
  const seen = loadBaseline();
  const OFF = 'https://world.openfoodfacts.org/cgi/search.pl?action=process&json=1';
  const OFFB = (b) => `${OFF}&tagtype_0=brands&tag_contains_0=contains&tag_0=${encodeURIComponent(b)}`;
  const OPFF = (country) => `https://${country}.openpetfoodfacts.org/cgi/search.pl?action=process&json=1`;
  const all = [];

  // ── OPFF pays secondaires ───────────────────────────────────
  for (const [label, url] of [
    ['OPFF France',   OPFF('fr')],
    ['OPFF Germany',  OPFF('de')],
    ['OPFF Spain',    OPFF('es')],
    ['OPFF Italy',    OPFF('it')],
    ['OPFF USA',      OPFF('us')],
    ['OPFF UK',       OPFF('uk')],
    ['OPFF Poland',   OPFF('pl')],
    ['OPFF Belgium',  OPFF('be')],
  ]) { all.push(...await fetchSource(label, url, seen)); }

  // ── OFF — marques humides avec beaucoup de produits ─────────
  for (const [label, brand] of [
    ['OFF — felix',         'felix'],
    ['OFF — gourmet',       'gourmet'],
    ['OFF — whiskas',       'whiskas'],
    ['OFF — sheba',         'sheba'],
    ['OFF — purina one',    'purina one'],
    ['OFF — friskies',      'friskies'],
    ['OFF — pedigree',      'pedigree'],
    ['OFF — cesar',         'cesar'],
    ['OFF — bakers',        'bakers'],
    ['OFF — butchers',      'butchers'],
    ['OFF — hills',         "hill's"],
    ['OFF — royal canin',   'royal canin'],
    ['OFF — eukanuba',      'eukanuba'],
    ['OFF — iams',          'iams'],
    ['OFF — wellness',      'wellness'],
    ['OFF — applaws',       'applaws'],
    ['OFF — schesir',       'schesir'],
    ['OFF — josera',        'josera'],
    ['OFF — animonda',      'animonda'],
    ['OFF — bosch',         'bosch'],
    ['OFF — brit',          'brit'],
    ['OFF — carnilove',     'carnilove'],
    ['OFF — almo nature',   'almo nature'],
    ['OFF — monge',         'monge'],
    ['OFF — farmina',       'farmina'],
    ['OFF — forza10',       'forza10'],
    ['OFF — acana',         'acana'],
    ['OFF — orijen',        'orijen'],
    ['OFF — taste wild',    'taste of the wild'],
    ['OFF — lily kitchen',  "lily's kitchen"],
    ['OFF — forthglade',    'forthglade'],
    ['OFF — natures menu',  "nature's menu"],
    ['OFF — james wb',      'james wellbeloved'],
    ['OFF — harringtons',   'harringtons'],
    ['OFF — canagan',       'canagan'],
    ['OFF — wainwright',    "wainwright's"],
    ['OFF — wagg',          'wagg'],
    ['OFF — terra canis',   'terra canis'],
    ['OFF — chappie',       'chappie'],
    ['OFF — virbac',        'virbac'],
    ['OFF — advance',       'advance'],
    ['OFF — happy dog',     'happy dog'],
    ['OFF — happy cat',     'happy cat'],
    ['OFF — bozita',        'bozita'],
    ['OFF — herrmanns',     'herrmanns'],
    ['OFF — rinti',         'rinti'],
    ['OFF — sanabelle',     'sanabelle'],
    ['OFF — bellfor',       'bellfor'],
    ['OFF — mera',          'mera'],
    ['OFF — grau',          'grau'],
    ['OFF — yarrah',        'yarrah'],
    ['OFF — vitalin',       'vitalin'],
    ['OFF — webbox',        'webbox'],
    ['OFF — winalot',       'winalot'],
    ['OFF — instinct',      'instinct'],
    ['OFF — merrick',       'merrick'],
    ['OFF — blue buffalo',  'blue buffalo'],
    ['OFF — wellness core', 'wellness core'],
    ['OFF — fromm',         'fromm'],
    ['OFF — ziwi',          'ziwi'],
    ['OFF — open farm',     'open farm'],
    ['OFF — hunter',        'hunter'],
    ['OFF — premiere',      'premiere'],
    ['OFF — dibaq',         'dibaq'],
    ['OFF — ultima',        'ultima'],
    ['OFF — true instinct', 'true instinct'],
    ['OFF — affinity',      'affinity'],
    ['OFF — pro plan',      'pro plan'],
    ['OFF — purina',        'nestlé purina'],
    ['OFF — kitekat',       'kitekat'],
    ['OFF — fancy feast',   'fancy feast'],
    ['OFF — dreamies',      'dreamies'],
    ['OFF — go petcurean',  'go! petcurean'],
    ['OFF — nulo',          'nulo'],
    ['OFF — canidae',       'canidae'],
    ['OFF — zignature',     'zignature'],
    ['OFF — diamond nat',   'diamond naturals'],
  ]) { all.push(...await fetchSource(label, OFFB(brand), seen)); }

  console.log(`\n=============================`);
  console.log(`TOTAL : ${all.length} nouveaux produits`);
  console.log(`=============================`);

  if (all.length === 0) { console.log('Aucun nouveau produit.'); return; }

  const lines = all.map(p => '  ' + JSON.stringify(p));
  const output = `// Généré depuis Open Pet Food Facts + Open Food Facts (ODbL) — ${new Date().toISOString().slice(0,10)}
// ${all.length} produits additionnels — valeurs nutritionnelles réelles
// Source : https://world.openfoodfacts.org — Licence ODbL
var MORE_DB = [
${lines.join(',\n')}
];
`;
  fs.writeFileSync('more_products.js', output, 'utf8');
  console.log(`Fichier more_products.js écrit (${all.length} produits).`);
}

main().catch(e => { console.error(e); process.exit(1); });
