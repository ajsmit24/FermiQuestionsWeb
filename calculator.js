
var probTypes=["length","volume","area","energy","acceleration"];
var mixType=[];
var qNumber=-1;
var currentAns;
var df=20;
var workShown="";

function startup(){
	$(".nextBut").replaceWith("");$(".inv").replaceWith("");
	probTypes=Object.keys(info);
	probTypes.push("mix");
	type=getRand(0,probTypes.length-1);
	console.log(type)
	if(type==probTypes.length-1){
		startup();
	}else{
	var mainKeys=Object.keys(info);
	var typeKeys=Object.keys(info[mainKeys[type]]);
	var r1=getRand(0,typeKeys.length-1);
	var r2=getRand();
	var d1=info[mainKeys[type]][typeKeys[r1]];
	var r2=r1;
	while(r2==r1){
		r2=getRand(0,typeKeys.length-1);
	}
	var d2=info[mainKeys[type]][typeKeys[r2]];
	genDiv(generateText(typeKeys[r1],typeKeys[r2],type));
	console.log(d1,d2);
	var ans=calc(d1,d2,type)
	currentAns=ans;
	genAnsChoices(ans,df);
	}
}
function getRand(min,max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generateText(str1,str2,type){
	var ops=[
		"How many times longer is --- than ^ ***?",
		"How many times does --- fit in ^ ***?",
		"How many --- would cover ^ ***?",
		"How much more energy is in one --- than ^ ***?",
		"How many times faster is --- than ***"
		];
	var q;
	if(type!=probTypes.length-1){
		q=ops[type];
	}else{
		
	}
	//mix units eg time distance
	q=q.replace(" ^","");
	q=q.replace("---",str1);
	q=q.replace("***",str2);
	return q;
}
function genDiv(str1){
	var html;
	qNumber++;
	var div="<div id='"+qNumber+"'><div>"+str1+"</div></div>";
	console.log(div);
	$("#thing").append(div);
}
function sciParcer(str){
	var pre=str.substring(0,str.indexOf("E"));
	var power=str.substring(str.indexOf("E")+1);
	return parseFloat(pre)*Math.pow(10,parseInt(power));
}
function toFermiAns(numb){
	var numbStr=""+numb.toExponential();
	var pow=parseInt(numbStr.substring(numbStr.indexOf("e")+2));
	var coef=parseFloat(numbStr.substring(0,numbStr.indexOf("e")));
	if(coef>4){
		pow++;
	}
	return pow;
}
function calc(in1,in2,type){
	
	//mix should be last
	if(type==probTypes.length-1){
		console.log("t",type);
	}else if(true){
		var numb1=sciParcer(in1.real);var numb2=sciParcer(in2.real);
		
		workSetUp(in1,in2,numb1/numb2);
		return toFermiAns(numb1/numb2);
	}else{
		console.log(9)
	}
	//need actual # method
}
var showWork=function(){
	console.log("work init failed");
};
function workSetUp(t1,t2,ans){
		showWork=function(){
		var w=genWork(t1,t2,ans);
		$("#"+qNumber).append(w);
	}
}
function getMixType(){
	var mainKeys=Object.keys(info);
	var rt1=getRand(0,mainKeys.length-1);
	var rt2=rt1;
	while(rt1==rt2){
		rt2=getRand(0,mainKeys.length-1);
	}
	return [rt1,rt2];
}
function genAnsChoices(ans,freedom){
	var html;
	var left=getRand(0,freedom);
	var right=freedom-left;
	console.log(freedom,left,right,ans);
	var range="The answer is between "+(ans-left)+" and "+(ans+right)+"";
	html="<div class='range'>"+range+"</div>";
	$("#"+qNumber).append(html);

	makeTextBox();
	
}
function makeTextBox(){
	var button="<div><input id='text"+qNumber+"'type='text'></input><button onclick='ansHandler()'>Go!</button></div>";
	$("#"+qNumber).append(button);
	
}
function ansHandler(){
	var div="";
	$(".ansResponce").replaceWith("");
	if(currentAns){
		if(checkAns(currentAns)){
			div="<div class='green correct ansResponce'>correct input!";
		}else{
			div="<div class='red incorrect ansResponce'>incorrect input";
		}
		var button="<div class='workBut'><br/><button onclick='showWork()'>Show Work</button></div><br/>"+
		"<div class='nextBut'><button onclick='startup()'>Generate New Problem</button></div>";
		$("#"+qNumber).append(div+button);
	}
	
}

function genWork(thing1, thing2, ans){
	var ret="";
	if(type==probTypes.length-1){
		console.log("t",type);
	}else if(true){
		ret=thing1.real+" divided by "+thing2.real+" equals "+ans;
	}else{
		console.log(9)
	}
	return ret;
}
function checkAns(ans){
	$(".inv").replaceWith("");
	$(".nextBut").replaceWith("");
	var input=document.getElementById("text"+qNumber).value;
	var isNotGoodNumb=/[a-z]|[.]|[\s]/;
	var inAns;
	if(isNotGoodNumb.test(input)||input.length<1){
		var div="<div class='red inv'>invalid input</div>";
		$("#"+qNumber).append(div);
	}else{
		inAns=parseInt(input);
		console.log(ans);
		return inAns==ans;
	}
}
