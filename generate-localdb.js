const fs = require('fs');

// ─── Profils nutritionnels réalistes par catégorie ───────────────────────────
const PROFILES = {
  // Croquettes chien
  croquette_chien_premium_adulte:    { p:[26,30], f:[14,17], c:[38,45] },
  croquette_chien_premium_puppy:     { p:[30,35], f:[18,22], c:[28,36] },
  croquette_chien_premium_senior:    { p:[24,28], f:[10,14], c:[42,50] },
  croquette_chien_superpremium:      { p:[35,45], f:[18,22], c:[12,22] },
  croquette_chien_mini_adulte:       { p:[28,32], f:[16,19], c:[36,42] },
  croquette_chien_mini_puppy:        { p:[32,36], f:[20,23], c:[26,32] },
  croquette_chien_maxi_adulte:       { p:[24,28], f:[12,15], c:[42,50] },
  croquette_chien_maxi_puppy:        { p:[28,33], f:[16,20], c:[32,40] },
  croquette_chien_sport:             { p:[32,36], f:[20,24], c:[30,38] },
  croquette_chien_light:             { p:[28,32], f:[8,12],  c:[40,48] },
  croquette_chien_vet_obesity:       { p:[28,32], f:[8,11],  c:[36,44] },
  croquette_chien_vet_renal:         { p:[14,18], f:[14,18], c:[50,56] },
  croquette_chien_vet_gastro:        { p:[20,26], f:[12,16], c:[44,54] },
  croquette_chien_vet_hypo:          { p:[22,26], f:[12,16], c:[44,52] },
  croquette_chien_vet_urinary:       { p:[18,22], f:[12,16], c:[48,55] },
  croquette_chien_vet_cardiac:       { p:[18,22], f:[14,18], c:[48,55] },
  croquette_chien_economy:           { p:[18,22], f:[10,14], c:[50,58] },
  croquette_chien_grain_free:        { p:[38,46], f:[18,23], c:[10,20] },
  croquette_chien_senior:            { p:[24,28], f:[10,14], c:[42,50] },
  // Pâtée chien
  patee_chien_standard:              { p:[8,11],  f:[4,7],   c:[3,6]  },
  patee_chien_premium:               { p:[10,13], f:[5,8],   c:[2,5]  },
  patee_chien_grain_free:            { p:[11,15], f:[5,9],   c:[1,4]  },
  // Croquettes chat
  croquette_chat_adulte:             { p:[32,36], f:[14,18], c:[28,36] },
  croquette_chat_kitten:             { p:[35,40], f:[18,22], c:[20,28] },
  croquette_chat_sterilise:          { p:[34,38], f:[12,16], c:[28,36] },
  croquette_chat_senior:             { p:[30,35], f:[12,16], c:[32,40] },
  croquette_chat_indoor:             { p:[32,36], f:[12,16], c:[30,38] },
  croquette_chat_superpremium:       { p:[40,48], f:[18,24], c:[6,16]  },
  croquette_chat_grain_free:         { p:[40,48], f:[18,24], c:[4,14]  },
  croquette_chat_light:              { p:[34,38], f:[9,13],  c:[32,40] },
  croquette_chat_vet_renal:          { p:[16,20], f:[14,18], c:[48,55] },
  croquette_chat_vet_urinary:        { p:[30,34], f:[10,14], c:[36,44] },
  croquette_chat_vet_gastro:         { p:[28,32], f:[12,16], c:[40,50] },
  croquette_chat_vet_obesity:        { p:[34,38], f:[8,12],  c:[32,42] },
  croquette_chat_vet_hypo:           { p:[26,30], f:[12,16], c:[42,50] },
  croquette_chat_economy:            { p:[26,30], f:[12,16], c:[38,46] },
  // Pâtée chat
  patee_chat_standard:               { p:[8,12],  f:[4,7],   c:[1,4]  },
  patee_chat_premium:                { p:[10,14], f:[5,8],   c:[1,3]  },
  patee_chat_grain_free:             { p:[12,16], f:[5,9],   c:[0,2]  },
};

function rnd(min, max) { return Math.round((min + Math.random() * (max - min)) * 10) / 10; }
function nutr(profile) {
  const p = rnd(...PROFILES[profile].p);
  const f = rnd(...PROFILES[profile].f);
  const c = rnd(...PROFILES[profile].c);
  return { proteins_100g: p, fat_100g: f, carbohydrates_100g: c };
}

// ─── Ingrédients types par profil ────────────────────────────────────────────
const INGR = {
  chien_premium:    'poulet déshydraté, riz, maïs, graisses animales, hydrolysats de protéines, minéraux, vitamines',
  chien_superpremium: 'poulet frais (35%), dinde fraîche, pois, lentilles, pomme de terre, graisses de poulet, minéraux',
  chien_grain_free: 'poulet déshydraté (40%), patate douce, pois, dinde, graisses de poulet, huile de saumon, minéraux',
  chien_economy:    'céréales, viande et sous-produits animaux, huiles et graisses, minéraux, vitamines',
  chien_vet:        'riz, farine de poulet déshydratée, graisses animales, hydrolysats de protéines, cellulose, minéraux',
  chien_patee:      'viande et sous-produits animaux (40%), céréales, minéraux, vitamines',
  chat_premium:     'poulet déshydraté, riz, maïs, graisses animales, hydrolysats de protéines, taurine, minéraux',
  chat_superpremium:'poulet frais (38%), saumon, pois, lentilles, graisses de poulet, taurine, minéraux',
  chat_grain_free:  'poulet déshydraté (42%), patate douce, pois, saumon, graisses de poulet, taurine, minéraux',
  chat_economy:     'céréales, viande et sous-produits animaux, huiles et graisses, taurine, minéraux',
  chat_vet:         'riz, farine de poulet déshydratée, graisses animales, cellulose, taurine, minéraux',
  chat_patee:       'viande et sous-produits animaux (45%), bouillon, minéraux, taurine, vitamines',
};

// ─── Données produits ────────────────────────────────────────────────────────
const products = [];
const seen = new Set();

function add(name, brand, type, profile, ingr_key) {
  const key = `${brand}::${name}`;
  if (seen.has(key)) return;
  seen.add(key);
  products.push({
    product_name: name,
    brands: brand,
    _type: type,
    _estimated: true,
    nutriments: nutr(profile),
    ingredients_text: INGR[ingr_key] || INGR[type === 'chien' ? 'chien_premium' : 'chat_premium']
  });
}

// ─── ROYAL CANIN CHIEN ───────────────────────────────────────────────────────
const RC_SIZES_DOG = [
  ['Mini Adult', 'croquette_chien_mini_adulte'],
  ['Mini Puppy', 'croquette_chien_mini_puppy'],
  ['Mini Aging 12+', 'croquette_chien_senior'],
  ['Small Adult', 'croquette_chien_mini_adulte'],
  ['Small Puppy', 'croquette_chien_mini_puppy'],
  ['Medium Adult', 'croquette_chien_premium_adulte'],
  ['Medium Puppy', 'croquette_chien_premium_puppy'],
  ['Medium Aging 10+', 'croquette_chien_senior'],
  ['Maxi Adult', 'croquette_chien_maxi_adulte'],
  ['Maxi Puppy', 'croquette_chien_maxi_puppy'],
  ['Maxi Aging 8+', 'croquette_chien_senior'],
  ['Giant Adult', 'croquette_chien_maxi_adulte'],
  ['Giant Junior', 'croquette_chien_maxi_puppy'],
  ['Giant Aging 8+', 'croquette_chien_senior'],
  ['X-Small Adult', 'croquette_chien_mini_adulte'],
  ['X-Small Puppy', 'croquette_chien_mini_puppy'],
];
RC_SIZES_DOG.forEach(([n,p]) => add(`Royal Canin ${n}`, 'Royal Canin', 'chien', p, 'chien_premium'));

const RC_BREEDS_DOG = [
  'Labrador Retriever','Golden Retriever','German Shepherd','French Bulldog','Bulldog',
  'Boxer','Poodle Toy','Poodle Miniature','Chihuahua','Dachshund','Cocker Spaniel',
  'Yorkshire Terrier','Cavalier King Charles','Dalmatian','Rottweiler','Beagle',
  'Siberian Husky','Jack Russell Terrier','Shih Tzu','Maltese','Pug','Border Collie',
  'Dobermann','Great Dane','Bernese Mountain Dog','Shiba Inu','Dogue de Bordeaux',
  'West Highland White Terrier','Scottish Terrier','Labradoodle','Australian Shepherd',
  'English Setter','Springer Spaniel','Schnauzer','Leonberger','Newfoundland',
];
RC_BREEDS_DOG.forEach(b => {
  add(`Royal Canin ${b} Adult`, 'Royal Canin', 'chien', 'croquette_chien_premium_adulte', 'chien_premium');
  add(`Royal Canin ${b} Puppy`, 'Royal Canin', 'chien', 'croquette_chien_premium_puppy', 'chien_premium');
});

const RC_VET_DOG = [
  ['Obesity Management', 'croquette_chien_vet_obesity'],
  ['Renal', 'croquette_chien_vet_renal'],
  ['Gastrointestinal', 'croquette_chien_vet_gastro'],
  ['Gastrointestinal Low Fat', 'croquette_chien_vet_gastro'],
  ['Hypoallergenic', 'croquette_chien_vet_hypo'],
  ['Sensitivity Control', 'croquette_chien_vet_hypo'],
  ['Anallergenic', 'croquette_chien_vet_hypo'],
  ['Cardiac', 'croquette_chien_vet_cardiac'],
  ['Urinary', 'croquette_chien_vet_urinary'],
  ['Mobility Support', 'croquette_chien_premium_senior'],
  ['Neutered Adult Small Dog', 'croquette_chien_light'],
  ['Satiety Weight Management', 'croquette_chien_vet_obesity'],
  ['Diabetic', 'croquette_chien_vet_obesity'],
  ['Skin Support', 'croquette_chien_vet_hypo'],
  ['Joint Support', 'croquette_chien_premium_senior'],
  ['Hepatic', 'croquette_chien_vet_renal'],
  ['Pediatric Growth', 'croquette_chien_premium_puppy'],
];
RC_VET_DOG.forEach(([n,p]) => add(`Royal Canin Veterinary ${n} Chien`, 'Royal Canin Veterinary', 'chien', p, 'chien_vet'));

// Pâtées Royal Canin chien
['Mini Puppy en sauce','Medium Adult en sauce','Maxi Adult en sauce','Labrador en sauce','Golden Retriever en sauce',
 'Mini Adult Mousse','Medium Adult Mousse','Maxi Adult Mousse','Veterinary Gastrointestinal Chien Boîte',
 'Veterinary Renal Chien Boîte','Veterinary Obesity Chien Boîte'].forEach(n =>
  add(`Royal Canin ${n}`, 'Royal Canin', 'chien', 'patee_chien_premium', 'chien_patee'));

// ─── ROYAL CANIN CHAT ────────────────────────────────────────────────────────
const RC_SIZES_CAT = [
  ['Fit 32', 'croquette_chat_adulte'],
  ['Intense Beauty', 'croquette_chat_adulte'],
  ['Hair & Skin', 'croquette_chat_adulte'],
  ['Indoor Adult', 'croquette_chat_indoor'],
  ['Indoor Sterilised', 'croquette_chat_sterilise'],
  ['Indoor Long Hair', 'croquette_chat_indoor'],
  ['Kitten', 'croquette_chat_kitten'],
  ['Kitten British Shorthair', 'croquette_chat_kitten'],
  ['Kitten Sterilised', 'croquette_chat_kitten'],
  ['Adult Sterilised', 'croquette_chat_sterilise'],
  ['Sterilised Appetite Control', 'croquette_chat_sterilise'],
  ['Senior Consult Stage 1', 'croquette_chat_senior'],
  ['Senior Consult Stage 2', 'croquette_chat_senior'],
  ['Ageing 12+', 'croquette_chat_senior'],
];
RC_SIZES_CAT.forEach(([n,p]) => add(`Royal Canin ${n} Chat`, 'Royal Canin', 'chat', p, 'chat_premium'));

const RC_BREEDS_CAT = [
  'Persian','Maine Coon','British Shorthair','Ragdoll','Siamese','Norwegian Forest',
  'Sphynx','Birman','Abyssinian','Scottish Fold','Bengale','Chartreux','Turkish Angora',
];
RC_BREEDS_CAT.forEach(b => {
  add(`Royal Canin ${b} Adult`, 'Royal Canin', 'chat', 'croquette_chat_adulte', 'chat_premium');
  add(`Royal Canin ${b} Kitten`, 'Royal Canin', 'chat', 'croquette_chat_kitten', 'chat_premium');
});

const RC_VET_CAT = [
  ['Renal', 'croquette_chat_vet_renal'],
  ['Renal Special', 'croquette_chat_vet_renal'],
  ['Urinary S/O', 'croquette_chat_vet_urinary'],
  ['Urinary S/O High Dilution', 'croquette_chat_vet_urinary'],
  ['Urinary S/O Moderate Calorie', 'croquette_chat_vet_urinary'],
  ['Obesity Management', 'croquette_chat_vet_obesity'],
  ['Satiety Weight Management', 'croquette_chat_vet_obesity'],
  ['Gastrointestinal', 'croquette_chat_vet_gastro'],
  ['Gastrointestinal Moderate Calorie', 'croquette_chat_vet_gastro'],
  ['Hypoallergenic', 'croquette_chat_vet_hypo'],
  ['Anallergenic', 'croquette_chat_vet_hypo'],
  ['Skin Support', 'croquette_chat_vet_hypo'],
  ['Cardiac', 'croquette_chat_vet_gastro'],
  ['Hepatic', 'croquette_chat_vet_renal'],
  ['Dental', 'croquette_chat_adulte'],
  ['Neutered Adult', 'croquette_chat_sterilise'],
  ['Pediatric Growth', 'croquette_chat_kitten'],
  ['Recovery', 'croquette_chat_vet_gastro'],
];
RC_VET_CAT.forEach(([n,p]) => add(`Royal Canin Veterinary ${n} Chat`, 'Royal Canin Veterinary', 'chat', p, 'chat_vet'));

['Fit 32 en sauce','Kitten en sauce','Sterilised en sauce','Indoor en sauce','Intense Beauty en sauce',
 'Veterinary Renal Chat Boîte','Veterinary Urinary S/O Chat Boîte','Veterinary Gastrointestinal Chat Boîte'].forEach(n =>
  add(`Royal Canin ${n}`, 'Royal Canin', 'chat', 'patee_chat_premium', 'chat_patee'));

// ─── PURINA PRO PLAN ─────────────────────────────────────────────────────────
const PP_DOG = [
  ['Medium Adult Optibalance Poulet','croquette_chien_premium_adulte'],
  ['Medium Adult Optibalance Agneau','croquette_chien_premium_adulte'],
  ['Medium Puppy Optistart Poulet','croquette_chien_premium_puppy'],
  ['Small & Mini Adult Optibalance Poulet','croquette_chien_mini_adulte'],
  ['Small & Mini Puppy Optistart Poulet','croquette_chien_mini_puppy'],
  ['Large Adult Optibalance Poulet','croquette_chien_maxi_adulte'],
  ['Large Puppy Optistart Poulet','croquette_chien_maxi_puppy'],
  ['Giant Adult Optibalance','croquette_chien_maxi_adulte'],
  ['Giant Puppy Optistart','croquette_chien_maxi_puppy'],
  ['Senior 7+ Medium Optiage Poulet','croquette_chien_senior'],
  ['Senior 7+ Large Optiage','croquette_chien_senior'],
  ['Adult Light/Sterilised Optiweight','croquette_chien_light'],
  ['Adult Sensitive Skin Optibalance Saumon','croquette_chien_premium_adulte'],
  ['Adult Sensitive Digestion Agneau','croquette_chien_premium_adulte'],
  ['Duo Délice Adult Boeuf','croquette_chien_premium_adulte'],
  ['Duo Délice Adult Poulet','croquette_chien_premium_adulte'],
  ['Sport Adult Poulet','croquette_chien_sport'],
  ['Sport Adult Agneau','croquette_chien_sport'],
  ['Veterinary Diets HA Hydrolysed','croquette_chien_vet_hypo'],
  ['Veterinary Diets NF Renal','croquette_chien_vet_renal'],
  ['Veterinary Diets EN Gastroenteric','croquette_chien_vet_gastro'],
  ['Veterinary Diets OM Overweight','croquette_chien_vet_obesity'],
  ['Veterinary Diets UR Urinary','croquette_chien_vet_urinary'],
  ['Veterinary Diets DM Diabetic','croquette_chien_vet_obesity'],
  ['Veterinary Diets JM Joint Mobility','croquette_chien_premium_senior'],
  ['Veterinary Diets CC Critical Care','croquette_chien_vet_gastro'],
];
PP_DOG.forEach(([n,p]) => add(`Purina Pro Plan ${n}`, 'Purina Pro Plan', 'chien', p, 'chien_premium'));

const PP_CAT = [
  ['Adult Sterilised Optirenal Saumon','croquette_chat_sterilise'],
  ['Adult Sterilised Optirenal Poulet','croquette_chat_sterilise'],
  ['Adult Optisavour Saumon','croquette_chat_adulte'],
  ['Adult Optisavour Poulet','croquette_chat_adulte'],
  ['Adult Indoor Optisavour','croquette_chat_indoor'],
  ['Kitten Healthy Start Poulet','croquette_chat_kitten'],
  ['Kitten Healthy Start Saumon','croquette_chat_kitten'],
  ['Senior 7+ Optirenal Saumon','croquette_chat_senior'],
  ['Senior 7+ Optirenal Poulet','croquette_chat_senior'],
  ['Adult Sensitive Skin Saumon','croquette_chat_adulte'],
  ['Adult Light/Sterilised Optisavour','croquette_chat_sterilise'],
  ['Adult Hairball Control','croquette_chat_indoor'],
  ['Veterinary Diets HA Hydrolysed','croquette_chat_vet_hypo'],
  ['Veterinary Diets NF Renal','croquette_chat_vet_renal'],
  ['Veterinary Diets EN Gastroenteric','croquette_chat_vet_gastro'],
  ['Veterinary Diets OM Overweight','croquette_chat_vet_obesity'],
  ['Veterinary Diets UR Urinary','croquette_chat_vet_urinary'],
  ['Veterinary Diets DM Diabetic','croquette_chat_vet_obesity'],
  ['Veterinary Diets HA Hydrolysed Félin','croquette_chat_vet_hypo'],
];
PP_CAT.forEach(([n,p]) => add(`Purina Pro Plan ${n} Chat`, 'Purina Pro Plan', 'chat', p, 'chat_premium'));

// Pâtées Purina Pro Plan
['Adult Poulet en sauce','Adult Saumon en sauce','Sterilised Saumon en gelée','Senior Saumon en sauce'].forEach(n =>
  add(`Purina Pro Plan ${n} Chat`, 'Purina Pro Plan', 'chat', 'patee_chat_premium', 'chat_patee'));
['Medium Adult Poulet en sauce','Puppy Poulet en sauce'].forEach(n =>
  add(`Purina Pro Plan ${n} Chien`, 'Purina Pro Plan', 'chien', 'patee_chien_premium', 'chien_patee'));

// ─── HILLS SCIENCE PLAN ──────────────────────────────────────────────────────
const HILLS_DOG = [
  ['Perfect Digestion Small & Mini Adult Poulet','croquette_chien_mini_adulte'],
  ['Perfect Digestion Medium Adult Poulet','croquette_chien_premium_adulte'],
  ['Perfect Digestion Large Adult Poulet','croquette_chien_maxi_adulte'],
  ['Youthful Vitality Small & Mini 7+ Poulet','croquette_chien_senior'],
  ['Youthful Vitality Medium 7+ Poulet','croquette_chien_senior'],
  ['Youthful Vitality Large 7+ Poulet','croquette_chien_senior'],
  ['Active Longevity Mini 10+ Poulet','croquette_chien_senior'],
  ['Puppy Large Breed Poulet','croquette_chien_maxi_puppy'],
  ['Puppy Small & Mini Poulet','croquette_chien_mini_puppy'],
  ['Puppy Medium Breed Poulet','croquette_chien_premium_puppy'],
  ['Sensitive Skin Adult Saumon','croquette_chien_premium_adulte'],
  ['Light Adult Small & Mini','croquette_chien_light'],
  ['Light Adult Medium','croquette_chien_light'],
  ['Prescription Diet w/d Diabetes','croquette_chien_vet_obesity'],
  ['Prescription Diet k/d Renal','croquette_chien_vet_renal'],
  ['Prescription Diet d/d Skin','croquette_chien_vet_hypo'],
  ['Prescription Diet z/d Allergies','croquette_chien_vet_hypo'],
  ['Prescription Diet i/d Digestive Care','croquette_chien_vet_gastro'],
  ['Prescription Diet j/d Mobility','croquette_chien_premium_senior'],
  ['Prescription Diet r/d Weight Reduction','croquette_chien_vet_obesity'],
  ['Prescription Diet u/d Urinary','croquette_chien_vet_urinary'],
  ['Prescription Diet h/d Cardiac','croquette_chien_vet_cardiac'],
  ['Prescription Diet l/d Hepatic','croquette_chien_vet_renal'],
  ['Prescription Diet n/d Oncology','croquette_chien_vet_gastro'],
];
HILLS_DOG.forEach(([n,p]) => add(`Hills ${n} Chien`, "Hill's", 'chien', p, 'chien_vet'));

const HILLS_CAT = [
  ['Science Plan Adult Poulet','croquette_chat_adulte'],
  ['Science Plan Adult Saumon','croquette_chat_adulte'],
  ['Science Plan Adult Indoor Poulet','croquette_chat_indoor'],
  ['Science Plan Sterilised Poulet','croquette_chat_sterilise'],
  ['Science Plan Sterilised Thon','croquette_chat_sterilise'],
  ['Science Plan Kitten Poulet','croquette_chat_kitten'],
  ['Science Plan Senior 11+ Poulet','croquette_chat_senior'],
  ['Science Plan Light Thon','croquette_chat_light'],
  ['Prescription Diet y/d Thyroïde','croquette_chat_vet_gastro'],
  ['Prescription Diet k/d Renal','croquette_chat_vet_renal'],
  ['Prescription Diet k/d+i/d Renal','croquette_chat_vet_renal'],
  ['Prescription Diet z/d Allergies','croquette_chat_vet_hypo'],
  ['Prescription Diet d/d Skin Canard','croquette_chat_vet_hypo'],
  ['Prescription Diet i/d Digestive','croquette_chat_vet_gastro'],
  ['Prescription Diet r/d Weight','croquette_chat_vet_obesity'],
  ['Prescription Diet c/d Urinary','croquette_chat_vet_urinary'],
  ['Prescription Diet c/d Multicare Stress','croquette_chat_vet_urinary'],
  ['Prescription Diet w/d Diabetes','croquette_chat_vet_obesity'],
  ['Prescription Diet m/d Diabète','croquette_chat_vet_obesity'],
  ['Prescription Diet j/d Mobility','croquette_chat_senior'],
  ['Prescription Diet l/d Hepatic','croquette_chat_vet_renal'],
  ['Prescription Diet a/d Nutrition Support','croquette_chat_vet_gastro'],
];
HILLS_CAT.forEach(([n,p]) => add(`Hills ${n} Chat`, "Hill's", 'chat', p, 'chat_vet'));

// ─── ORIJEN / ACANA ──────────────────────────────────────────────────────────
const ORIJEN_DOG = ['Original','Regional Red','Fit & Trim','Six Fish','Tundra','Senior','Puppy','Puppy Large','Small Breed Adult','Sport'];
ORIJEN_DOG.forEach(n => add(`Orijen ${n} Chien`, 'Orijen', 'chien', 'croquette_chien_grain_free', 'chien_grain_free'));
const ORIJEN_CAT = ['Original','Regional Red','Six Fish','Tundra','Senior','Kitten','Fit & Trim'];
ORIJEN_CAT.forEach(n => add(`Orijen ${n} Chat`, 'Orijen', 'chat', 'croquette_chat_grain_free', 'chat_grain_free'));

const ACANA_DOG = [
  'Grasslands','Heritage Grains Poulet','Heritage Grains Agneau','Wild Prairie','Pacifica','Ranchlands',
  'Singles Duck','Singles Pork','Puppy & Junior','Sport & Agility','Senior Dog','Light & Fit',
  'Heritage Grains Red Meat','Meadowlands'
];
ACANA_DOG.forEach(n => add(`Acana ${n} Chien`, 'Acana', 'chien', 'croquette_chien_grain_free', 'chien_grain_free'));
const ACANA_CAT = ['Grasslands','Wild Prairie','Pacifica','Ranchlands','Singles Duck','Kitten','Senior','Light & Fit'];
ACANA_CAT.forEach(n => add(`Acana ${n} Chat`, 'Acana', 'chat', 'croquette_chat_grain_free', 'chat_grain_free'));

// ─── FARMINA N&D ─────────────────────────────────────────────────────────────
const FARMINA_FLAVORS = ['Poulet & Grenade','Agneau & Myrtille','Saumon & Orange','Canard & Raisin','Truites & Framboises'];
const FARMINA_STAGES_DOG = ['Adulte Mini','Adulte Medium & Maxi','Puppy Mini','Puppy Medium & Maxi','Senior Mini','Senior Medium & Maxi'];
FARMINA_FLAVORS.forEach(f => FARMINA_STAGES_DOG.forEach(s =>
  add(`Farmina N&D Grain Free ${f} ${s} Chien`, 'Farmina N&D', 'chien', 'croquette_chien_grain_free', 'chien_grain_free')));
['Poulet & Grenade Adulte','Saumon & Orange Adulte','Agneau & Myrtille Adulte',
 'Poulet & Grenade Kitten','Poulet & Grenade Sterilisé','Saumon & Orange Senior'].forEach(n =>
  add(`Farmina N&D Grain Free ${n} Chat`, 'Farmina N&D', 'chat', 'croquette_chat_grain_free', 'chat_grain_free'));

// ─── EUKANUBA ────────────────────────────────────────────────────────────────
['Small Adult','Small Puppy','Medium Adult','Medium Puppy','Large Adult','Large Puppy',
 'Maxi Adult','Senior Small','Senior Medium','Senior Large','Adult Light Weight',
 'Breed Specific Labrador','Breed Specific Golden Retriever','Breed Specific German Shepherd',
 'Breed Specific Bulldog','Breed Specific Dalmatian','Breed Specific Rottweiler',
 'Breed Specific Yorkshire','Working & Endurance'].forEach(n =>
  add(`Eukanuba ${n} Chien`, 'Eukanuba', 'chien', n.includes('Puppy') ? 'croquette_chien_premium_puppy' : n.includes('Senior') ? 'croquette_chien_senior' : n.includes('Light') ? 'croquette_chien_light' : 'croquette_chien_premium_adulte', 'chien_premium'));

// ─── IAMS ────────────────────────────────────────────────────────────────────
['Small & Toy Adult Poulet','Medium Adult Poulet','Large Adult Poulet','Maxi Adult Poulet',
 'Small & Toy Puppy','Medium Puppy','Large Puppy',
 'Senior Small & Toy','Senior Medium & Maxi',
 'Light & Fit Adult','Sensitive Digestion Agneau'].forEach(n =>
  add(`Iams ${n} Chien`, 'Iams', 'chien', n.includes('Puppy') ? 'croquette_chien_premium_puppy' : n.includes('Senior') ? 'croquette_chien_senior' : 'croquette_chien_premium_adulte', 'chien_premium'));
['Adult Poulet','Adult Saumon','Kitten Poulet','Senior Poulet','Sterilised Poulet','Indoor Poulet',
 'Sensitive Skin Saumon','Light Poulet'].forEach(n =>
  add(`Iams ${n} Chat`, 'Iams', 'chat', n.includes('Kitten') ? 'croquette_chat_kitten' : n.includes('Senior') ? 'croquette_chat_senior' : 'croquette_chat_adulte', 'chat_premium'));

// ─── ADVANCE ─────────────────────────────────────────────────────────────────
['Medium Adult Poulet','Mini Adult Poulet','Maxi Adult Poulet','Giant Adult','Mini Puppy','Medium Puppy','Maxi Puppy',
 'Senior Medium','Sensitive Digestion','Obesity','Skin Sensitive Saumon','Sport'].forEach(n =>
  add(`Advance ${n} Chien`, 'Advance', 'chien', n.includes('Puppy') ? 'croquette_chien_premium_puppy' : 'croquette_chien_premium_adulte', 'chien_premium'));
['Adult Sterilised','Adult Indoor','Adult Saumon','Kitten Poulet','Senior Poulet','Sensitive Poulet','Obesity Chat'].forEach(n =>
  add(`Advance ${n} Chat`, 'Advance', 'chat', n.includes('Kitten') ? 'croquette_chat_kitten' : 'croquette_chat_adulte', 'chat_premium'));

// ─── JOSERA ──────────────────────────────────────────────────────────────────
['SensePlus','Nature Cat','Lachs & Reis','Natures Finest Poulet','Optiness Poulet',
 'Balance Plus Chat','Kitten','Senior Light'].forEach(n =>
  add(`Josera ${n} Chat`, 'Josera', 'chat', n.includes('Kitten') ? 'croquette_chat_kitten' : 'croquette_chat_adulte', 'chat_premium'));
['Leger Plus','Naturelle Plus Agneau','Sportive Plus','Succes Agneau','Midi Plus','Maxi Plus',
 'Mini Plus','Senior Plus Poulet','Junior Plus Poulet','Active Plus'].forEach(n =>
  add(`Josera ${n} Chien`, 'Josera', 'chien', n.includes('Junior') ? 'croquette_chien_premium_puppy' : 'croquette_chien_premium_adulte', 'chien_premium'));

// ─── BOSCH ───────────────────────────────────────────────────────────────────
['High Premium Adult Poulet','High Premium Puppy','High Premium Senior','Sanabelle Adult',
 'Sanabelle Kitten','Sanabelle Senior','Sanabelle Sterilised','Sanabelle Indoor',
 'Soft Poulet Chat','Tiernahrung Adult Rind'].forEach(n =>
  add(`Bosch ${n}`, 'Bosch', n.includes('Chat') || n.includes('Sanabelle') || n.includes('Cat') ? 'chat' : 'chien',
    n.includes('Kitten') ? 'croquette_chat_kitten' : n.includes('Senior') ? (n.includes('Sanabelle') ? 'croquette_chat_senior' : 'croquette_chien_senior') : n.includes('Puppy') ? 'croquette_chien_premium_puppy' : n.includes('Sanabelle') ? 'croquette_chat_adulte' : 'croquette_chien_premium_adulte',
    n.includes('Sanabelle') || n.includes('Chat') ? 'chat_premium' : 'chien_premium'));

// ─── BRIT CARE ───────────────────────────────────────────────────────────────
const BRIT_DOG = ['Small Breed Adult Agneau','Small Breed Puppy Agneau','Medium Breed Adult Poulet',
  'Medium Breed Puppy Poulet','Large Breed Adult Poulet','Large Breed Puppy Poulet',
  'Senior Poulet','Light Poulet','Sensitive Saumon','Grain Free Adult Saumon','Grain Free Puppy Saumon'];
BRIT_DOG.forEach(n => add(`Brit Care ${n} Chien`, 'Brit Care', 'chien',
  n.includes('Puppy') ? 'croquette_chien_premium_puppy' : n.includes('Grain Free') ? 'croquette_chien_grain_free' : 'croquette_chien_premium_adulte', 'chien_premium'));
const BRIT_CAT = ['Sterilised Saumon','Indoor Poulet','Adult Poulet','Kitten Saumon','Senior Thon','Grain Free Adult Saumon','Grain Free Kitten'];
BRIT_CAT.forEach(n => add(`Brit Care ${n} Chat`, 'Brit Care', 'chat',
  n.includes('Kitten') ? 'croquette_chat_kitten' : n.includes('Grain Free') ? 'croquette_chat_grain_free' : 'croquette_chat_adulte', 'chat_premium'));

// ─── CARNILOVE ───────────────────────────────────────────────────────────────
['Salmon & Turkey Adult','Wild Boar & Venison Adult','Salmon for Puppies','Reindeer Adult',
 'Duck & Pheasant Adult','Bison & Venison Puppy','White Fish & Salmon Senior'].forEach(n =>
  add(`Carnilove ${n} Chien`, 'Carnilove', 'chien', 'croquette_chien_grain_free', 'chien_grain_free'));
['Salmon & Turkey Adult','Wild Boar & Venison Adult','Reindeer Adult','Duck & Pheasant Adult',
 'Salmon for Kittens','White Fish & Salmon Senior'].forEach(n =>
  add(`Carnilove ${n} Chat`, 'Carnilove', 'chat', 'croquette_chat_grain_free', 'chat_grain_free'));

// ─── TASTE OF THE WILD ───────────────────────────────────────────────────────
['Pacific Stream Saumon','High Prairie Bison','Sierra Mountain Agneau','Appalachian Valley Venaison',
 'Wetlands Wild Fowl','Pine Forest Venaison','Puppy Pacific Stream','Puppy High Prairie',
 'Ancient Mountain Agneau','Ancient Ocean Saumon'].forEach(n =>
  add(`Taste of the Wild ${n} Chien`, 'Taste of the Wild', 'chien', 'croquette_chien_grain_free', 'chien_grain_free'));
['Rocky Mountain Saumon','Canyon River Truite','Lowland Creek Poulet','Wild Prairie Poulet',
 'Kitten Rocky Mountain','Kitten Wild Prairie'].forEach(n =>
  add(`Taste of the Wild ${n} Chat`, 'Taste of the Wild', 'chat', 'croquette_chat_grain_free', 'chat_grain_free'));

// ─── ANIMONDA ────────────────────────────────────────────────────────────────
const ANIMONDA_CARNY = ['Boeuf','Poulet','Agneau','Dinde','Saumon','Canard','Lapin','Cheval','Gibier'];
const ANIMONDA_STAGES_CAT = ['Adult','Kitten','Senior','Sterilised'];
ANIMONDA_CARNY.forEach(f => ANIMONDA_STAGES_CAT.forEach(s =>
  add(`Animonda Carny ${s} ${f} Chat`, 'Animonda Carny', 'chat', s === 'Kitten' ? 'patee_chat_premium' : 'patee_chat_premium', 'chat_patee')));
ANIMONDA_CARNY.forEach(f =>
  add(`Animonda Vom Feinsten Adult ${f} Chien`, 'Animonda', 'chien', 'patee_chien_premium', 'chien_patee'));
['Mini Adult Poulet','Mini Adult Boeuf','Adult Poulet','Adult Boeuf','Senior Poulet',
 'Grain Free Adult Poulet','Grain Free Adult Saumon'].forEach(n =>
  add(`Animonda Gran Carno ${n} Chien`, 'Animonda Gran Carno', 'chien', 'patee_chien_premium', 'chien_patee'));

// ─── MONGE ───────────────────────────────────────────────────────────────────
const MONGE_FLAVORS = ['Poulet','Saumon','Thon','Agneau','Canard','Boeuf'];
MONGE_FLAVORS.forEach(f => {
  add(`Monge All Breeds Adult ${f} Chien`, 'Monge', 'chien', 'croquette_chien_premium_adulte', 'chien_premium');
  add(`Monge All Breeds Puppy ${f} Chien`, 'Monge', 'chien', 'croquette_chien_premium_puppy', 'chien_premium');
  add(`Monge Adult ${f} Chat`, 'Monge', 'chat', 'croquette_chat_adulte', 'chat_premium');
  add(`Monge Sterilised ${f} Chat`, 'Monge', 'chat', 'croquette_chat_sterilise', 'chat_premium');
});

// ─── PURINA ONE ──────────────────────────────────────────────────────────────
['Adult Poulet & Riz','Adult Dinde & Riz','Adult Agneau & Riz','Senior Poulet','Light Poulet',
 'Puppy Poulet','Mini Adult Poulet'].forEach(n =>
  add(`Purina One ${n} Chien`, 'Purina One', 'chien', n.includes('Puppy') ? 'croquette_chien_premium_puppy' : 'croquette_chien_premium_adulte', 'chien_premium'));
['Adult Poulet','Adult Saumon','Sterilised Poulet','Sterilised Saumon','Indoor Poulet',
 'Kitten Poulet','Senior Poulet','Urinary Care Poulet','Hairball Poulet'].forEach(n =>
  add(`Purina One ${n} Chat`, 'Purina One', 'chat', n.includes('Kitten') ? 'croquette_chat_kitten' : n.includes('Senior') ? 'croquette_chat_senior' : 'croquette_chat_adulte', 'chat_premium'));

// ─── LILY'S KITCHEN ──────────────────────────────────────────────────────────
['Chicken & Duck Adult','Boeuf & Légumes Adult','Saumon & Dinde Adult','Puppy Chicken',
 'Senior Chicken','Proper Chicken Dinner Adult','Fabulous Fish Adult'].forEach(n =>
  add(`Lily's Kitchen ${n} Chien`, "Lily's Kitchen", 'chien', n.includes('Puppy') ? 'croquette_chien_premium_puppy' : 'croquette_chien_grain_free', 'chien_grain_free'));
['Chicken & Duck Adult','Saumon & Dinde Adult','Kitten Chicken','Senior Chicken',
 'Fabulous Fish Adult','Organic Chicken Adult'].forEach(n =>
  add(`Lily's Kitchen ${n} Chat`, "Lily's Kitchen", 'chat', n.includes('Kitten') ? 'croquette_chat_grain_free' : 'croquette_chat_grain_free', 'chat_grain_free'));

// ─── CANAGAN ─────────────────────────────────────────────────────────────────
['Country Game Adult','Scottish Salmon Adult','Free-Run Chicken Adult','Grain Free Puppy Chicken',
 'Senior Chicken','Light Chicken'].forEach(n =>
  add(`Canagan ${n} Chien`, 'Canagan', 'chien', 'croquette_chien_grain_free', 'chien_grain_free'));
['Country Game Adult','Scottish Salmon Adult','Free-Run Chicken Adult','Grain Free Kitten',
 'Senior Chicken'].forEach(n =>
  add(`Canagan ${n} Chat`, 'Canagan', 'chat', 'croquette_chat_grain_free', 'chat_grain_free'));

// ─── SPECIFIC ────────────────────────────────────────────────────────────────
['CRD-1 Reduction d Energie','CRD-2 Weight Control','CKD Kidney Support','CGD Sensitive Digestion',
 'CDD Food Allergy','CJD Joint Support','CCD Cardiac Support','CWD Urinary Struvite',
 'FKD Kidney Support Chat','FLD Liver Support Chat','FID Intestinal Support Chat',
 'FMD Urinary Struvite Chat','FWD Urinary Struvite Chat','FFW Weight Reduction Chat'].forEach(n =>
  add(`Specific ${n}`, 'Specific', n.includes('Chat') ? 'chat' : 'chien',
    n.includes('Chat') ? 'croquette_chat_vet_renal' : 'croquette_chien_vet_renal', 'chien_vet'));

// ─── VIRBAC HPM ──────────────────────────────────────────────────────────────
['Adult Small Dog','Adult Medium Dog','Adult Large Dog','Puppy Small Dog','Puppy Medium Dog',
 'Neutered Small Dog','Neutered Medium Dog','Obesity Adult Dog',
 'Renal & Oxalate Dog','Urinary Dog','Gastrointestinal Dog','Hepatic Dog'].forEach(n =>
  add(`Virbac HPM ${n}`, 'Virbac HPM', 'chien', n.includes('Puppy') ? 'croquette_chien_premium_puppy' : 'croquette_chien_vet_gastro', 'chien_vet'));
['Adult Cat','Kitten Cat','Neutered Cat','Obesity Adult Cat','Renal Cat','Urinary Cat',
 'Gastrointestinal Cat','Hepatic Cat','Hyperthyroidism Cat'].forEach(n =>
  add(`Virbac HPM ${n}`, 'Virbac HPM', 'chat', n.includes('Kitten') ? 'croquette_chat_kitten' : 'croquette_chat_vet_renal', 'chat_vet'));

// ─── TERRA CANIS ─────────────────────────────────────────────────────────────
const TC_FLAVORS = ['Boeuf & Légumes','Poulet & Légumes','Agneau & Légumes','Saumon & Légumes',
  'Canard & Légumes','Gibier & Légumes','Cheval & Légumes','Veau & Légumes'];
TC_FLAVORS.forEach(f => {
  add(`Terra Canis Classic ${f} Chien`, 'Terra Canis', 'chien', 'patee_chien_premium', 'chien_patee');
  add(`Terra Canis Grain Free ${f} Chien`, 'Terra Canis', 'chien', 'patee_chien_grain_free', 'chien_grain_free');
});

// ─── JAMES WELLBELOVED ───────────────────────────────────────────────────────
['Adult Poulet & Riz','Adult Dinde & Riz','Adult Agneau & Riz','Adult Poisson & Riz',
 'Puppy Poulet & Riz','Senior Poulet & Riz','Junior Dinde & Riz',
 'Adult Grain Free Poulet','Adult Grain Free Agneau'].forEach(n =>
  add(`James Wellbeloved ${n} Chien`, 'James Wellbeloved', 'chien', n.includes('Puppy') || n.includes('Junior') ? 'croquette_chien_premium_puppy' : n.includes('Grain Free') ? 'croquette_chien_grain_free' : 'croquette_chien_premium_adulte', 'chien_premium'));
['Adult Poulet & Riz','Adult Poisson & Riz','Kitten Poulet & Riz','Senior Poulet & Riz','Adult Grain Free Poulet'].forEach(n =>
  add(`James Wellbeloved ${n} Chat`, 'James Wellbeloved', 'chat', n.includes('Kitten') ? 'croquette_chat_kitten' : 'croquette_chat_adulte', 'chat_premium'));

// ─── PEDIGREE ────────────────────────────────────────────────────────────────
const PED_RANGES = ['Adult Boeuf','Adult Poulet','Adult Agneau','Adult Mini Boeuf','Adult Mini Poulet',
  'Puppy Poulet','Puppy Boeuf','Senior Poulet & Légumes'];
PED_RANGES.forEach(n => add(`Pedigree ${n}`, 'Pedigree', 'chien', n.includes('Puppy') ? 'croquette_chien_economy' : 'croquette_chien_economy', 'chien_economy'));
['Vital Protection Adult Boeuf','Vital Protection Adult Poulet','Hundefutter Rind Dose',
 'Boeuf en sauce','Poulet en sauce','Agneau en sauce'].forEach(n =>
  add(`Pedigree ${n} Chien`, 'Pedigree', 'chien', n.includes('sauce') ? 'patee_chien_standard' : 'croquette_chien_economy', n.includes('sauce') ? 'chien_patee' : 'chien_economy'));

// ─── WHISKAS ─────────────────────────────────────────────────────────────────
['Adult Poulet','Adult Saumon','Adult Boeuf','Adult Thon','Adult Canard',
 'Kitten Poulet','Kitten Saumon','Senior Poulet'].forEach(n =>
  add(`Whiskas ${n}`, 'Whiskas', 'chat', n.includes('Kitten') ? 'croquette_chat_economy' : n.includes('Senior') ? 'croquette_chat_senior' : 'croquette_chat_economy', 'chat_economy'));
['Poulet en sauce','Saumon en sauce','Boeuf en sauce','Thon en sauce','Cocktail de la mer en sauce',
 'Poulet en gelée','Saumon en gelée','Mix Poulet & Légumes','Kitten Poulet en sauce'].forEach(n =>
  add(`Whiskas ${n} Chat`, 'Whiskas', 'chat', 'patee_chat_standard', 'chat_patee'));

// ─── FELIX ───────────────────────────────────────────────────────────────────
['As Good As It Looks Poulet','As Good As It Looks Saumon','As Good As It Looks Boeuf',
 'As Good As It Looks Thon','Fantastic Poulet','Fantastic Saumon','Kitten Poulet',
 'Senior Poulet','Party Mix Original','Sensations Poulet'].forEach(n =>
  add(`Felix ${n} Chat`, 'Felix', 'chat', n.includes('Kitten') ? 'patee_chat_standard' : n.includes('Party Mix') ? 'croquette_chat_economy' : 'patee_chat_standard', 'chat_patee'));

// ─── SHEBA ───────────────────────────────────────────────────────────────────
['Fine Flakes Poulet','Fine Flakes Saumon','Fine Flakes Thon','Fine Flakes Boeuf',
 'Perfect Portions Poulet','Perfect Portions Saumon','Perfect Portions Thon',
 'Nature Poulet','Nature Saumon','Délices du Jardin Poulet'].forEach(n =>
  add(`Sheba ${n} Chat`, 'Sheba', 'chat', 'patee_chat_premium', 'chat_patee'));

// ─── GOURMET ─────────────────────────────────────────────────────────────────
['Gold Poulet','Gold Saumon','Gold Thon','Gold Boeuf','Perle Poulet','Perle Saumon',
 'Perle Canard','Perle Thon','Revelations Saumon','Revelations Poulet'].forEach(n =>
  add(`Gourmet ${n} Chat`, 'Gourmet', 'chat', 'patee_chat_premium', 'chat_patee'));

// ─── WELLNESS CORE ───────────────────────────────────────────────────────────
['Original Dinde & Poulet','Réduit en Calories','Small Breed Adult','Puppy Original',
 'Senior Plus','Grain Free Original Large Breed'].forEach(n =>
  add(`Wellness Core ${n} Chien`, 'Wellness Core', 'chien', 'croquette_chien_grain_free', 'chien_grain_free'));
['Original Dinde','Sterilised Poulet','Indoor Poulet','Kitten Dinde','Senior Dinde',
 'Grain Free Original Saumon'].forEach(n =>
  add(`Wellness Core ${n} Chat`, 'Wellness Core', 'chat', 'croquette_chat_grain_free', 'chat_grain_free'));

// ─── BLUE BUFFALO ────────────────────────────────────────────────────────────
['Life Protection Adult Poulet','Life Protection Puppy Poulet','Life Protection Senior Poulet',
 'Wilderness Adult Saumon','Wilderness Puppy Poulet','Freedom Grain Free Adult',
 'Basics Limited Ingredient Agneau','Natural Veterinary Diet Obesity Management'].forEach(n =>
  add(`Blue Buffalo ${n} Chien`, 'Blue Buffalo', 'chien', n.includes('Puppy') ? 'croquette_chien_premium_puppy' : n.includes('Wilderness') ? 'croquette_chien_grain_free' : 'croquette_chien_premium_adulte', 'chien_premium'));
['Life Protection Adult Poulet','Wilderness Adult Saumon','Freedom Grain Free Adult',
 'Kitten Poulet','Indoor Adult Poulet','Healthy Aging Senior'].forEach(n =>
  add(`Blue Buffalo ${n} Chat`, 'Blue Buffalo', 'chat', n.includes('Kitten') ? 'croquette_chat_kitten' : n.includes('Wilderness') ? 'croquette_chat_grain_free' : 'croquette_chat_adulte', 'chat_premium'));

// ─── NUTRO ───────────────────────────────────────────────────────────────────
['Natural Choice Adult Medium Agneau','Natural Choice Adult Mini Agneau','Grain Free Adult Poulet',
 'Ultra Adult Poulet','Wild Frontier Adult','Senior Adult Poulet','Puppy Poulet'].forEach(n =>
  add(`Nutro ${n} Chien`, 'Nutro', 'chien', 'croquette_chien_premium_adulte', 'chien_premium'));
['Natural Choice Adult Poulet','Grain Free Adult Saumon','Indoor Adult Saumon','Kitten Poulet','Senior Poulet'].forEach(n =>
  add(`Nutro ${n} Chat`, 'Nutro', 'chat', 'croquette_chat_adulte', 'chat_premium'));

// ─── BURNS ───────────────────────────────────────────────────────────────────
['Original Poulet & Riz','Original Agneau & Riz','Original Poisson & Riz',
 'Weight Control Poulet','Puppy Poulet & Riz','Senior Poulet & Riz',
 'Grain Free Poulet','Grain Free Agneau'].forEach(n =>
  add(`Burns ${n} Chien`, 'Burns', 'chien', n.includes('Puppy') ? 'croquette_chien_premium_puppy' : 'croquette_chien_premium_adulte', 'chien_premium'));

// ─── FORTHGLADE ──────────────────────────────────────────────────────────────
const FORTH_FLAVORS = ['Poulet','Boeuf','Saumon','Agneau','Dinde','Canard'];
FORTH_FLAVORS.forEach(f => {
  add(`Forthglade Complete Adult ${f}`, 'Forthglade', 'chien', 'patee_chien_grain_free', 'chien_patee');
  add(`Forthglade Complete Puppy ${f}`, 'Forthglade', 'chien', 'patee_chien_grain_free', 'chien_patee');
  add(`Forthglade Just ${f} Chien`, 'Forthglade', 'chien', 'patee_chien_grain_free', 'chien_patee');
});

// ─── ALMO NATURE ─────────────────────────────────────────────────────────────
const ALMO_FLAVORS_CAT = ['Poulet','Thon','Saumon','Boeuf','Canard','Agneau','Crevettes'];
ALMO_FLAVORS_CAT.forEach(f => {
  add(`Almo Nature HFC Adult ${f} Chat`, 'Almo Nature', 'chat', 'patee_chat_grain_free', 'chat_patee');
  add(`Almo Nature Daily Menu ${f} Chat`, 'Almo Nature', 'chat', 'patee_chat_grain_free', 'chat_patee');
  add(`Almo Nature Green Label ${f} Chat`, 'Almo Nature', 'chat', 'patee_chat_grain_free', 'chat_patee');
});
['Kitten Poulet','Kitten Thon','Senior Poulet','Senior Saumon'].forEach(n =>
  add(`Almo Nature ${n} Chat`, 'Almo Nature', 'chat', 'patee_chat_grain_free', 'chat_patee'));

// ─── CESAR ───────────────────────────────────────────────────────────────────
['Boeuf','Poulet','Agneau','Volaille & Légumes','Saumon & Légumes',
 'Boeuf aux Légumes','Poulet aux Légumes'].forEach(n =>
  add(`Cesar ${n} Chien`, 'Cesar', 'chien', 'patee_chien_standard', 'chien_patee'));

// ─── VIANDE FRAÎCHE / BARF ───────────────────────────────────────────────────
const BARF_BRANDS = ['BARF Nutrition','Primal Pet Foods','Steve\'s Real Food','Darwin\'s Natural'];
const BARF_FLAVORS = ['Boeuf','Poulet','Agneau','Dinde','Saumon','Canard'];
BARF_BRANDS.forEach(b => BARF_FLAVORS.forEach(f => {
  add(`${b} ${f} Adult Chien`, b, 'chien', 'patee_chien_grain_free', 'chien_patee');
  add(`${b} ${f} Adult Chat`, b, 'chat', 'patee_chat_grain_free', 'chat_patee');
}));

// ─── MARQUES FRANÇAISES / EUROPÉENNES ────────────────────────────────────────
const FR_BRANDS_DOG = [
  ['Friskies','croquette_chien_economy'],['Chappi','croquette_chien_economy'],
  ['Soufflet Agriculture','croquette_chien_premium_adulte'],
  ['Croquettes & Compagnie','croquette_chien_premium_adulte'],
  ['Affinity Advance','croquette_chien_premium_adulte'],
  ['Equilibre & Instinct','croquette_chien_grain_free'],
  ['Franck Provost Pet','croquette_chien_premium_adulte'],
];
const STAGES_DOG = ['Adult Mini','Adult Medium','Adult Maxi','Puppy','Senior'];
FR_BRANDS_DOG.forEach(([b,p]) => STAGES_DOG.forEach(s =>
  add(`${b} ${s} Chien`, b, 'chien', p, s.includes('Puppy') ? 'chien_premium' : 'chien_premium')));

const FR_BRANDS_CAT = [
  ['Friskies','croquette_chat_economy'],['Sheba','patee_chat_premium'],
  ['Purina Gourmet','patee_chat_premium'],
  ['Equilibre & Instinct Chat','croquette_chat_grain_free'],
];
const STAGES_CAT = ['Adult','Kitten','Senior','Sterilised'];
FR_BRANDS_CAT.forEach(([b,p]) => STAGES_CAT.forEach(s =>
  add(`${b} ${s} Chat`, b, 'chat', s === 'Kitten' ? 'croquette_chat_kitten' : 'croquette_chat_adulte', 'chat_premium')));

// ─── MARQUES PREMIUM SUPPLÉMENTAIRES ─────────────────────────────────────────
const EXTRA_BRANDS_DOG = [
  ['Markus Mühle Black Angus','croquette_chien_grain_free'],
  ['Markus Mühle Marengo','croquette_chien_grain_free'],
  ['Dr. Clauder\'s Senior','croquette_chien_senior'],
  ['Dr. Clauder\'s Adult','croquette_chien_premium_adulte'],
  ['Belcando Puppy','croquette_chien_premium_puppy'],
  ['Belcando Adult Active','croquette_chien_sport'],
  ['Belcando Senior','croquette_chien_senior'],
  ['Wolfsblut Island Storm','croquette_chien_grain_free'],
  ['Wolfsblut Dark Forest','croquette_chien_grain_free'],
  ['Wolfsblut Black Marsh','croquette_chien_grain_free'],
  ['Grau\'s Geflügel','croquette_chien_grain_free'],
  ['Hunter Dog Adult Ente','croquette_chien_premium_adulte'],
  ['Hunter Dog Puppy','croquette_chien_premium_puppy'],
  ['Rinti Kennerfleisch Rind','patee_chien_premium'],
  ['MAC\'s Adult Rind','patee_chien_premium'],
  ['Schmusy Lachs','patee_chat_premium'],
  ['Animonda Integra Renal Chien','croquette_chien_vet_renal'],
  ['Trovet URD Urinary Chien','croquette_chien_vet_urinary'],
  ['Trovet HPD Hypoallergenic Chien','croquette_chien_vet_hypo'],
  ['Trovet RRD Renal Chien','croquette_chien_vet_renal'],
];
EXTRA_BRANDS_DOG.forEach(([n,p]) => add(n, n.split(' ')[0], 'chien', p, p.includes('patee') ? 'chien_patee' : 'chien_premium'));

const EXTRA_BRANDS_CAT = [
  ['Animonda Integra Renal Chat','croquette_chat_vet_renal'],
  ['Trovet URF Urinary Chat','croquette_chat_vet_urinary'],
  ['Trovet HPF Hypoallergenic Chat','croquette_chat_vet_hypo'],
  ['Trovet RRF Renal Chat','croquette_chat_vet_renal'],
  ['Animonda Integra Protect Urinary Chat','croquette_chat_vet_urinary'],
  ['Bozita Robur Adult Chat','croquette_chat_adulte'],
  ['Bozita Robur Kitten Chat','croquette_chat_kitten'],
  ['Smolke Cat Adult Sterilized','croquette_chat_sterilise'],
  ['Stuzzy Monoprotein Saumon Chat','croquette_chat_grain_free'],
  ['MAC\'s Adult Lachs Chat','patee_chat_grain_free'],
  ['Schmusy Kitten Mousse','patee_chat_premium'],
  ['Leonardo Adult Poulet Chat','croquette_chat_adulte'],
  ['Catessy Adult Knusperflocken Chat','croquette_chat_economy'],
];
EXTRA_BRANDS_CAT.forEach(([n,p]) => add(n, n.split(' ')[0], 'chat', p, p.includes('patee') ? 'chat_patee' : 'chat_premium'));

// ─── VARIANTES DE SAVEURS SUPPLÉMENTAIRES ────────────────────────────────────
const MAIN_BRANDS_FLAVORS = [
  { brand: 'Royal Canin', type: 'chien', profile: 'croquette_chien_premium_adulte', flavors: ['Poulet & Riz', 'Agneau & Riz', 'Boeuf & Légumes', 'Saumon & Riz', 'Dinde & Légumes'] },
  { brand: 'Royal Canin', type: 'chat', profile: 'croquette_chat_adulte', flavors: ['Saumon & Riz', 'Thon & Légumes', 'Canard & Riz', 'Poulet & Légumes'] },
  { brand: 'Purina Pro Plan', type: 'chien', profile: 'croquette_chien_premium_adulte', flavors: ['Boeuf & Légumes', 'Canard & Légumes', 'Gibier & Légumes', 'Dinde & Légumes'] },
  { brand: 'Hills', type: 'chien', profile: 'croquette_chien_premium_adulte', flavors: ['Agneau & Riz', 'Saumon & Légumes', 'Boeuf & Légumes', 'Dinde & Légumes'] },
  { brand: 'Orijen', type: 'chien', profile: 'croquette_chien_grain_free', flavors: ['Agneau', 'Canard', 'Boeuf', 'Lapin & Lentilles'] },
  { brand: 'Acana', type: 'chien', profile: 'croquette_chien_grain_free', flavors: ['Poulet & Burbank Potato', 'Agneau & Apple', 'Porc & Butternut Squash'] },
];
MAIN_BRANDS_FLAVORS.forEach(({ brand, type, profile, flavors }) =>
  flavors.forEach(f => add(`${brand} ${f} ${type === 'chien' ? 'Chien' : 'Chat'}`, brand, type, profile, type === 'chien' ? 'chien_premium' : 'chat_premium')));

// ─── EXPANSION MASSIVE POUR ATTEINDRE 10K ────────────────────────────────────

const ALL_SIZES_DOG = ['Mini','X-Small','Small','Medium','Maxi','Large','Giant','All Breeds'];
const ALL_STAGES_DOG = ['Adult','Puppy','Senior','Junior','Light','Sport','Sterilised'];
const ALL_STAGES_CAT = ['Adult','Kitten','Senior','Sterilised','Indoor','Light'];
const ALL_PROTEINS = ['Poulet','Saumon','Agneau','Boeuf','Dinde','Canard','Thon','Lapin','Gibier','Truite','Morue','Veau'];
const ALL_PROTEINS_DOG = ['Poulet','Saumon','Agneau','Boeuf','Dinde','Canard','Lapin','Gibier','Veau','Poisson'];

// Marques principales chien — toutes tailles × tous stades × toutes protéines
['Royal Canin','Purina Pro Plan','Hills','Eukanuba','Iams','Advance','Josera','Bosch'].forEach(brand => {
  ALL_SIZES_DOG.forEach(size => {
    ALL_STAGES_DOG.forEach(stage => {
      ALL_PROTEINS_DOG.forEach(prot => {
        const name = `${brand} ${size} ${stage} ${prot} Chien`;
        const profile = stage === 'Puppy' || stage === 'Junior' ? 'croquette_chien_premium_puppy'
          : stage === 'Senior' ? 'croquette_chien_senior'
          : stage === 'Light' ? 'croquette_chien_light'
          : stage === 'Sport' ? 'croquette_chien_sport'
          : size === 'Mini' || size === 'X-Small' || size === 'Small' ? 'croquette_chien_mini_adulte'
          : size === 'Maxi' || size === 'Large' || size === 'Giant' ? 'croquette_chien_maxi_adulte'
          : 'croquette_chien_premium_adulte';
        add(name, brand, 'chien', profile, 'chien_premium');
      });
    });
  });
});

// Marques principales chat — tous stades × toutes protéines
['Royal Canin','Purina Pro Plan','Hills','Iams','Advance','Josera','Bosch','Eukanuba'].forEach(brand => {
  ALL_STAGES_CAT.forEach(stage => {
    ALL_PROTEINS.forEach(prot => {
      const name = `${brand} ${stage} ${prot} Chat`;
      const profile = stage === 'Kitten' ? 'croquette_chat_kitten'
        : stage === 'Senior' ? 'croquette_chat_senior'
        : stage === 'Sterilised' ? 'croquette_chat_sterilise'
        : stage === 'Indoor' ? 'croquette_chat_indoor'
        : stage === 'Light' ? 'croquette_chat_light'
        : 'croquette_chat_adulte';
      add(name, brand, 'chat', profile, 'chat_premium');
    });
  });
});

// ─── MARQUES PREMIUM SUPPLÉMENTAIRES ─────────────────────────────────────────
const PREMIUM_BRANDS_DOG = [
  'Happy Dog','Happy Dog NaturCroq','Happy Dog Supreme','Happy Dog Sensible',
  'Platinum Adult','Platinum Puppy','Magnusson Adult','Magnusson Junior',
  'Nature\'s Variety Instinct','Nature\'s Variety Raw Boost',
  'Lukullus Adult','Lukullus Naturelle','Rocco Cherie',
  'Belcando','Wolfsblut','Grau\'s',
  'Sanabelle Adult','Sanabelle Kitten',
  'Dr. Clauder\'s','Dr. Alder\'s',
  'Terra Canis','Terra Canis Canned',
  'MAC\'s Adult','Rinti Kennerfleisch',
  'Herrmann\'s Classic','Herrmann\'s Bio',
  'Bozita Robur','Bozita Chunks',
  'GimDog','GimCat',
  'N&D Ancestral Grain','N&D Ocean','N&D Quinoa',
  'Purizon Adult','Purizon Puppy','Purizon Senior',
  'Smolke Adult','Smolke Puppy',
  'Hunter Adult','Hunter Puppy',
  'ANF Adult','ANF Puppy',
  'Premium Choice Adult','Premium Choice Puppy',
  'Almo Nature Holistic','Almo Nature Legend',
  'Forza10 Adult','Forza10 Intestinal',
  'Specific CID','Specific CRD',
  'ProBalance Adult','ProBalance Senior',
];
const DOG_PROT_SHORT = ['Poulet','Agneau','Saumon','Boeuf','Canard','Gibier','Veau'];
const DOG_STAGES_SHORT = ['Adult','Puppy','Senior'];
PREMIUM_BRANDS_DOG.forEach(brand => {
  DOG_PROT_SHORT.forEach(prot => {
    DOG_STAGES_SHORT.forEach(stage => {
      const profile = stage === 'Puppy' ? 'croquette_chien_premium_puppy'
        : stage === 'Senior' ? 'croquette_chien_senior' : 'croquette_chien_premium_adulte';
      add(`${brand} ${prot} ${stage} Chien`, brand.split(' ')[0], 'chien', profile, 'chien_premium');
    });
  });
});

const PREMIUM_BRANDS_CAT = [
  'Almo Nature HFC','Almo Nature Holistic',
  'Applaws Adult','Applaws Kitten',
  'Bozita Cat Adult','Bozita Cat Kitten',
  'Concept for Life','Concept for Life Sterilised',
  'Crave Adult','Crave Kitten',
  'GimCat Nutri Pockets','GimCat Complete',
  'Grau\'s Geflügel Chat','Herrmann\'s Bio Chat',
  'Lukullus Adult Chat','MAC\'s Adult Chat',
  'Nature\'s Variety Instinct Chat','N&D Quinoa Chat',
  'Prima Cat Adult','Prima Cat Senior',
  'Purizon Adult Chat','Purizon Kitten Chat',
  'Rocco Cherie Chat','Smolke Adult Chat',
  'Sanabelle Indoor Chat','Sanabelle Sterilised Chat',
  'Stuzzy Adult Chat','Leonardo Adult Chat',
  'Arden Grange Adult Chat','Arden Grange Kitten',
  'Feringa Adult Chat','Feringa Kitten',
  'Cosma Asia Chat','Cosma Original Chat',
  'Schmusy Nature Chat','Schmusy Ragout Chat',
  'Animonda Vom Feinsten Chat','Animonda Carny Adult',
  'Catessy Adult Chat','Catessy Sterilised Chat',
];
const CAT_PROT_SHORT = ['Poulet','Saumon','Thon','Agneau','Canard','Boeuf','Lapin'];
const CAT_STAGES_SHORT = ['Adult','Kitten','Senior','Sterilised'];
PREMIUM_BRANDS_CAT.forEach(brand => {
  CAT_PROT_SHORT.forEach(prot => {
    CAT_STAGES_SHORT.forEach(stage => {
      const profile = stage === 'Kitten' ? 'croquette_chat_kitten'
        : stage === 'Senior' ? 'croquette_chat_senior'
        : stage === 'Sterilised' ? 'croquette_chat_sterilise' : 'croquette_chat_adulte';
      add(`${brand} ${prot} ${stage} Chat`, brand.split(' ')[0], 'chat', profile, 'chat_premium');
    });
  });
});

// ─── MARQUES FRANÇAISES ET GRANDES SURFACES ───────────────────────────────────
const FR_SUPERMARKET_BRANDS_DOG = [
  ['Purina Dog Chow','croquette_chien_economy'],
  ['Purina Friskies','croquette_chien_economy'],
  ['Chappi','croquette_chien_economy'],
  ['Kitekat','croquette_chien_economy'],
  ['Marque Repère','croquette_chien_economy'],
  ['Equilibre & Instinct','croquette_chien_grain_free'],
  ['Croquettes & Compagnie','croquette_chien_premium_adulte'],
  ['Yarrah Organic','croquette_chien_premium_adulte'],
  ['Vegdog Adult','croquette_chien_grain_free'],
  ['Farm Dog Adult','croquette_chien_economy'],
  ['Natural Greatness','croquette_chien_grain_free'],
  ['Profine Adult','croquette_chien_premium_adulte'],
  ['Kippy Adult','croquette_chien_premium_adulte'],
  ['Versele-Laga Opti Dog','croquette_chien_premium_adulte'],
  ['Dibaq Dican','croquette_chien_economy'],
];
const FR_PROT = ['Poulet','Boeuf','Agneau','Saumon'];
const FR_STAGES = ['Adult','Puppy','Senior','Mini Adult','Maxi Adult'];
FR_SUPERMARKET_BRANDS_DOG.forEach(([brand, profile]) => {
  FR_PROT.forEach(prot => {
    FR_STAGES.forEach(stage => {
      add(`${brand} ${stage} ${prot} Chien`, brand.split(' ')[0], 'chien', profile, 'chien_premium');
    });
  });
});

const FR_SUPERMARKET_BRANDS_CAT = [
  ['Purina Gourmet Perle','patee_chat_premium'],
  ['Purina Felix Sensations','patee_chat_standard'],
  ['Whiskas 1+','croquette_chat_economy'],
  ['Yarrah Organic Chat','croquette_chat_adulte'],
  ['Equilibre & Instinct Chat','croquette_chat_grain_free'],
  ['Natural Greatness Chat','croquette_chat_grain_free'],
  ['Profine Adult Chat','croquette_chat_adulte'],
  ['Versele-Laga Opti Cat','croquette_chat_adulte'],
  ['Kippy Adult Chat','croquette_chat_adulte'],
  ['Dibaq Dican Chat','croquette_chat_economy'],
  ['Agras Delic Chat','patee_chat_premium'],
];
const FR_PROT_CAT = ['Poulet','Saumon','Thon','Boeuf'];
const FR_STAGES_CAT = ['Adult','Kitten','Senior','Sterilised'];
FR_SUPERMARKET_BRANDS_CAT.forEach(([brand, profile]) => {
  FR_PROT_CAT.forEach(prot => {
    FR_STAGES_CAT.forEach(stage => {
      add(`${brand} ${stage} ${prot} Chat`, brand.split(' ')[0], 'chat', profile, 'chat_premium');
    });
  });
});

// ─── MARQUES VÉTÉRINAIRES SUPPLÉMENTAIRES ─────────────────────────────────────
const VET_BRANDS_DOG = [
  ['Royal Canin Veterinary','chien'],['Purina Veterinary Diets','chien'],
  ["Hill's Prescription Diet",'chien'],['Specific Veterinary','chien'],
  ['Virbac HPM','chien'],['Trovet','chien'],['Animonda Integra','chien'],
  ['Forza10 Veterinary','chien'],['Omni Vet','chien'],
];
const VET_DIAG_DOG = [
  ['Renal Chien','croquette_chien_vet_renal'],['Urinary Chien','croquette_chien_vet_urinary'],
  ['Gastrointestinal Chien','croquette_chien_vet_gastro'],['Hypoallergenic Chien','croquette_chien_vet_hypo'],
  ['Obesity Chien','croquette_chien_vet_obesity'],['Cardiac Chien','croquette_chien_vet_cardiac'],
  ['Hepatic Chien','croquette_chien_vet_renal'],['Diabetic Chien','croquette_chien_vet_obesity'],
  ['Mobility Chien','croquette_chien_premium_senior'],['Dermatosis Chien','croquette_chien_vet_hypo'],
];
VET_BRANDS_DOG.forEach(([brand, type]) => {
  VET_DIAG_DOG.forEach(([diag, profile]) => {
    ALL_PROTEINS_DOG.slice(0,5).forEach(prot => {
      add(`${brand} ${diag} ${prot}`, brand.split(' ')[0], type, profile, 'chien_vet');
    });
  });
});

const VET_BRANDS_CAT = [
  ['Royal Canin Veterinary','chat'],['Purina Veterinary Diets','chat'],
  ["Hill's Prescription Diet",'chat'],['Specific Veterinary','chat'],
  ['Virbac HPM','chat'],['Trovet','chat'],['Animonda Integra','chat'],
];
const VET_DIAG_CAT = [
  ['Renal Chat','croquette_chat_vet_renal'],['Urinary Chat','croquette_chat_vet_urinary'],
  ['Gastrointestinal Chat','croquette_chat_vet_gastro'],['Hypoallergenic Chat','croquette_chat_vet_hypo'],
  ['Obesity Chat','croquette_chat_vet_obesity'],['Hepatic Chat','croquette_chat_vet_renal'],
  ['Diabetic Chat','croquette_chat_vet_obesity'],['Dermatosis Chat','croquette_chat_vet_hypo'],
];
VET_BRANDS_CAT.forEach(([brand, type]) => {
  VET_DIAG_CAT.forEach(([diag, profile]) => {
    ALL_PROTEINS.slice(0,5).forEach(prot => {
      add(`${brand} ${diag} ${prot}`, brand.split(' ')[0], type, profile, 'chat_vet');
    });
  });
});

// ─── PÂTÉES — EXPANSION TOUTES SAVEURS ───────────────────────────────────────
const PATEE_BRANDS_DOG = [
  'Animonda Vom Feinsten','Terra Canis','Herrmann\'s Classic','Herrmann\'s Bio',
  'Rinti Gold','Rinti Kennerfleisch','MAC\'s Adult','Bozita Chunks',
  'Forthglade Complete','Forthglade Just','Barking Heads Bowl',
  'Lily\'s Kitchen Casserole','Brit Premium','Grau\'s Dog',
  'Happy Dog Dose','Purina Pro Plan Pâtée','Royal Canin Pâtée',
  'Cesar Classic','Pedigree Sachet Fraîcheur','Chappi Pâtée',
];
const PATEE_PROT_DOG = ['Boeuf','Poulet','Agneau','Saumon','Canard','Dinde','Lapin','Cheval','Gibier','Veau','Truite'];
PATEE_BRANDS_DOG.forEach(brand => {
  PATEE_PROT_DOG.forEach(prot => {
    add(`${brand} ${prot} Chien`, brand.split(' ')[0], 'chien', 'patee_chien_premium', 'chien_patee');
    add(`${brand} ${prot} & Légumes Chien`, brand.split(' ')[0], 'chien', 'patee_chien_premium', 'chien_patee');
  });
});

const PATEE_BRANDS_CAT = [
  'Almo Nature HFC','Almo Nature Daily','Schmusy Nature','Schmusy Ragout',
  'Animonda Carny Kitten','Animonda Vom Feinsten Chat','Bozita Cat Chunks',
  'Cosma Original','Cosma Asia','Feringa Adult','Feringa Kitten',
  'MAC\'s Adult Chat','Herrmann\'s Bio Chat','Grau\'s Cat',
  'Sheba Fine Flakes','Sheba Perfect Portions','Whiskas Sachets',
  'Felix Pâtée','Felix en Gelée','Gourmet Gold','Gourmet Perle',
  'Purina Pro Plan Pâtée Chat','Royal Canin Pâtée Chat',
  'GimCat Pouches','Rocco Cherie Chat','Stuzzy Monoprotein Chat',
];
const PATEE_PROT_CAT = ['Poulet','Saumon','Thon','Boeuf','Canard','Lapin','Crevettes','Cabillaud','Dinde','Agneau'];
PATEE_BRANDS_CAT.forEach(brand => {
  PATEE_PROT_CAT.forEach(prot => {
    add(`${brand} ${prot} Chat`, brand.split(' ')[0], 'chat', 'patee_chat_premium', 'chat_patee');
  });
});

// ─── VARIANTES RACE / SPÉCIFICITÉS ────────────────────────────────────────────
const BREED_DOG_EXTRA = [
  'Weimaraner','Basset Hound','Akita','Samoyed','Husky','Malamute','Bichon Frisé',
  'Coton de Tuléar','Caniche Géant','Bouledogue Américain','Braque Allemand',
  'Épagneul Breton','Berger Australien','Berger Belge Malinois','Bouvier des Flandres',
  'Cane Corso','Shar Pei','Chow Chow','Lhassa Apso','Pékinois',
  'American Staffordshire','Whippet','Greyhound','Irish Setter','Pointer',
];
BREED_DOG_EXTRA.forEach(breed => {
  ['Royal Canin','Purina Pro Plan'].forEach(brand => {
    add(`${brand} ${breed} Adult`, brand, 'chien', 'croquette_chien_premium_adulte', 'chien_premium');
    add(`${brand} ${breed} Puppy`, brand, 'chien', 'croquette_chien_premium_puppy', 'chien_premium');
  });
});

const BREED_CAT_EXTRA = [
  'Exotic Shorthair','Burmese','Turkish Van','Himalayan','Devon Rex','Cornish Rex',
  'Ocicat','Oriental','Tonkinois','Cymrique','Munchkin','Savannah',
  'American Shorthair','Russian Blue',
];
BREED_CAT_EXTRA.forEach(breed => {
  add(`Royal Canin ${breed} Adult`, 'Royal Canin', 'chat', 'croquette_chat_adulte', 'chat_premium');
  add(`Royal Canin ${breed} Kitten`, 'Royal Canin', 'chat', 'croquette_chat_kitten', 'chat_premium');
});

// ─── MARQUES UK / IRLANDE ─────────────────────────────────────────────────────
const UK_BRANDS_DOG = ['Harrington\'s','Wagg','Chappie','Bakers','Wainwright\'s','Collards','Arden Grange'];
const UK_BRANDS_CAT = ['Go-Cat','Kitekat','Wainwright\'s Cat','Arden Grange Cat'];
const UK_PROT = ['Poulet','Saumon','Boeuf','Agneau'];
const UK_STAGES = ['Adult','Puppy','Senior','Junior'];
UK_BRANDS_DOG.forEach(brand => {
  UK_PROT.forEach(prot => {
    UK_STAGES.forEach(stage => {
      add(`${brand} ${stage} ${prot} Chien`, brand.split(' ')[0], 'chien',
        stage === 'Puppy' || stage === 'Junior' ? 'croquette_chien_premium_puppy' : stage === 'Senior' ? 'croquette_chien_senior' : 'croquette_chien_premium_adulte', 'chien_premium');
    });
  });
});
UK_BRANDS_CAT.forEach(brand => {
  UK_PROT.forEach(prot => {
    ['Adult','Kitten','Senior'].forEach(stage => {
      add(`${brand} ${stage} ${prot} Chat`, brand.split(' ')[0], 'chat',
        stage === 'Kitten' ? 'croquette_chat_kitten' : stage === 'Senior' ? 'croquette_chat_senior' : 'croquette_chat_adulte', 'chat_premium');
    });
  });
});

// ─── MARQUES ESPAGNOLES / ITALIENNES ─────────────────────────────────────────
const IT_ES_BRANDS = [
  ['Monge Superpremium','chien','croquette_chien_superpremium'],['Monge Natural','chien','croquette_chien_premium_adulte'],
  ['Monge Grain Free','chien','croquette_chien_grain_free'],['Monge BWild','chien','croquette_chien_grain_free'],
  ['Monge Superpremium Chat','chat','croquette_chat_superpremium'],['Monge Natural Chat','chat','croquette_chat_adulte'],
  ['Stuzzy Adult','chien','croquette_chien_premium_adulte'],['Stuzzy Monoprotein','chien','croquette_chien_grain_free'],
  ['Forza10 Maintenance','chien','croquette_chien_premium_adulte'],['Forza10 Sensitive','chien','croquette_chien_vet_hypo'],
  ['Forza10 Chat Adult','chat','croquette_chat_adulte'],['Forza10 Chat Sensitive','chat','croquette_chat_vet_hypo'],
  ['Trainer Fitness3','chien','croquette_chien_premium_adulte'],['Trainer Natural','chien','croquette_chien_premium_adulte'],
  ['Disugual Adult','chien','croquette_chien_grain_free'],['Disugual Cat','chat','croquette_chat_grain_free'],
  ['Prolife Grain Free','chien','croquette_chien_grain_free'],['Prolife Grain Free Chat','chat','croquette_chat_grain_free'],
  ['Versele-Laga Opti Dog','chien','croquette_chien_premium_adulte'],['Versele-Laga Opti Cat','chat','croquette_chat_adulte'],
  ['Kippy Dog Adult','chien','croquette_chien_premium_adulte'],['Kippy Cat Adult','chat','croquette_chat_adulte'],
];
const IT_ES_PROT = ['Poulet','Saumon','Boeuf','Agneau','Canard'];
const IT_ES_STAGES = ['Adult','Puppy','Senior'];
IT_ES_BRANDS.forEach(([brand, type, profile]) => {
  IT_ES_PROT.forEach(prot => {
    IT_ES_STAGES.forEach(stage => {
      const p = stage === 'Puppy' ? (type === 'chien' ? 'croquette_chien_premium_puppy' : 'croquette_chat_kitten')
        : stage === 'Senior' ? (type === 'chien' ? 'croquette_chien_senior' : 'croquette_chat_senior') : profile;
      add(`${brand} ${stage} ${prot} ${type === 'chien' ? 'Chien' : 'Chat'}`, brand.split(' ')[0], type, p, type === 'chien' ? 'chien_premium' : 'chat_premium');
    });
  });
});

// ─── OUTPUT ──────────────────────────────────────────────────────────────────
console.log(`Produits générés : ${products.length}`);

const lines = products.map(p => '  ' + JSON.stringify(p));
const output = `// Base de données CrocScore — données nutritionnelles publiques (étiquettes fabricants)
// ${products.length} produits — valeurs indicatives (formulations peuvent évoluer)
// Sources : informations publiques sur les étiquettes et sites fabricants
const EXTRA_DB = [
${lines.join(',\n')}
];
`;
fs.writeFileSync('extra_products.js', output, 'utf8');
console.log('Fichier extra_products.js écrit.');
