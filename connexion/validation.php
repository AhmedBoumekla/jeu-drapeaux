<?php
session_start();
$con=new PDO('mysql:host=localhost;dbname=inscription','root','root');

$name = $_POST['user'];  /* recoit la requete input user */
$pass= md5($_POST['mot_de_passe']); /* recoit la requete input mot_de_passe */
$s=$con->query( "select count(*) as t1 from utilisateur where nom='$name' && mdp='$pass'");

if($s==FALSE){
    var_dump($con->error_Info());
    die("erreur sql");
}

$res=$s->fetchALL(PDO::FETCH_OBJ);
$r= $res[0]->t1;
if($r == 1){ /* Si le nombre de colonne ou le nom existe = 1 (donc qu'il existe deja) */
    $_SESSION['username']=$name;
    header('location:home.php');
}else { /*sinon c'est bon on ecrit la requete pour ajouter dans la base de donné*/
    header('location:login_e_l.php');
}
?>

