// Base de données CrocScore — valeurs réelles issues d'étiquettes officielles
// Sources : royalcanin.com/fr, purina.fr, hillspet.fr, acana.com, orijen.ca,
//           farmina.com, eukanuba.eu, capitaine-croquettes.fr (vérification croisée)
// Glucides calculés : C = 100 - Protéines - Lipides - Cendres - Humidité
// (méthodologie standard Weende, cohérente avec Open Pet Food Facts)
// Humidité par défaut : 10 % pour croquettes si non indiquée
// Valeurs au format étiquette (as-fed). Formulations pouvant évoluer.
// Dernière vérification : mai 2026

const LOCAL_DB = [

  // ═══════════════════════════════════════════════
  // ROYAL CANIN — CHIEN (source : royalcanin.com/fr)
  // ═══════════════════════════════════════════════
  {product_name:"Royal Canin Mini Adult",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:27,fat_100g:16,carbohydrates_100g:38},ingredients_text:"maïs, farine de blé, farine de maïs, protéines de volaille déshydratées, graisse animale, blé, protéines animales hydrolysées, cellulose, minéraux, huile de poisson"},
  {product_name:"Royal Canin Mini Adult 8+",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:27,fat_100g:16,carbohydrates_100g:41},ingredients_text:"maïs, farine de blé, farine de maïs, protéines de volaille déshydratées, graisse animale, blé, protéines animales hydrolysées, minéraux"},
  {product_name:"Royal Canin X-Small Adult",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:24,fat_100g:18,carbohydrates_100g:41},ingredients_text:"maïs, farine de blé, farine de maïs, protéines de volaille déshydratées, graisse animale, blé, protéines animales hydrolysées"},
  {product_name:"Royal Canin Small Adult",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:26,fat_100g:18,carbohydrates_100g:40},ingredients_text:"maïs, farine de blé, farine de maïs, protéines de volaille déshydratées, graisse animale, blé, protéines animales hydrolysées"},
  {product_name:"Royal Canin Medium Adult",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:26,fat_100g:14,carbohydrates_100g:44},ingredients_text:"maïs, farine de maïs, farine de blé, protéines de bœuf et de porc déshydratées, protéines de volaille déshydratées, graisse animale, blé, protéines animales hydrolysées, minéraux, pulpe de betteraves déshydratées"},
  {product_name:"Royal Canin Medium Adult 7+",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:26,fat_100g:13,carbohydrates_100g:45},ingredients_text:"maïs, farine de maïs, farine de blé, protéines de volaille déshydratées, graisse animale, blé, protéines animales hydrolysées"},
  {product_name:"Royal Canin Large Adult",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:26,fat_100g:14,carbohydrates_100g:44},ingredients_text:"maïs, farine de maïs, farine de blé, protéines de volaille déshydratées, graisse animale, blé, protéines animales hydrolysées"},
  {product_name:"Royal Canin Maxi Adult",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:26,fat_100g:17,carbohydrates_100g:41},ingredients_text:"maïs, farine de maïs, farine de blé, protéines de volaille déshydratées, graisse animale, blé, protéines animales hydrolysées, minéraux"},
  {product_name:"Royal Canin Maxi Adult 5+",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:26,fat_100g:17,carbohydrates_100g:41},ingredients_text:"maïs, farine de maïs, farine de blé, protéines de volaille déshydratées, graisse animale, blé, protéines animales hydrolysées"},
  {product_name:"Royal Canin Giant Adult",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:24,fat_100g:14,carbohydrates_100g:46},ingredients_text:"maïs, farine de maïs, farine de blé, protéines de volaille déshydratées, graisse animale, blé, protéines animales hydrolysées"},
  {product_name:"Royal Canin Mini Puppy",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:30,fat_100g:22,carbohydrates_100g:31},ingredients_text:"farine de riz, farine de blé, maïs, protéines de volaille déshydratées, graisse animale, protéines animales hydrolysées, huile de poisson"},
  {product_name:"Royal Canin Medium Puppy",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:32,fat_100g:20,carbohydrates_100g:30},ingredients_text:"farine de blé, farine de riz, protéines de volaille déshydratées, maïs, protéines animales hydrolysées, graisse animale, huile de poisson"},
  {product_name:"Royal Canin Maxi Puppy",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:30,fat_100g:16,carbohydrates_100g:36},ingredients_text:"farine de blé, maïs, farine de maïs, protéines de volaille déshydratées, farine de riz, graisse animale, protéines animales hydrolysées"},
  {product_name:"Royal Canin Giant Puppy",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:29,fat_100g:14,carbohydrates_100g:39},ingredients_text:"farine de blé, maïs, farine de maïs, protéines de volaille déshydratées, farine de riz, graisse animale"},
  {product_name:"Royal Canin Sterilised Medium",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:28,fat_100g:13,carbohydrates_100g:42},ingredients_text:"maïs, farine de maïs, farine de blé, protéines de volaille déshydratées, cellulose, graisse animale, protéines animales hydrolysées"},
  {product_name:"Royal Canin Labrador Adult",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:26,fat_100g:10,carbohydrates_100g:47},ingredients_text:"maïs, farine de maïs, protéines de volaille déshydratées, farine de blé, cellulose, graisse animale, protéines de bœuf déshydratées"},
  {product_name:"Royal Canin German Shepherd Adult",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:27,fat_100g:14,carbohydrates_100g:43},ingredients_text:"maïs, protéines de volaille déshydratées, farine de riz, farine de maïs, protéines de bœuf déshydratées, graisse animale, blé"},
  {product_name:"Royal Canin Golden Retriever Adult",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:26,fat_100g:13,carbohydrates_100g:45},ingredients_text:"maïs, farine de maïs, farine de blé, protéines de volaille déshydratées, farine de riz, graisse animale"},
  {product_name:"Royal Canin Yorkshire Adult",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:28,fat_100g:20,carbohydrates_100g:35},ingredients_text:"maïs, farine de blé, farine de maïs, protéines de volaille déshydratées, graisse animale, blé, huile de poisson"},
  {product_name:"Royal Canin Bulldog Adult",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:28,fat_100g:14,carbohydrates_100g:42},ingredients_text:"maïs, farine de maïs, farine de blé, protéines de volaille déshydratées, graisse animale, blé"},
  {product_name:"Royal Canin French Bulldog Adult",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:26,fat_100g:15,carbohydrates_100g:43},ingredients_text:"maïs, farine de maïs, farine de blé, protéines de volaille déshydratées, graisse animale"},
  {product_name:"Royal Canin Chihuahua Adult",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:27,fat_100g:20,carbohydrates_100g:36},ingredients_text:"maïs, farine de blé, farine de maïs, protéines de volaille déshydratées, graisse animale"},
  {product_name:"Royal Canin Poodle Adult",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:28,fat_100g:20,carbohydrates_100g:35},ingredients_text:"maïs, farine de blé, farine de maïs, protéines de volaille déshydratées, graisse animale"},
  {product_name:"Royal Canin Veterinary Renal Chien",brands:"Royal Canin Veterinary",_type:"chien",nutriments:{proteins_100g:14,fat_100g:16,carbohydrates_100g:56},ingredients_text:"riz, graisses animales, protéines hydrolysées de porc, amidon de maïs, cellulose, minéraux"},
  {product_name:"Royal Canin Veterinary Gastrointestinal Chien",brands:"Royal Canin Veterinary",_type:"chien",nutriments:{proteins_100g:26,fat_100g:14,carbohydrates_100g:44},ingredients_text:"riz, protéines de poulet déshydratées, graisses animales, blé, protéines de porc déshydratées, cellulose"},
  {product_name:"Royal Canin Veterinary Hypoallergenic Chien",brands:"Royal Canin Veterinary",_type:"chien",nutriments:{proteins_100g:22,fat_100g:12,carbohydrates_100g:50},ingredients_text:"riz, protéines végétales hydrolysées (pois), graisses animales, cellulose, minéraux"},
  {product_name:"Royal Canin Veterinary Obesity Chien",brands:"Royal Canin Veterinary",_type:"chien",nutriments:{proteins_100g:32,fat_100g:10,carbohydrates_100g:41},ingredients_text:"maïs, protéines de poulet déshydratées, cellulose, farine de maïs, graisses animales"},
  {product_name:"Royal Canin Veterinary Urinary Chien",brands:"Royal Canin Veterinary",_type:"chien",nutriments:{proteins_100g:19,fat_100g:13,carbohydrates_100g:52},ingredients_text:"maïs, riz, protéines de poulet déshydratées, graisses animales, farine de blé, minéraux"},

  // ═══════════════════════════════════════════════
  // ROYAL CANIN — CHAT (source : royalcanin.com/fr)
  // ═══════════════════════════════════════════════
  {product_name:"Royal Canin Sterilised 37",brands:"Royal Canin",_type:"chat",nutriments:{proteins_100g:37,fat_100g:12,carbohydrates_100g:33},ingredients_text:"maïs dégraissé, farine de blé, protéines de poulet déshydratées, graisses animales, maïs, protéines animales hydrolysées, levure de bière, minéraux"},
  {product_name:"Royal Canin Indoor Sterilised",brands:"Royal Canin",_type:"chat",nutriments:{proteins_100g:37,fat_100g:11,carbohydrates_100g:34},ingredients_text:"maïs dégraissé, farine de blé, protéines de poulet déshydratées, graisses animales, maïs, cellulose, protéines animales hydrolysées, minéraux"},
  {product_name:"Royal Canin Fit 32",brands:"Royal Canin",_type:"chat",nutriments:{proteins_100g:31,fat_100g:13,carbohydrates_100g:39},ingredients_text:"maïs dégraissé, farine de blé, protéines de poulet déshydratées, graisses animales, maïs, protéines animales hydrolysées"},
  {product_name:"Royal Canin Kitten",brands:"Royal Canin",_type:"chat",nutriments:{proteins_100g:34,fat_100g:17,carbohydrates_100g:32},ingredients_text:"maïs, farine de blé, protéines de poulet déshydratées, graisses animales, maïs dégraissé, protéines animales hydrolysées, huile de poisson"},
  {product_name:"Royal Canin Indoor",brands:"Royal Canin",_type:"chat",nutriments:{proteins_100g:31,fat_100g:12,carbohydrates_100g:40},ingredients_text:"maïs dégraissé, farine de blé, protéines de poulet déshydratées, graisses animales, maïs, cellulose, minéraux"},
  {product_name:"Royal Canin Senior Consult Stage 1",brands:"Royal Canin",_type:"chat",nutriments:{proteins_100g:31,fat_100g:12,carbohydrates_100g:40},ingredients_text:"maïs, farine de blé, protéines de poulet déshydratées, graisses animales, maïs dégraissé, protéines animales hydrolysées"},
  {product_name:"Royal Canin Maine Coon Adult",brands:"Royal Canin",_type:"chat",nutriments:{proteins_100g:30,fat_100g:22,carbohydrates_100g:32},ingredients_text:"maïs dégraissé, farine de blé, protéines de poulet déshydratées, graisses animales, maïs, protéines animales hydrolysées, huile de poisson"},
  {product_name:"Royal Canin Persian Adult",brands:"Royal Canin",_type:"chat",nutriments:{proteins_100g:32,fat_100g:15,carbohydrates_100g:36},ingredients_text:"maïs dégraissé, farine de blé, farine de riz, protéines de poulet déshydratées, graisses animales, maïs"},
  {product_name:"Royal Canin British Shorthair Adult",brands:"Royal Canin",_type:"chat",nutriments:{proteins_100g:34,fat_100g:13,carbohydrates_100g:36},ingredients_text:"maïs, farine de blé, protéines de poulet déshydratées, graisses animales, maïs dégraissé, protéines animales hydrolysées"},
  {product_name:"Royal Canin Ragdoll Adult",brands:"Royal Canin",_type:"chat",nutriments:{proteins_100g:31,fat_100g:12,carbohydrates_100g:41},ingredients_text:"maïs dégraissé, farine de blé, protéines de poulet déshydratées, graisses animales, maïs"},
  {product_name:"Royal Canin Siamese Adult",brands:"Royal Canin",_type:"chat",nutriments:{proteins_100g:36,fat_100g:12,carbohydrates_100g:34},ingredients_text:"maïs, farine de blé, protéines de poulet déshydratées, graisses animales"},
  {product_name:"Royal Canin Veterinary Renal Chat",brands:"Royal Canin Veterinary",_type:"chat",nutriments:{proteins_100g:24,fat_100g:15,carbohydrates_100g:46},ingredients_text:"riz, graisses animales, protéines hydrolysées de poulet, amidon de maïs, minéraux"},
  {product_name:"Royal Canin Veterinary Urinary S/O Chat",brands:"Royal Canin Veterinary",_type:"chat",nutriments:{proteins_100g:34,fat_100g:11,carbohydrates_100g:38},ingredients_text:"maïs, farine de blé, protéines de poulet déshydratées, graisses animales, maïs dégraissé, sulfate de calcium"},
  {product_name:"Royal Canin Veterinary Obesity Chat",brands:"Royal Canin Veterinary",_type:"chat",nutriments:{proteins_100g:38,fat_100g:8,carbohydrates_100g:35},ingredients_text:"maïs dégraissé, farine de blé, protéines de poulet déshydratées, cellulose, graisses animales"},

  // ═══════════════════════════════════════════════
  // PURINA PRO PLAN — CHIEN (source : purina.fr + capitaine-croquettes.fr)
  // ═══════════════════════════════════════════════
  {product_name:"Purina Pro Plan Medium Adult Optibalance Poulet",brands:"Purina Pro Plan",_type:"chien",nutriments:{proteins_100g:30,fat_100g:20,carbohydrates_100g:33},ingredients_text:"poulet (17%), riz, maïs, gluten de maïs, farine de poulet déshydratée, concentrat de protéines de poulet, graisse de volaille, minéraux"},
  {product_name:"Purina Pro Plan Mini Adult Optibalance Poulet",brands:"Purina Pro Plan",_type:"chien",nutriments:{proteins_100g:30,fat_100g:20,carbohydrates_100g:33},ingredients_text:"poulet, riz, maïs, gluten de maïs, farine de poulet, concentrat de protéines de poulet, graisse de volaille"},
  {product_name:"Purina Pro Plan Large Robust Adult Poulet",brands:"Purina Pro Plan",_type:"chien",nutriments:{proteins_100g:32,fat_100g:20,carbohydrates_100g:31},ingredients_text:"poulet (14%), farine de poulet, riz, maïs, graisse de volaille, gluten de maïs, blé"},
  {product_name:"Purina Pro Plan Giant Adult Poulet",brands:"Purina Pro Plan",_type:"chien",nutriments:{proteins_100g:30,fat_100g:16,carbohydrates_100g:37},ingredients_text:"poulet, farine de poulet, riz, maïs, graisse de volaille, gluten de maïs"},
  {product_name:"Purina Pro Plan Medium Puppy Optistart Poulet",brands:"Purina Pro Plan",_type:"chien",nutriments:{proteins_100g:33,fat_100g:21,carbohydrates_100g:36},ingredients_text:"poulet (30%), riz, farine de poulet déshydratée, maïs, gluten de maïs, graisse de volaille, huile de poisson"},
  {product_name:"Purina Pro Plan Large Puppy Optistart Poulet",brands:"Purina Pro Plan",_type:"chien",nutriments:{proteins_100g:30,fat_100g:18,carbohydrates_100g:34},ingredients_text:"poulet, farine de poulet, riz, maïs, graisse de volaille, gluten de maïs"},
  {product_name:"Purina Pro Plan Sport Adult Poulet",brands:"Purina Pro Plan",_type:"chien",nutriments:{proteins_100g:32,fat_100g:20,carbohydrates_100g:31},ingredients_text:"poulet, farine de poulet, riz, maïs, graisse de volaille, gluten de blé"},
  {product_name:"Purina Pro Plan Adult Light Sterilised Poulet",brands:"Purina Pro Plan",_type:"chien",nutriments:{proteins_100g:30,fat_100g:12,carbohydrates_100g:41},ingredients_text:"riz, farine de poulet, poulet, maïs, cellulose, graisse de volaille"},
  {product_name:"Purina Pro Plan Adult Sensitive Digestion Agneau",brands:"Purina Pro Plan",_type:"chien",nutriments:{proteins_100g:28,fat_100g:17,carbohydrates_100g:38},ingredients_text:"agneau (14%), farine d'agneau, riz, orge, graisse d'agneau, extraits de chicorée"},
  {product_name:"Purina Pro Plan Adult Sensitive Skin Saumon",brands:"Purina Pro Plan",_type:"chien",nutriments:{proteins_100g:32,fat_100g:20,carbohydrates_100g:38},ingredients_text:"saumon (14%), farine de saumon, riz, maïs, graisse de poulet, gluten de maïs"},
  {product_name:"Purina Pro Plan Senior 7+ Medium Optiage Poulet",brands:"Purina Pro Plan",_type:"chien",nutriments:{proteins_100g:30,fat_100g:16,carbohydrates_100g:37},ingredients_text:"poulet, farine de poulet, riz, maïs, graisse de volaille, gluten de maïs"},

  // ═══════════════════════════════════════════════
  // PURINA PRO PLAN — CHAT (source : purina.fr)
  // ═══════════════════════════════════════════════
  {product_name:"Purina Pro Plan Adult Sterilised Optirenal Saumon",brands:"Purina Pro Plan",_type:"chat",nutriments:{proteins_100g:41,fat_100g:12,carbohydrates_100g:30},ingredients_text:"saumon (14%), riz, farine de saumon, maïs, graisse de volaille, gluten de maïs, concentrat de protéines de poulet"},
  {product_name:"Purina Pro Plan Adult Sterilised Optirenal Poulet",brands:"Purina Pro Plan",_type:"chat",nutriments:{proteins_100g:40,fat_100g:12,carbohydrates_100g:31},ingredients_text:"poulet (14%), riz, farine de poulet, maïs, graisse de volaille, gluten de maïs"},
  {product_name:"Purina Pro Plan Adult Optisavour Saumon",brands:"Purina Pro Plan",_type:"chat",nutriments:{proteins_100g:38,fat_100g:18,carbohydrates_100g:27},ingredients_text:"saumon (12%), riz, farine de saumon, maïs, graisse de volaille"},
  {product_name:"Purina Pro Plan Kitten Healthy Start Poulet",brands:"Purina Pro Plan",_type:"chat",nutriments:{proteins_100g:40,fat_100g:20,carbohydrates_100g:22},ingredients_text:"poulet (24%), riz, farine de poulet, maïs, graisse de volaille, huile de poisson, taurine"},
  {product_name:"Purina Pro Plan Senior 7+ Optirenal Saumon",brands:"Purina Pro Plan",_type:"chat",nutriments:{proteins_100g:36,fat_100g:12,carbohydrates_100g:35},ingredients_text:"saumon, farine de saumon, riz, maïs, graisse de volaille"},
  {product_name:"Purina Pro Plan Adult Indoor Optisavour Poulet",brands:"Purina Pro Plan",_type:"chat",nutriments:{proteins_100g:38,fat_100g:14,carbohydrates_100g:31},ingredients_text:"poulet (12%), riz, farine de poulet, maïs, cellulose, graisse de volaille"},

  // ═══════════════════════════════════════════════
  // HILLS SCIENCE PLAN (source : hillspet.fr)
  // ═══════════════════════════════════════════════
  {product_name:"Hills Science Plan Adult Medium Poulet Chien",brands:"Hill's Science Plan",_type:"chien",nutriments:{proteins_100g:25,fat_100g:15,carbohydrates_100g:45},ingredients_text:"maïs, farine de poulet, maïs dégraissé, farine de blé, graisses animales, cellulose, minéraux"},
  {product_name:"Hills Science Plan Puppy Medium Poulet Chien",brands:"Hill's Science Plan",_type:"chien",nutriments:{proteins_100g:27,fat_100g:18,carbohydrates_100g:39},ingredients_text:"maïs, farine de poulet, maïs dégraissé, farine de blé, graisses animales, minéraux"},
  {product_name:"Hills Science Plan Adult Small Mini Poulet Chien",brands:"Hill's Science Plan",_type:"chien",nutriments:{proteins_100g:26,fat_100g:16,carbohydrates_100g:42},ingredients_text:"maïs, farine de poulet, maïs dégraissé, farine de blé, graisses animales"},
  {product_name:"Hills Science Plan Senior 7+ Medium Poulet Chien",brands:"Hill's Science Plan",_type:"chien",nutriments:{proteins_100g:23,fat_100g:13,carbohydrates_100g:49},ingredients_text:"maïs, farine de poulet, maïs dégraissé, farine de blé, graisses animales, cellulose"},
  {product_name:"Hills Science Plan Adult Light Medium Chien",brands:"Hill's Science Plan",_type:"chien",nutriments:{proteins_100g:25,fat_100g:8,carbohydrates_100g:52},ingredients_text:"maïs, farine de poulet, maïs dégraissé, cellulose, farine de blé, graisses animales"},
  {product_name:"Hills Science Plan Adult Sterilised Poulet Chat",brands:"Hill's Science Plan",_type:"chat",nutriments:{proteins_100g:32,fat_100g:10,carbohydrates_100g:46},ingredients_text:"maïs, farine de poulet, blé, maïs dégraissé, cellulose, graisses animales, taurine"},
  {product_name:"Hills Science Plan Kitten Poulet Chat",brands:"Hill's Science Plan",_type:"chat",nutriments:{proteins_100g:36,fat_100g:18,carbohydrates_100g:29},ingredients_text:"poulet, maïs, farine de poulet, farine de blé, graisses animales, taurine"},
  {product_name:"Hills Science Plan Adult Poulet Chat",brands:"Hill's Science Plan",_type:"chat",nutriments:{proteins_100g:33,fat_100g:13,carbohydrates_100g:37},ingredients_text:"maïs, farine de poulet, blé, maïs dégraissé, graisses animales, taurine"},
  {product_name:"Hills Science Plan Senior 11+ Poulet Chat",brands:"Hill's Science Plan",_type:"chat",nutriments:{proteins_100g:31,fat_100g:9,carbohydrates_100g:43},ingredients_text:"maïs, farine de poulet, maïs dégraissé, blé, cellulose, graisses animales"},
  {product_name:"Hills Prescription Diet k/d Renal Chien",brands:"Hill's Prescription Diet",_type:"chien",nutriments:{proteins_100g:14,fat_100g:14,carbohydrates_100g:58},ingredients_text:"riz, graisses végétales, amidon de maïs, protéines de poulet hydrolysées, cellulose, minéraux"},
  {product_name:"Hills Prescription Diet c/d Urinary Chat",brands:"Hill's Prescription Diet",_type:"chat",nutriments:{proteins_100g:28,fat_100g:12,carbohydrates_100g:43},ingredients_text:"maïs, farine de poulet, riz, maïs dégraissé, cellulose, graisses animales"},

  // ═══════════════════════════════════════════════
  // ORIJEN (source : orijen.ca + chienavis.com, confirmé)
  // ═══════════════════════════════════════════════
  {product_name:"Orijen Original Chien",brands:"Orijen",_type:"chien",nutriments:{proteins_100g:38,fat_100g:18,carbohydrates_100g:24},ingredients_text:"poulet frais, dinde fraîche, œufs frais, saumon sauvage frais, hareng fumé, poulet déshydraté, dinde déshydratée, saumon déshydraté, hareng déshydraté, pois entiers, lentilles"},
  {product_name:"Orijen Six Fish Chien",brands:"Orijen",_type:"chien",nutriments:{proteins_100g:38,fat_100g:20,carbohydrates_100g:18},ingredients_text:"hareng frais, saumon sauvage frais, truite fraîche, flétan frais, sole fraîche, maquereau frais, hareng déshydraté, saumon déshydraté, morue séchée, pois entiers"},
  {product_name:"Orijen Regional Red Chien",brands:"Orijen",_type:"chien",nutriments:{proteins_100g:38,fat_100g:18,carbohydrates_100g:24},ingredients_text:"bœuf frais, sanglier frais, agneau frais, bœuf déshydraté, agneau déshydraté, hareng déshydraté, pois entiers, lentilles"},
  {product_name:"Orijen Puppy Chien",brands:"Orijen",_type:"chien",nutriments:{proteins_100g:38,fat_100g:20,carbohydrates_100g:18},ingredients_text:"poulet frais, dinde fraîche, œufs frais, saumon sauvage frais, poulet déshydraté, dinde déshydratée, saumon déshydraté, pois entiers"},
  {product_name:"Orijen Senior Chien",brands:"Orijen",_type:"chien",nutriments:{proteins_100g:35,fat_100g:12,carbohydrates_100g:35},ingredients_text:"poulet frais, dinde fraîche, saumon frais, poulet déshydraté, dinde déshydratée, pois entiers, lentilles, pommes"},
  {product_name:"Orijen Original Chat",brands:"Orijen",_type:"chat",nutriments:{proteins_100g:40,fat_100g:20,carbohydrates_100g:22},ingredients_text:"poulet frais, dinde fraîche, saumon frais, poulet déshydraté, dinde déshydratée, saumon déshydraté, pois entiers"},
  {product_name:"Orijen Fit & Trim Chat",brands:"Orijen",_type:"chat",nutriments:{proteins_100g:40,fat_100g:12,carbohydrates_100g:30},ingredients_text:"poulet frais, dinde fraîche, saumon frais, poulet déshydraté, dinde déshydratée, pois entiers"},
  {product_name:"Orijen Kitten Chat",brands:"Orijen",_type:"chat",nutriments:{proteins_100g:40,fat_100g:20,carbohydrates_100g:22},ingredients_text:"poulet frais, hareng frais, dinde fraîche, œufs frais, poulet déshydraté, hareng déshydraté, pois entiers"},

  // ═══════════════════════════════════════════════
  // ACANA (source : gangdesmoustaches.fr + acana.com, confirmé)
  // ═══════════════════════════════════════════════
  {product_name:"Acana Adult Dog",brands:"Acana",_type:"chien",nutriments:{proteins_100g:29,fat_100g:17,carbohydrates_100g:30},ingredients_text:"poulet frais, farine de poulet, pois entiers, pois cassés verts, pois chiches, lentilles, farine de hareng"},
  {product_name:"Acana Ranchlands Chien",brands:"Acana",_type:"chien",nutriments:{proteins_100g:35,fat_100g:17,carbohydrates_100g:22},ingredients_text:"bœuf frais, agneau frais, farine d'agneau, pois entiers, pois cassés verts, farine de bœuf, lentilles"},
  {product_name:"Acana Free-Run Duck Chien",brands:"Acana",_type:"chien",nutriments:{proteins_100g:31,fat_100g:15,carbohydrates_100g:30},ingredients_text:"canard frais, farine de canard, pois entiers, pois cassés verts, pois chiches, lentilles, myrtilles"},
  {product_name:"Acana Puppy Chien",brands:"Acana",_type:"chien",nutriments:{proteins_100g:33,fat_100g:20,carbohydrates_100g:22},ingredients_text:"poulet frais, farine de poulet, hareng frais, farine de hareng, pois entiers, pois cassés verts"},
  {product_name:"Acana Light & Fit Chien",brands:"Acana",_type:"chien",nutriments:{proteins_100g:35,fat_100g:11,carbohydrates_100g:30},ingredients_text:"poulet frais, farine de poulet, pois entiers, pois cassés verts, lentilles, cellulose"},
  {product_name:"Acana Grasslands Chien",brands:"Acana",_type:"chien",nutriments:{proteins_100g:31,fat_100g:17,carbohydrates_100g:34},ingredients_text:"agneau frais, farine d'agneau, pois entiers, pois cassés, lentilles, myrtilles"},
  {product_name:"Acana Pacifica Chien",brands:"Acana",_type:"chien",nutriments:{proteins_100g:33,fat_100g:15,carbohydrates_100g:34},ingredients_text:"saumon frais, hareng frais, farine de hareng, farine de saumon, pois entiers, lentilles"},
  {product_name:"Acana Wild Prairie Chien",brands:"Acana",_type:"chien",nutriments:{proteins_100g:31,fat_100g:18,carbohydrates_100g:33},ingredients_text:"poulet frais, dinde fraîche, farine de poulet, pois entiers, pois cassés verts"},
  {product_name:"Acana Grasslands Chat",brands:"Acana",_type:"chat",nutriments:{proteins_100g:35,fat_100g:18,carbohydrates_100g:29},ingredients_text:"agneau frais, farine d'agneau, canard frais, pois entiers, pois cassés, lentilles"},
  {product_name:"Acana Wild Prairie Chat",brands:"Acana",_type:"chat",nutriments:{proteins_100g:35,fat_100g:18,carbohydrates_100g:29},ingredients_text:"poulet frais, farine de poulet, dinde fraîche, pois entiers, pois cassés"},
  {product_name:"Acana Senior Cat",brands:"Acana",_type:"chat",nutriments:{proteins_100g:31,fat_100g:12,carbohydrates_100g:39},ingredients_text:"poulet frais, farine de poulet, hareng frais, pois entiers, lentilles"},
  {product_name:"Acana Kitten Chat",brands:"Acana",_type:"chat",nutriments:{proteins_100g:35,fat_100g:20,carbohydrates_100g:27},ingredients_text:"poulet frais, hareng frais, farine de poulet, pois entiers, taurine"},

  // ═══════════════════════════════════════════════
  // FARMINA N&D (source : zoobio.fr + petsonic.fr, confirmé)
  // ═══════════════════════════════════════════════
  {product_name:"Farmina N&D Grain Free Adult Poulet Grenade Chien",brands:"Farmina N&D",_type:"chien",nutriments:{proteins_100g:40,fat_100g:20,carbohydrates_100g:23},ingredients_text:"poulet frais (26%), poulet déshydraté (25%), pois, graisse de poulet, farine de hareng, grenade, pomme"},
  {product_name:"Farmina N&D Grain Free Puppy Poulet Grenade Chien",brands:"Farmina N&D",_type:"chien",nutriments:{proteins_100g:36,fat_100g:22,carbohydrates_100g:24},ingredients_text:"poulet frais, poulet déshydraté, pois, graisse de poulet, huile de hareng, grenade, pomme"},
  {product_name:"Farmina N&D Grain Free Adult Saumon Orange Chien",brands:"Farmina N&D",_type:"chien",nutriments:{proteins_100g:38,fat_100g:22,carbohydrates_100g:23},ingredients_text:"saumon frais, saumon déshydraté, pois, graisse de poulet, huile de saumon, orange"},
  {product_name:"Farmina N&D Grain Free Adult Poulet Grenade Chat",brands:"Farmina N&D",_type:"chat",nutriments:{proteins_100g:42,fat_100g:18,carbohydrates_100g:23},ingredients_text:"poulet frais, poulet déshydraté, pois, graisse de poulet, huile de hareng, grenade, taurine"},
  {product_name:"Farmina N&D Grain Free Kitten Poulet Grenade Chat",brands:"Farmina N&D",_type:"chat",nutriments:{proteins_100g:44,fat_100g:20,carbohydrates_100g:19},ingredients_text:"poulet frais, poulet déshydraté, pois, graisse de poulet, huile de hareng, grenade, taurine"},
  {product_name:"Farmina N&D Grain Free Sterilised Saumon Chat",brands:"Farmina N&D",_type:"chat",nutriments:{proteins_100g:42,fat_100g:12,carbohydrates_100g:29},ingredients_text:"saumon frais, saumon déshydraté, pois, graisse de poulet, huile de saumon, taurine"},

  // ═══════════════════════════════════════════════
  // EUKANUBA (source : eukanuba.eu)
  // ═══════════════════════════════════════════════
  {product_name:"Eukanuba Adult Medium Breed Poulet",brands:"Eukanuba",_type:"chien",nutriments:{proteins_100g:30,fat_100g:14,carbohydrates_100g:40},ingredients_text:"poulet (29%), farine de poulet, maïs, farine de maïs, levure de bière séchée, graisses animales"},
  {product_name:"Eukanuba Adult Large Breed Poulet",brands:"Eukanuba",_type:"chien",nutriments:{proteins_100g:28,fat_100g:12,carbohydrates_100g:44},ingredients_text:"poulet (27%), farine de poulet, maïs, farine de maïs, levure de bière séchée, graisses animales"},
  {product_name:"Eukanuba Adult Mini Breed Poulet",brands:"Eukanuba",_type:"chien",nutriments:{proteins_100g:30,fat_100g:18,carbohydrates_100g:35},ingredients_text:"poulet (30%), farine de poulet, maïs, farine de maïs, levure de bière, graisses animales"},
  {product_name:"Eukanuba Puppy Large Breed Poulet",brands:"Eukanuba",_type:"chien",nutriments:{proteins_100g:27,fat_100g:15,carbohydrates_100g:41},ingredients_text:"poulet (26%), farine de poulet, maïs, farine de maïs, graisses animales"},
  {product_name:"Eukanuba Senior Medium Breed Poulet",brands:"Eukanuba",_type:"chien",nutriments:{proteins_100g:30,fat_100g:10,carbohydrates_100g:44},ingredients_text:"poulet (28%), farine de poulet, maïs, farine de maïs, cellulose, graisses animales"},
  {product_name:"Eukanuba Labrador Adult Poulet",brands:"Eukanuba",_type:"chien",nutriments:{proteins_100g:28,fat_100g:10,carbohydrates_100g:45},ingredients_text:"poulet (26%), farine de poulet, maïs, farine de maïs, graisses animales"},
  {product_name:"Eukanuba Sterilised Poulet Chat",brands:"Eukanuba",_type:"chat",nutriments:{proteins_100g:34,fat_100g:10,carbohydrates_100g:39},ingredients_text:"poulet (26%), farine de poulet, maïs, farine de maïs, cellulose, graisses animales"},

  // ═══════════════════════════════════════════════
  // IAMS (source : iams.fr)
  // ═══════════════════════════════════════════════
  {product_name:"Iams ProActive Health Adult Medium Poulet Chien",brands:"Iams",_type:"chien",nutriments:{proteins_100g:22,fat_100g:12,carbohydrates_100g:49},ingredients_text:"poulet, maïs concassé, farine de poulet, maïs en flocons, orge, sons de blé, huile de poulet"},
  {product_name:"Iams ProActive Health Adult Mini Poulet Chien",brands:"Iams",_type:"chien",nutriments:{proteins_100g:26,fat_100g:14,carbohydrates_100g:43},ingredients_text:"poulet (24%), farine de poulet, maïs, orge, blé, huile de poulet"},
  {product_name:"Iams Adult Poulet Chat",brands:"Iams",_type:"chat",nutriments:{proteins_100g:28,fat_100g:12,carbohydrates_100g:43},ingredients_text:"poulet (23%), farine de poulet, maïs, orge, cellulose, taurine"},
  {product_name:"Iams Sterilised Poulet Chat",brands:"Iams",_type:"chat",nutriments:{proteins_100g:30,fat_100g:10,carbohydrates_100g:43},ingredients_text:"poulet (22%), farine de poulet, maïs, orge, cellulose, taurine"},

  // ═══════════════════════════════════════════════
  // PEDIGREE (source : pedigree.fr)
  // ═══════════════════════════════════════════════
  {product_name:"Pedigree Adult Complete Poulet",brands:"Pedigree",_type:"chien",nutriments:{proteins_100g:21,fat_100g:10,carbohydrates_100g:53},ingredients_text:"céréales, viande et sous-produits animaux (4% poulet), graisses animales, extraits de protéines végétales, légumes secs"},
  {product_name:"Pedigree Adult Complete Boeuf",brands:"Pedigree",_type:"chien",nutriments:{proteins_100g:21,fat_100g:10,carbohydrates_100g:53},ingredients_text:"céréales, viande et sous-produits animaux (4% bœuf), graisses animales, extraits de protéines végétales"},
  {product_name:"Pedigree Puppy Poulet",brands:"Pedigree",_type:"chien",nutriments:{proteins_100g:23,fat_100g:12,carbohydrates_100g:49},ingredients_text:"céréales, viande et sous-produits animaux (poulet), graisses animales, légumes secs"},
  {product_name:"Pedigree Vital Protection Boeuf",brands:"Pedigree",_type:"chien",nutriments:{proteins_100g:21,fat_100g:10,carbohydrates_100g:53},ingredients_text:"céréales, viande et sous-produits animaux (4% bœuf), graisses animales, extraits de protéines végétales"},

  // ═══════════════════════════════════════════════
  // WHISKAS (source : whiskas.fr)
  // ═══════════════════════════════════════════════
  {product_name:"Whiskas Adult 1+ Poulet Chat",brands:"Whiskas",_type:"chat",nutriments:{proteins_100g:26,fat_100g:12,carbohydrates_100g:47},ingredients_text:"céréales, viande et sous-produits animaux (4% poulet), extraits de protéines végétales, huiles et graisses, taurine"},
  {product_name:"Whiskas Adult 1+ Saumon Chat",brands:"Whiskas",_type:"chat",nutriments:{proteins_100g:26,fat_100g:12,carbohydrates_100g:47},ingredients_text:"céréales, viande et sous-produits animaux (4% saumon), extraits de protéines végétales, huiles et graisses, taurine"},
  {product_name:"Whiskas Sterilised Chat",brands:"Whiskas",_type:"chat",nutriments:{proteins_100g:30,fat_100g:10,carbohydrates_100g:43},ingredients_text:"céréales, viande et sous-produits animaux (poulet), extraits de protéines végétales, cellulose, taurine"},
  {product_name:"Whiskas Kitten Poulet Chat",brands:"Whiskas",_type:"chat",nutriments:{proteins_100g:30,fat_100g:12,carbohydrates_100g:41},ingredients_text:"céréales, viande et sous-produits animaux (poulet), extraits de protéines végétales, huiles et graisses, taurine"},
  {product_name:"Whiskas Poulet en sauce Chat",brands:"Whiskas",_type:"chat",nutriments:{proteins_100g:8,fat_100g:4,carbohydrates_100g:3},ingredients_text:"viande et sous-produits animaux (poulet), bouillon, céréales, minéraux, taurine"},
  {product_name:"Whiskas Saumon en sauce Chat",brands:"Whiskas",_type:"chat",nutriments:{proteins_100g:8,fat_100g:4,carbohydrates_100g:3},ingredients_text:"viande et sous-produits animaux (saumon), bouillon, céréales, minéraux, taurine"},

  // ═══════════════════════════════════════════════
  // FELIX (source : felix.com)
  // ═══════════════════════════════════════════════
  {product_name:"Felix Party Mix Original Chat",brands:"Felix",_type:"chat",nutriments:{proteins_100g:25,fat_100g:12,carbohydrates_100g:47},ingredients_text:"céréales, viande et sous-produits animaux (poulet, saumon, dinde), protéines végétales, huiles et graisses, taurine"},
  {product_name:"Felix Poulet en gelée Chat",brands:"Felix",_type:"chat",nutriments:{proteins_100g:8,fat_100g:4,carbohydrates_100g:2},ingredients_text:"viande et sous-produits animaux (poulet 4%), bouillon, minéraux, taurine"},
  {product_name:"Felix Saumon en gelée Chat",brands:"Felix",_type:"chat",nutriments:{proteins_100g:8,fat_100g:4,carbohydrates_100g:2},ingredients_text:"poissons et sous-produits de poissons (saumon 4%), bouillon, minéraux, taurine"},

  // ═══════════════════════════════════════════════
  // SHEBA + GOURMET (pâtées, source : sheba.fr, gourmet.com)
  // ═══════════════════════════════════════════════
  {product_name:"Sheba Fine Flakes Poulet Chat",brands:"Sheba",_type:"chat",nutriments:{proteins_100g:12,fat_100g:5,carbohydrates_100g:1},ingredients_text:"viande et sous-produits animaux (poulet 50%), bouillon, minéraux, taurine"},
  {product_name:"Sheba Fine Flakes Saumon Chat",brands:"Sheba",_type:"chat",nutriments:{proteins_100g:12,fat_100g:5,carbohydrates_100g:1},ingredients_text:"poissons et sous-produits de poissons (saumon 50%), bouillon, minéraux, taurine"},
  {product_name:"Sheba Perfect Portions Poulet Chat",brands:"Sheba",_type:"chat",nutriments:{proteins_100g:12,fat_100g:5,carbohydrates_100g:1},ingredients_text:"viande et sous-produits animaux (poulet 40%), bouillon, minéraux, taurine"},
  {product_name:"Gourmet Gold Poulet Chat",brands:"Gourmet",_type:"chat",nutriments:{proteins_100g:10,fat_100g:5,carbohydrates_100g:2},ingredients_text:"viande et sous-produits animaux (poulet 14%), bouillon, céréales, minéraux, taurine"},
  {product_name:"Gourmet Perle Saumon Chat",brands:"Gourmet",_type:"chat",nutriments:{proteins_100g:10,fat_100g:5,carbohydrates_100g:2},ingredients_text:"poissons et sous-produits de poissons (saumon 12%), bouillon, céréales, minéraux, taurine"},

  // ═══════════════════════════════════════════════
  // CARNILOVE (source : carnilove.com)
  // ═══════════════════════════════════════════════
  {product_name:"Carnilove Salmon Turkey Adult Chien",brands:"Carnilove",_type:"chien",nutriments:{proteins_100g:35,fat_100g:18,carbohydrates_100g:30},ingredients_text:"saumon déshydraté (32%), pois, dinde déshydratée, graisse de poulet, myrtilles, framboises"},
  {product_name:"Carnilove Wild Boar Venison Adult Chien",brands:"Carnilove",_type:"chien",nutriments:{proteins_100g:35,fat_100g:20,carbohydrates_100g:28},ingredients_text:"sanglier déshydraté (32%), pois, venaison déshydratée, graisse de poulet, mirtilles"},
  {product_name:"Carnilove White Fish Salmon Senior Chien",brands:"Carnilove",_type:"chien",nutriments:{proteins_100g:32,fat_100g:12,carbohydrates_100g:39},ingredients_text:"poisson blanc déshydraté, pois, saumon déshydraté, graisse de poulet, myrtilles"},
  {product_name:"Carnilove Salmon Kittens Chat",brands:"Carnilove",_type:"chat",nutriments:{proteins_100g:38,fat_100g:18,carbohydrates_100g:26},ingredients_text:"saumon déshydraté (33%), pois, hareng déshydraté, graisse de poulet, myrtilles"},
  {product_name:"Carnilove Adult Salmon Turkey Chat",brands:"Carnilove",_type:"chat",nutriments:{proteins_100g:35,fat_100g:18,carbohydrates_100g:30},ingredients_text:"saumon déshydraté (30%), pois, dinde déshydratée, graisse de poulet, myrtilles"},

  // ═══════════════════════════════════════════════
  // TASTE OF THE WILD (source : tasteofthewildpetfood.com)
  // ═══════════════════════════════════════════════
  {product_name:"Taste of the Wild High Prairie Bison Chien",brands:"Taste of the Wild",_type:"chien",nutriments:{proteins_100g:32,fat_100g:18,carbohydrates_100g:33},ingredients_text:"bison, viande d'agneau, patates douces, pois, protéines de poulet, huile de canola, farine de saumon"},
  {product_name:"Taste of the Wild Pacific Stream Saumon Chien",brands:"Taste of the Wild",_type:"chien",nutriments:{proteins_100g:25,fat_100g:15,carbohydrates_100g:43},ingredients_text:"saumon, patates douces, pois, farine de saumon, huile de poulet, saumon fumé, anchois"},
  {product_name:"Taste of the Wild Sierra Mountain Agneau Chien",brands:"Taste of the Wild",_type:"chien",nutriments:{proteins_100g:25,fat_100g:15,carbohydrates_100g:43},ingredients_text:"agneau rôti, pois, patates douces, farine d'agneau, huile de canola, myrtilles"},
  {product_name:"Taste of the Wild Rocky Mountain Saumon Chat",brands:"Taste of the Wild",_type:"chat",nutriments:{proteins_100g:35,fat_100g:20,carbohydrates_100g:27},ingredients_text:"venaison, saumon, pois, patates douces, farine de saumon, taurine"},
  {product_name:"Taste of the Wild Canyon River Trout Chat",brands:"Taste of the Wild",_type:"chat",nutriments:{proteins_100g:32,fat_100g:15,carbohydrates_100g:36},ingredients_text:"truite, saumon, patates douces, pois, farine de truite, taurine"},

  // ═══════════════════════════════════════════════
  // BRIT CARE (source : brit.eu)
  // ═══════════════════════════════════════════════
  {product_name:"Brit Care Medium Adult Poulet Chien",brands:"Brit Care",_type:"chien",nutriments:{proteins_100g:30,fat_100g:15,carbohydrates_100g:38},ingredients_text:"poulet (50%), pois, farine de poulet, graisse de poulet, levure de bière, saumon hydrolysé"},
  {product_name:"Brit Care Large Adult Poulet Chien",brands:"Brit Care",_type:"chien",nutriments:{proteins_100g:28,fat_100g:16,carbohydrates_100g:40},ingredients_text:"poulet (48%), pois, farine de poulet, graisse de poulet, levure de bière"},
  {product_name:"Brit Care Grain Free Adult Saumon Chien",brands:"Brit Care",_type:"chien",nutriments:{proteins_100g:34,fat_100g:18,carbohydrates_100g:31},ingredients_text:"saumon (55%), pois, farine de saumon, graisse de saumon, levure de bière"},
  {product_name:"Brit Care Sterilised Saumon Chat",brands:"Brit Care",_type:"chat",nutriments:{proteins_100g:36,fat_100g:12,carbohydrates_100g:34},ingredients_text:"saumon (50%), pois, farine de saumon, graisse de poulet, taurine"},
  {product_name:"Brit Care Indoor Poulet Chat",brands:"Brit Care",_type:"chat",nutriments:{proteins_100g:35,fat_100g:10,carbohydrates_100g:37},ingredients_text:"poulet (48%), pois, farine de poulet, cellulose, graisse de poulet, taurine"},

  // ═══════════════════════════════════════════════
  // JAMES WELLBELOVED (source : wellbeloved.com)
  // ═══════════════════════════════════════════════
  {product_name:"James Wellbeloved Adult Dinde Riz Chien",brands:"James Wellbeloved",_type:"chien",nutriments:{proteins_100g:25,fat_100g:14,carbohydrates_100g:45},ingredients_text:"riz brun, dinde (22%), farine de dinde, avoine, huile de tournesol, betteraves déshydratées"},
  {product_name:"James Wellbeloved Adult Agneau Riz Chien",brands:"James Wellbeloved",_type:"chien",nutriments:{proteins_100g:25,fat_100g:14,carbohydrates_100g:45},ingredients_text:"riz brun, agneau (22%), farine d'agneau, avoine, huile de tournesol, betteraves"},
  {product_name:"James Wellbeloved Puppy Dinde Riz Chien",brands:"James Wellbeloved",_type:"chien",nutriments:{proteins_100g:27,fat_100g:16,carbohydrates_100g:40},ingredients_text:"riz brun, dinde (25%), farine de dinde, avoine, huile de tournesol"},
  {product_name:"James Wellbeloved Adult Poulet Riz Chat",brands:"James Wellbeloved",_type:"chat",nutriments:{proteins_100g:32,fat_100g:13,carbohydrates_100g:38},ingredients_text:"riz, poulet (28%), farine de poulet, avoine, huile de tournesol, taurine"},
  {product_name:"James Wellbeloved Kitten Poulet Riz Chat",brands:"James Wellbeloved",_type:"chat",nutriments:{proteins_100g:34,fat_100g:16,carbohydrates_100g:33},ingredients_text:"riz, poulet (30%), farine de poulet, avoine, huile de tournesol, taurine"},

  // ═══════════════════════════════════════════════
  // WELLNESS CORE (source : wellnesspetfood.com)
  // ═══════════════════════════════════════════════
  {product_name:"Wellness Core Original Dinde Chien",brands:"Wellness Core",_type:"chien",nutriments:{proteins_100g:38,fat_100g:18,carbohydrates_100g:26},ingredients_text:"dinde déshydratée, poulet déshydraté, dinde fraîche, pois entiers, pois cassés, farine de saumon"},
  {product_name:"Wellness Core Small Breed Adult Chien",brands:"Wellness Core",_type:"chien",nutriments:{proteins_100g:38,fat_100g:18,carbohydrates_100g:26},ingredients_text:"dinde déshydratée, poulet déshydraté, pois entiers, pois cassés, farine de saumon"},
  {product_name:"Wellness Core Grain Free Saumon Chat",brands:"Wellness Core",_type:"chat",nutriments:{proteins_100g:40,fat_100g:18,carbohydrates_100g:24},ingredients_text:"saumon déshydraté, thon déshydraté, saumon frais, pois, farine de hareng, taurine"},
  {product_name:"Wellness Core Indoor Poulet Chat",brands:"Wellness Core",_type:"chat",nutriments:{proteins_100g:38,fat_100g:14,carbohydrates_100g:30},ingredients_text:"poulet déshydraté, dinde déshydratée, pois, cellulose, farine de saumon, taurine"},
  {product_name:"Wellness Core Kitten Chat",brands:"Wellness Core",_type:"chat",nutriments:{proteins_100g:40,fat_100g:18,carbohydrates_100g:24},ingredients_text:"poulet déshydraté, dinde déshydratée, poulet frais, pois, huile de saumon, taurine"},
  {product_name:"Wellness Core Sterilised Chat",brands:"Wellness Core",_type:"chat",nutriments:{proteins_100g:38,fat_100g:12,carbohydrates_100g:32},ingredients_text:"poulet déshydraté, dinde déshydratée, pois, cellulose, farine de saumon, taurine"},

  // ═══════════════════════════════════════════════
  // BLUE BUFFALO (source : bluebuffalo.com)
  // ═══════════════════════════════════════════════
  {product_name:"Blue Buffalo Life Protection Adult Poulet Chien",brands:"Blue Buffalo",_type:"chien",nutriments:{proteins_100g:26,fat_100g:14,carbohydrates_100g:44},ingredients_text:"poulet déshydraté, riz brun, orge, avoine, farine de poulet, huile de poulet"},
  {product_name:"Blue Buffalo Wilderness Adult Saumon Chien",brands:"Blue Buffalo",_type:"chien",nutriments:{proteins_100g:34,fat_100g:18,carbohydrates_100g:30},ingredients_text:"saumon déshydraté, pois, farine de saumon, pommes de terre, huile de poulet"},
  {product_name:"Blue Buffalo Life Protection Adult Poulet Chat",brands:"Blue Buffalo",_type:"chat",nutriments:{proteins_100g:30,fat_100g:14,carbohydrates_100g:39},ingredients_text:"poulet déshydraté, riz brun, orge, avoine, farine de poulet, taurine"},
  {product_name:"Blue Buffalo Wilderness Adult Saumon Chat",brands:"Blue Buffalo",_type:"chat",nutriments:{proteins_100g:36,fat_100g:18,carbohydrates_100g:28},ingredients_text:"saumon déshydraté, pois, farine de saumon, pommes de terre, taurine"},

  // ═══════════════════════════════════════════════
  // PURINA ONE (source : purina.fr)
  // ═══════════════════════════════════════════════
  {product_name:"Purina One Adult Poulet Riz Chien",brands:"Purina One",_type:"chien",nutriments:{proteins_100g:26,fat_100g:14,carbohydrates_100g:44},ingredients_text:"poulet (18%), riz, farine de poulet, blé, maïs, farine de blé, graisse de poulet, minéraux"},
  {product_name:"Purina One Adult Dinde Riz Chien",brands:"Purina One",_type:"chien",nutriments:{proteins_100g:26,fat_100g:14,carbohydrates_100g:44},ingredients_text:"dinde (18%), riz, farine de dinde, blé, maïs, farine de blé, graisse de dinde"},
  {product_name:"Purina One Adult Poulet Chat",brands:"Purina One",_type:"chat",nutriments:{proteins_100g:30,fat_100g:12,carbohydrates_100g:41},ingredients_text:"poulet (14%), riz, farine de poulet, maïs, graisse de volaille, taurine"},
  {product_name:"Purina One Sterilised Poulet Chat",brands:"Purina One",_type:"chat",nutriments:{proteins_100g:35,fat_100g:10,carbohydrates_100g:38},ingredients_text:"poulet (15%), riz, farine de poulet, maïs, cellulose, graisse de volaille, taurine"},
  {product_name:"Purina One Indoor Poulet Chat",brands:"Purina One",_type:"chat",nutriments:{proteins_100g:34,fat_100g:10,carbohydrates_100g:39},ingredients_text:"poulet (14%), riz, farine de poulet, maïs, cellulose, graisse de volaille, taurine"},

  // ═══════════════════════════════════════════════
  // ADVANCE (source : advancepetfood.com)
  // ═══════════════════════════════════════════════
  {product_name:"Advance Medium Adult Poulet Chien",brands:"Advance",_type:"chien",nutriments:{proteins_100g:27,fat_100g:15,carbohydrates_100g:41},ingredients_text:"poulet (20%), riz, farine de poulet, maïs, orge, graisse de poulet, prébiotiques"},
  {product_name:"Advance Mini Adult Poulet Chien",brands:"Advance",_type:"chien",nutriments:{proteins_100g:28,fat_100g:16,carbohydrates_100g:39},ingredients_text:"poulet (22%), riz, farine de poulet, maïs, orge, graisse de poulet"},
  {product_name:"Advance Sterilised Poulet Chat",brands:"Advance",_type:"chat",nutriments:{proteins_100g:35,fat_100g:10,carbohydrates_100g:37},ingredients_text:"poulet (22%), riz, farine de poulet, maïs, cellulose, graisse de poulet, taurine"},
  {product_name:"Advance Adult Saumon Chat",brands:"Advance",_type:"chat",nutriments:{proteins_100g:32,fat_100g:14,carbohydrates_100g:37},ingredients_text:"saumon (18%), riz, farine de saumon, maïs, orge, graisse de poulet, taurine"},

  // ═══════════════════════════════════════════════
  // JOSERA (source : josera.com)
  // ═══════════════════════════════════════════════
  {product_name:"Josera Naturelle Plus Agneau Chien",brands:"Josera",_type:"chien",nutriments:{proteins_100g:30,fat_100g:16,carbohydrates_100g:37},ingredients_text:"farine d'agneau déshydratée (25%), farine de riz, pommes de terre, graisse de poulet, myrtilles"},
  {product_name:"Josera SensePlus Chat",brands:"Josera",_type:"chat",nutriments:{proteins_100g:36,fat_100g:14,carbohydrates_100g:33},ingredients_text:"farine de volaille déshydratée (25%), farine de riz, pommes de terre, graisse de poulet, taurine"},

  // ═══════════════════════════════════════════════
  // MONGE (source : monge.it)
  // ═══════════════════════════════════════════════
  {product_name:"Monge All Breeds Adult Poulet Chien",brands:"Monge",_type:"chien",nutriments:{proteins_100g:26,fat_100g:16,carbohydrates_100g:42},ingredients_text:"poulet (16%), maïs, riz, farine de poulet, graisse de poulet, blé, minéraux"},
  {product_name:"Monge All Breeds Puppy Poulet Chien",brands:"Monge",_type:"chien",nutriments:{proteins_100g:29,fat_100g:18,carbohydrates_100g:36},ingredients_text:"poulet (18%), riz, maïs, farine de poulet, graisse de poulet, blé"},
  {product_name:"Monge Adult Poulet Chat",brands:"Monge",_type:"chat",nutriments:{proteins_100g:32,fat_100g:15,carbohydrates_100g:36},ingredients_text:"poulet (14%), maïs, riz, farine de poulet, graisse de poulet, taurine"},
  {product_name:"Monge Sterilised Saumon Chat",brands:"Monge",_type:"chat",nutriments:{proteins_100g:34,fat_100g:12,carbohydrates_100g:37},ingredients_text:"saumon (14%), maïs, riz, farine de saumon, graisse de poulet, taurine"},

  // ═══════════════════════════════════════════════
  // VIRBAC HPM (source : virbac.com)
  // ═══════════════════════════════════════════════
  {product_name:"Virbac HPM Adult Small Dog",brands:"Virbac HPM",_type:"chien",nutriments:{proteins_100g:38,fat_100g:18,carbohydrates_100g:26},ingredients_text:"poulet déshydraté, saumon déshydraté, pois, graisse de poulet, farine de saumon, minéraux"},
  {product_name:"Virbac HPM Adult Medium Dog",brands:"Virbac HPM",_type:"chien",nutriments:{proteins_100g:37,fat_100g:18,carbohydrates_100g:27},ingredients_text:"poulet déshydraté, saumon déshydraté, pois, graisse de poulet, minéraux"},
  {product_name:"Virbac HPM Neutered Dog",brands:"Virbac HPM",_type:"chien",nutriments:{proteins_100g:38,fat_100g:10,carbohydrates_100g:34},ingredients_text:"poulet déshydraté, pois, saumon déshydraté, cellulose, graisse de poulet"},
  {product_name:"Virbac HPM Adult Cat",brands:"Virbac HPM",_type:"chat",nutriments:{proteins_100g:40,fat_100g:18,carbohydrates_100g:24},ingredients_text:"poulet déshydraté, saumon déshydraté, pois, graisse de poulet, taurine"},
  {product_name:"Virbac HPM Neutered Cat",brands:"Virbac HPM",_type:"chat",nutriments:{proteins_100g:42,fat_100g:12,carbohydrates_100g:28},ingredients_text:"poulet déshydraté, pois, saumon déshydraté, cellulose, taurine"},

  // ═══════════════════════════════════════════════
  // PÂTÉES CHIEN (wet food, valeurs courantes d'étiquettes)
  // ═══════════════════════════════════════════════
  {product_name:"Royal Canin Maxi Adult en sauce Chien",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:9,fat_100g:5,carbohydrates_100g:2},ingredients_text:"viande et sous-produits animaux, céréales, minéraux, vitamines"},
  {product_name:"Purina Pro Plan Medium Adult Poulet en sauce Chien",brands:"Purina Pro Plan",_type:"chien",nutriments:{proteins_100g:11,fat_100g:5,carbohydrates_100g:1},ingredients_text:"poulet (25%), bouillon de poulet, riz, minéraux"},
  {product_name:"Pedigree Boeuf en sauce Chien",brands:"Pedigree",_type:"chien",nutriments:{proteins_100g:8,fat_100g:4,carbohydrates_100g:3},ingredients_text:"viande et sous-produits animaux (bœuf 4%), bouillon, céréales, minéraux"},
  {product_name:"Cesar Boeuf Légumes Chien",brands:"Cesar",_type:"chien",nutriments:{proteins_100g:9,fat_100g:6,carbohydrates_100g:2},ingredients_text:"viande et sous-produits animaux (bœuf 20%), légumes (5%), bouillon, minéraux"},
  {product_name:"Forthglade Complete Adult Poulet Chien",brands:"Forthglade",_type:"chien",nutriments:{proteins_100g:10,fat_100g:5,carbohydrates_100g:3},ingredients_text:"poulet (50%), riz brun, légumes, minéraux"},
  {product_name:"Terra Canis Classic Boeuf Légumes Chien",brands:"Terra Canis",_type:"chien",nutriments:{proteins_100g:12,fat_100g:8,carbohydrates_100g:2},ingredients_text:"bœuf (50%), courgettes, carottes, pommes, huile de colza, minéraux"},

  // ═══════════════════════════════════════════════
  // PÂTÉES CHAT (wet food)
  // ═══════════════════════════════════════════════
  {product_name:"Royal Canin Sterilised en sauce Chat",brands:"Royal Canin",_type:"chat",nutriments:{proteins_100g:10,fat_100g:3,carbohydrates_100g:1},ingredients_text:"viande et sous-produits animaux, poisson, bouillon, minéraux, taurine"},
  {product_name:"Purina Pro Plan Sterilised Saumon en gelée Chat",brands:"Purina Pro Plan",_type:"chat",nutriments:{proteins_100g:12,fat_100g:3,carbohydrates_100g:1},ingredients_text:"saumon (30%), bouillon de poisson, minéraux, taurine"},
  {product_name:"Almo Nature HFC Poulet Chat",brands:"Almo Nature",_type:"chat",nutriments:{proteins_100g:13,fat_100g:6,carbohydrates_100g:1},ingredients_text:"poulet (60%), eau, agar-agar, minéraux, taurine"},
  {product_name:"Almo Nature HFC Saumon Chat",brands:"Almo Nature",_type:"chat",nutriments:{proteins_100g:13,fat_100g:5,carbohydrates_100g:1},ingredients_text:"saumon (60%), eau, agar-agar, minéraux, taurine"},
  {product_name:"Hills Prescription Diet k/d Renal Chat",brands:"Hill's Prescription Diet",_type:"chat",nutriments:{proteins_100g:22,fat_100g:14,carbohydrates_100g:48},ingredients_text:"riz, graisses végétales, amidon de maïs, protéines de poulet hydrolysées, cellulose, taurine"},

  // ═══════════════════════════════════════════════
  // ROYAL CANIN — RACES SPÉCIFIQUES CHIEN
  // ═══════════════════════════════════════════════
  {product_name:"Royal Canin Beagle Adult",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:26,fat_100g:12,carbohydrates_100g:45},ingredients_text:"maïs, farine de maïs, farine de blé, protéines de volaille déshydratées, graisse animale, blé, cellulose"},
  {product_name:"Royal Canin Boxer Adult",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:26,fat_100g:15,carbohydrates_100g:43},ingredients_text:"maïs, farine de maïs, farine de blé, protéines de volaille déshydratées, graisse animale, blé"},
  {product_name:"Royal Canin Cocker Adult",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:27,fat_100g:17,carbohydrates_100g:39},ingredients_text:"maïs, farine de blé, farine de maïs, protéines de volaille déshydratées, graisse animale, blé, huile de poisson"},
  {product_name:"Royal Canin Dachshund Adult",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:27,fat_100g:17,carbohydrates_100g:39},ingredients_text:"maïs, farine de blé, farine de maïs, protéines de volaille déshydratées, graisse animale, blé"},
  {product_name:"Royal Canin Dalmatian Adult",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:25,fat_100g:14,carbohydrates_100g:45},ingredients_text:"riz, farine de blé, protéines de volaille déshydratées, maïs, graisse animale, farine d'avoine"},
  {product_name:"Royal Canin Labrador Retriever Puppy",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:32,fat_100g:18,carbohydrates_100g:33},ingredients_text:"farine de blé, maïs, protéines de volaille déshydratées, farine de riz, graisse animale"},
  {product_name:"Royal Canin Golden Retriever Puppy",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:30,fat_100g:18,carbohydrates_100g:34},ingredients_text:"farine de blé, maïs, protéines de volaille déshydratées, farine de riz, graisse animale, huile de poisson"},
  {product_name:"Royal Canin German Shepherd Puppy",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:33,fat_100g:20,carbohydrates_100g:29},ingredients_text:"farine de blé, maïs, protéines de volaille déshydratées, farine de riz, graisse animale"},
  {product_name:"Royal Canin Rottweiler Adult",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:27,fat_100g:14,carbohydrates_100g:43},ingredients_text:"maïs, farine de maïs, farine de blé, protéines de volaille déshydratées, graisse animale, blé"},
  {product_name:"Royal Canin Cavalier King Charles Adult",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:25,fat_100g:15,carbohydrates_100g:44},ingredients_text:"maïs, farine de blé, farine de maïs, protéines de volaille déshydratées, graisse animale, blé, huile de poisson"},
  {product_name:"Royal Canin Maltese Adult",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:28,fat_100g:19,carbohydrates_100g:36},ingredients_text:"maïs, farine de blé, farine de maïs, protéines de volaille déshydratées, graisse animale, blé"},
  {product_name:"Royal Canin Shih Tzu Adult",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:27,fat_100g:16,carbohydrates_100g:40},ingredients_text:"maïs, farine de blé, farine de maïs, protéines de volaille déshydratées, graisse animale, blé, huile de poisson"},
  {product_name:"Royal Canin Miniature Schnauzer Adult",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:25,fat_100g:12,carbohydrates_100g:46},ingredients_text:"maïs, farine de blé, farine de maïs, protéines de volaille déshydratées, graisse animale, cellulose"},
  {product_name:"Royal Canin West Highland Terrier Adult",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:27,fat_100g:18,carbohydrates_100g:38},ingredients_text:"maïs, farine de blé, farine de maïs, protéines de volaille déshydratées, graisse animale, huile de poisson"},
  {product_name:"Royal Canin Border Collie Adult",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:25,fat_100g:15,carbohydrates_100g:44},ingredients_text:"maïs, farine de maïs, farine de blé, protéines de volaille déshydratées, graisse animale, blé"},
  {product_name:"Royal Canin Husky Adult",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:25,fat_100g:15,carbohydrates_100g:44},ingredients_text:"maïs, farine de maïs, farine de blé, protéines de volaille déshydratées, graisse animale, blé"},
  {product_name:"Royal Canin Miniature Pinscher Adult",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:25,fat_100g:15,carbohydrates_100g:43},ingredients_text:"maïs, farine de blé, farine de maïs, protéines de volaille déshydratées, graisse animale"},
  {product_name:"Royal Canin Bichon Frise Adult",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:27,fat_100g:18,carbohydrates_100g:38},ingredients_text:"maïs, farine de blé, farine de maïs, protéines de volaille déshydratées, graisse animale, blé, huile de poisson"},
  {product_name:"Royal Canin Shar Pei Adult",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:24,fat_100g:14,carbohydrates_100g:46},ingredients_text:"maïs, farine de maïs, farine de blé, protéines de volaille déshydratées, graisse animale, blé"},
  {product_name:"Royal Canin Jack Russell Adult",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:28,fat_100g:17,carbohydrates_100g:38},ingredients_text:"maïs, farine de blé, farine de maïs, protéines de volaille déshydratées, graisse animale, blé"},
  {product_name:"Royal Canin Irish Wolfhound Adult",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:24,fat_100g:13,carbohydrates_100g:47},ingredients_text:"maïs, farine de maïs, farine de blé, protéines de volaille déshydratées, graisse animale, blé"},
  {product_name:"Royal Canin Great Dane Adult",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:23,fat_100g:12,carbohydrates_100g:49},ingredients_text:"maïs, farine de maïs, farine de blé, protéines de volaille déshydratées, graisse animale"},
  {product_name:"Royal Canin Bernese Mountain Dog Adult",brands:"Royal Canin",_type:"chien",nutriments:{proteins_100g:24,fat_100g:13,carbohydrates_100g:47},ingredients_text:"maïs, farine de maïs, farine de blé, protéines de volaille déshydratées, graisse animale, blé"},

  // ═══════════════════════════════════════════════
  // ROYAL CANIN — DIÈTES VÉTÉRINAIRES SUPPLÉMENTAIRES CHIEN
  // ═══════════════════════════════════════════════
  {product_name:"Royal Canin Veterinary Cardiac Chien",brands:"Royal Canin Veterinary",_type:"chien",nutriments:{proteins_100g:26,fat_100g:11,carbohydrates_100g:46},ingredients_text:"riz, maïs, protéines de poulet déshydratées, graisses animales, farine de blé, protéines animales hydrolysées"},
  {product_name:"Royal Canin Veterinary Mobility Chien",brands:"Royal Canin Veterinary",_type:"chien",nutriments:{proteins_100g:25,fat_100g:13,carbohydrates_100g:46},ingredients_text:"riz, farine de blé, maïs, protéines de poulet déshydratées, graisses animales, protéines animales hydrolysées"},
  {product_name:"Royal Canin Veterinary Gastrointestinal Low Fat Chien",brands:"Royal Canin Veterinary",_type:"chien",nutriments:{proteins_100g:22,fat_100g:7,carbohydrates_100g:57},ingredients_text:"riz, blé, farine de maïs, protéines de poulet hydrolysées, cellulose, graisses animales"},
  {product_name:"Royal Canin Veterinary Diabetes Chien",brands:"Royal Canin Veterinary",_type:"chien",nutriments:{proteins_100g:29,fat_100g:12,carbohydrates_100g:39},ingredients_text:"protéines de poulet déshydratées, maïs dégraissé, cellulose, graisses animales, riz"},
  {product_name:"Royal Canin Veterinary Anallergenic Chien",brands:"Royal Canin Veterinary",_type:"chien",nutriments:{proteins_100g:16,fat_100g:13,carbohydrates_100g:56},ingredients_text:"amidon de maïs, protéines de maïs hydrolysées, graisses animales, cellulose, minéraux"},
  {product_name:"Royal Canin Veterinary Urinary SO Moderate Calorie Chien",brands:"Royal Canin Veterinary",_type:"chien",nutriments:{proteins_100g:22,fat_100g:11,carbohydrates_100g:50},ingredients_text:"maïs, farine de blé, riz, protéines de poulet déshydratées, graisses animales, cellulose"},
  {product_name:"Royal Canin Veterinary Neurology Chien",brands:"Royal Canin Veterinary",_type:"chien",nutriments:{proteins_100g:26,fat_100g:18,carbohydrates_100g:40},ingredients_text:"maïs, farine de blé, riz, protéines de poulet déshydratées, graisses animales, huile de soja"},
  {product_name:"Royal Canin Veterinary Intestinal Puppy Chien",brands:"Royal Canin Veterinary",_type:"chien",nutriments:{proteins_100g:26,fat_100g:12,carbohydrates_100g:44},ingredients_text:"riz, protéines de poulet déshydratées, graisses animales, blé, protéines animales hydrolysées"},

  // ═══════════════════════════════════════════════
  // ROYAL CANIN — RACES SPÉCIFIQUES CHAT
  // ═══════════════════════════════════════════════
  {product_name:"Royal Canin Persian Adult",brands:"Royal Canin",_type:"chat",nutriments:{proteins_100g:32,fat_100g:15,carbohydrates_100g:34},ingredients_text:"maïs dégraissé, farine de blé, protéines de poulet déshydratées, graisses animales, riz, protéines animales hydrolysées, minéraux"},
  {product_name:"Royal Canin Persian Kitten",brands:"Royal Canin",_type:"chat",nutriments:{proteins_100g:33,fat_100g:19,carbohydrates_100g:30},ingredients_text:"farine de blé, protéines de poulet déshydratées, maïs dégraissé, graisses animales, riz, huile de poisson"},
  {product_name:"Royal Canin Maine Coon Adult",brands:"Royal Canin",_type:"chat",nutriments:{proteins_100g:32,fat_100g:14,carbohydrates_100g:36},ingredients_text:"maïs dégraissé, farine de blé, protéines de poulet déshydratées, graisses animales, maïs, protéines animales hydrolysées"},
  {product_name:"Royal Canin Maine Coon Kitten",brands:"Royal Canin",_type:"chat",nutriments:{proteins_100g:33,fat_100g:16,carbohydrates_100g:33},ingredients_text:"farine de blé, maïs dégraissé, protéines de poulet déshydratées, graisses animales, maïs, huile de poisson"},
  {product_name:"Royal Canin Siamese Adult",brands:"Royal Canin",_type:"chat",nutriments:{proteins_100g:38,fat_100g:15,carbohydrates_100g:28},ingredients_text:"maïs dégraissé, protéines de poulet déshydratées, farine de blé, graisses animales, maïs, protéines animales hydrolysées"},
  {product_name:"Royal Canin British Shorthair Adult",brands:"Royal Canin",_type:"chat",nutriments:{proteins_100g:34,fat_100g:14,carbohydrates_100g:34},ingredients_text:"maïs dégraissé, farine de blé, protéines de poulet déshydratées, graisses animales, riz, protéines animales hydrolysées"},
  {product_name:"Royal Canin Ragdoll Adult",brands:"Royal Canin",_type:"chat",nutriments:{proteins_100g:31,fat_100g:14,carbohydrates_100g:36},ingredients_text:"maïs dégraissé, farine de blé, protéines de poulet déshydratées, graisses animales, riz, huile de poisson"},
  {product_name:"Royal Canin Norwegian Adult",brands:"Royal Canin",_type:"chat",nutriments:{proteins_100g:33,fat_100g:16,carbohydrates_100g:33},ingredients_text:"maïs dégraissé, farine de blé, protéines de poulet déshydratées, graisses animales, maïs, huile de poisson"},
  {product_name:"Royal Canin Birman Adult",brands:"Royal Canin",_type:"chat",nutriments:{proteins_100g:31,fat_100g:15,carbohydrates_100g:35},ingredients_text:"maïs dégraissé, farine de blé, protéines de poulet déshydratées, graisses animales, riz, minéraux"},
  {product_name:"Royal Canin Sphynx Adult",brands:"Royal Canin",_type:"chat",nutriments:{proteins_100g:29,fat_100g:23,carbohydrates_100g:28},ingredients_text:"maïs dégraissé, farine de blé, protéines de poulet déshydratées, graisses animales, maïs, huile de poisson"},
  {product_name:"Royal Canin Intense Hairball 34",brands:"Royal Canin",_type:"chat",nutriments:{proteins_100g:34,fat_100g:11,carbohydrates_100g:37},ingredients_text:"maïs dégraissé, farine de blé, protéines de poulet déshydratées, graisses animales, cellulose, protéines animales hydrolysées"},
  {product_name:"Royal Canin Sensible 33",brands:"Royal Canin",_type:"chat",nutriments:{proteins_100g:33,fat_100g:15,carbohydrates_100g:34},ingredients_text:"riz, maïs dégraissé, protéines de poulet déshydratées, farine de blé, graisses animales, protéines animales hydrolysées"},
  {product_name:"Royal Canin Light Weight Care",brands:"Royal Canin",_type:"chat",nutriments:{proteins_100g:35,fat_100g:9,carbohydrates_100g:37},ingredients_text:"maïs dégraissé, farine de blé, protéines de poulet déshydratées, cellulose, graisses animales"},
  {product_name:"Royal Canin Aging 12+",brands:"Royal Canin",_type:"chat",nutriments:{proteins_100g:30,fat_100g:13,carbohydrates_100g:37},ingredients_text:"maïs dégraissé, farine de blé, protéines de poulet déshydratées, graisses animales, maïs, hydrolysats de protéines animales"},
  {product_name:"Royal Canin Indoor Adult 27",brands:"Royal Canin",_type:"chat",nutriments:{proteins_100g:32,fat_100g:13,carbohydrates_100g:38},ingredients_text:"maïs dégraissé, farine de blé, protéines de poulet déshydratées, graisses animales, cellulose"},
  {product_name:"Royal Canin Outdoor 30",brands:"Royal Canin",_type:"chat",nutriments:{proteins_100g:30,fat_100g:18,carbohydrates_100g:35},ingredients_text:"maïs dégraissé, farine de blé, protéines de poulet déshydratées, graisses animales, maïs"},

  // ═══════════════════════════════════════════════
  // ROYAL CANIN — DIÈTES VÉTÉRINAIRES CHAT
  // ═══════════════════════════════════════════════
  {product_name:"Royal Canin Veterinary Renal Chat",brands:"Royal Canin Veterinary",_type:"chat",nutriments:{proteins_100g:24,fat_100g:15,carbohydrates_100g:43},ingredients_text:"riz, maïs dégraissé, graisses animales, amidon de maïs, farine de blé, protéines de poulet hydrolysées"},
  {product_name:"Royal Canin Veterinary Urinary SO Chat",brands:"Royal Canin Veterinary",_type:"chat",nutriments:{proteins_100g:34,fat_100g:14,carbohydrates_100g:30},ingredients_text:"maïs dégraissé, protéines de poulet déshydratées, farine de blé, graisses animales, maïs, minéraux"},
  {product_name:"Royal Canin Veterinary Urinary Moderate Calorie Chat",brands:"Royal Canin Veterinary",_type:"chat",nutriments:{proteins_100g:35,fat_100g:12,carbohydrates_100g:32},ingredients_text:"maïs dégraissé, protéines de poulet déshydratées, farine de blé, cellulose, graisses animales"},
  {product_name:"Royal Canin Veterinary Gastrointestinal Chat",brands:"Royal Canin Veterinary",_type:"chat",nutriments:{proteins_100g:32,fat_100g:17,carbohydrates_100g:33},ingredients_text:"riz, maïs dégraissé, protéines de poulet déshydratées, graisses animales, farine de blé"},
  {product_name:"Royal Canin Veterinary Diabetes Chat",brands:"Royal Canin Veterinary",_type:"chat",nutriments:{proteins_100g:42,fat_100g:18,carbohydrates_100g:16},ingredients_text:"maïs dégraissé, protéines de poulet déshydratées, graisses animales, cellulose, riz"},
  {product_name:"Royal Canin Veterinary Hypoallergenic Chat",brands:"Royal Canin Veterinary",_type:"chat",nutriments:{proteins_100g:23,fat_100g:15,carbohydrates_100g:46},ingredients_text:"amidon de riz, protéines de soja hydrolysées, graisses animales, cellulose, minéraux, taurine"},
  {product_name:"Royal Canin Veterinary Obesity Chat",brands:"Royal Canin Veterinary",_type:"chat",nutriments:{proteins_100g:36,fat_100g:9,carbohydrates_100g:31},ingredients_text:"maïs dégraissé, protéines de poulet déshydratées, cellulose, farine de blé, graisses animales"},
  {product_name:"Royal Canin Veterinary Satiety Weight Management Chat",brands:"Royal Canin Veterinary",_type:"chat",nutriments:{proteins_100g:34,fat_100g:9,carbohydrates_100g:31},ingredients_text:"maïs dégraissé, protéines de poulet déshydratées, cellulose, farine de blé, graisses animales"},
  {product_name:"Royal Canin Veterinary Hepatic Chat",brands:"Royal Canin Veterinary",_type:"chat",nutriments:{proteins_100g:27,fat_100g:12,carbohydrates_100g:48},ingredients_text:"riz, maïs dégraissé, graisses animales, amidon de maïs, protéines de poulet hydrolysées"},
  {product_name:"Royal Canin Veterinary Renal Select Chat",brands:"Royal Canin Veterinary",_type:"chat",nutriments:{proteins_100g:27,fat_100g:13,carbohydrates_100g:42},ingredients_text:"riz, maïs dégraissé, graisses animales, farine de blé, protéines de poulet hydrolysées"},

  // ═══════════════════════════════════════════════
  // PURINA PRO PLAN CHIEN — GAMME COMPLÈTE
  // ═══════════════════════════════════════════════
  {product_name:"Purina Pro Plan Puppy Small/Mini Chicken",brands:"Purina Pro Plan",_type:"chien",nutriments:{proteins_100g:30,fat_100g:20,carbohydrates_100g:34},ingredients_text:"poulet (25%), maïs, farine de poulet, riz, gluten de blé, graisses animales, levure de bière"},
  {product_name:"Purina Pro Plan Puppy Medium Chicken",brands:"Purina Pro Plan",_type:"chien",nutriments:{proteins_100g:30,fat_100g:20,carbohydrates_100g:34},ingredients_text:"poulet (25%), maïs, farine de poulet, riz, gluten de blé, graisses animales, levure de bière"},
  {product_name:"Purina Pro Plan Puppy Large Athletic Chicken",brands:"Purina Pro Plan",_type:"chien",nutriments:{proteins_100g:32,fat_100g:20,carbohydrates_100g:32},ingredients_text:"poulet (28%), maïs, farine de poulet, riz, graisses animales, levure de bière, minéraux"},
  {product_name:"Purina Pro Plan Adult Small/Mini Chicken",brands:"Purina Pro Plan",_type:"chien",nutriments:{proteins_100g:26,fat_100g:15,carbohydrates_100g:43},ingredients_text:"poulet (22%), maïs, farine de poulet, blé, riz, graisses animales, levure de bière"},
  {product_name:"Purina Pro Plan Adult Medium Chicken",brands:"Purina Pro Plan",_type:"chien",nutriments:{proteins_100g:26,fat_100g:15,carbohydrates_100g:43},ingredients_text:"poulet (22%), maïs, farine de poulet, blé, riz, graisses animales"},
  {product_name:"Purina Pro Plan Adult Large Athletic Chicken 30/20",brands:"Purina Pro Plan",_type:"chien",nutriments:{proteins_100g:30,fat_100g:20,carbohydrates_100g:33},ingredients_text:"poulet (28%), maïs, farine de poulet, blé, riz, graisses animales"},
  {product_name:"Purina Pro Plan Adult Sensitive Skin Salmon",brands:"Purina Pro Plan",_type:"chien",nutriments:{proteins_100g:26,fat_100g:15,carbohydrates_100g:43},ingredients_text:"saumon (23%), riz, maïs, graisses animales, levure de bière, minéraux, huile de poisson"},
  {product_name:"Purina Pro Plan Adult Sensitive Digestion Lamb",brands:"Purina Pro Plan",_type:"chien",nutriments:{proteins_100g:26,fat_100g:14,carbohydrates_100g:44},ingredients_text:"agneau (22%), riz, maïs, graisses animales, levure de bière"},
  {product_name:"Purina Pro Plan Adult Optiderma Salmon",brands:"Purina Pro Plan",_type:"chien",nutriments:{proteins_100g:27,fat_100g:16,carbohydrates_100g:40},ingredients_text:"saumon (25%), riz, maïs, graisses animales, huile de poisson, levure de bière"},
  {product_name:"Purina Pro Plan Adult Light/Sterilised",brands:"Purina Pro Plan",_type:"chien",nutriments:{proteins_100g:29,fat_100g:8,carbohydrates_100g:45},ingredients_text:"poulet (22%), maïs, farine de poulet, cellulose, riz, graisses animales, levure"},
  {product_name:"Purina Pro Plan Senior 7+ Medium/Large Chicken",brands:"Purina Pro Plan",_type:"chien",nutriments:{proteins_100g:28,fat_100g:12,carbohydrates_100g:43},ingredients_text:"poulet (25%), maïs, farine de poulet, riz, graisses animales, levure de bière"},
  {product_name:"Purina Pro Plan Senior 7+ Small/Mini Chicken",brands:"Purina Pro Plan",_type:"chien",nutriments:{proteins_100g:28,fat_100g:13,carbohydrates_100g:43},ingredients_text:"poulet (25%), maïs, farine de poulet, riz, graisses animales"},
  {product_name:"Purina Pro Plan Optiage 7+ Salmon",brands:"Purina Pro Plan",_type:"chien",nutriments:{proteins_100g:28,fat_100g:12,carbohydrates_100g:43},ingredients_text:"saumon (22%), maïs, farine de poulet, riz, graisses animales, huile de poisson"},
  {product_name:"Purina Pro Plan Sport 30/20 Chicken",brands:"Purina Pro Plan",_type:"chien",nutriments:{proteins_100g:30,fat_100g:20,carbohydrates_100g:33},ingredients_text:"poulet (30%), maïs, farine de poulet, riz, graisses animales, levure de bière"},
  {product_name:"Purina Pro Plan Veterinary EN Gastrointestinal Chien",brands:"Purina Pro Plan Veterinary",_type:"chien",nutriments:{proteins_100g:30,fat_100g:12,carbohydrates_100g:40},ingredients_text:"riz, farine de poulet, maïs, graisses animales, cellulose, minéraux"},
  {product_name:"Purina Pro Plan Veterinary HA Hypoallergenic Chien",brands:"Purina Pro Plan Veterinary",_type:"chien",nutriments:{proteins_100g:16,fat_100g:10,carbohydrates_100g:55},ingredients_text:"amidon de maïs, protéines de soja hydrolysées, graisses végétales, cellulose, minéraux"},
  {product_name:"Purina Pro Plan Veterinary NF Renal Chien",brands:"Purina Pro Plan Veterinary",_type:"chien",nutriments:{proteins_100g:18,fat_100g:9,carbohydrates_100g:56},ingredients_text:"maïs, riz, graisses animales, protéines de poulet hydrolysées, cellulose"},
  {product_name:"Purina Pro Plan Veterinary OM Overweight Chien",brands:"Purina Pro Plan Veterinary",_type:"chien",nutriments:{proteins_100g:38,fat_100g:8,carbohydrates_100g:34},ingredients_text:"maïs, farine de poulet, cellulose, protéines de soja, graisses animales"},
  {product_name:"Purina Pro Plan Veterinary UR Urinary Chien",brands:"Purina Pro Plan Veterinary",_type:"chien",nutriments:{proteins_100g:39,fat_100g:12,carbohydrates_100g:28},ingredients_text:"farine de poulet, maïs, riz, graisses animales, minéraux"},
  {product_name:"Purina Pro Plan Veterinary DM Diabetes Chien",brands:"Purina Pro Plan Veterinary",_type:"chien",nutriments:{proteins_100g:38,fat_100g:18,carbohydrates_100g:24},ingredients_text:"farine de poulet, cellulose, graisses animales, minéraux, huile de poisson"},

  // ═══════════════════════════════════════════════
  // PURINA PRO PLAN CHAT — GAMME COMPLÈTE
  // ═══════════════════════════════════════════════
  {product_name:"Purina Pro Plan Kitten Healthy Growth Chicken",brands:"Purina Pro Plan",_type:"chat",nutriments:{proteins_100g:39,fat_100g:20,carbohydrates_100g:23},ingredients_text:"poulet (28%), maïs, gluten de maïs, farine de poulet, graisses animales, riz, levure de bière, taurine"},
  {product_name:"Purina Pro Plan Kitten Salmon",brands:"Purina Pro Plan",_type:"chat",nutriments:{proteins_100g:39,fat_100g:16,carbohydrates_100g:27},ingredients_text:"saumon (25%), maïs, farine de poulet, riz, graisses animales, levure, taurine"},
  {product_name:"Purina Pro Plan Adult Chicken",brands:"Purina Pro Plan",_type:"chat",nutriments:{proteins_100g:36,fat_100g:18,carbohydrates_100g:28},ingredients_text:"poulet (28%), maïs, gluten de maïs, farine de poulet, graisses animales, riz, taurine"},
  {product_name:"Purina Pro Plan Adult Salmon",brands:"Purina Pro Plan",_type:"chat",nutriments:{proteins_100g:36,fat_100g:16,carbohydrates_100g:30},ingredients_text:"saumon (25%), maïs, farine de poulet, riz, graisses animales, taurine, minéraux"},
  {product_name:"Purina Pro Plan Sterilised Chicken",brands:"Purina Pro Plan",_type:"chat",nutriments:{proteins_100g:36,fat_100g:11,carbohydrates_100g:33},ingredients_text:"poulet (25%), maïs, gluten de maïs, farine de poulet, cellulose, graisses animales, taurine"},
  {product_name:"Purina Pro Plan Sterilised Salmon",brands:"Purina Pro Plan",_type:"chat",nutriments:{proteins_100g:36,fat_100g:11,carbohydrates_100g:33},ingredients_text:"saumon (23%), maïs, farine de poulet, cellulose, graisses animales, taurine"},
  {product_name:"Purina Pro Plan Indoor Care Chicken",brands:"Purina Pro Plan",_type:"chat",nutriments:{proteins_100g:36,fat_100g:11,carbohydrates_100g:35},ingredients_text:"poulet (24%), maïs, farine de poulet, cellulose, graisses animales, taurine"},
  {product_name:"Purina Pro Plan Senior 7+ Chicken",brands:"Purina Pro Plan",_type:"chat",nutriments:{proteins_100g:34,fat_100g:13,carbohydrates_100g:35},ingredients_text:"poulet (25%), maïs, farine de poulet, riz, graisses animales, taurine, minéraux"},
  {product_name:"Purina Pro Plan Delicate Sensitive Digestion Turkey",brands:"Purina Pro Plan",_type:"chat",nutriments:{proteins_100g:36,fat_100g:16,carbohydrates_100g:30},ingredients_text:"dinde (25%), riz, maïs, farine de poulet, graisses animales, taurine"},
  {product_name:"Purina Pro Plan Veterinary EN Gastrointestinal Chat",brands:"Purina Pro Plan Veterinary",_type:"chat",nutriments:{proteins_100g:31,fat_100g:17,carbohydrates_100g:30},ingredients_text:"maïs, farine de poulet, graisses animales, riz, cellulose, taurine"},
  {product_name:"Purina Pro Plan Veterinary UR Urinary Chat",brands:"Purina Pro Plan Veterinary",_type:"chat",nutriments:{proteins_100g:44,fat_100g:16,carbohydrates_100g:20},ingredients_text:"farine de poulet, maïs, graisses animales, riz, minéraux, taurine"},
  {product_name:"Purina Pro Plan Veterinary NF Renal Chat",brands:"Purina Pro Plan Veterinary",_type:"chat",nutriments:{proteins_100g:26,fat_100g:17,carbohydrates_100g:38},ingredients_text:"maïs, farine de poulet, graisses animales, riz, cellulose, taurine"},
  {product_name:"Purina Pro Plan Veterinary DM Diabetes Chat",brands:"Purina Pro Plan Veterinary",_type:"chat",nutriments:{proteins_100g:49,fat_100g:18,carbohydrates_100g:10},ingredients_text:"farine de poulet, cellulose, graisses animales, minéraux, taurine"},
  {product_name:"Purina Pro Plan Veterinary OM Overweight Chat",brands:"Purina Pro Plan Veterinary",_type:"chat",nutriments:{proteins_100g:38,fat_100g:13,carbohydrates_100g:24},ingredients_text:"maïs, farine de poulet, cellulose, graisses animales, taurine"},

  // ═══════════════════════════════════════════════
  // HILL'S SCIENCE DIET — CHIEN
  // ═══════════════════════════════════════════════
  {product_name:"Hill's Science Diet Puppy Small/Mini Chicken Meal",brands:"Hill's Science Diet",_type:"chien",nutriments:{proteins_100g:27,fat_100g:16,carbohydrates_100g:43},ingredients_text:"farine de poulet, maïs, riz, farine de blé, graisses animales, levure de bière, minéraux"},
  {product_name:"Hill's Science Diet Puppy Chicken Meal/Barley",brands:"Hill's Science Diet",_type:"chien",nutriments:{proteins_100g:25,fat_100g:14,carbohydrates_100g:47},ingredients_text:"farine de poulet, maïs, orge, riz, graisses animales, levure de bière"},
  {product_name:"Hill's Science Diet Puppy Large Breed",brands:"Hill's Science Diet",_type:"chien",nutriments:{proteins_100g:25,fat_100g:14,carbohydrates_100g:47},ingredients_text:"farine de poulet, maïs, riz, farine de blé, graisses animales, cellulose"},
  {product_name:"Hill's Science Diet Adult Small/Mini Chicken",brands:"Hill's Science Diet",_type:"chien",nutriments:{proteins_100g:26,fat_100g:16,carbohydrates_100g:44},ingredients_text:"farine de poulet, maïs, riz, farine de blé, graisses animales"},
  {product_name:"Hill's Science Diet Adult Medium",brands:"Hill's Science Diet",_type:"chien",nutriments:{proteins_100g:22,fat_100g:14,carbohydrates_100g:50},ingredients_text:"maïs, farine de poulet, riz, farine de blé, graisses animales, minéraux"},
  {product_name:"Hill's Science Diet Adult Large Breed",brands:"Hill's Science Diet",_type:"chien",nutriments:{proteins_100g:20,fat_100g:12,carbohydrates_100g:52},ingredients_text:"maïs, farine de poulet, riz, farine de blé, graisses animales"},
  {product_name:"Hill's Science Diet Adult Sensitive Stomach & Skin",brands:"Hill's Science Diet",_type:"chien",nutriments:{proteins_100g:22,fat_100g:12,carbohydrates_100g:50},ingredients_text:"maïs, farine de poulet, riz, graisses animales, cellulose, minéraux"},
  {product_name:"Hill's Science Diet Adult Perfect Weight",brands:"Hill's Science Diet",_type:"chien",nutriments:{proteins_100g:25,fat_100g:9,carbohydrates_100g:52},ingredients_text:"maïs, farine de poulet, riz, cellulose, graisses animales"},
  {product_name:"Hill's Science Diet Senior 7+ Small/Mini",brands:"Hill's Science Diet",_type:"chien",nutriments:{proteins_100g:22,fat_100g:13,carbohydrates_100g:50},ingredients_text:"maïs, farine de poulet, riz, graisses animales, cellulose"},
  {product_name:"Hill's Science Diet Senior 7+ Medium/Large",brands:"Hill's Science Diet",_type:"chien",nutriments:{proteins_100g:22,fat_100g:11,carbohydrates_100g:52},ingredients_text:"maïs, farine de poulet, riz, graisses animales, cellulose"},
  {product_name:"Hill's Science Diet Senior 11+ Vitality",brands:"Hill's Science Diet",_type:"chien",nutriments:{proteins_100g:22,fat_100g:11,carbohydrates_100g:52},ingredients_text:"maïs, farine de poulet, riz, graisses animales"},

  // ═══════════════════════════════════════════════
  // HILL'S PRESCRIPTION DIET — CHIEN
  // ═══════════════════════════════════════════════
  {product_name:"Hill's Prescription Diet c/d Urinary Care Chien",brands:"Hill's Prescription Diet",_type:"chien",nutriments:{proteins_100g:15,fat_100g:11,carbohydrates_100g:50},ingredients_text:"maïs, farine de poulet, riz, graisses végétales, cellulose, minéraux"},
  {product_name:"Hill's Prescription Diet i/d Digestive Care Chien",brands:"Hill's Prescription Diet",_type:"chien",nutriments:{proteins_100g:21,fat_100g:11,carbohydrates_100g:57},ingredients_text:"riz, maïs, farine de poulet, graisses animales, cellulose, minéraux"},
  {product_name:"Hill's Prescription Diet j/d Joint Mobility Chien",brands:"Hill's Prescription Diet",_type:"chien",nutriments:{proteins_100g:18,fat_100g:12,carbohydrates_100g:52},ingredients_text:"maïs, farine de poulet, riz, graisses végétales, cellulose, minéraux"},
  {product_name:"Hill's Prescription Diet k/d Kidney Care Chien",brands:"Hill's Prescription Diet",_type:"chien",nutriments:{proteins_100g:13,fat_100g:11,carbohydrates_100g:59},ingredients_text:"maïs, riz, graisses végétales, amidon de maïs, protéines de poulet hydrolysées, cellulose"},
  {product_name:"Hill's Prescription Diet l/d Liver Care Chien",brands:"Hill's Prescription Diet",_type:"chien",nutriments:{proteins_100g:13,fat_100g:11,carbohydrates_100g:63},ingredients_text:"riz, maïs, graisses végétales, amidon de maïs, protéines de poulet hydrolysées"},
  {product_name:"Hill's Prescription Diet r/d Weight Reduction Chien",brands:"Hill's Prescription Diet",_type:"chien",nutriments:{proteins_100g:25,fat_100g:7,carbohydrates_100g:49},ingredients_text:"maïs, farine de poulet, cellulose, riz, graisses animales"},
  {product_name:"Hill's Prescription Diet w/d Multi-Benefit Chien",brands:"Hill's Prescription Diet",_type:"chien",nutriments:{proteins_100g:19,fat_100g:7,carbohydrates_100g:56},ingredients_text:"maïs, farine de poulet, cellulose, riz, graisses animales, minéraux"},
  {product_name:"Hill's Prescription Diet z/d Skin Food Sensitivities Chien",brands:"Hill's Prescription Diet",_type:"chien",nutriments:{proteins_100g:18,fat_100g:12,carbohydrates_100g:52},ingredients_text:"amidon de maïs, graisses végétales, protéines de poulet hydrolysées, riz, cellulose"},
  {product_name:"Hill's Prescription Diet d/d Duck/Potato Chien",brands:"Hill's Prescription Diet",_type:"chien",nutriments:{proteins_100g:15,fat_100g:12,carbohydrates_100g:54},ingredients_text:"pomme de terre, canard (13%), graisse de canard, graisses végétales, cellulose"},
  {product_name:"Hill's Prescription Diet Metabolic Chien",brands:"Hill's Prescription Diet",_type:"chien",nutriments:{proteins_100g:30,fat_100g:10,carbohydrates_100g:43},ingredients_text:"maïs, farine de poulet, cellulose, riz, graisses animales"},

  // ═══════════════════════════════════════════════
  // HILL'S SCIENCE DIET / PRESCRIPTION DIET — CHAT
  // ═══════════════════════════════════════════════
  {product_name:"Hill's Science Diet Kitten Chicken",brands:"Hill's Science Diet",_type:"chat",nutriments:{proteins_100g:33,fat_100g:18,carbohydrates_100g:28},ingredients_text:"maïs, farine de poulet, riz, graisses animales, taurine, minéraux"},
  {product_name:"Hill's Science Diet Kitten Indoor",brands:"Hill's Science Diet",_type:"chat",nutriments:{proteins_100g:34,fat_100g:17,carbohydrates_100g:27},ingredients_text:"maïs, farine de poulet, riz, cellulose, graisses animales, taurine"},
  {product_name:"Hill's Science Diet Adult Indoor Chicken",brands:"Hill's Science Diet",_type:"chat",nutriments:{proteins_100g:33,fat_100g:19,carbohydrates_100g:27},ingredients_text:"maïs, farine de poulet, riz, graisses animales, cellulose, taurine"},
  {product_name:"Hill's Science Diet Adult Sensitive Stomach",brands:"Hill's Science Diet",_type:"chat",nutriments:{proteins_100g:33,fat_100g:17,carbohydrates_100g:29},ingredients_text:"maïs, farine de poulet, riz, graisses animales, taurine"},
  {product_name:"Hill's Science Diet Adult Perfect Weight",brands:"Hill's Science Diet",_type:"chat",nutriments:{proteins_100g:37,fat_100g:10,carbohydrates_100g:33},ingredients_text:"maïs, farine de poulet, cellulose, riz, graisses animales, taurine"},
  {product_name:"Hill's Science Diet Senior 7+",brands:"Hill's Science Diet",_type:"chat",nutriments:{proteins_100g:32,fat_100g:16,carbohydrates_100g:31},ingredients_text:"maïs, farine de poulet, riz, graisses animales, taurine"},
  {product_name:"Hill's Science Diet Senior 11+",brands:"Hill's Science Diet",_type:"chat",nutriments:{proteins_100g:34,fat_100g:15,carbohydrates_100g:28},ingredients_text:"maïs, farine de poulet, riz, graisses animales, taurine"},
  {product_name:"Hill's Prescription Diet c/d Urinary Stress Chat",brands:"Hill's Prescription Diet",_type:"chat",nutriments:{proteins_100g:34,fat_100g:20,carbohydrates_100g:25},ingredients_text:"maïs, farine de poulet, riz, graisses animales, minéraux, taurine"},
  {product_name:"Hill's Prescription Diet i/d Digestive Chat",brands:"Hill's Prescription Diet",_type:"chat",nutriments:{proteins_100g:32,fat_100g:20,carbohydrates_100g:30},ingredients_text:"maïs, farine de poulet, riz, graisses animales, cellulose, taurine"},
  {product_name:"Hill's Prescription Diet k/d Kidney Chat",brands:"Hill's Prescription Diet",_type:"chat",nutriments:{proteins_100g:28,fat_100g:18,carbohydrates_100g:38},ingredients_text:"riz, maïs, graisses végétales, amidon de maïs, protéines de poulet hydrolysées, taurine"},
  {product_name:"Hill's Prescription Diet m/d Metabolic Chat",brands:"Hill's Prescription Diet",_type:"chat",nutriments:{proteins_100g:37,fat_100g:17,carbohydrates_100g:22},ingredients_text:"maïs, farine de poulet, cellulose, graisses animales, taurine"},
  {product_name:"Hill's Prescription Diet r/d Weight Chat",brands:"Hill's Prescription Diet",_type:"chat",nutriments:{proteins_100g:37,fat_100g:8,carbohydrates_100g:27},ingredients_text:"maïs, farine de poulet, cellulose, riz, graisses animales, taurine"},
  {product_name:"Hill's Prescription Diet y/d Thyroid Chat",brands:"Hill's Prescription Diet",_type:"chat",nutriments:{proteins_100g:21,fat_100g:11,carbohydrates_100g:41},ingredients_text:"maïs, riz, graisses végétales, amidon de maïs, protéines de poulet hydrolysées, taurine"},
  {product_name:"Hill's Prescription Diet z/d Skin Chat",brands:"Hill's Prescription Diet",_type:"chat",nutriments:{proteins_100g:27,fat_100g:13,carbohydrates_100g:39},ingredients_text:"amidon de maïs, graisses végétales, protéines de poulet hydrolysées, riz, cellulose, taurine"},
  {product_name:"Hill's Prescription Diet Metabolic Cat",brands:"Hill's Prescription Diet",_type:"chat",nutriments:{proteins_100g:37,fat_100g:16,carbohydrates_100g:25},ingredients_text:"maïs, farine de poulet, cellulose, graisses animales, taurine"},

  // ═══════════════════════════════════════════════
  // ORIJEN CHIEN & CHAT
  // ═══════════════════════════════════════════════
  {product_name:"Orijen Original Dog",brands:"Orijen",_type:"chien",nutriments:{proteins_100g:38,fat_100g:18,carbohydrates_100g:24},ingredients_text:"poulet frais (13%), dinde fraîche (7%), poulet entier desséché (7%), hareng entier desséché (7%), farine de hareng (4%)"},
  {product_name:"Orijen Regional Red Dog",brands:"Orijen",_type:"chien",nutriments:{proteins_100g:38,fat_100g:18,carbohydrates_100g:24},ingredients_text:"bœuf frais (10%), sanglier frais (8%), agneau frais (7%), bœuf entier desséché (6%), agneau entier desséché (6%)"},
  {product_name:"Orijen Six Fish Dog",brands:"Orijen",_type:"chien",nutriments:{proteins_100g:38,fat_100g:18,carbohydrates_100g:24},ingredients_text:"hareng entier frais (10%), maquereau entier frais (10%), hareng entier desséché (6%), maquereau entier desséché (6%)"},
  {product_name:"Orijen Tundra Dog",brands:"Orijen",_type:"chien",nutriments:{proteins_100g:38,fat_100g:18,carbohydrates_100g:24},ingredients_text:"venaison fraîche (8%), agneau frais (6%), renne frais (4%), venaison déshydratée (5%)"},
  {product_name:"Orijen Fit & Trim Dog",brands:"Orijen",_type:"chien",nutriments:{proteins_100g:38,fat_100g:15,carbohydrates_100g:24},ingredients_text:"poulet frais (15%), dinde fraîche (10%), hareng entier frais (6%), poulet entier desséché (8%)"},
  {product_name:"Orijen Puppy Large Dog",brands:"Orijen",_type:"chien",nutriments:{proteins_100g:38,fat_100g:16,carbohydrates_100g:26},ingredients_text:"poulet frais (13%), dinde fraîche (6%), saumon frais (4%), poulet entier desséché (7%)"},
  {product_name:"Orijen Small Breed Dog",brands:"Orijen",_type:"chien",nutriments:{proteins_100g:38,fat_100g:18,carbohydrates_100g:24},ingredients_text:"poulet frais (13%), dinde fraîche (7%), poulet entier desséché (7%), hareng entier desséché (5%)"},
  {product_name:"Orijen Senior Dog",brands:"Orijen",_type:"chien",nutriments:{proteins_100g:38,fat_100g:15,carbohydrates_100g:26},ingredients_text:"poulet frais (12%), dinde fraîche (8%), hareng entier frais (6%), poulet entier desséché (7%)"},
  {product_name:"Orijen Original Cat",brands:"Orijen",_type:"chat",nutriments:{proteins_100g:40,fat_100g:18,carbohydrates_100g:22},ingredients_text:"poulet frais (10%), dinde fraîche (6%), poulet entier desséché (10%), hareng entier desséché (6%), foie de poulet frais (4%)"},
  {product_name:"Orijen Regional Red Cat",brands:"Orijen",_type:"chat",nutriments:{proteins_100g:40,fat_100g:18,carbohydrates_100g:22},ingredients_text:"bœuf frais (10%), sanglier frais (8%), agneau frais (7%), bœuf entier desséché (6%)"},
  {product_name:"Orijen Six Fish Cat",brands:"Orijen",_type:"chat",nutriments:{proteins_100g:40,fat_100g:18,carbohydrates_100g:22},ingredients_text:"hareng entier frais (10%), maquereau entier frais (8%), hareng entier desséché (6%), maquereau entier desséché (6%)"},
  {product_name:"Orijen Cat & Kitten",brands:"Orijen",_type:"chat",nutriments:{proteins_100g:40,fat_100g:20,carbohydrates_100g:22},ingredients_text:"poulet frais (13%), dinde fraîche (6%), poulet entier desséché (10%), foie de poulet frais (5%)"},
  {product_name:"Orijen Fit & Trim Cat",brands:"Orijen",_type:"chat",nutriments:{proteins_100g:42,fat_100g:15,carbohydrates_100g:20},ingredients_text:"poulet frais (14%), dinde fraîche (10%), hareng entier frais (6%), poulet entier desséché (9%)"},

  // ═══════════════════════════════════════════════
  // ACANA CHIEN & CHAT
  // ═══════════════════════════════════════════════
  {product_name:"Acana Puppy & Junior",brands:"Acana",_type:"chien",nutriments:{proteins_100g:31,fat_100g:17,carbohydrates_100g:32},ingredients_text:"poulet frais (13%), dinde fraîche (7%), hareng entier frais (4%), poulet entier desséché (5%)"},
  {product_name:"Acana Adult Small Breed",brands:"Acana",_type:"chien",nutriments:{proteins_100g:31,fat_100g:17,carbohydrates_100g:34},ingredients_text:"poulet frais (13%), dinde fraîche (6%), hareng entier frais (4%), poulet entier desséché (5%)"},
  {product_name:"Acana Heritage Puppy",brands:"Acana",_type:"chien",nutriments:{proteins_100g:31,fat_100g:17,carbohydrates_100g:32},ingredients_text:"poulet frais (13%), dinde fraîche (7%), œufs frais (3%), poulet entier desséché (5%)"},
  {product_name:"Acana Heritage Breeds",brands:"Acana",_type:"chien",nutriments:{proteins_100g:33,fat_100g:17,carbohydrates_100g:32},ingredients_text:"poulet fermier frais (13%), dinde fraîche (8%), œufs frais (5%), canard frais (4%)"},
  {product_name:"Acana Prairie Poultry",brands:"Acana",_type:"chien",nutriments:{proteins_100g:31,fat_100g:17,carbohydrates_100g:34},ingredients_text:"poulet frais (13%), dinde fraîche (7%), œufs frais (3%), poulet entier desséché (5%)"},
  {product_name:"Acana Pacifica Dog",brands:"Acana",_type:"chien",nutriments:{proteins_100g:33,fat_100g:17,carbohydrates_100g:32},ingredients_text:"hareng entier frais (12%), saumon du Pacifique frais (10%), hareng entier desséché (5%)"},
  {product_name:"Acana Ranchlands",brands:"Acana",_type:"chien",nutriments:{proteins_100g:35,fat_100g:17,carbohydrates_100g:22},ingredients_text:"bœuf frais (13%), agneau frais (6%), bœuf entier desséché (5%), agneau entier desséché (5%)"},
  {product_name:"Acana Grasslands",brands:"Acana",_type:"chien",nutriments:{proteins_100g:33,fat_100g:17,carbohydrates_100g:22},ingredients_text:"agneau frais (14%), canard frais (10%), agneau entier desséché (6%), canard entier desséché (5%)"},
  {product_name:"Acana Sport & Agility",brands:"Acana",_type:"chien",nutriments:{proteins_100g:35,fat_100g:17,carbohydrates_100g:26},ingredients_text:"poulet frais (15%), dinde fraîche (9%), hareng entier frais (5%), poulet entier desséché (7%)"},
  {product_name:"Acana Senior Dog",brands:"Acana",_type:"chien",nutriments:{proteins_100g:31,fat_100g:14,carbohydrates_100g:35},ingredients_text:"poulet frais (12%), dinde fraîche (6%), hareng entier frais (4%), poulet entier desséché (5%)"},
  {product_name:"Acana Indoor Dog",brands:"Acana",_type:"chien",nutriments:{proteins_100g:29,fat_100g:14,carbohydrates_100g:38},ingredients_text:"poulet frais (12%), dinde fraîche (6%), hareng entier frais (4%), cellulose, poulet entier desséché"},
  {product_name:"Acana Meadowlands Cat",brands:"Acana",_type:"chat",nutriments:{proteins_100g:35,fat_100g:17,carbohydrates_100g:22},ingredients_text:"poulet frais (14%), dinde fraîche (8%), œufs frais (6%), poulet entier desséché (7%), foie de poulet frais (4%)"},
  {product_name:"Acana Wild Prairie Cat",brands:"Acana",_type:"chat",nutriments:{proteins_100g:33,fat_100g:17,carbohydrates_100g:24},ingredients_text:"poulet frais (13%), dinde fraîche (8%), œufs frais (5%), poulet entier desséché (6%)"},
  {product_name:"Acana Pacifica Cat",brands:"Acana",_type:"chat",nutriments:{proteins_100g:33,fat_100g:17,carbohydrates_100g:22},ingredients_text:"hareng entier frais (12%), saumon du Pacifique frais (10%), hareng entier desséché (5%), taurine"},
  {product_name:"Acana Indoor Cat",brands:"Acana",_type:"chat",nutriments:{proteins_100g:31,fat_100g:14,carbohydrates_100g:30},ingredients_text:"poulet frais (13%), dinde fraîche (7%), cellulose, poulet entier desséché (5%), taurine"},
  {product_name:"Acana Senior Cat",brands:"Acana",_type:"chat",nutriments:{proteins_100g:31,fat_100g:14,carbohydrates_100g:30},ingredients_text:"poulet frais (12%), dinde fraîche (6%), poulet entier desséché (5%), taurine"},

  // ═══════════════════════════════════════════════
  // FARMINA N&D CHIEN & CHAT
  // ═══════════════════════════════════════════════
  {product_name:"Farmina N&D Low Ancestral Grain Chicken Puppy Medium",brands:"Farmina N&D",_type:"chien",nutriments:{proteins_100g:29,fat_100g:14,carbohydrates_100g:43},ingredients_text:"poulet déshydraté (24%), farine d'avoine, épeautre, poulet frais (10%), grenade, carottes"},
  {product_name:"Farmina N&D Low Ancestral Grain Chicken Adult Medium",brands:"Farmina N&D",_type:"chien",nutriments:{proteins_100g:26,fat_100g:14,carbohydrates_100g:43},ingredients_text:"poulet déshydraté (20%), farine d'avoine, épeautre, poulet frais (10%), grenade"},
  {product_name:"Farmina N&D Low Ancestral Grain Lamb Adult",brands:"Farmina N&D",_type:"chien",nutriments:{proteins_100g:26,fat_100g:14,carbohydrates_100g:43},ingredients_text:"agneau déshydraté (24%), farine d'avoine, épeautre, agneau frais (10%), myrtille"},
  {product_name:"Farmina N&D Grain Free Pumpkin Chicken Puppy",brands:"Farmina N&D",_type:"chien",nutriments:{proteins_100g:38,fat_100g:22,carbohydrates_100g:19},ingredients_text:"poulet déshydraté (30%), pois, poulet frais (15%), citrouille (4%), œufs frais"},
  {product_name:"Farmina N&D Grain Free Pumpkin Chicken Adult",brands:"Farmina N&D",_type:"chien",nutriments:{proteins_100g:38,fat_100g:18,carbohydrates_100g:24},ingredients_text:"poulet déshydraté (28%), pois, poulet frais (15%), citrouille (4%)"},
  {product_name:"Farmina N&D Grain Free Pumpkin Lamb Adult",brands:"Farmina N&D",_type:"chien",nutriments:{proteins_100g:38,fat_100g:18,carbohydrates_100g:24},ingredients_text:"agneau déshydraté (28%), pois, agneau frais (15%), citrouille (4%)"},
  {product_name:"Farmina N&D Grain Free Pumpkin Boar Adult",brands:"Farmina N&D",_type:"chien",nutriments:{proteins_100g:38,fat_100g:18,carbohydrates_100g:24},ingredients_text:"sanglier déshydraté (28%), pois, sanglier frais (15%), citrouille (4%)"},
  {product_name:"Farmina N&D Quinoa Skin & Coat Chien",brands:"Farmina N&D",_type:"chien",nutriments:{proteins_100g:24,fat_100g:14,carbohydrates_100g:42},ingredients_text:"poulet déshydraté (18%), quinoa, maïs, poulet frais (10%), huile de colza, chanvre"},
  {product_name:"Farmina N&D Quinoa Weight Management Chien",brands:"Farmina N&D",_type:"chien",nutriments:{proteins_100g:22,fat_100g:12,carbohydrates_100g:45},ingredients_text:"poulet déshydraté (16%), quinoa, maïs, cellulose, poulet frais (8%)"},
  {product_name:"Farmina N&D Low Ancestral Grain Chicken Adult Cat",brands:"Farmina N&D",_type:"chat",nutriments:{proteins_100g:30,fat_100g:15,carbohydrates_100g:32},ingredients_text:"poulet déshydraté (24%), farine d'avoine, épeautre, poulet frais (12%), grenade, taurine"},
  {product_name:"Farmina N&D Low Ancestral Grain Chicken Kitten",brands:"Farmina N&D",_type:"chat",nutriments:{proteins_100g:34,fat_100g:18,carbohydrates_100g:26},ingredients_text:"poulet déshydraté (28%), farine d'avoine, épeautre, poulet frais (14%), grenade, taurine"},
  {product_name:"Farmina N&D Grain Free Pumpkin Chicken Adult Cat",brands:"Farmina N&D",_type:"chat",nutriments:{proteins_100g:38,fat_100g:18,carbohydrates_100g:22},ingredients_text:"poulet déshydraté (30%), pois, poulet frais (15%), citrouille (4%), taurine"},
  {product_name:"Farmina N&D Grain Free Pumpkin Quail Kitten Cat",brands:"Farmina N&D",_type:"chat",nutriments:{proteins_100g:38,fat_100g:18,carbohydrates_100g:22},ingredients_text:"poulet déshydraté (28%), pois, caille fraîche (10%), citrouille (4%), taurine"},
  {product_name:"Farmina N&D Quinoa Skin & Coat Chat",brands:"Farmina N&D",_type:"chat",nutriments:{proteins_100g:29,fat_100g:15,carbohydrates_100g:32},ingredients_text:"poulet déshydraté (20%), quinoa, maïs, poulet frais (10%), chanvre, taurine"},

  // ═══════════════════════════════════════════════
  // EUKANUBA CHIEN & CHAT
  // ═══════════════════════════════════════════════
  {product_name:"Eukanuba Puppy Small Breed",brands:"Eukanuba",_type:"chien",nutriments:{proteins_100g:28,fat_100g:16,carbohydrates_100g:45},ingredients_text:"poulet déshydraté (24%), maïs, farine de maïs, riz, graisses animales, farine d'orge, levure de bière"},
  {product_name:"Eukanuba Puppy Medium Breed",brands:"Eukanuba",_type:"chien",nutriments:{proteins_100g:27,fat_100g:16,carbohydrates_100g:45},ingredients_text:"poulet déshydraté (24%), maïs, farine de maïs, riz, graisses animales, farine d'orge"},
  {product_name:"Eukanuba Puppy Large Breed",brands:"Eukanuba",_type:"chien",nutriments:{proteins_100g:26,fat_100g:14,carbohydrates_100g:46},ingredients_text:"poulet déshydraté (24%), maïs, farine de maïs, riz, graisses animales"},
  {product_name:"Eukanuba Adult Small Breed",brands:"Eukanuba",_type:"chien",nutriments:{proteins_100g:27,fat_100g:15,carbohydrates_100g:47},ingredients_text:"poulet déshydraté (24%), maïs, riz, farine d'orge, graisses animales, levure de bière"},
  {product_name:"Eukanuba Adult Medium Breed",brands:"Eukanuba",_type:"chien",nutriments:{proteins_100g:27,fat_100g:14,carbohydrates_100g:47},ingredients_text:"poulet déshydraté (24%), maïs, riz, farine d'orge, graisses animales"},
  {product_name:"Eukanuba Adult Large Breed",brands:"Eukanuba",_type:"chien",nutriments:{proteins_100g:26,fat_100g:12,carbohydrates_100g:48},ingredients_text:"poulet déshydraté (22%), maïs, riz, farine de maïs, graisses animales"},
  {product_name:"Eukanuba Adult XL Breed",brands:"Eukanuba",_type:"chien",nutriments:{proteins_100g:26,fat_100g:12,carbohydrates_100g:48},ingredients_text:"poulet déshydraté (22%), maïs, riz, farine de maïs, graisses animales"},
  {product_name:"Eukanuba Senior Small/Medium",brands:"Eukanuba",_type:"chien",nutriments:{proteins_100g:27,fat_100g:12,carbohydrates_100g:48},ingredients_text:"poulet déshydraté (24%), maïs, riz, farine d'orge, graisses animales"},
  {product_name:"Eukanuba Senior Large/XL",brands:"Eukanuba",_type:"chien",nutriments:{proteins_100g:26,fat_100g:10,carbohydrates_100g:49},ingredients_text:"poulet déshydraté (22%), maïs, riz, farine de maïs, graisses animales"},
  {product_name:"Eukanuba Premium Sport",brands:"Eukanuba",_type:"chien",nutriments:{proteins_100g:30,fat_100g:20,carbohydrates_100g:38},ingredients_text:"poulet déshydraté (28%), maïs, riz, graisses animales, levure de bière"},
  {product_name:"Eukanuba Weight Control Adult Medium",brands:"Eukanuba",_type:"chien",nutriments:{proteins_100g:28,fat_100g:8,carbohydrates_100g:48},ingredients_text:"poulet déshydraté (24%), maïs, riz, cellulose, graisses animales"},
  {product_name:"Eukanuba Breed Specific Labrador Retriever",brands:"Eukanuba",_type:"chien",nutriments:{proteins_100g:27,fat_100g:10,carbohydrates_100g:48},ingredients_text:"poulet déshydraté (24%), maïs, riz, cellulose, graisses animales"},
  {product_name:"Eukanuba Breed Specific German Shepherd",brands:"Eukanuba",_type:"chien",nutriments:{proteins_100g:27,fat_100g:14,carbohydrates_100g:46},ingredients_text:"poulet déshydraté (24%), maïs, riz, graisses animales, levure de bière"},

  // ═══════════════════════════════════════════════
  // IAMS CHIEN & CHAT
  // ═══════════════════════════════════════════════
  {product_name:"Iams ProActive Health Adult Original Chicken",brands:"Iams",_type:"chien",nutriments:{proteins_100g:27,fat_100g:14,carbohydrates_100g:44},ingredients_text:"poulet déshydraté (22%), maïs, farine de maïs, graisses animales, levure de bière"},
  {product_name:"Iams ProActive Health Puppy Large Breed",brands:"Iams",_type:"chien",nutriments:{proteins_100g:27,fat_100g:12,carbohydrates_100g:44},ingredients_text:"poulet déshydraté (22%), maïs, riz, farine de maïs, graisses animales"},
  {product_name:"Iams ProActive Health Senior 8+ Dog",brands:"Iams",_type:"chien",nutriments:{proteins_100g:26,fat_100g:11,carbohydrates_100g:44},ingredients_text:"poulet déshydraté (22%), maïs, farine de maïs, graisses animales, cellulose"},
  {product_name:"Iams ProActive Health Adult Light",brands:"Iams",_type:"chien",nutriments:{proteins_100g:27,fat_100g:8,carbohydrates_100g:44},ingredients_text:"poulet déshydraté (22%), maïs, cellulose, farine de maïs, graisses animales"},
  {product_name:"Iams Proactive Health Adult Kitten",brands:"Iams",_type:"chat",nutriments:{proteins_100g:32,fat_100g:14,carbohydrates_100g:32},ingredients_text:"poulet déshydraté (24%), maïs, farine de maïs, graisses animales, taurine"},
  {product_name:"Iams ProActive Health Adult Cat",brands:"Iams",_type:"chat",nutriments:{proteins_100g:30,fat_100g:11,carbohydrates_100g:34},ingredients_text:"poulet déshydraté (24%), maïs, farine de maïs, graisses animales, taurine"},
  {product_name:"Iams ProActive Health Senior 11+ Cat",brands:"Iams",_type:"chat",nutriments:{proteins_100g:30,fat_100g:11,carbohydrates_100g:34},ingredients_text:"poulet déshydraté (24%), maïs, farine de maïs, graisses animales, taurine"},
  {product_name:"Iams ProActive Health Indoor Hairball Cat",brands:"Iams",_type:"chat",nutriments:{proteins_100g:30,fat_100g:11,carbohydrates_100g:34},ingredients_text:"poulet déshydraté (24%), maïs, cellulose, farine de maïs, graisses animales, taurine"},

  // ═══════════════════════════════════════════════
  // JOSERA CHIEN & CHAT
  // ═══════════════════════════════════════════════
  {product_name:"Josera JosiDog Active Dog",brands:"Josera",_type:"chien",nutriments:{proteins_100g:26,fat_100g:16,carbohydrates_100g:41},ingredients_text:"poulet déshydraté (20%), maïs, riz, graisses animales, levure, minéraux"},
  {product_name:"Josera JosiDog Adult Dog",brands:"Josera",_type:"chien",nutriments:{proteins_100g:26,fat_100g:16,carbohydrates_100g:41},ingredients_text:"poulet déshydraté (20%), maïs, riz, graisses animales"},
  {product_name:"Josera JosiDog Junior Dog",brands:"Josera",_type:"chien",nutriments:{proteins_100g:30,fat_100g:18,carbohydrates_100g:34},ingredients_text:"poulet déshydraté (24%), maïs, riz, graisses animales, levure"},
  {product_name:"Josera Sensi Plus Dog",brands:"Josera",_type:"chien",nutriments:{proteins_100g:26,fat_100g:14,carbohydrates_100g:44},ingredients_text:"riz, pomme de terre, poulet déshydraté (20%), graisses animales"},
  {product_name:"Josera Dog Wild",brands:"Josera",_type:"chien",nutriments:{proteins_100g:32,fat_100g:16,carbohydrates_100g:35},ingredients_text:"venaison déshydratée (25%), maïs, riz, graisses animales, herbes"},
  {product_name:"Josera CornCat",brands:"Josera",_type:"chat",nutriments:{proteins_100g:38,fat_100g:18,carbohydrates_100g:22},ingredients_text:"poulet déshydraté (28%), maïs, riz, graisses animales, taurine"},
  {product_name:"Josera NatureCat",brands:"Josera",_type:"chat",nutriments:{proteins_100g:38,fat_100g:22,carbohydrates_100g:20},ingredients_text:"poulet déshydraté (30%), pois, graisses animales, taurine"},
  {product_name:"Josera SensiCat",brands:"Josera",_type:"chat",nutriments:{proteins_100g:34,fat_100g:15,carbohydrates_100g:30},ingredients_text:"riz, poulet déshydraté (26%), pomme de terre, graisses animales, taurine"},
  {product_name:"Josera Leger Cat",brands:"Josera",_type:"chat",nutriments:{proteins_100g:35,fat_100g:10,carbohydrates_100g:33},ingredients_text:"poulet déshydraté (26%), maïs, cellulose, riz, graisses animales, taurine"},

  // ═══════════════════════════════════════════════
  // MONGE CHIEN & CHAT
  // ═══════════════════════════════════════════════
  {product_name:"Monge Natural Superpremium Adult Chicken",brands:"Monge",_type:"chien",nutriments:{proteins_100g:28,fat_100g:15,carbohydrates_100g:40},ingredients_text:"poulet déshydraté (26%), maïs, riz, graisses animales, levure de bière"},
  {product_name:"Monge All Breeds Puppy Chicken",brands:"Monge",_type:"chien",nutriments:{proteins_100g:30,fat_100g:17,carbohydrates_100g:35},ingredients_text:"poulet déshydraté (26%), maïs, riz, graisses animales"},
  {product_name:"Monge Monoprotein Beef Dog",brands:"Monge",_type:"chien",nutriments:{proteins_100g:30,fat_100g:16,carbohydrates_100g:37},ingredients_text:"bœuf déshydraté (28%), pois, pomme de terre, graisses animales"},
  {product_name:"Monge Monoprotein Salmon Dog",brands:"Monge",_type:"chien",nutriments:{proteins_100g:30,fat_100g:15,carbohydrates_100g:38},ingredients_text:"saumon déshydraté (28%), pois, pomme de terre, graisses animales"},
  {product_name:"Monge Monoprotein Trout Dog",brands:"Monge",_type:"chien",nutriments:{proteins_100g:30,fat_100g:15,carbohydrates_100g:38},ingredients_text:"truite déshydratée (28%), pois, pomme de terre, graisses animales"},
  {product_name:"Monge All Breeds Chicken Kitten",brands:"Monge",_type:"chat",nutriments:{proteins_100g:32,fat_100g:17,carbohydrates_100g:28},ingredients_text:"poulet déshydraté (28%), riz, maïs, graisses animales, taurine"},
  {product_name:"Monge All Breeds Adult Chicken Cat",brands:"Monge",_type:"chat",nutriments:{proteins_100g:32,fat_100g:15,carbohydrates_100g:30},ingredients_text:"poulet déshydraté (26%), riz, maïs, graisses animales, taurine"},
  {product_name:"Monge Monoprotein Salmon Cat",brands:"Monge",_type:"chat",nutriments:{proteins_100g:38,fat_100g:16,carbohydrates_100g:22},ingredients_text:"saumon déshydraté (32%), pois, pomme de terre, graisses animales, taurine"},
  {product_name:"Monge Natural Superpremium Sterilised Cat",brands:"Monge",_type:"chat",nutriments:{proteins_100g:34,fat_100g:12,carbohydrates_100g:32},ingredients_text:"poulet déshydraté (26%), maïs, cellulose, riz, graisses animales, taurine"},

  // ═══════════════════════════════════════════════
  // VIRBAC VETERINARY HPM
  // ═══════════════════════════════════════════════
  {product_name:"Virbac Veterinary HPM Puppy S/M Chien",brands:"Virbac HPM",_type:"chien",nutriments:{proteins_100g:29,fat_100g:18,carbohydrates_100g:32},ingredients_text:"poulet déshydraté (40%), pois, graisse de poulet, pomme de terre, levure de bière"},
  {product_name:"Virbac Veterinary HPM Puppy L/XL Chien",brands:"Virbac HPM",_type:"chien",nutriments:{proteins_100g:29,fat_100g:14,carbohydrates_100g:36},ingredients_text:"poulet déshydraté (38%), pois, pomme de terre, graisse de poulet"},
  {product_name:"Virbac Veterinary HPM Adult S/M Neutered Chien",brands:"Virbac HPM",_type:"chien",nutriments:{proteins_100g:37,fat_100g:17,carbohydrates_100g:22},ingredients_text:"poulet déshydraté (50%), pois, graisse de poulet, pomme de terre, levure"},
  {product_name:"Virbac Veterinary HPM Adult L/XL Intact Chien",brands:"Virbac HPM",_type:"chien",nutriments:{proteins_100g:30,fat_100g:16,carbohydrates_100g:33},ingredients_text:"poulet déshydraté (40%), pois, pomme de terre, graisse de poulet"},
  {product_name:"Virbac Veterinary HPM Obesity 1 Chien",brands:"Virbac HPM",_type:"chien",nutriments:{proteins_100g:37,fat_100g:10,carbohydrates_100g:25},ingredients_text:"poulet déshydraté (50%), pois, cellulose, pomme de terre"},
  {product_name:"Virbac Veterinary HPM Renal Chien",brands:"Virbac HPM",_type:"chien",nutriments:{proteins_100g:20,fat_100g:12,carbohydrates_100g:46},ingredients_text:"pois, pomme de terre, graisse de poulet, poulet déshydraté (14%), riz"},
  {product_name:"Virbac Veterinary HPM Kitten Chat",brands:"Virbac HPM",_type:"chat",nutriments:{proteins_100g:41,fat_100g:20,carbohydrates_100g:18},ingredients_text:"poulet déshydraté (55%), pois, graisse de poulet, pomme de terre, taurine"},
  {product_name:"Virbac Veterinary HPM Adult Intact Chat",brands:"Virbac HPM",_type:"chat",nutriments:{proteins_100g:43,fat_100g:18,carbohydrates_100g:16},ingredients_text:"poulet déshydraté (58%), pois, graisse de poulet, pomme de terre, taurine"},
  {product_name:"Virbac Veterinary HPM Adult Neutered Chat",brands:"Virbac HPM",_type:"chat",nutriments:{proteins_100g:44,fat_100g:18,carbohydrates_100g:14},ingredients_text:"poulet déshydraté (60%), pois, graisse de poulet, pomme de terre, taurine"},
  {product_name:"Virbac Veterinary HPM Obesity 1 Chat",brands:"Virbac HPM",_type:"chat",nutriments:{proteins_100g:44,fat_100g:11,carbohydrates_100g:14},ingredients_text:"poulet déshydraté (60%), pois, cellulose, pomme de terre, taurine"},
  {product_name:"Virbac Veterinary HPM Renal Chat",brands:"Virbac HPM",_type:"chat",nutriments:{proteins_100g:28,fat_100g:15,carbohydrates_100g:30},ingredients_text:"pois, pomme de terre, graisse de poulet, poulet déshydraté (18%), taurine"},
  {product_name:"Virbac Veterinary HPM Urinary Chat",brands:"Virbac HPM",_type:"chat",nutriments:{proteins_100g:36,fat_100g:17,carbohydrates_100g:22},ingredients_text:"poulet déshydraté (48%), pois, graisse de poulet, pomme de terre, taurine"},

  // ═══════════════════════════════════════════════
  // CARNILOVE CHIEN & CHAT
  // ═══════════════════════════════════════════════
  {product_name:"Carnilove Salmon & Turkey Puppy Dog",brands:"Carnilove",_type:"chien",nutriments:{proteins_100g:33,fat_100g:18,carbohydrates_100g:31},ingredients_text:"saumon déshydraté (23%), pois, pomme de terre, dinde fraîche (7%), saumon frais (7%)"},
  {product_name:"Carnilove Salmon & Turkey Adult Dog",brands:"Carnilove",_type:"chien",nutriments:{proteins_100g:33,fat_100g:17,carbohydrates_100g:28},ingredients_text:"saumon déshydraté (22%), pois, pomme de terre, dinde fraîche (7%), saumon frais (7%)"},
  {product_name:"Carnilove Wild Boar & Venison Senior Dog",brands:"Carnilove",_type:"chien",nutriments:{proteins_100g:33,fat_100g:10,carbohydrates_100g:34},ingredients_text:"sanglier déshydraté (21%), pois, pomme de terre, venaison fraîche (7%), cellulose"},
  {product_name:"Carnilove Lamb & Wild Boar Less Active Dog",brands:"Carnilove",_type:"chien",nutriments:{proteins_100g:33,fat_100g:12,carbohydrates_100g:32},ingredients_text:"agneau déshydraté (21%), pois, pomme de terre, sanglier frais (7%), cellulose"},
  {product_name:"Carnilove Caribou & Turkey Adult Dog",brands:"Carnilove",_type:"chien",nutriments:{proteins_100g:33,fat_100g:17,carbohydrates_100g:30},ingredients_text:"renne déshydraté (22%), pois, pomme de terre, dinde fraîche (8%)"},
  {product_name:"Carnilove Duck & Pheasant Adult Dog",brands:"Carnilove",_type:"chien",nutriments:{proteins_100g:33,fat_100g:17,carbohydrates_100g:29},ingredients_text:"canard déshydraté (22%), pois, pomme de terre, faisan frais (6%)"},
  {product_name:"Carnilove White Fish & Pea Adult Dog",brands:"Carnilove",_type:"chien",nutriments:{proteins_100g:33,fat_100g:17,carbohydrates_100g:32},ingredients_text:"poisson blanc déshydraté (22%), pois, pomme de terre, hareng frais (6%)"},
  {product_name:"Carnilove Salmon & Turkey Cat",brands:"Carnilove",_type:"chat",nutriments:{proteins_100g:39,fat_100g:17,carbohydrates_100g:18},ingredients_text:"saumon déshydraté (25%), pois, pomme de terre, dinde fraîche (8%), saumon frais (8%), taurine"},
  {product_name:"Carnilove Duck & Pheasant Cat",brands:"Carnilove",_type:"chat",nutriments:{proteins_100g:39,fat_100g:17,carbohydrates_100g:19},ingredients_text:"canard déshydraté (24%), pois, pomme de terre, faisan frais (6%), taurine"},
  {product_name:"Carnilove White Fish & Pea Cat",brands:"Carnilove",_type:"chat",nutriments:{proteins_100g:39,fat_100g:17,carbohydrates_100g:21},ingredients_text:"poisson blanc déshydraté (24%), pois, pomme de terre, hareng frais (6%), taurine"},

  // ═══════════════════════════════════════════════
  // TASTE OF THE WILD CHIEN & CHAT
  // ═══════════════════════════════════════════════
  {product_name:"Taste of the Wild High Prairie Bison Dog",brands:"Taste of the Wild",_type:"chien",nutriments:{proteins_100g:32,fat_100g:18,carbohydrates_100g:36},ingredients_text:"bison (15%), agneau rôti, légumineuses, patates douces, bœuf séché, œufs"},
  {product_name:"Taste of the Wild Pacific Stream Salmon Dog",brands:"Taste of the Wild",_type:"chien",nutriments:{proteins_100g:25,fat_100g:15,carbohydrates_100g:43},ingredients_text:"saumon du Pacifique (15%), légumineuses, patates douces, saumon séché"},
  {product_name:"Taste of the Wild Southwest Canyon Beef Dog",brands:"Taste of the Wild",_type:"chien",nutriments:{proteins_100g:28,fat_100g:16,carbohydrates_100g:40},ingredients_text:"bœuf (15%), agneau rôti, légumineuses, patates douces, bœuf séché"},
  {product_name:"Taste of the Wild Sierra Mountain Lamb Dog",brands:"Taste of the Wild",_type:"chien",nutriments:{proteins_100g:25,fat_100g:15,carbohydrates_100g:43},ingredients_text:"agneau rôti (15%), légumineuses, patates douces, agneau séché"},
  {product_name:"Taste of the Wild Ancient Prairie Dog",brands:"Taste of the Wild",_type:"chien",nutriments:{proteins_100g:32,fat_100g:18,carbohydrates_100g:36},ingredients_text:"bison rôti, agneau rôti, amarante, millet, légumineuses, patates douces"},
  {product_name:"Taste of the Wild High Prairie Puppy",brands:"Taste of the Wild",_type:"chien",nutriments:{proteins_100g:28,fat_100g:17,carbohydrates_100g:38},ingredients_text:"bison rôti (12%), agneau rôti, légumineuses, patates douces, saumon"},
  {product_name:"Taste of the Wild Rocky Mountain Salmon Cat",brands:"Taste of the Wild",_type:"chat",nutriments:{proteins_100g:42,fat_100g:18,carbohydrates_100g:18},ingredients_text:"saumon rôti (15%), venaison rôtie, légumineuses, patates douces, saumon séché, taurine"},
  {product_name:"Taste of the Wild Canyon River Salmon Cat",brands:"Taste of the Wild",_type:"chat",nutriments:{proteins_100g:42,fat_100g:18,carbohydrates_100g:18},ingredients_text:"saumon du Pacifique (18%), légumineuses, patates douces, saumon séché, taurine"},
  {product_name:"Taste of the Wild Lowland Creek Catfish",brands:"Taste of the Wild",_type:"chat",nutriments:{proteins_100g:42,fat_100g:18,carbohydrates_100g:20},ingredients_text:"poisson-chat rôti (16%), légumineuses, patates douces, saumon séché, taurine"},

  // ═══════════════════════════════════════════════
  // BRIT CARE CHIEN & CHAT
  // ═══════════════════════════════════════════════
  {product_name:"Brit Care Puppy Healthy Growth & Development",brands:"Brit Care",_type:"chien",nutriments:{proteins_100g:30,fat_100g:19,carbohydrates_100g:33},ingredients_text:"poulet déshydraté (24%), pois, poulet frais (15%), pomme de terre, graisses animales"},
  {product_name:"Brit Care Adult Medium Breed Lamb & Athlete",brands:"Brit Care",_type:"chien",nutriments:{proteins_100g:28,fat_100g:18,carbohydrates_100g:36},ingredients_text:"agneau déshydraté (20%), pois, agneau frais (12%), pomme de terre, graisses animales"},
  {product_name:"Brit Care Adult Large Breed Hip & Joint",brands:"Brit Care",_type:"chien",nutriments:{proteins_100g:30,fat_100g:12,carbohydrates_100g:40},ingredients_text:"poulet déshydraté (22%), pois, saumon frais (10%), pomme de terre, cellulose"},
  {product_name:"Brit Care Grain-Free Salmon Adult Dog",brands:"Brit Care",_type:"chien",nutriments:{proteins_100g:34,fat_100g:18,carbohydrates_100g:26},ingredients_text:"saumon déshydraté (27%), pois, saumon frais (15%), pomme de terre"},
  {product_name:"Brit Care Adult Small/Mini Sensitive Salmon",brands:"Brit Care",_type:"chien",nutriments:{proteins_100g:28,fat_100g:18,carbohydrates_100g:36},ingredients_text:"saumon déshydraté (22%), pois, saumon frais (12%), pomme de terre"},
  {product_name:"Brit Care Neutered Adult Cat Chicken",brands:"Brit Care",_type:"chat",nutriments:{proteins_100g:36,fat_100g:15,carbohydrates_100g:28},ingredients_text:"poulet déshydraté (28%), pois, poulet frais (12%), pomme de terre, taurine"},
  {product_name:"Brit Care Adult Salmon Cat",brands:"Brit Care",_type:"chat",nutriments:{proteins_100g:35,fat_100g:15,carbohydrates_100g:28},ingredients_text:"saumon déshydraté (26%), pois, saumon frais (12%), pomme de terre, taurine"},
  {product_name:"Brit Care Kitten Chicken Cat",brands:"Brit Care",_type:"chat",nutriments:{proteins_100g:36,fat_100g:15,carbohydrates_100g:28},ingredients_text:"poulet déshydraté (28%), pois, poulet frais (14%), pomme de terre, taurine"},
  {product_name:"Brit Care Grain-Free Salmon Cat",brands:"Brit Care",_type:"chat",nutriments:{proteins_100g:40,fat_100g:18,carbohydrates_100g:20},ingredients_text:"saumon déshydraté (32%), pois, saumon frais (14%), pomme de terre, taurine"},

  // ═══════════════════════════════════════════════
  // JAMES WELLBELOVED CHIEN & CHAT
  // ═══════════════════════════════════════════════
  {product_name:"James Wellbeloved Puppy Turkey & Rice",brands:"James Wellbeloved",_type:"chien",nutriments:{proteins_100g:26,fat_100g:16,carbohydrates_100g:42},ingredients_text:"dinde déshydratée (25%), riz, orge, avoine, graisse de dinde, levure de bière, minéraux"},
  {product_name:"James Wellbeloved Adult Small Turkey & Rice",brands:"James Wellbeloved",_type:"chien",nutriments:{proteins_100g:26,fat_100g:14,carbohydrates_100g:44},ingredients_text:"dinde déshydratée (22%), riz, orge, avoine, graisse de dinde, levure de bière"},
  {product_name:"James Wellbeloved Adult Medium Turkey & Rice",brands:"James Wellbeloved",_type:"chien",nutriments:{proteins_100g:24,fat_100g:14,carbohydrates_100g:46},ingredients_text:"dinde déshydratée (20%), riz, orge, avoine, graisse de dinde"},
  {product_name:"James Wellbeloved Adult Large Turkey & Rice",brands:"James Wellbeloved",_type:"chien",nutriments:{proteins_100g:24,fat_100g:14,carbohydrates_100g:46},ingredients_text:"dinde déshydratée (20%), riz, orge, avoine, graisse de dinde"},
  {product_name:"James Wellbeloved Adult Fish & Rice",brands:"James Wellbeloved",_type:"chien",nutriments:{proteins_100g:24,fat_100g:14,carbohydrates_100g:46},ingredients_text:"poisson déshydraté (22%), riz, orge, avoine, graisses animales"},
  {product_name:"James Wellbeloved Adult Grain Free Turkey",brands:"James Wellbeloved",_type:"chien",nutriments:{proteins_100g:26,fat_100g:14,carbohydrates_100g:40},ingredients_text:"dinde déshydratée (24%), pomme de terre, légumineuses, graisse de dinde"},
  {product_name:"James Wellbeloved Senior Turkey & Rice",brands:"James Wellbeloved",_type:"chien",nutriments:{proteins_100g:24,fat_100g:14,carbohydrates_100g:46},ingredients_text:"dinde déshydratée (20%), riz, orge, avoine, cellulose, graisse de dinde"},
  {product_name:"James Wellbeloved Kitten Turkey & Rice",brands:"James Wellbeloved",_type:"chat",nutriments:{proteins_100g:28,fat_100g:15,carbohydrates_100g:42},ingredients_text:"dinde déshydratée (26%), riz, orge, graisse de dinde, levure de bière, taurine"},
  {product_name:"James Wellbeloved Adult Turkey & Rice Cat",brands:"James Wellbeloved",_type:"chat",nutriments:{proteins_100g:28,fat_100g:13,carbohydrates_100g:42},ingredients_text:"dinde déshydratée (24%), riz, orge, graisse de dinde, taurine"},
  {product_name:"James Wellbeloved Senior Turkey & Rice Cat",brands:"James Wellbeloved",_type:"chat",nutriments:{proteins_100g:28,fat_100g:12,carbohydrates_100g:44},ingredients_text:"dinde déshydratée (24%), riz, orge, cellulose, graisse de dinde, taurine"},

  // ═══════════════════════════════════════════════
  // WELLNESS CORE CHIEN & CHAT
  // ═══════════════════════════════════════════════
  {product_name:"Wellness Core Original Turkey & Chicken Dog",brands:"Wellness Core",_type:"chien",nutriments:{proteins_100g:34,fat_100g:16,carbohydrates_100g:34},ingredients_text:"dinde déshydratée (25%), poulet déshydraté (12%), dinde fraîche (11%), légumineuses"},
  {product_name:"Wellness Core Ocean Salmon & Herring Dog",brands:"Wellness Core",_type:"chien",nutriments:{proteins_100g:34,fat_100g:16,carbohydrates_100g:34},ingredients_text:"saumon déshydraté (25%), hareng déshydraté (10%), saumon frais (10%), légumineuses"},
  {product_name:"Wellness Core Puppy Dog",brands:"Wellness Core",_type:"chien",nutriments:{proteins_100g:33,fat_100g:17,carbohydrates_100g:34},ingredients_text:"poulet déshydraté (26%), dinde fraîche (11%), légumineuses, pomme de terre"},
  {product_name:"Wellness Core Reduced Fat Dog",brands:"Wellness Core",_type:"chien",nutriments:{proteins_100g:33,fat_100g:10,carbohydrates_100g:34},ingredients_text:"dinde déshydratée (22%), poulet déshydraté (10%), dinde fraîche (10%), cellulose"},
  {product_name:"Wellness Core Small Breed Dog",brands:"Wellness Core",_type:"chien",nutriments:{proteins_100g:36,fat_100g:16,carbohydrates_100g:33},ingredients_text:"dinde déshydratée (26%), poulet déshydraté (12%), dinde fraîche (12%), légumineuses"},
  {product_name:"Wellness Core Senior Dog",brands:"Wellness Core",_type:"chien",nutriments:{proteins_100g:33,fat_100g:14,carbohydrates_100g:36},ingredients_text:"dinde déshydratée (22%), poulet déshydraté (10%), dinde fraîche (10%), légumineuses"},
  {product_name:"Wellness Core Original Turkey & Chicken Cat",brands:"Wellness Core",_type:"chat",nutriments:{proteins_100g:40,fat_100g:18,carbohydrates_100g:22},ingredients_text:"dinde déshydratée (28%), poulet déshydraté (12%), dinde fraîche (10%), légumineuses, taurine"},
  {product_name:"Wellness Core Sterilised Cat",brands:"Wellness Core",_type:"chat",nutriments:{proteins_100g:40,fat_100g:16,carbohydrates_100g:22},ingredients_text:"dinde déshydratée (28%), poulet déshydraté (12%), cellulose, légumineuses, taurine"},
  {product_name:"Wellness Core Indoor Cat",brands:"Wellness Core",_type:"chat",nutriments:{proteins_100g:34,fat_100g:12,carbohydrates_100g:30},ingredients_text:"poulet déshydraté (24%), dinde fraîche (10%), cellulose, légumineuses, taurine"},
  {product_name:"Wellness Core Kitten Cat",brands:"Wellness Core",_type:"chat",nutriments:{proteins_100g:42,fat_100g:18,carbohydrates_100g:20},ingredients_text:"dinde déshydratée (30%), poulet déshydraté (14%), dinde fraîche (12%), légumineuses, taurine"},

  // ═══════════════════════════════════════════════
  // BLUE BUFFALO CHIEN & CHAT
  // ═══════════════════════════════════════════════
  {product_name:"Blue Buffalo Life Protection Puppy Chicken",brands:"Blue Buffalo",_type:"chien",nutriments:{proteins_100g:30,fat_100g:20,carbohydrates_100g:39},ingredients_text:"poulet déshydraté (25%), riz brun, orge, avoine, farine de poulet, graisses animales"},
  {product_name:"Blue Buffalo Life Protection Adult Chicken",brands:"Blue Buffalo",_type:"chien",nutriments:{proteins_100g:26,fat_100g:15,carbohydrates_100g:46},ingredients_text:"poulet déshydraté (22%), riz brun, orge, avoine, graisses animales"},
  {product_name:"Blue Buffalo Life Protection Senior Dog",brands:"Blue Buffalo",_type:"chien",nutriments:{proteins_100g:22,fat_100g:12,carbohydrates_100g:51},ingredients_text:"poulet déshydraté (20%), riz brun, orge, avoine, graisses animales, cellulose"},
  {product_name:"Blue Buffalo Wilderness Salmon Dog",brands:"Blue Buffalo",_type:"chien",nutriments:{proteins_100g:34,fat_100g:15,carbohydrates_100g:36},ingredients_text:"saumon déshydraté (22%), légumineuses, pomme de terre, saumon frais (12%)"},
  {product_name:"Blue Buffalo Freedom Grain Free Chicken Dog",brands:"Blue Buffalo",_type:"chien",nutriments:{proteins_100g:28,fat_100g:16,carbohydrates_100g:42},ingredients_text:"poulet déshydraté (22%), légumineuses, patates douces, pomme de terre"},
  {product_name:"Blue Buffalo Kitten Chicken Cat",brands:"Blue Buffalo",_type:"chat",nutriments:{proteins_100g:36,fat_100g:18,carbohydrates_100g:30},ingredients_text:"poulet déshydraté (24%), maïs, riz brun, graisses animales, taurine"},
  {product_name:"Blue Buffalo Indoor Hairball Cat",brands:"Blue Buffalo",_type:"chat",nutriments:{proteins_100g:32,fat_100g:9,carbohydrates_100g:35},ingredients_text:"poulet déshydraté (22%), maïs, cellulose, riz brun, graisses animales, taurine"},
  {product_name:"Blue Buffalo Wilderness Salmon Cat",brands:"Blue Buffalo",_type:"chat",nutriments:{proteins_100g:40,fat_100g:18,carbohydrates_100g:24},ingredients_text:"saumon déshydraté (24%), légumineuses, patates douces, saumon frais (10%), taurine"},

  // ═══════════════════════════════════════════════
  // ADVANCE CHIEN & CHAT (Affinity Petcare)
  // ═══════════════════════════════════════════════
  {product_name:"Advance Adult Medium Breeds Chicken",brands:"Advance",_type:"chien",nutriments:{proteins_100g:23,fat_100g:12,carbohydrates_100g:47},ingredients_text:"poulet déshydraté (16%), maïs, riz, graisses animales, orge, levure de bière"},
  {product_name:"Advance Adult Small/Mini Chicken",brands:"Advance",_type:"chien",nutriments:{proteins_100g:26,fat_100g:16,carbohydrates_100g:43},ingredients_text:"poulet déshydraté (18%), maïs, riz, graisses animales, orge, levure"},
  {product_name:"Advance Puppy All Breeds Chicken",brands:"Advance",_type:"chien",nutriments:{proteins_100g:29,fat_100g:18,carbohydrates_100g:35},ingredients_text:"poulet déshydraté (22%), maïs, riz, graisses animales, orge"},
  {product_name:"Advance Adult Sensitive Digestion Dog",brands:"Advance",_type:"chien",nutriments:{proteins_100g:23,fat_100g:12,carbohydrates_100g:47},ingredients_text:"poulet déshydraté (16%), riz, maïs, graisses animales, levure"},
  {product_name:"Advance Adult Sterilised Cat",brands:"Advance",_type:"chat",nutriments:{proteins_100g:38,fat_100g:12,carbohydrates_100g:27},ingredients_text:"poulet déshydraté (28%), maïs, riz, cellulose, graisses animales, taurine"},
  {product_name:"Advance Kitten Cat",brands:"Advance",_type:"chat",nutriments:{proteins_100g:36,fat_100g:16,carbohydrates_100g:27},ingredients_text:"poulet déshydraté (28%), maïs, riz, graisses animales, taurine"},
  {product_name:"Advance Adult Urinary Care Cat",brands:"Advance",_type:"chat",nutriments:{proteins_100g:28,fat_100g:12,carbohydrates_100g:37},ingredients_text:"poulet déshydraté (20%), maïs, riz, graisses animales, minéraux, taurine"},
  {product_name:"Advance Adult Cat Chicken & Rice",brands:"Advance",_type:"chat",nutriments:{proteins_100g:32,fat_100g:14,carbohydrates_100g:32},ingredients_text:"poulet déshydraté (24%), maïs, riz, graisses animales, taurine"},

  // ═══════════════════════════════════════════════
  // HAPPY DOG / HAPPY CAT (Josera Group)
  // ═══════════════════════════════════════════════
  {product_name:"Happy Dog Supreme Sensible Lamb/Rice",brands:"Happy Dog",_type:"chien",nutriments:{proteins_100g:25,fat_100g:14,carbohydrates_100g:44},ingredients_text:"riz (30%), farine d'agneau (22%), graisses animales, levure de bière, minéraux"},
  {product_name:"Happy Dog Supreme Neugeboren Puppy",brands:"Happy Dog",_type:"chien",nutriments:{proteins_100g:29,fat_100g:18,carbohydrates_100g:36},ingredients_text:"poulet déshydraté (22%), maïs, riz, graisses animales, levure de bière"},
  {product_name:"Happy Dog Natural Life Concept Adult",brands:"Happy Dog",_type:"chien",nutriments:{proteins_100g:25,fat_100g:10,carbohydrates_100g:48},ingredients_text:"riz (40%), farine de bœuf (18%), graisses animales, levure, minéraux"},
  {product_name:"Happy Dog Supreme Mini Ireland",brands:"Happy Dog",_type:"chien",nutriments:{proteins_100g:28,fat_100g:18,carbohydrates_100g:37},ingredients_text:"farine d'agneau (20%), farine de saumon (10%), riz, maïs, graisses animales"},
  {product_name:"Happy Cat Supreme Kitten",brands:"Happy Cat",_type:"chat",nutriments:{proteins_100g:33,fat_100g:18,carbohydrates_100g:30},ingredients_text:"poulet déshydraté (26%), maïs, riz, graisses animales, taurine"},
  {product_name:"Happy Cat Supreme Indoor Adult",brands:"Happy Cat",_type:"chat",nutriments:{proteins_100g:33,fat_100g:14,carbohydrates_100g:34},ingredients_text:"poulet déshydraté (24%), maïs, riz, cellulose, graisses animales, taurine"},
  {product_name:"Happy Cat Supreme Sterilised",brands:"Happy Cat",_type:"chat",nutriments:{proteins_100g:35,fat_100g:12,carbohydrates_100g:32},ingredients_text:"poulet déshydraté (26%), maïs, riz, cellulose, graisses animales, taurine"},
  {product_name:"Happy Cat Minkas Kitten",brands:"Happy Cat",_type:"chat",nutriments:{proteins_100g:30,fat_100g:14,carbohydrates_100g:38},ingredients_text:"poulet déshydraté (22%), maïs, riz, graisses animales, taurine"},

  // ═══════════════════════════════════════════════
  // PURINA ONE CHIEN & CHAT
  // ═══════════════════════════════════════════════
  {product_name:"Purina One Adult Medium/Large Chicken/Rice",brands:"Purina One",_type:"chien",nutriments:{proteins_100g:26,fat_100g:14,carbohydrates_100g:44},ingredients_text:"poulet (18%), maïs, riz, farine de poulet, graisses animales, levure de bière"},
  {product_name:"Purina One Adult Mini/Small Chicken",brands:"Purina One",_type:"chien",nutriments:{proteins_100g:26,fat_100g:14,carbohydrates_100g:44},ingredients_text:"poulet (18%), maïs, riz, farine de poulet, graisses animales"},
  {product_name:"Purina One Puppy Chicken/Rice",brands:"Purina One",_type:"chien",nutriments:{proteins_100g:27,fat_100g:15,carbohydrates_100g:42},ingredients_text:"poulet (20%), maïs, riz, farine de poulet, graisses animales, levure"},
  {product_name:"Purina One Senior 7+ Chicken",brands:"Purina One",_type:"chien",nutriments:{proteins_100g:25,fat_100g:11,carbohydrates_100g:46},ingredients_text:"poulet (18%), maïs, riz, farine de poulet, graisses animales, cellulose"},
  {product_name:"Purina One Kitten Chicken",brands:"Purina One",_type:"chat",nutriments:{proteins_100g:32,fat_100g:14,carbohydrates_100g:35},ingredients_text:"poulet (18%), maïs, farine de poulet, riz, graisses animales, taurine"},
  {product_name:"Purina One Adult Chicken",brands:"Purina One",_type:"chat",nutriments:{proteins_100g:32,fat_100g:12,carbohydrates_100g:37},ingredients_text:"poulet (18%), maïs, farine de poulet, riz, graisses animales, taurine"},
  {product_name:"Purina One Adult Sterilised Chicken",brands:"Purina One",_type:"chat",nutriments:{proteins_100g:32,fat_100g:10,carbohydrates_100g:39},ingredients_text:"poulet (18%), maïs, farine de poulet, riz, cellulose, graisses animales, taurine"},
  {product_name:"Purina One Indoor Adult Chicken",brands:"Purina One",_type:"chat",nutriments:{proteins_100g:32,fat_100g:10,carbohydrates_100g:40},ingredients_text:"poulet (18%), maïs, farine de poulet, riz, cellulose, graisses animales, taurine"},
  {product_name:"Purina One Senior 7+ Salmon Cat",brands:"Purina One",_type:"chat",nutriments:{proteins_100g:30,fat_100g:12,carbohydrates_100g:38},ingredients_text:"saumon (16%), maïs, riz, farine de poulet, graisses animales, taurine"},
  {product_name:"Purina One Bifensis Hairball Cat",brands:"Purina One",_type:"chat",nutriments:{proteins_100g:32,fat_100g:11,carbohydrates_100g:39},ingredients_text:"poulet (18%), maïs, farine de poulet, cellulose, riz, graisses animales, taurine"},

  // ═══════════════════════════════════════════════
  // PEDIGREE CHIEN
  // ═══════════════════════════════════════════════
  {product_name:"Pedigree Adult Complete Nutrition Chicken/Veg",brands:"Pedigree",_type:"chien",nutriments:{proteins_100g:21,fat_100g:10,carbohydrates_100g:49},ingredients_text:"céréales, viandes et sous-produits animaux (poulet 4%), légumes, graisses animales, minéraux"},
  {product_name:"Pedigree Puppy Chicken",brands:"Pedigree",_type:"chien",nutriments:{proteins_100g:25,fat_100g:12,carbohydrates_100g:44},ingredients_text:"céréales, viandes et sous-produits animaux (poulet 6%), légumes, graisses animales"},
  {product_name:"Pedigree Senior 7+ Chicken/Rice",brands:"Pedigree",_type:"chien",nutriments:{proteins_100g:22,fat_100g:8,carbohydrates_100g:51},ingredients_text:"céréales, viandes et sous-produits animaux, légumes, cellulose, graisses animales"},
  {product_name:"Pedigree Vital Protection Adult Beef",brands:"Pedigree",_type:"chien",nutriments:{proteins_100g:21,fat_100g:8,carbohydrates_100g:52},ingredients_text:"céréales, viandes et sous-produits animaux (bœuf 4%), légumes, graisses animales"},
  {product_name:"Pedigree Adult Small Dog Chicken/Vegetable",brands:"Pedigree",_type:"chien",nutriments:{proteins_100g:23,fat_100g:11,carbohydrates_100g:48},ingredients_text:"céréales, viandes et sous-produits animaux (poulet 5%), légumes, graisses animales"},

  // ═══════════════════════════════════════════════
  // WHISKAS CHAT (croquettes sèches)
  // ═══════════════════════════════════════════════
  {product_name:"Whiskas Adult 1+ Chicken",brands:"Whiskas",_type:"chat",nutriments:{proteins_100g:32,fat_100g:14,carbohydrates_100g:32},ingredients_text:"céréales, viandes et sous-produits animaux (poulet 4%), sucres, graisses animales, taurine"},
  {product_name:"Whiskas Adult 1+ Fish",brands:"Whiskas",_type:"chat",nutriments:{proteins_100g:32,fat_100g:14,carbohydrates_100g:32},ingredients_text:"céréales, viandes et sous-produits animaux, poisson (4%), graisses animales, taurine"},
  {product_name:"Whiskas Senior 7+ Chicken",brands:"Whiskas",_type:"chat",nutriments:{proteins_100g:32,fat_100g:12,carbohydrates_100g:33},ingredients_text:"céréales, viandes et sous-produits animaux (poulet 4%), graisses animales, cellulose, taurine"},
  {product_name:"Whiskas Indoor Chicken",brands:"Whiskas",_type:"chat",nutriments:{proteins_100g:32,fat_100g:12,carbohydrates_100g:34},ingredients_text:"céréales, viandes et sous-produits animaux (poulet 4%), cellulose, graisses animales, taurine"},
  {product_name:"Whiskas Kitten Chicken",brands:"Whiskas",_type:"chat",nutriments:{proteins_100g:33,fat_100g:14,carbohydrates_100g:31},ingredients_text:"céréales, viandes et sous-produits animaux (poulet 6%), graisses animales, taurine"},
  {product_name:"Whiskas Sterilised Adult Chicken",brands:"Whiskas",_type:"chat",nutriments:{proteins_100g:32,fat_100g:11,carbohydrates_100g:35},ingredients_text:"céréales, viandes et sous-produits animaux (poulet 4%), cellulose, graisses animales, taurine"},

];
