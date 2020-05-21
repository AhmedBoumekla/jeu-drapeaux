<?php
/*on est dans l'inscription*/
session_start(); /*commence une sesssion par rapport au serveur*/

$con = mysqli_connect('localhost','root','root'); /*Connection a phpmyadmin avec root*/

if($con -> connect_error){
    echo 'connection failed';
}

mysqli_select_db($con,'inscription'); /* acces avec root sur la base de donné*/


$val=$_POST['scor'];
$pseudo=$_SESSION['username'];

$s= "insert into score(pseudo,valeur) values('$pseudo',$val)"; /*Prend la requete sql en variable*/
$result = mysqli_query($con,$s);

echo $result;


?>