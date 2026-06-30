const grid=document.getElementById("grid");
const message=document.getElementById("message");
const levelInfo=document.getElementById("levelInfo");
const startBtn=document.getElementById("startBtn");

const objects=[
"🚀","🛸","👑","💎",
"🧠","⚡","🔮","🎯",
"🐉","🦅","🎲","🕹️",
"🏆","🧩","🌟","🔥"
];

let level=1;
let memoryData=[];
let playerClicks=[];

function createGrid(){

grid.innerHTML="";

for(let i=0;i<16;i++){

const cell=document.createElement("div");

cell.className="cell";

cell.dataset.index=i;

cell.onclick=handleClick;

grid.appendChild(cell);

}
}

function startLevel(){

createGrid();

memoryData=[];
playerClicks=[];

let cells=document.querySelectorAll(".cell");

let amount=Math.min(level+2,10);

let used=[];

for(let i=0;i<amount;i++){

let pos;

do{
pos=Math.floor(Math.random()*16);
}
while(used.includes(pos));

used.push(pos);

let obj=
objects[Math.floor(Math.random()*objects.length)];

memoryData.push({
position:pos,
object:obj
});

cells[pos].innerHTML=obj;

}

message.innerHTML=
"Memorize the objects...";

setTimeout(()=>{

cells.forEach(c=>{

c.innerHTML="";
});

message.innerHTML=
"Now click remembered locations";

},3000);
}

function handleClick(e){

let index=parseInt(
e.target.dataset.index
);

if(playerClicks.includes(index))
return;

playerClicks.push(index);

if(
memoryData.some(
m=>m.position===index
)
){

e.target.classList.add("correct");

}
else{

e.target.classList.add("wrong");

}

checkResult();
}

function checkResult(){

if(
playerClicks.length<
memoryData.length
)
return;

let success=true;

for(let item of memoryData){

if(
!playerClicks.includes(
item.position
)
){
success=false;
}
}

if(success){

level++;

levelInfo.innerHTML=
"Level "+level;

message.innerHTML=
"Mission Success!";

setTimeout(
startLevel,
1500
);

}
else{

message.innerHTML=
"Mission Failed";

level=1;

levelInfo.innerHTML=
"Level 1";
}
}

startBtn.onclick=()=>{

level=1;

startLevel();
}