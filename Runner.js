/******************************************************************************************
 * initRunner()
 *
 * Initialise l'objet Runner (personnage principal) avec ses images d'animations
 * et ses coordonnées du jeu.
 *****************************************************************************************/
function initRunner() {
    var objImageDebut = new Image();
    objImageDebut.src = 'img/debut.png';
    var objImageDroit = new Image();
    objImageDroit.src = 'img/courirDroit.png';
    var objImageGauche = new Image();
    objImageGauche.src = 'img/courirGauche.png';
    var objImageMonter = new Image();
    objImageMonter.src = 'img/monter.png';
    var objImageCordeDroite = new Image();
    objImageCordeDroite.src = 'img/cordeDroit.png';
    var objImageCordeGauche = new Image();
    objImageCordeGauche.src = 'img/cordeGauche.png';

    objRunner = new Object();
    objRunner.strNom = "runner";
    objRunner.objImage = objImageDebut;
    objRunner.objAnimationDroit = objImageDroit;
    objRunner.objAnimationGauche = objImageGauche;
    objRunner.objAnimationMonter = objImageMonter;
    objRunner.objAnimationCordeDroite = objImageCordeDroite;
    objRunner.objAnimationCordeGauche = objImageCordeGauche;
    objRunner.intLongeur = 35;
    objRunner.intLargeur = 24;
    objRunner.intLargeur2 = 12;
    objRunner.posX = objCanvas.width / 2;
    objRunner.posY = 577;
    objRunner.intVitesse = 4;
    objRunner.intDirection = 0; //-1=left, 0=middle, +1=right
    objRunner.binMeurt = false;
    objRunner.binMonter = false;
    objRunner.binChute = false;
    objRunner.binSurMur = true;
    objRunner.binSurMurCote = false;
    objRunner.binDescendre = false;
    objRunner.binCorde = false;
    objRunner.binTomber = false;
    objRunner.binSurCorde = false;
    objRunner.intFrame = 0;
    objRunner.intFrameGauche = 0;
    objRunner.intFrameDroit = 0;
    objRunner.intFrameMonter = 0;
    objRunner.intFrameDescendre = 0;
    objRunner.intFrameChute = 0;
    objRunner.intFrameCordeDroite = 0;
    objRunner.intFrameCordeGauche = 0;
}

/******************************************************************************************
 * animationRunner()
 * Dessine l'animation du Runner à partir de sa direction.
 *****************************************************************************************/
function animationRunner() {
    // Animation IDLE
    if (objRunner.intDirection == 0) {
        objRunner.intFrame += 0.05;
        if (objRunner.intFrame >= 22) { // 22 frames dans l'image
            objRunner.intFrame -= 22;
        }
    }
    // Animation courir vers la gauche
    if (objRunner.intDirection == -1 && !objRunner.binSurCorde) {
        objRunner.intFrameGauche += 1;
        if (objRunner.intFrameGauche >= 27) { // 27 frames dans l'image
            objRunner.intFrameGauche -= 27;
        }
    }
    // Animation courir vers la droite
    if (objRunner.intDirection == 1 && !objRunner.binSurCorde) {
        objRunner.intFrameDroit += 1;
        if (objRunner.intFrameDroit >= 27) { // 27 frames dans l'image
            objRunner.intFrameDroit -= 27;
        }
    }
    // Animation monter
    if (objRunner.binMonter) {
        objRunner.intFrameMonter += 0.3;
        if (objRunner.intFrameMonter >= 8) { // 8 frames dans l'image
            objRunner.intFrameMonter -= 8;
        }
    }
    // Animation descendre
    if (objRunner.binDescendre) {
        objRunner.intFrameDescendre += 0.3
        if (objRunner.intFrameDescendre >= 8) { // 8 frames dans l'image
            objRunner.intFrameDescendre -= 8;
        }
    }
    // Animation sur corde vers la droite
    if (objRunner.binSurCorde && objRunner.intDirection == 1) {
        objRunner.intFrameCordeDroite += 0.3
        if (objRunner.intFrameCordeDroite >= 8) { // 8 frames dans l'image
            objRunner.intFrameCordeDroite -= 8;
        }
    }
    // Animation sur corde vers la gauche
    if (objRunner.binSurCorde && objRunner.intDirection == -1) {
        objRunner.intFrameCordeGauche += 0.3
        if (objRunner.intFrameCordeGauche >= 8) { // 8 frames dans l'image
            objRunner.intFrameCordeGauche -= 8;
        }
    }
    // Limites X du jeu gauche
    if (objRunner.posX < objRunner.intLargeur - objRunner.intLargeur2) {
        objRunner.posX = objRunner.intLargeur;
        objRunner.posX = objRunner.posX - objRunner.intLargeur2;
    }
    // Limites X du jeu droite
    if (objRunner.posX > (objCanvas.width - objRunner.intLargeur) + objRunner.intLargeur2) {
        objRunner.posX = objCanvas.width - objRunner.intLargeur;
        objRunner.posX = objRunner.posX + objRunner.intLargeur2;
    }

    // Ajustement de variables de direction et controle de vitesse
    if (binDroite && objRunner.intDirection != 38) {
        objRunner.intDirection = 1;
        objRunner.posX += objRunner.intVitesse;

    }
    if (binGauche && objRunner.intDirection != 38) {
        objRunner.intDirection = -1;
        objRunner.posX -= objRunner.intVitesse;

    }

    //binMonter est true ssi runner est sur echelle
    if (binMonter && objRunner.intDirection == 38) {
        objRunner.binMonter = true;
        objRunner.posY -= objRunner.intVitesse / 2; //deplacement vers le haut

        binGauche = false;
        binDroite = false;

    }

    // Faire tomber le Runner si n'est pas sur un mur
    if (!objRunner.binSurMur) {
        objRunner.posY += objRunner.intVitesse;
    }


    if (objRunner.binTomber && !objRunner.binSurMur) {
        objRunner.posY += objRunner.intVitesse;
    }

    // Descendre l'echelle
    if (binDescendre && objRunner.intDirection == 40) {
        objRunner.binDescendre = true;
        objRunner.posY += objRunner.intVitesse / 2; //deplacement vers le bas
        binGauche = false;
        binDroite = false;
    }

    if (objRunner.binMeurt) {
        objSons.meurt.play();

    }

}

/******************************************************************************************
 * dessinerRunner(x, y, intFrame)
 * Dessine le Runner dépendamment de sa direction et de son animation
 *****************************************************************************************/
function dessinerRunner(x, y, intFrame) {
    objC2D.save();

    var sx;
    var sy = 0;
    var sw = 0;
    var sh = 35;
    var dx = 0;
    var dy = 0;
    var dw = 0;
    var dh = 35;

    if (objRunner.intDirection == 0 && !objRunner.binSurCorde) {
        sx = (524 / 22) * intFrame;
        sw = objRunner.objImage.width / 22;
        dx = objRunner.posX - 12;
        dy = objRunner.posY - 12;
        dw = objRunner.objImage.width / 22;
        objC2D.drawImage(objRunner.objImage, sx, sy, sw, sh, dx, dy, dw, dh);
    } else if (objRunner.intDirection == -1 && !objRunner.binSurCorde) {
        sx = (826 / 27) * intFrame;
        sx = Math.floor(sx);
        sw = objRunner.objAnimationGauche.width / 27;
        dx = objRunner.posX - 12;
        dy = objRunner.posY - 12;
        dw = objRunner.objAnimationGauche.width / 27;
        objC2D.drawImage(objRunner.objAnimationGauche, sx, sy, sw, sh, dx, dy, dw, dh);
    } else if (objRunner.intDirection == 1 && !objRunner.binSurCorde) {
        sx = (826 / 27) * intFrame;
        sw = objRunner.objAnimationDroit.width / 27;
        dx = objRunner.posX - 12;
        dy = objRunner.posY - 12;
        dw = objRunner.objAnimationDroit.width / 27;
        objC2D.drawImage(objRunner.objAnimationDroit, sx, sy, sw, sh, dx, dy, dw, dh);
    }

    if (objRunner.binMonter) {
        // (258px longeur / 8 frames)*vitesse
        sx = (258 / 8) * intFrame;
        dx = objRunner.posX - 12;
        dy = objRunner.posY - 12;
        objC2D.drawImage(objRunner.objAnimationMonter, sx, sy, 23, dh, dx, dy, 23, dh);
    } else if (objRunner.binDescendre) {
        // (258px longeur / 8 frames)*vitesse
        sx = (258 / 8) * intFrame;
        dx = objRunner.posX - 12;
        dy = objRunner.posY - 12;
        objC2D.drawImage(objRunner.objAnimationMonter, sx, sy, 23, dh, dx, dy, 23, dh);
    }

    if (objRunner.binSurCorde && objRunner.intDirection == 1) {
        sx = (289 / 8) * intFrame;
        sw = objRunner.objAnimationCordeDroite.width / 8;
        dx = objRunner.posX - 12;
        dy = objRunner.posY - 12;
        dw = objRunner.objAnimationCordeDroite.width / 8;
        objC2D.drawImage(objRunner.objAnimationCordeDroite, sx, sy, sw, dh, dx, dy, dw, dh);
    } else if (objRunner.binSurCorde && objRunner.intDirection == -1) {
        sx = (289 / 8) * intFrame;
        sw = objRunner.objAnimationCordeDroite.width / 8;
        dx = objRunner.posX - 12;
        dy = objRunner.posY - 12;
        dw = objRunner.objAnimationCordeDroite.width / 8;
        objC2D.drawImage(objRunner.objAnimationCordeGauche, sx, sy, sw, dh, dx, dy, dw, dh);
    } else if (objRunner.binSurCorde && objRunner.intDirection == 0) {
        sx = (289 / 8) * 0;
        sw = objRunner.objAnimationCordeDroite.width / 8;
        dx = objRunner.posX - 12;
        dy = objRunner.posY - 12;
        dw = objRunner.objAnimationCordeDroite.width / 8;
        objC2D.drawImage(objRunner.objAnimationCordeDroite, sx, sy, sw, dh, dx, dy, dw, dh);
    }

    objC2D.restore();

}

var tabCreuser = [];
/******************************************************************************************
 * creuserTrou()
 *
 *
 *****************************************************************************************/
function creuserTrou() {

    var binVerdict = false;

    for (var row = 0; row < tabObjMap.length; row++) {
        for (var col = 0; col < tabObjMap[row].length; col++) {


            // conditions: sur mur / or / corde
            //
            if (objRunner.posX + 35 >= tabObjMap[row][col].posX - 20 && objRunner.posX + 35 <= tabObjMap[row][col].posX + 20 &&
                objRunner.posY >= tabObjMap[row][col].posY - 20 && objRunner.posY <= tabObjMap[row][col].posY + 20) {
                if (tabObjMap[row][col].objNom == "OR" || tabObjMap[row][col].objNom == "ECHELLE" || objRunner.binSurCorde || objRunner.binMonter) { //echelle marche pas?
                    binVerdict = false;
                } else {
                    binVerdict = true;
                }

            }

            if (tabObjMap[row][col].objNom == "MUR") {
                // Detection du mur de brick en dessous du runner

                if (binX && binVerdict) {
                    if (objRunner.posX + 35 >= tabObjMap[row][col].posX - 20 && objRunner.posX + 35 <= tabObjMap[row][col].posX + 20 &&
                        objRunner.posY + 45 >= tabObjMap[row][col].posY - 20 && objRunner.posY + 45 <= tabObjMap[row][col].posY + 20) {
                        tabMap[row][col] = 'T';
                        //add timer
                        //verifie si le moment present est plus grand que ce temps + 8000
                        tabObjMap[row][col].intTimer = intMiliSecondeChrono + 8000;
                        tabObjMap[row][col].binCreuser = true;
                        tabObjMap[row][col].col = col;
                        tabObjMap[row][col].row = row;
                        tabCreuser.push(tabObjMap[row][col]);

                        objSons.creuser.play();
                    }
                }

                if (binZ && binVerdict) {
                    if (objRunner.posX - 35 >= tabObjMap[row][col].posX - 20 && objRunner.posX - 35 <= tabObjMap[row][col].posX + 20 &&
                        objRunner.posY + 45 >= tabObjMap[row][col].posY - 20 && objRunner.posY + 45 <= tabObjMap[row][col].posY + 20) {
                        tabMap[row][col] = 'T';
                        //add timer

                        tabObjMap[row][col].intTimer = intMiliSecondeChrono + 8000;
                        tabObjMap[row][col].binCreuser = true;
                        tabObjMap[row][col].col = col;
                        tabObjMap[row][col].row = row;
                        tabCreuser.push(tabObjMap[row][col]);

                        objSons.creuser.play();
                    }
                }
            }

        }
    }

    /*if (tabObjMap[row][col] == 'T') {
     tabObjMap[row][col].intEcoule = intMiliSecondeChrono - tabObjMap[row][col].intTimer;
     console.log(tabObjMap[row][col].intEcoule);

     }*/


    if (tabCreuser != null) {
        timerCreuser();
    }


}

function timerCreuser() {

    for (var i = 0; i < tabCreuser.length; i++) {
        if (intMiliSecondeChrono >= tabCreuser[i].intTimer) {
            tabMap[tabCreuser[i].row][tabCreuser[i].col] = 'M';
            tabObjMap[tabCreuser[i].row][tabCreuser[i].col].intTimer = 0;
        }

    }

}
