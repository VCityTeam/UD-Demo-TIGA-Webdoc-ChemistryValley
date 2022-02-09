# TIGA-Webdocumentaire
***
<p float="left">
<img src="https://github.com/VCityTeam/TIGA-Webdocumentaire/blob/main/documents/pictures/interfora.png" alt="Home" width="150"/>
<img src="https://github.com/VCityTeam/TIGA-Webdocumentaire/blob/main/documents/pictures/liris.png" alt="Home" width="150"/>
 <img src="https://github.com/VCityTeam/TIGA-Webdocumentaire/blob/main/documents/pictures/udl.png" alt="Home" width="150"/>
</p>

***

## Introduction

« Derrière les fumées » est un jumeau digital du couloir de la chimie, qui invite à aller à la rencontre des familles et des acteurs économiques et publics, qui vivent, se forment, et travaillent dans la vallée. Il désenchevêtre tous ces tuyaux entremêlés et donne du sens à ces produits mystérieux qui sortent tous les jours de ces usines. A quoi cela peut servir ? Où est-ce que je les rencontre au quotidien ? Pourquoi la plupart des maux de tête du monde sont soignés grâce à la vallée de la chimie ? Au travers d’un web documentaire gamifié et participatif, les acteurs du territoire, qu’ils soient citoyens usagers ou habitants pourront se forger leur propre opinion, participer au débat public et dissiper leur propre écran de fumée.
Ce jeu documentaire, dans lequel tout est réel, amène les participants, au travers d’une enquête interactive, à confronter l’ensemble de leurs points de vue pour mesurer les enjeux, l’engagement responsable de la vallée et l’impact de ces usines sur nos vies au quotidien. Pour entrer en « mode action », les spectateurs sont invités à voter, à soumettre aux votes et aux avis des autres joueurs des actions concrètes pour faire évoluer les pratiques, pour mieux connaître le territoire, pour mieux se comprendre et ainsi devenir acteur du territoire.

*** 
## Objectifs
* Découvrir le couloir de la chimie autrement, avec la vision humaine des acteurs du territoire.
* Donner à voire le rayonnement et l’attractivité du territoire et des métiers.
* Favoriser la rencontre des acteurs pour créer des synergies et du développement économique, écologique et du lien social
* Permettre à chaque citoyen de participer au débat public.
* Proposer une documentation en continue et diachronique de la vallée de la chimie.

Ce web-documentaire itéractif est composé de deux parties. Une première partie qui correspond à une web série ou chaque épisode aborderons un thème spécifique de la vallée de la chimie; le premier épisode sera sur l'emploi et la formation. Et d'un deuxieme format qui est une carte intéractive de la vallée ou différent éléments seront déposés sur des points clefs de l'industrie. Cela permet de proposer une déambulation plus ludique dans cette zone afin de mieux comprendre la configuration de ce territoire. 
*** 
### Episodes (Interfora)
 Chaque épisode de la web-série est composé de plusieurs format de média. Nous voulons impliquer un maximum l'utilisateur et rendre la visualisation plus dynamique. Des vidéos en 360 ou des interviews contradictoires vont être produit chez Interfora gràce à Unity un moteur de jeu. 
*** 
### Maquette (Liris)
La carte intéractive représente une grande partie de la vallée de la chimie avec en modélisation 3D les villes de Saint-fons, Feyzin, Iriginy Lyon 7, Pierre-Bénite, Grigny, Solaize, Vernaison et Givors. Cette modélisation est généré à partir des données CityGML du [DataGrandLyon](https://data.grandlyon.com/jeux-de-donnees/maquettes-3d-texturees-2018-communes-metropole-lyon/donnees) et transformé à l'aide de [py3dtilers](https://github.com/VCityTeam/py3dtilers) une librairie pour produire des 3DTiles, un format de donnée géospatial optimisé pour les applications web. 

<p float="center">
 <img src="/doc/img/maquette.PNG" alt="Home" width="500"/>
</p>

#### Documentation technique

Cette maquette repose sur la librairie [UD-Viz](https://github.com/VCityTeam/UD-SV) qui permet une visualisation des données urbaines de la métropole de Lyon. [UD-Viz](https://github.com/VCityTeam/UD-SV) est construit avec différents composants permettant l'amelioration à la visualisation des données urbaines. Toutefois dans cette démonstration nous n'utilisons pas tout les composants, voici la list de ceux intégré dans la vallée de la chimie :
- [Tutoriel](https://github.com/VCityTeam/UD-Viz/blob/aecb5e71d17532af8d25b21c6a08addb585acc57/docs/static/Doc/User/ContributeData.md) : Documentation pour aider à l'utilisation d'UD-Viz.
- [3DTiles](https://github.com/VCityTeam/UD-Viz/blob/master/src/Components/3DTiles/Docs/TilesManager.md) : l'integration de 3DTiles dans une scène 3D à l'aide la bibliothèque [itowns](http://www.itowns-project.org/).
- [Geojson layer]() : Visualisation de couches de données urbaines 2D en format GeoJson.
- [Pins visualizer](/doc/PinsDoc.md) : Element intéractif 3D disposé dans la scène pour donner plus de détails sur des points d'interêt.
- [Compass](/doc/PinsDoc.md) : Compas pour mieux se repérer dans la scène.

#### Installation 

Ouvrez un invité de commandes et lancez les lignes suivantes :
```
npm install
npm run debug     
```
Ensuite utilisez un navigateur quelconque pour ouvrir cette fenêtre :
`http://localhost:8000/`.

Cette demonstration peut également être lancé par le docker suivant : [Docker]().

Une version en ligne peut être également trouvée [ici](https://www.derrierelesfumees.com/_Contenusdlf/Carte/index.html)  
*** 
## Atelier maquette
Dans le cadre de la fête de la science une maquette Lego a été produite afin d'effectuer un premier essai sur la médiation hybride mélangant webdocumentaire et maquette tangible. Pour ce fait nous avons utilisé le [legonizer]() (Code open source) avec comme emprise la raffinerie de Feyzin pour construire en en légo la maquette. Celle-ci est constituée de 330 légo environ et est basé sur les données du [data grand lyon](https://data.grandlyon.com/jeux-de-donnees/maquettes-3d-texturees-2018-communes-metropole-lyon/donnees). Elles correspondent aux bâtiments 3D de 2018. Cela a pris une demi-journée pour relancer le processus et la construction. 
