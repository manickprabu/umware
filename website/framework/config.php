<?php
	$mysql_hostname = "localhost";
	$mysql_user		= 'kutrampo_umware';
	$mysql_password	= 'umware@123';
	$mysql_database	= 'kutrampo_umware';
	
	/*$mysql_hostname = "localhost";
	$mysql_user 	= "root";
	$mysql_password = "";
	$mysql_database = "umware";*/
	
	$bd = mysql_connect($mysql_hostname, $mysql_user, $mysql_password)
	or die("Opps some thing went wrong");
	mysql_select_db($mysql_database, $bd)
	or die("Opps some thing went wrong");
?>