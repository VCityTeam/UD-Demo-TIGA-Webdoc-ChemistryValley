## Pins documentation 

Object 3D interactif pointant sur des centre d'intéret dans la scène 3D de UD-Viz.
Ces éléments interactifs sont representés par une bulle d'image ainsi qu'une épingle ; l'image permet de donner un aperçu sur le contenu qui sera afficher si l'utilisateur intéragit avec en cliquant sur celui-ci. 

<p float="left">
<img src="/doc/img/pinsCapture.PNG" alt="pins" width="350"/>
</p>

### Technical details

configEpisodes.json :

 * `lock` : L'element 3D peut être vérrouillé ou dévérouillé en fonction de sa valeur dans le fichier de config. Cette valeur dépend d'ou se trouve l'utilisateur dans le visionnage d'un épisode. Le contenu pourra être accessible que si celui-ci a une valeur à **false**
 *  `position` : la position georéférence dans votre scène avec son type de projection (EPSG:3946) ainsi que deux images correspondant à l'aperçu du contenu du pins vérouillé et dévérouillé. 
 *  `imgUnLock` : le chemin en direction votre image dévérouillé 
 *  `imgLock` : le chemin en direction votre image vérouillé 


<p float="middle">
<img src="/doc/img/configEpisode.PNG" alt="pins" width="600"/>
</p>


Une fois dévérouillé, l'épingle est accessible et intéractive pour afficher le contenu de ce point d'intéret plus en détail. Une fenêtre html apparait et donne une description de la zone que pointe l'élement. 

Code exemple

```javascript
    let content_1 = new EpisodeContent(configEpisode['episode-1-data']['content-1']);
    let content_2 = new EpisodeContent(configEpisode['episode-1-data']['content-2']);
    let content_3 = new EpisodeContent(configEpisode['episode-1-data']['content-3']);
    let listContents = [content_1,content_2,content_3];
```

