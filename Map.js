var tabMap = [ ['F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F'],
                 ['F','F','F','F','O','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F'],
                 ['M','M','M','M','M','M','M','E','M','M','M','M','M','M','M','F','F','F','F','F','F','F','F','F','F','F','F','F'],
                 ['F','F','F','F','F','F','F','E','C','C','C','C','C','C','C','C','C','C','F','F','F','F','F','O','F','F','F','F'],
                 ['F','F','F','F','F','F','F','E','F','F','F','F','M','M','E','F','F','F','M','M','M','M','M','M','M','E','M','M'],
                 ['F','F','F','F','F','F','F','E','F','F','F','F','M','M','E','F','F','F','F','F','F','F','F','F','F','E','F','F'],
                 ['F','F','F','F','F','F','F','E','F','F','F','F','M','M','E','F','F','F','F','F','F','F','O','F','F','E','F','F'],
                 ['M','M','E','M','M','M','M','M','F','F','F','F','M','M','M','M','M','M','M','M','E','M','M','M','M','M','M','M'],
                 ['F','F','E','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','E','F','F','F','F','F','F','F'],
                 ['F','F','E','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','E','F','F','F','F','F','F','F'],
                 ['M','M','M','M','M','M','M','M','M','E','M','M','M','M','M','M','M','M','M','M','E','F','F','F','F','F','F','F'],
                 ['F','F','F','F','F','F','F','F','F','E','F','F','F','F','F','F','F','F','F','F','E','F','F','F','F','F','F','F'],
                 ['F','F','F','F','F','F','F','O','F','E','C','C','C','C','C','C','C','C','C','C','E','F','F','F','O','F','F','F'],
                 ['F','F','F','F','E','M','M','M','M','M','M','F','F','F','F','F','F','F','F','F','M','M','M','M','M','M','M','E'],
                 ['F','F','F','F','E','F','F','F','F','F','F','F','F','F','F','F','F','F','O','F','F','F','F','F','F','F','F','E'],
                 ['M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M','M'],
                 ['B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B'],
                 ['F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F'],
                 ['F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F'],
                 ['F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F'],
                 ['F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F'] ];

  //objets du jeu
  var objImageFond = null;
  var objImageEchelle = null;
  var objImageCorde = null;
  var objImageMur = null;
  var objImageOr = null;
  var objImageBase = null;

/******************************************************************************************
* initImageFond()
*
* initialisation des images de fond
*****************************************************************************************/
function initImageFond() {
    objImageFond = new Image();
    objImageFond.src = 'img/F.png';

    objImageEchelle = new Image();
    objImageEchelle.src = 'img/E.png';

    objImageCorde = new Image();
    objImageCorde.src = 'img/C.png';

    objImageMur = new Image();
    objImageMur.src = 'img/M.png';

    objImageOr = new Image();
    objImageOr.src = 'img/O.png';

    objImageBase = new Image();
    objImageBase.src = 'img/B.png';

}

/******************************************************************************************
  *  dessinerMappe()
  *  Sert à afficher la mappe du jeu à partir du tableau à deux dimensions.
  *  Initialise un tableau d'objets correspondant au tableau de départ.
  *****************************************************************************************/
	function dessinerMappe() {
	    objC2D.save();  // Sauvegarde le contexte
      var intTailleTuile = 40;
			var intTuileX = intTailleTuile;
      var intTuileY = intTailleTuile;

      for (var row = 0; row < tabMap.length; row++) {
        for (var col = 0; col < tabMap[row].length; col++) {
          intTuileX = col * intTailleTuile;
					intTuileY = row * intTailleTuile;

          var objet = new Object();

          switch (tabMap[row][col]) {
            case 'F': objC2D.drawImage(objImageFond, intTuileX, intTuileY, 40, 40);
            objet.objNom = "FOND";
            objet.objImage = objImageFond;
            objet.intLongeur = 40;
            objet.intLargeur = 40;
            objet.posX = intTuileX + 20;
            objet.posY = intTuileY + 20;
              break;

            case 'E': objC2D.drawImage(objImageEchelle, intTuileX, intTuileY, 40, 40);
            objet.objNom = "ECHELLE";
            objet.objImage = objImageEchelle;
            objet.intLongeur = 40;
            objet.intLargeur = 40;
            objet.posX = intTuileX + 20;
            objet.posY = intTuileY + 20;
              break;

            case 'C': objC2D.drawImage(objImageCorde, intTuileX, intTuileY, 40, 40);
            objet.objNom = "CORDE";
            objet.objImage = objImageCorde;
            objet.intLongeur = 40;
            objet.intLargeur = 40;
            objet.posX = intTuileX + 20;
            objet.posY = intTuileY + 20;
              break;

            case 'M': objC2D.drawImage(objImageMur, intTuileX, intTuileY, 40, 40);
            objet.objNom = "MUR";
            objet.objImage = objImageMur;
            objet.intLongeur = 40;
            objet.intLargeur = 40;
            objet.posX = intTuileX + 20;
            objet.posY = intTuileY + 20;
              break;

            case 'O': objC2D.drawImage(objImageOr, intTuileX, intTuileY, 40, 40);
            objet.objNom = "OR";
            objet.objImage = objImageFond;
            objet.intLongeur = 40;
            objet.intLargeur = 40;
            objet.posX = intTuileX + 20;
            objet.posY = intTuileY + 20;
              break;

            case 'B': objC2D.drawImage(objImageBase, intTuileX, intTuileY, 40, 40);
            objet.objNom = "BASE";
            objet.objImage = objImageBase;
            objet.intLongeur = 40;
            objet.intLargeur = 40;
            objet.posX = intTuileX + 20;
            objet.posY = intTuileY + 20;
              break;
          }

          if (row < 17 && col < 28) {
            tabObjMap[row][col] = objet;
          }

          // Verification victoire
          if (intCompteurOR == 6 && col == 18 && row >= 0 && row <= 3 ) {
            objet.objNom = "ECHELLE";
            objet.objImage = objImageEchelle;
            objet.intLongeur = 40;
            objet.intLargeur = 40;
            objet.posX = intTuileX + 20;
            objet.posY = intTuileY + 20;
            objC2D.drawImage(objImageEchelle, intTuileX, intTuileY, 40, 40);
            tabObjMap[row][col] = objet;

          }
        }
      }
	    objC2D.restore(); // Restaure le contexte
	}

/******************************************************************************************
* initSons()
*
* initialisation des sons du jeu.
*****************************************************************************************/
function initSons(){
  objSons = new Object();

  var objSon = document.createElement('audio');
  objSon.volume = 0.2;
  objSon.setAttribute('src', 'sons/coin.mp3');
  objSon.load();
  objSons.rammaserOr = objSon;

  objSon = document.createElement('audio');
  objSon.setAttribute('src', 'sons/levelup.mp3');
  objSon.load();
  objSons.levelup = objSon;

  objSon = document.createElement('audio');
  objSon.setAttribute('src', 'sons/creuser.mp3');
  objSon.load();
  objSons.creuser = objSon;

  objSon = document.createElement('audio');
  objSon.volume = 0.2;
  objSon.setAttribute('src', 'sons/meurt.mp3');
  objSon.load();
  objSons.meurt = objSon;

  objSon = document.createElement('audio');
  objSon.setAttribute('src', 'sons/coeur.mp3');
  objSon.load();
  objSons.coeur = objSon;
}
