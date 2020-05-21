<?php
/*on est dans l'inscription*/
session_start(); /*commence une sesssion par rapport au serveur*/
header('location:login.php');/*header() permet de spécifier l'en-tête HTTP*/
$con=new PDO('mysql:host=localhost;dbname=inscription','root','root'); /*Connection a phpmyadmin avec root*/

$name = $_POST['user'];  /* recoit la requete input user */
$pass= $_POST['mot_de_passe']; /* recoit la requete input mot_de_passe */

$p = md5($pass);

$today = date("Y-m-d");   


$s=$con->query("select * from utilisateur where nom='$name'"); /*Prend la requete sql en variable*/

if($s==FALSE){
    var_dump($con->error_Info());
    die("erreur sql");
}

$res=$s->rowCount();

if($res == 1){ /* Si le nombre de colonne ou le nom existe = 1 (donc qu'il existe deja) */
    echo "nom d'utilisateur deja pris" ;
    header('location:login_e_i.php');
}else { /*sinon c'est bon on ecrit la requete pour ajouter dans la base de donné*/
    echo "inscription reussi";
    $insert=$con->prepare( "insert into utilisateur(nom,mdp,date) values ('$name','$p','$today')");
    $insert->execute();
    
}

?>
