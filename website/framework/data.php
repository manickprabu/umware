<?php
include('config.php');
include('JSON.php');

if( !function_exists('json_encode') ) {
    function json_encode($data) {
        $json = new Services_JSON();
        return( $json->encode($data) );
    }
}

if( isset($selectedIndex) ) {
	//echo $_GET["id"];
	$query = mysql_query("SELECT * FROM projects where Id=".$_GET["id"]);
} else
	$query = mysql_query("SELECT * FROM projects ORDER BY Id");

//echo $query;
//loop through and return results
for ($x = 0, $numrows = mysql_num_rows($query); $x < $numrows; $x++) {
	$row = mysql_fetch_assoc($query);
	
	$comments[$x] = array(	"Name" => $row["Name"], 
							"Discription" => $row["Discription"],
							"Thumbnail" => $row["Thumbnail"],
							"Id" => $row["Id"]
							/*"Name" => $row["Name"],
							"CompanyName" => $row["CompanyName"],
						  	"Catetory" => $row["Catetory"],
							"DisplayMode" => $row["DisplayMode"],
							"Discription" => $row["Discription"],
							"Folder" => $row["Folder"],
							"Thumbnail" => $row["Thumbnail"],
							"BigImage" => $row["BigImage"],
							"Tools" => $row["Tools"],
							"Reference" => $row["Reference"],
							"Date" => $row["Date"]*/
							);
	
}
//echo JSON to page
/*$response = $_GET["jsoncallback"] . "(" . json_encode($comments) . ")";
echo $response;*/

if( isset($comments) ) {
	$response = "(" . json_encode($comments) . ")";
	echo $response;
} else
	echo 'null';

?>