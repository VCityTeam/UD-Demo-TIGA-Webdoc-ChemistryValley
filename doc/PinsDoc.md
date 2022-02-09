## Pins documentation 

Object 3D interactif pointant sur des centre d'intéret dans la scène 3D de UD-Viz.
Ces éléments interactifs sont representés par une bulle d'image ainsi qu'une épingle ; l'image permet de donner un aperçu sur le contenu qui sera afficher si l'utilisateur intéragit avec en cliquant sur celui-ci. 

<p float="left">
<img src="/doc/img/pinsCapture.PNG" alt="pins" width="250"/>
</p>

### Technical details

Le pins doit avoir une position georéférence dans le type de projection de votre scène ainsi que deux images correspondant à l'aperçu du contenu du pins vérouillé et dévérouillé. 

L'element 3D peut être vérrouillé ou dévérouillé en fonction de sa valeur dans le fichier de config. Cette valeur dépend d'ou se trouve l'utilisateur dans le visionnage d'un épisode. Le contenu pourra être accessible que si celui-ci à 

Une fois dévérouillé, l'épingle est accessible et intéractive pour afficher le contenu de ce point d'intéret plus en détail. Une fenêtre html apparait et donne une description de la zone que pointe l'élement. 


