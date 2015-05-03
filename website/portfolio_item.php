<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>

<title>UM Ware -Contact</title>
<link href="http://fonts.googleapis.com/css?family=Asap:400,400italic,700,700italic" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="styles/base.css" type="text/css">
<script type="text/javascript" src="scripts/jquery-1.3.2.min.js" ></script> 
</head>

<body >
<div id="wrapper">
	<div class="container">
 	<?php include('framework/header.php'); ?>
	 
	 <?php 
	 include('framework/config.php');
	 
	 //echo $_GET["id"];
	 $query = mysql_query("SELECT * FROM projects where Id=".$_GET["id"]);
	 
	 for ($x = 0, $numrows = mysql_num_rows($query); $x < $numrows; $x++) {
		$row = mysql_fetch_assoc($query);
	 }
	
	 //echo $row['Name'];
	 
	 ?>
	 
	<div class="page_heading"><h1><?php echo $row['Name'] ?></h1></div>
	 
 	<div class="portfolio_page">
	
			<div class="columns portfolio_image">
				<a rel="prettyPhoto" title="<?php echo $row['Name'] ?>">
					<img src="<?php echo $row['project_details'] ?>"><div class="img_overlay_zoom"></div>			  		
				</a>
			</div>
			
			<div class="five columns portfolio_description">
				<h5>Project Description</h5>
				
				<?php echo $row['Discription'] ?>
				
				<h5>What we did</h5>
				
				<ul class="checked">
					<?php echo $row['Tools'] ?>
				</ul>

				<p><a href="<?php echo $row['Reference'] ?>" target="_blank" class="button sm_button button_hilite">Visit Website</a></p>
			</div>

	</div>

</div>
<?php include('framework/footer.php'); ?>
</div>

</body>
<script type="text/javascript">
	var url = 'framework/data.php?id=<?php echo $_GET["id"];?>';
</script>
<script type="text/javascript" src="scripts/portfolio_item.js" ></script>

</html>
