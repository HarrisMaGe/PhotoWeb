//var images;

//保存实时的
var images；

/*=["images/img3.jpg",
"images/img4.jpg",
"images/img5.jpg",
"images/img6.jpg",
"images/img7.jpg",
"images/img8.jpg",
"images/img9.jpg",
"images/img10.jpg",
"images/img11.jpg",
"images/img12.jpg",
"images/img13.jpg",
"images/img14.jpg",
"images/img15.jpg",
"images/img16.jpg",
"images/img17.jpg",
"images/img18.jpg",
"images/img19.jpg",
"images/img20.jpg",
"images/img21.jpg",
"images/img22.jpg",
"images/img23.jpg",
"images/img24.jpg",
"images/img25.jpg",
"images/img26.jpg",
"images/img27.jpg",
"images/img28.jpg",
"images/img29.jpg",
"images/img30.jpg",
"images/img31.jpg",
"images/img32.jpg",
"images/img33.jpg",
"images/img34.jpg",
"images/img35.jpg",
"images/img36.jpg",
];*/


//删除的图片
var wanttodel = new Array();

		
var currpage;
//初始化函数
function setting(var data){
	images = data;
	var pagagenumbers = Math.ceil(images.length/12);
	var pagnations = document.getElementById("pagnation");
	for(var i = 0; i < pagagenumbers; i++){
		var ahref = document.createElement("a");
		var node=document.createTextNode(i+1);
		ahref.appendChild(node);
		ahref.setAttribute("onclick", "changeImage("+(i+1)+")");
		pagnations.appendChild(ahref);
	}
	changeImage(1);



}

function changeImage(number){
	
	
	currpage = number;
	//var imagenumber = images.length;
	var pagagenumbers = Math.ceil(images.length/12);

	//最后一页图片数
	var lastnumbers = images.length - (pagagenumbers-1)*12;
	if(lastnumbers < 0){
		lastnumbers = 0;
	}

	var currents = new Array();
	var current = new Array();
	currents[0] =document.getElementById("pone");
	currents[1] =document.getElementById("ptwo");
	currents[2] =document.getElementById("pthree");
	currents[3] =document.getElementById("pfour");
	currents[4] =document.getElementById("pfive");
	currents[5] =document.getElementById("psix");
	currents[6] =document.getElementById("pseven");
	currents[7] =document.getElementById("peight");
	currents[8] =document.getElementById("pnine");
	currents[9] =document.getElementById("pten");
	currents[10] =document.getElementById("peleven");
	currents[11] =document.getElementById("ptwelve");

	current[0] =document.getElementById("apone");
	current[1] =document.getElementById("aptwo");
	current[2] =document.getElementById("apthree");
	current[3] =document.getElementById("apfour");
	current[4] =document.getElementById("apfive");
	current[5] =document.getElementById("apsix");
	current[6] =document.getElementById("apseven");
	current[7] =document.getElementById("apeight");
	current[8] =document.getElementById("apnine");
	current[9] =document.getElementById("apten");
	current[10] =document.getElementById("apeleven");
	current[11] =document.getElementById("aptwelve");
	if(number >= pagagenumbers){
		
		for(var i = 0; i < lastnumbers; i++){
			currents[i].src = images[(number-1)*12+i];
			current[i].href = images[(number-1)*12+i];
		}
		for(var i = lastnumbers; i < 12; i++){
			currents[i].src = "images/null.jpg";
			current[i].href = "images/null.jpg";
		}
		
	}else{
		
		for(var i = 0; i < 12; i++){
			currents[i].src = images[(number-1)*12+i];
			current[i].href = images[(number-1)*12+i];
		}
		
	}


}


function deletepic(){
	var deleteimages = new Array();
	var pagagenumbers = Math.ceil(images.length/12);
	if(currpage == pagagenumbers){
		var lastnumbers = images.length - (pagagenumbers-1)*12;
		for(var i = 0; i < lastnumbers; i++){
			var index = i+1+"";
			deleteimages[i] = document.getElementById(index);
			var img = document.createElement("img");
			var numberimage = deleteimages[i].getElementsByTagName("img").length;
			if(numberimage==0){
				img.setAttribute("src","images/delete.png");
				var aid = "once"+i;
				img.setAttribute("id",aid);
				img.setAttribute("onclick","remove("+index+")");
				deleteimages[i].appendChild(img);
			}
		}
	}else{
		
		for(var i = 0; i < 12; i++){
			var index = i+1+"";
			deleteimages[i] = document.getElementById(index);
			var img = document.createElement("img");
			var numberimage = deleteimages[i].getElementsByTagName("img").length;
			if(numberimage==0){
				img.setAttribute("src","images/delete.png");
				var aid = "once"+i;
				img.setAttribute("id",aid);
				img.setAttribute("onclick","remove("+index+")");
				deleteimages[i].appendChild(img);
			}
		}
	}
	var sure = document.getElementById("sure");
	var but =document.createElement("button");
	var node=document.createTextNode("确定");
	but.appendChild(node);
	but.setAttribute("onclick","removex ()");
	but.setAttribute("id","asure");
	sure.appendChild(but);

	

}

function remove(anumber){
	var currents = new Array();
	var current = new Array();
	currents[0] =document.getElementById("pone");
	currents[1] =document.getElementById("ptwo");
	currents[2] =document.getElementById("pthree");
	currents[3] =document.getElementById("pfour");
	currents[4] =document.getElementById("pfive");
	currents[5] =document.getElementById("psix");
	currents[6] =document.getElementById("pseven");
	currents[7] =document.getElementById("peight");
	currents[8] =document.getElementById("pnine");
	currents[9] =document.getElementById("pten");
	currents[10] =document.getElementById("peleven");
	currents[11] =document.getElementById("ptwelve");

	current[0] =document.getElementById("apone");
	current[1] =document.getElementById("aptwo");
	current[2] =document.getElementById("apthree");
	current[3] =document.getElementById("apfour");
	current[4] =document.getElementById("apfive");
	current[5] =document.getElementById("apsix");
	current[6] =document.getElementById("apseven");
	current[7] =document.getElementById("apeight");
	current[8] =document.getElementById("apnine");
	current[9] =document.getElementById("apten");
	current[10] =document.getElementById("apeleven");
	current[11] =document.getElementById("aptwelve");
	var deleteindex = 12*(currpage-1)+anumber-1;
	wanttodel.push(images[deleteindex]);
	images.splice(deleteindex,1);
	changeImage(currpage);
}




// 删除数据的onclick函数
function removex(){
	var deleteimages;
	for(var i = 0; i < 12; i++){
			deleteimages = document.getElementById(i+1);
			var aid = "once"+i;
			var img = document.getElementById(aid);
			deleteimages.removeChild(img);
			
		}
	var Fabutton = document.getElementById("sure");	
	var butt = document.getElementById("asure");
	Fabutton.removeChild(butt);
}


	/*
	var deleteimages;
	for(var i = 0; i < 12; i++){
			var index = i+1+"";
			deleteimages = document.getElementById(index);
			var img = deleteimages[i].getElementsByTagName("img");
			deleteimages.removeChild(img[0]);
			
		}
*/



//function remove(anumber){
	/*
	var currents = new Array();
	var current = new Array();
	currents[0] =document.getElementById("pone");
	currents[1] =document.getElementById("ptwo");
	currents[2] =document.getElementById("pthree");
	currents[3] =document.getElementById("pfour");
	currents[4] =document.getElementById("pfive");
	currents[5] =document.getElementById("psix");
	currents[6] =document.getElementById("pseven");
	currents[7] =document.getElementById("peight");
	currents[8] =document.getElementById("pnine");
	currents[9] =document.getElementById("pten");
	currents[10] =document.getElementById("peleven");
	currents[11] =document.getElementById("ptwelve");

	current[0] =document.getElementById("apone");
	current[1] =document.getElementById("aptwo");
	current[2] =document.getElementById("apthree");
	current[3] =document.getElementById("apfour");
	current[4] =document.getElementById("apfive");
	current[5] =document.getElementById("apsix");
	current[6] =document.getElementById("apseven");
	current[7] =document.getElementById("apeight");
	current[8] =document.getElementById("apnine");
	current[9] =document.getElementById("apten");
	current[10] =document.getElementById("apeleven");
	current[11] =document.getElementById("aptwelve");
	*/
	//var deleteindex = 12*currpage+number-1；
	//wanttodel.push(images[deleteindex]);
	//images.splice(deleteindex,deleteindex);
	//changeImage(currpage);
//}

/*
		[
		{ "name":"菜鸟教程" , "src":"images/img3.jpg" }, 
		{ "name":"google" , "src":"images/img4.jpg" }, 
		{ "name":"微博" , "src":"images/img5.jpg" },
		{ "name":"微博" , "src":"images/img6.jpg" },
		{ "name":"微博" , "src":"images/img7.jpg" },
		{ "name":"微博" , "src":"images/img8.jpg" },
		{ "name":"微博" , "src":"images/img9.jpg" },
		{ "name":"微博" , "src":"images/img10.jpg" },
		{ "name":"微博" , "src":"images/img11.jpg" },
		{ "name":"微博" , "src":"images/img12.jpg" },
		{ "name":"微博" , "src":"images/img13.jpg" },
		{ "name":"微博" , "src":"images/img14.jpg" },
		{ "name":"微博" , "src":"images/img15.jpg" },
		{ "name":"微博" , "src":"images/img16.jpg" },
		{ "name":"微博" , "src":"images/img17.jpg" },
		{ "name":"微博" , "src":"images/img18.jpg" },
		{ "name":"微博" , "src":"images/img19.jpg" },
		{ "name":"微博" , "src":"images/img20.jpg" },
		{ "name":"微博" , "src":"images/img21.jpg" },
		{ "name":"微博" , "src":"images/img22.jpg" },
		{ "name":"微博" , "src":"images/img23.jpg" },
		{ "name":"微博" , "src":"images/img24.jpg" },
		{ "name":"微博" , "src":"images/img25.jpg" },
		{ "name":"微博" , "src":"images/img26.jpg" },
		{ "name":"微博" , "src":"images/img27.jpg" },
		{ "name":"微博" , "src":"images/img28.jpg" },
		{ "name":"微博" , "src":"images/img29.jpg" },
		{ "name":"微博" , "src":"images/img30.jpg" },
		{ "name":"微博" , "src":"images/img31.jpg" },
		{ "name":"微博" , "src":"images/img32.jpg" },
		{ "name":"微博" , "src":"images/img33.jpg" },
		{ "name":"微博" , "src":"images/img34.jpg" },
		{ "name":"微博" , "src":"images/img35.jpg" },
		{ "name":"微博" , "src":"images/img36.jpg" },
		{ "name":"微博" , "src":"images/img37.jpg" }
		];
		*/


