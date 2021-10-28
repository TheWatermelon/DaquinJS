
function compare(a, b) {
	const idA = a.id.split('-')[0].toUpperCase();
	const idB = b.id.split('-')[0].toUpperCase();
  
	let comparison = 0;
	if (idA > idB) {
	  comparison = 1;
	} else if (idA < idB) {
	  comparison = -1;
	}
	return comparison;
}

var sortedData=data.sort(compare);

var mainDiv=document.getElementById("main");

for(i in sortedData) {
	var newDiv=document.createElement("div");
	newDiv.setAttribute("id", sortedData[i].id);
	var newImg=document.createElement("img");
	newImg.setAttribute("src", sortedData[i].images.small);
	newImg.setAttribute("alt", sortedData[i].id+sortedData[i].name);
	newImg.setAttribute("title", sortedData[i].id+" : "+sortedData[i].name);
	newDiv.appendChild(newImg);
	mainDiv.appendChild(newDiv);
}
