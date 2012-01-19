//Project 2
//Visual Frameworks 1201
//Mobile Media Development
//Full Sail University
//Laura McCool

window.addEventListener ("DOMContentLoaded", function(){
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}
	//create select field element and populate it with options.
	function makeCats (){
		var formTag = document.getElementsByTagName("form"), //formTag is an array of all form tags.
			selectLi = $('select'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "category");
		for (var i=0, j=giftCategory.length; i<j; i++){
			 var makeOption = document.createElement('option');
			 var optText = giftCategory[i];
			 makeOption.setAttribute("value", optText);
			 makeOption.innerHTML = optText;
			 makeSelect.appendChild(makeOption);
		}
		//selectLi.appendChild(makeSelect);
	}
	
	//Find value of selected radio button
	function getSelectedRadio(){
		var radios = document.forms(0).location;
		for(var i=0; i<radios.length; i++){
			if (radios[i].checked){
				locationValue = radios[i].value;
			}
		}
	}
	
	function toggleControls(n){
		switch(n){
			case "on":
				$('contactForm').style.display ="none";
				$('clear').style.display ="inline";
				$('displayData').style.display ="none";
				$('addNew').style.display = "inline";
				break;
			case "off":
				$('contactForm').style.display ="block";
				$('clear').style.display ="inline";
				$('displayData').style.display ="inline";
				$('addNew').style.display = "none";
				$('items').style.display = "none";
				break;
			default:
				return false;
		}
	}
	
	function storeData(){
		var id 				= Math.floor(Math.random()*100000001);
		//Gather up all our form field values and store in an object
		//Object properties contain array with the form label and input value.
		getSelectedRadio();
		var item 				={};
			item.category 	 	= ["Gift Category:", $('category').value];
			item.comments 	 	= ["Gift Description:", $('comments').value];
			item.amount 	 	= ["Quantity:", $('amount').value];
			item.location 	 	= ["Where To Buy:", locationValue];
			item.store 	 		= ["Store Name:", $('store').value];
			item.url	 	 	= ["Product Url:", $('url').value];
			item.date	 	 	= ["Date Added:", $('date').value];
		
		//Save Data in localStorage: Use Stringify to convert our object to a string.
		localStorage.setItem(id,JSON.stringify(item));
		alert("Item Added!");
	}

	function getData(){
		toggleControls("on");
		//write data from local storage to browser.
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('items').style.display = "display";
		for(var i=0, len=localStorage.length; i<len;i++){
			var makeli = document.createElement('li');
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//Convert string from local storage value back to an object by using JSON.parse
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeli.appendChild(makeSubList);
			for(var n in obj){
				var makeSubli = document.createElement('li');
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
			}			
		}
	}
	
	function clearLocal(){
		if(localStorage.length === 0){
			alert("There is no data to clear.")
		}else{ 
			localStorage.clear();
			alert("All items are deleted.");
			window.location.reload();
			return false;		
		}
	}
	
	//var defaults
	var giftCategory = ["--Choose A Gift Category--", "Electronics", "Movies & Games", "Clothing & Accessories", "Music", "Books", "Etc"],
		locationValue
	;
	makeCats();
	//set link and click events
	var displayData = $('displayData');
	displayData.addEventListener("click", getData);
	var clearData =$('clear');
	clearData.addEventListener("click", clearLocal);
	var save = $('submit');
	save.addEventListener("click", storeData);

});