/******************************************************************************************
 * dessinerHUD()
 * Dessiner le HEADS UP DISPLAY
 * Affiche les variables de score, temps, vie et niveau du jeu.
 *****************************************************************************************/
function dessinerHUD() {

    //Contour Score
    objC2D.beginPath(); // Définir un nouveau tracé
    objC2D.strokeStyle = 'rgb(236, 193, 13)';
    objC2D.rect(10, 680 + 10, 1100, 130);
    objC2D.lineWidth = 5;
    objC2D.stroke();
    objC2D.beginPath(); // Définir un nouveau tracé
    objC2D.strokeStyle = 'black';
    objC2D.rect(10, 680 + 10, 1100, 130);
    objC2D.lineWidth = 3;
    objC2D.stroke();

    // Score
    objC2D.beginPath();
    objC2D.fillStyle = 'rgb(236, 193, 13)';

    var strScore = 'Score:' + formatterScore(intScore, 7);
    objC2D.font = '55pt Old English Text MT';

    objC2D.textAlign = "center";
    objC2D.textBaseline = "middle";
    objC2D.strokeStyle = 'black';

    objC2D.fillText(strScore, objCanvas.width / 4.49, 680 + 75);
    objC2D.lineWidth = 2;
    objC2D.strokeText(strScore, objCanvas.width / 4.49, 680 + 75);

    // Chrono
    objC2D.beginPath();
    objC2D.fillStyle = 'rgb(148, 62, 13)';
    var strTemp = 'Temps:' + intMinuteChrono + ":" + intSecondeChrono;
    objC2D.font = '55pt Old English Text MT';
    objC2D.strokeStyle = 'black';
    objC2D.fillText(strTemp, objCanvas.width / 1.62, 680 + 75);
    objC2D.lineWidth = 2;
    objC2D.strokeText(strTemp, objCanvas.width / 1.62, 680 + 75);

    // Niveau

    objC2D.beginPath();
    objC2D.fillStyle = 'rgb(236, 193, 13)';
    var strTemp = 'Niveau:' + intCompteurNiveau;
    objC2D.font = '50pt Brush Script MT';
    objC2D.strokeStyle = 'black';
    objC2D.fillText(strTemp, objCanvas.width / 1.12, 650 + 75);
    objC2D.lineWidth = 2;
    objC2D.strokeText(strTemp, objCanvas.width / 1.12, 650 + 75);

    // Vie
    objC2D.beginPath();
    objC2D.fillStyle = 'rgb(236, 193, 13)';
    var strTemp = 'Vies:' + intCompteurVie;
    objC2D.font = '50pt Brush Script MT';
    objC2D.strokeStyle = 'black';
    objC2D.fillText(strTemp, objCanvas.width / 1.12, 710 + 75);
    objC2D.lineWidth = 2;
    objC2D.strokeText(strTemp, objCanvas.width / 1.12, 710 + 75);
}

/******************************************************************************************
 *  formatterScore(intNbr, intTaille)
 *  Ajoute des zéros au score.
 *****************************************************************************************/
function formatterScore(intNbr, intTaille) {
    var strScore = "" + intNbr;
    while (strScore.length < intTaille) {
        strScore = "0" + strScore;
    }
    return strScore;
}

/******************************************************************************************
 * debug()
 * Methode de debagage (Affiche des variables importants du runner)
 * Ne doit pas être affiché au version finale (ALPHA) du jeu.
 *****************************************************************************************/
function debug() {
    objC2D.textAlign = "left";
    objC2D.font = "20px calibri";
    objC2D.fillStyle = 'lime';

    objC2D.fillText("MODE DEBUG: direction: " + objRunner.intDirection + " - up: "

        + objRunner.binMonter + " - surMur: " + objRunner.binSurMur + " - surCorde: " + objRunner.binSurCorde +
        " - binDescendre: " + binDescendre + " - binMonter: " + binMonter + " - surMurCote: " + objRunner.binSurMurCote + " T: " + objRunner.binTomber, 10, 20);


    objC2D.fillStyle = 'lime';
    objC2D.beginPath();
    objC2D.fillRect(objRunner.posX, objRunner.posY, 5, 5);

    objC2D.fillStyle = 'red';
    objC2D.fillRect(objRunner.posX, objRunner.posY + 20, 5, 5);

    objC2D.fillStyle = 'pink';
    objC2D.fillRect(objRunner.posX + 10, objRunner.posY, 5, 5);
    objC2D.fillRect(objRunner.posX - 10, objRunner.posY, 5, 5);

    objC2D.stroke();
    objC2D.fillStyle = 'lime';
    objC2D.closePath();
    objC2D.font = "12px calibri";
    objC2D.fillText("(" + objRunner.posX + ", " + objRunner.posY + ")", objRunner.posX, objRunner.posY - 25);

    for (var row = 0; row < tabObjMap.length; row++) {
        for (var col = 0; col < tabObjMap[row].length; col++) {

            if (tabObjMap[row][col].objNom == "TROU") {
                objC2D.stroke();
                objC2D.fillStyle = 'gold';
                objC2D.closePath();
                objC2D.font = "9px calibri";

                objC2D.fillText(tabObjMap[row][col].intTemps, tabObjMap[row][col].posX - 10,
                    tabObjMap[row][col].posY);
            }
        }
    }

}
