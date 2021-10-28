var mainDiv=document.getElementById("main");

for(i in data) {
	var newDiv=document.createElement("div");
	var newImg=document.createElement("img");
	newImg.setAttribute("src", data[i].images.small);
	newDiv.appendChild(newImg);
	mainDiv.appendChild(newDiv);
}
