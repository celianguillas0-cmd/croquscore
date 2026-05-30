# CrocScore — Documentation des sources de données

## Base locale CrocScore (`localdb.js`)

### Nature des données

La base locale CrocScore contient environ **12 900 produits** (aliments pour chiens et chats).
Pour chaque produit, les informations stockées sont :
- Nom du produit (`product_name`)
- Marque (`brands`)
- Type d'animal (`_type` : "chien" ou "chat")
- Liste des ingrédients (`ingredients_text`)

**Aucune valeur nutritionnelle chiffrée** (protéines, lipides, glucides) n'est associée à ces produits depuis la mise à jour légale du 16 mai 2026.

### Méthode de constitution

Les listes d'ingrédients ont été **compilées manuellement** à partir d'informations publiques légalement obligatoires :

1. **Sites officiels des fabricants** — Les fabricants d'aliments pour animaux sont légalement tenus de publier la composition de leurs produits en application du règlement (CE) n° 767/2009 du 13 juillet 2009 (mise sur le marché et utilisation des aliments pour animaux, art. 17 et annexe IV). Ces informations sont accessibles librement sur les sites web des marques.

2. **Étiquettes produits** — La composition complète par ordre pondéral décroissant est une mention d'étiquetage obligatoire (règlement CE 767/2009, art. 17). Ces données sont des divulgations imposées par la loi, sans expression créative de l'auteur.

3. **Fiches produits de revendeurs spécialisés** — Les revendeurs en ligne (Zooplus, Amazon, Wanimo, etc.) reproduisent légalement les compositions obligatoires communiquées par les fabricants dans leurs propres fiches produits.

### Fondement juridique de la compilation

Les listes d'ingrédients d'aliments pour animaux ne sont **pas protégeables par le droit d'auteur** car :
- Elles sont imposées dans leur forme et leur ordre par une réglementation européenne (CE 767/2009) — l'auteur n'exerce aucun choix créatif
- Elles constituent une information factuelle pure, sans expression de la personnalité de leur rédacteur (critère d'originalité au sens de l'art. L111-1 CPI français, et de la jurisprudence CJCE *Infopaq* C-5/08)

La compilation de ces informations publiques et réglementaires relève de la **liberté d'information** et de l'**intérêt général du consommateur** (cf. jurisprudence Yuka, CA Paris 7 juin 2023 ; CA Aix-en-Provence 6 décembre 2022).

### Méthode de saisie

Les données ont été saisies **manuellement**, produit par produit, via des scripts Node.js de génération (`gen-localdb.js` à `gen-localdb74.js`) au cours du développement de l'application. Aucun outil de scraping automatisé massif n'a été utilisé pour extraire le contenu d'une base de données propriétaire d'un tiers.

Chaque liste d'ingrédients représente une **description indicative** fidèle à l'information publique disponible, pouvant ne pas refléter la formulation exacte ou la formulation actuelle d'un produit.

### Droit sui generis des bases de données

Le droit sui generis (directive 96/9/CE, art. 7 ; art. L341-1 CPI) protège les bases de données ayant nécessité un **investissement substantiel** dans l'obtention, la vérification ou la présentation des données. Ce droit appartient aux fabricants sur leurs propres bases de données produits internes.

CrocScore n'a pas extrait une **partie substantielle** d'une base de données propriétaire unique d'un fabricant (CJCE, 9 novembre 2004, *Fixtures Marketing / British Horseracing Board*, aff. C-46/02 et C-444/02). La compilation a porté sur des **sources multiples et publiques**, sans reproduction intégrale d'aucun catalogue propriétaire.

---

## Base OPFF_DB (`opff_db.js`) — ~632 produits

**Source :** Open Pet Food Facts  
**URL :** https://world.openpetfoodfacts.org  
**Licence :** Open Database License (ODbL) v1.0  
**URL licence :** https://opendatacommons.org/licenses/odbl/1-0/

Données nutritionnelles réelles issues des contributions collaboratives de la base Open Pet Food Facts.
Attribution obligatoire ODbL respectée dans les mentions légales de l'application.

---

## Base MORE_DB (`more_products.js`) — ~1 460 produits

**Source :** Open Pet Food Facts + Open Food Facts  
**URLs :**  
- https://world.openpetfoodfacts.org  
- https://world.openfoodfacts.org  
**Licence :** Open Database License (ODbL) v1.0  
**URL licence :** https://opendatacommons.org/licenses/odbl/1-0/

Données nutritionnelles réelles issues des étiquettes produits, contribuées par la communauté Open Pet Food Facts / Open Food Facts.
Attribution obligatoire ODbL respectée dans les mentions légales de l'application.

---

## Total système (actif en production)

| Base | Produits | Données nutritionnelles | Source |
|---|---|---|---|
| localdb.js | ~12 900 | Aucune (supprimées le 16/05/2026) | Public — étiquettes obligatoires CE 767/2009 |
| opff_db.js | ~632 | Réelles | ODbL — Open Pet Food Facts |
| more_products.js | ~1 460 | Réelles | ODbL — Open Pet Food Facts / Open Food Facts |
| **Total** | **~15 003** | | |

## Fichier retiré : extra_products.js (30 mai 2026)

Le fichier `extra_products.js` (~10 717 produits) a été **supprimé définitivement** du dépôt et du déploiement le 30 mai 2026 pour les raisons suivantes :

- Données nutritionnelles **estimées** (`_estimated: true`) non issues d'étiquettes réelles
- Fichier **non utilisé** dans l'application de production (`index.html`)
- Risque théorique de contestation par des marques (données approximatives publiées sous leur nom)
- Principe de précaution légale : suppression préventive d'une source de risque sans impact utilisateur

Ce fichier n'apparaît plus dans aucun déploiement. Sa suppression est irréversible sur la branche de production.

---

## Politique de correction

Tout fabricant souhaitant signaler une inexactitude dans la liste des ingrédients d'un de ses produits peut contacter :

**Email :** crocscore.help@gmail.com  
**Délai de traitement :** 30 jours ouvrés  
**Objet suggéré :** `[CORRECTION] Nom du produit — Marque`

---

*Document établi le 16 mai 2026*  
*CrocScore — auto-entreprise enregistrée en France*
