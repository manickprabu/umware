// JavaScript Document

var myData; 

$.getJSON('framework/data.php', function(data) {
	//alert("Data from getProjectList.php " + data);
	
	myData = data;
	for (var x = 0; x < myData.length; x++) 
	{
		$('#portfolio_items').append( getTile(myData[x]) );
		//if(myData[x].Catetory != '')
			//catetory[ myData[x].Catetory ] = myData[x].Catetory;
	}
});

function getTile(record) {
	var tile = '<li data-id="id2" class="portfolio_item" data-type="graphic-design">';
		tile += '	  	<a href="portfolio_item.php?id='+ record.Id +'" rel="prettyPhoto" title="' + record.Name + '">';
		tile += '	  		<span class="pic"><img src="'+ record.Thumbnail +'" width="300px" heigt="180px"><div class="img_overlay"></div></span>';
		tile += '	  		<h4>' + record.Name + '</h4>';
		tile += '	  	</a>';
		tile += '	  </li>';
	//tile = ' Name: ' + record.Name + '</br>';
	//tile += ' Discription: ' + record.Discription;
	//tile += ' <img src="'+ record.Thumbnail +'" LOWSRC="../images/loading.gif" width="175" height="120" />';
	
	return tile;
}

$(document).ready(function() {
	//alert('ddd');
});