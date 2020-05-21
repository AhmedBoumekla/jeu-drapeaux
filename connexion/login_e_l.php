<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion utilisateur</title>
    <!--Bootstrap CDN --> 
        <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
    <!--Css personel -->
    <link rel="stylesheet" type="text/css" href="../css/styles.css">
    <link rel="stylesheet" type="text/css" href="../css/style.css"> <!-- Type text/css permet de spécifier le type de feuille de style utilisée , mettre le css perso est utile pour 
ecraser les données bootstrap pour personnalisié ce qu'on veut sans perdre les autre option-->

    
</head>
<body>
    <div class="container"> <!--Class bootstrap centre les elements-->
    <nav class="navbar navbar-expand-md" style="background-color: rgba(31, 31, 31, 0.185);">
            <ul class="nav" >
                <li class="nav-item">
                    <a class="nav-link active" href="../html/accueil.html">Accueil</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="../html/jouer.html">Jouer</a>
                </li>
                
            </ul>
        </nav> 
        <div class="login-box">
            <div class="row"> <!-- creer une class colobnne exemple bst4-->
                <div class="col-md-6 login-g"> <!-- creer une certaine colonne mid de taille 6-->
                    <h2>Connection</h2><!--Titre -->
                        <form action="validation.php" method="post"> <!--form = formulaire , qui envoie une requete a validation.php pour valider le formulaire-->
                            <div class="form-group"> <!-- Classe bootstrap pour formulaire-->
                                <label >Utilisateur</label> <!-- simple titre-->
                                <input type="text" name="user" class="form-control" required> <!--Input = la ou on rentre le texte-->
                            </div>
                            <div class="form-group">
                                <label >Mot de passe</label>
                                <input type="password" name="mot_de_passe" class="form-control" required>
                            </div>
                            <p>Utilisateur ou mot de passe incorrect.</p>
                            <button type="submit" class="btn btn-primary">Se connecter</button> <!--Bouton submit qui valide et envoie le formulaire-->
                        </form>
                </div>
                <div class="w-100"></div> <!--Sert a rajouter une ligne-->  
                <div class="col-md-6 login-d"> <!-- creer une certaine colonne mid de taille 6--> <!--Possibilité d'associer deux classe col-md-6 logoin-d-->
                    <h2>S'inscrire</h2><!--Titre -->
                        <form action="inscription.php" method="post"> <!--form = formulaire , qui envoie une requete a validation.php pour valider le formulaire-->
                            <div class="form-group"> <!-- Classe bootstrap pour formulaire-->
                                 <label >Utilisateur</label> <!-- simple titre-->
                                <input type="text" name="user" class="form-control" required> <!--Input = la ou on rentre le texte-->
                            </div>
                            <div class="form-group">
                                <label >Mot de passe</label>
                                <input type="password" name="mot_de_passe" class="form-control" required>
                            </div>
                                <button type="submit" class="btn btn-primary">S'incrire</button> <!--Bouton submit qui valide et envoie le formulaire-->
                        </form>
                </div>
            </div>
        </div>
    </div>
</body>
</html>