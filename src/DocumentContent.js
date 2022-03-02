import '../src/menu-document-content.css';
/**
 * Class to create menu content
 * 
 */
export class DocumentContent { 


  constructMenu(){
    let contentMenuDiv = document.createElement('div');
    contentMenuDiv.id = 'menu-document-content';
    document.getElementById('webgl_View3D').append(contentMenuDiv);

    document.getElementById('menu-document-content').innerHTML = 
      '<nav>\
        <ul id="_all_menu_content">\
            <li class="menu-deroulant">\
            <a href="#">Services</a>\
            <li><a href="#">Graphisme</a></li>\
            <li><a href="#">Web & App</a></li>\
            <li><a href="#">Marketing</a></li>\
        </ul>\
       </nav>\
       ';    
  }

}