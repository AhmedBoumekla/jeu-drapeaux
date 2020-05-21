<!--Recuperation de l'utilisateur qui viens de se connecter-->

<?php

session_start();
if(!isset($_SESSION['username'])){ /* variable de session (ce qui sert a savoir si on est reste connecté)*/
  header('location:login.php'); 
}
$ps=$_SESSION['username']; /*stockage du pseudo*/
?>



<!DOCTYPE html> <!--Block html:5 de visual studio-->
<html lang="fr"> <!-- Langue du site francais -->
<head>
    <meta charset="UTF-8"><!-- Eviter les erreur lier au caractere speciaux -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>1-Cult</title><!-- titre du site -->
    <!--CSS BOOTSTRAP 4-->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

    <!--Map -->
    <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css" />
    <script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>
    <script type="text/javascript" src="http://maps.stamen.com/js/tile.stamen.js?v1.2.4"></script>
    <script src="http://code.jquery.com/jquery-1.11.2.js"></script>
    <script src="http://code.jquery.com/ui/1.11.4/jquery-ui.js"></script>

    <!-- Leaflet-->
    <script type="text/javascript" src="http://maps.stamen.com/js/tile.stamen.js?v1.2.4"></script>
   
    <!--Test-->
    <script src="../jeu/geojs/countries.geojson" type="text/javascript"></script>
    <script src="../jeu/geojs/quizcomp.geojson" type="text/javascript"></script>
    <script src = "../jeu/geojs/quiz.js" ></script>
    <script src="../jeu/js/page.js"></script>

    <!--CSS PERSONNEL-->
    <link rel="stylesheet" href="../css/stylesj.css">
    
</head>
<body>
    <!--Barre de navigation Bootsrtap avec modification de l'opacité du background -->
    <nav class="navbar navbar-expand-md" style="background-color: rgba(31, 31, 31, 0.185);">
        <!-- Adapatation de la classe bootstrap a nos besoins  -->
        <ul class="nav" >
            <li class="nav-item">
                <a class="nav-link active" href="../html/accueil.html">Acceuil</a>
            </li>
            <!--Lien vers la version demo-->
            <li class="nav-item">
                <a class="nav-link" href="../html/jouer.html">Jouer</a>
            </li>
            <li>
                <!--affichage du pseudo du joueur-->
                <a class="nav-link ">Bienvenue <?php echo $_SESSION['username'];?></a>
            </li>
             <li>
                 <!--Lien pour se deconnecter-->
                <a class="nav-link " href="logout.php">Se deconnecter</a>
            </li>
        </ul>
    </nav>   

    <main>
        <!--Classe container bootstrap qui contient le jeu/carte-->
        <div class="container">
            <p>Selectionnez votre quizz puis lancer </p>
            <!--Ligne de boutton pour selectionner le quizz/continent souhaité -->
            <div class="row" style="text-align: center;">
                <button id = "europe" class="btn "  style="display: block; margin : auto;""> europe </button>
                <button id = "afrique" class="btn " style="display: block;margin : auto;""> afrique </button>
                <button id = "afrique" class="btn " style="display: block;margin : auto;""> oceanie </button>
                <button id = "afrique" class="btn " style="display: block;margin : auto;""> amerique </button>
                <button id = "afrique" class="btn " style="display: block;margin : auto;""> asie </button>
            </div>
            <p>Cliquez pour lancer la partie (vous devez selectionner un quizz avant) </p>
            <div class="row" style="text-align: center;margin-top : 10px;">
            <!-- boutton pour lancer la partie -->
                <button class="btn " id = "lancer" style="display: block; margin : auto;"> Lancer </button>
            </div>
            <p>Bouttons de la partie </p>
            <div class="row" style="text-align: center;margin-top : 10px;">
                <!--next utilise pour enlever la pop up wiki de la reponse -->
                <button id = "next" class="btn" style="display: block; margin : auto;"> next </button>
                <!-- boutton Finir pour finir la partie et enregistrer le score dans la base de donnée -->
                <button id = "finir" class="btn " style="display: block; margin : auto;""> finir </button>
            </div>

            <h1>Carte : </h1>
            <!--Div qui represente la map-->
            <div id="maDiv" style="width: 800px; height: 600px; margin: auto; border-width:5px;border-style:solid;border-color:rgb(248, 248, 248);"></div>
            <!--Div la question + drapeau-->
            <div id = "quiz"> </div>
            <!--Div le wiki du pays trouver-->
            <div id ="rep"> </div>
            <!--Bouton qui va servir a l'affichage des scores-->
            <div id ="scoreb" class="btn">CLIQUER POUR AFFICHER VOS SCORES</div>
            <div id ="score" style="display:none">
            <?php    
                $con=new PDO('mysql:host=localhost;dbname=inscription','root','root');/*Connection PDO*/
                echo 'Vos derniers score sont : ';/*simple affichage*/
                $s=$con->query( "select valeur from score where pseudo ='$ps'");/*requete effectuer*/

                if($s==FALSE){/*verification*/
                    var_dump($con->error_Info());
                    die("erreur sql");
                }

                $res=$s->fetchALL(PDO::FETCH_OBJ); /*retourner le tableau des valeurs*/
                $i=0;/*Afficher les 5 meilleurs score*/
                while($i<count($res) && $i<5){
                    echo $res[$i]->valeur;
                    echo "<br />";
                    $i++;
                }  
            ?>
            </div>
        </div> 
    </main>
    
</body>
