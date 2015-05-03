<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>UMware Project</title>
<script type="text/javascript" src="scripts/jquery-1.3.2.min.js" ></script> 
<link rel="stylesheet" href="styles/base.css" type="text/css">
<link href="http://fonts.googleapis.com/css?family=Asap:400,400italic,700,700italic" rel="stylesheet" type="text/css">
</head>

<body>

<div id="wrapper">
	<div class="container">
 	<?php include('framework/header.php'); ?>
	<?php include('framework/config.php'); ?>
	
	<div class="content">
		<h1> Selected Projects only! </h1>
		<br><br>
		<?php
		$tiles = '<ul id="portfolio_items" class="clearfix">';
		
		$query = mysql_query("SELECT * FROM projects ORDER BY Id");
		for ($x = 0, $numrows = mysql_num_rows($query); $x < $numrows; $x++) {
			$row = mysql_fetch_assoc($query);
			$tiles .= '<li data-id="id2" class="portfolio_item" data-type="graphic-design">
						<a href="portfolio_item.php?id='. $row["Id"] .'" rel="prettyPhoto" title="' . $row["Name"] . '">
							<span class="pic"><img src="'. $row["project_thumb"] .'" width="300px" heigt="180px">
							<div class="img_overlay"></div></span>
							<h4>' . $row["Name"] . '</h4>
						</a>
					</li>
					';
		}
		
		$tiles .= '</ul>';
		echo $tiles;
			
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
		?>
	</div>
</div>
<?php include('framework/footer.php'); ?>
</body>
</html>
