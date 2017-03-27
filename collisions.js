/******************************************************************************************
 * collisionEchelle()
 * Verifie une collision entre le point X,Y du personnage avec les points X,Y
 * des lingots d'or
 *
 *****************************************************************************************/
function collisionOr(objCharacter) {

    for (var row = 0; row < tabObjMap.length; row++) {
        for (var col = 0; col < tabObjMap[row].length; col++) {
            var objet = new Object();

            if (tabObjMap[row][col].objNom == "OR") {
                if (objCharacter.posX >= tabObjMap[row][col].posX - 20 && objCharacter.posX <= tabObjMap[row][col].posX + 20 &&
                    objCharacter.posY >= tabObjMap[row][col].posY - 20 && objCharacter.posY <= tabObjMap[row][col].posY + 20) {

                    objet.objNom = "FOND";
                    objet.objImage = objImageFond;
                    objet.intLongeur = 40;
                    objet.intLargeur = 40;
                    objet.posX = tabObjMap[row][col].posX;
                    objet.posY = tabObjMap[row][col].posY;

                    tabMap[row][col] = 'F';
                    tabObjMap[row][col] = objet;
                    if (objCharacter.strNom == "fantome" && objCharacter.intnbrOr == 0) {
                        objCharacter.intnbrOr++;
                        console.log(objCharacter.intnbrOr)

                    } else {
                        objSons.rammaserOr.play();
                        intCompteurOR++;
                        intScore += 250;
                    }


                }
            }
        }
    }


}

/******************************************************************************************
 * collisionEchelle()
 * Verifie une collision entre le point X,Y du personnage avec les points X,Y des echelles
 *
 *****************************************************************************************/
function collisionEchelle() {

    binMonter = false;
    var x = 0;
    var y = 0;
    binDescendre = false;

    for (var row = 0; row < tabObjMap.length; row++) {
        for (var col = 0; col < tabObjMap[row].length; col++) {


            // Checks if its a ladder
            if (tabObjMap[row][col].objNom == "ECHELLE") {
                // the square where the ladder is
                if (objRunner.posX >= tabObjMap[row][col].posX - 20 && objRunner.posX <= tabObjMap[row][col].posX + 20 &&
                    objRunner.posY + 20 >= tabObjMap[row][col].posY - 20 && objRunner.posY + 20 <= tabObjMap[row][col].posY + 20) {

                    binMonter = true;
                    if (objRunner.binMonter) {
                        objRunner.posX = tabObjMap[row][col].posX;
                    }
                }

                if (objRunner.posX >= tabObjMap[row][col].posX - 20 && objRunner.posX <= tabObjMap[row][col].posX + 20 &&
                    objRunner.posY + 23 >= tabObjMap[row][col].posY - 20 && objRunner.posY + 23 <= tabObjMap[row][col].posY + 20) {

                    binDescendre = true;
                    if (objRunner.binDescendre) {
                        objRunner.posX = tabObjMap[row][col].posX;
                    }
                }

            }
        }
    }
}

/******************************************************************************************
 * collisionMur()
 * Verifie une collision entre le point X,Y du personnage avec les points X,Y des murs
 *
 *****************************************************************************************/
function collisionMur(objCharacter) {

    objCharacter.binSurMur = false;

    for (var row = 0; row < tabObjMap.length; row++) {
        for (var col = 0; col < tabObjMap[row].length; col++) {


            if (tabObjMap[row][col].objNom == "MUR" || tabObjMap[row][col].objNom == "ECHELLE" || tabObjMap[row][col].objNom == "BASE") {
                // Detection du mur de brick en dessous du runner
                if (objCharacter.posX >= tabObjMap[row][col].posX - 20 && objCharacter.posX <= tabObjMap[row][col].posX + 20 &&
                    objCharacter.posY + 23 >= tabObjMap[row][col].posY - 20 && objCharacter.posY + 23 <= tabObjMap[row][col].posY + 20) {

                    objCharacter.binSurMur = true;
                    objCharacter.binTomber = false;

                }
            }
        }
    }
}

/******************************************************************************************
 * collisionCorde()
 * Verifie une collision entre le point X,Y du personnage avec les points X,Y de la corde
 *
 *****************************************************************************************/
function collisionCorde() {

    objRunner.binSurCorde = false;

    for (var row = 0; row < tabObjMap.length; row++) {
        for (var col = 0; col < tabObjMap[row].length; col++) {

            if (tabObjMap[row][col].objNom == "CORDE") {
                // the square where the rope is
                if (objRunner.posX >= tabObjMap[row][col].posX - 20 && objRunner.posX <= tabObjMap[row][col].posX + 20 &&
                    objRunner.posY >= tabObjMap[row][col].posY - 20 && objRunner.posY <= tabObjMap[row][col].posY + 20) {

                    if (!objRunner.binTomber) {
                        objRunner.binSurCorde = true;
                        objRunner.posY = tabObjMap[row][col].posY - 1;

                    }

                }
            }
        }
    }
}

/******************************************************************************************
 * collisionMurCote()
 * Verifie une collision entre le point X,Y du personnage avec les points X,Y des murs
 *
 *****************************************************************************************/
function collisionMurCote(objCharacter) {

    objCharacter.binSurMurCote = false;


    for (var row = 0; row < tabObjMap.length; row++) {
        for (var col = 0; col < tabObjMap[row].length; col++) {


            if (tabObjMap[row][col].objNom == "MUR") {

                if (objCharacter.posX + 20 > tabObjMap[row][col].posX -20 && objCharacter.posX-20 < tabObjMap[row][col].posX + 20 &&
                    objCharacter.posY + 23 > tabObjMap[row][col].posY -19 && objCharacter.posY-12 < tabObjMap[row][col].posY + 19) {

                    objCharacter.binSurMurCote = true;
                    if (objCharacter.intDirection == 1 && objCharacter.posX + 20 > tabObjMap[row][col].posX -20 ) {
                        //objCharacter.posX = tabObjMap[row][col].posX - 25;
                    } else if (objCharacter.intDirection == -1 && objCharacter.posX-20 < tabObjMap[row][col].posX + 20 ) {
                        //objCharacter.posX = tabObjMap[row][col].posX + 25;
                    }


                }
            }
        }
    }

    /*var y = parseInt((objCharacter.posY + 20) / 40);
     var x = parseInt((objCharacter.posX + 20) / 40);
     console.log("x: " + x)
     console.log("y: " + y)
     if (x +1 <28)
     if (tabObjMap[y][x + 1].objNom == "MUR" )
     objCharacter.binSurMurCote = true;

     if (x-1>0)
     if (tabObjMap[y][x - 1].objNom == "MUR")
     objCharacter.binSurMurCote = true;

     if (objCharacter.binSurMurCote == true) {
     if (objCharacter.intDirection == 1) {
     objCharacter.posX = tabObjMap[y][x].posX - 33;
     } else if (objCharacter.intDirection == -1) {
     objCharacter.posX = tabObjMap[y][x-1].posX +33;
     }
     }*/


}

function verificationVictoire() {
    if (intCompteurOR == 6 && objRunner.posX == 740 && objRunner.posY <= 40) {
        //effacerDessin();
        intCompteurNiveau++;
        //initAnimation();
        initNiveau();
        /*objRunner.posX = 560;
         objRunner.posY = 577;*/

        intCompteurOR = 0;
    }
}
