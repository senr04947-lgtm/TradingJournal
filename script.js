let trades = JSON.parse(localStorage.getItem("trades")) || [];

function saveTrade() {

const date = document.getElementById("date").value;
const index = document.getElementById("index").value;
const stock = document.getElementById("stock").value;
const buy = Number(document.getElementById("buy").value);
const sell = Number(document.getElementById("sell").value);
const qty = Number(document.getElementById("qty").value);
const sl = document.getElementById("sl").value;
const logic = document.getElementById("logic").value;
const mistake = document.getElementById("mistake").value;
const lesson = document.getElementById("lesson").value;

const file = document.getElementById("screenshot").files[0];

if(date=="" || stock=="" || buy==0 || sell==0 || qty==0){
alert("Please fill all required fields");
return;
}

const day = new Date(date).toLocaleDateString("en-US",{weekday:"long"});

const pl = ((sell-buy)*qty).toFixed(2);

if(file){

const reader = new FileReader();

reader.onload=function(e){

trades.push({

date,
day,
index,
stock,
buy,
sell,
qty,
pl,
sl,
logic,
mistake,
lesson,
image:e.target.result

});

localStorage.setItem("trades",JSON.stringify(trades));

showTrades();

document.querySelector("form")?.reset();

};

reader.readAsDataURL(file);

}else{

trades.push({

date,
day,
index,
stock,
buy,
sell,
qty,
pl,
sl,
logic,
mistake,
lesson,
image:""

});

localStorage.setItem("trades",JSON.stringify(trades));

showTrades();

}

}

function deleteTrade(i){

trades.splice(i,1);

localStorage.setItem("trades",JSON.stringify(trades));

showTrades();

}

function showTrades(){

let output="";

trades.forEach((t,i)=>{

output+=`

<div class="trade">

<b>📅 Date:</b> ${t.date}<br>

<b>📆 Day:</b> ${t.day}<br>

<b>📊 Index:</b> ${t.index}<br>

<b>📈 Stock:</b> ${t.stock}<br>

<b>💰 Buy:</b> ${t.buy}<br>

<b>💵 Sell:</b> ${t.sell}<br>

<b>🔢 Qty:</b> ${t.qty}<br>

<b>💹 P/L:</b> ₹${t.pl}<br>

<b>🛑 SL:</b> ${t.sl}<br>

<b>🧠 Logic:</b><br>${t.logic}<br><br>

<b>❌ Mistake:</b><br>${t.mistake}<br><br>

<b>📖 Lesson:</b><br>${t.lesson}<br><br>

${t.image?`<img src="${t.image}">`:""}

<button class="deleteBtn" onclick="deleteTrade(${i})">Delete</button>

</div>

`;

});

document.getElementById("tradeList").innerHTML=output;
let totalPL = 0;
let wins = 0;

trades.forEach(t => {
totalPL += Number(t.pl);

if(Number(t.pl) > 0){
wins++;
}
});

document.getElementById("totalTrades").innerText = trades.length;

document.getElementById("totalPL").innerText = "₹" + totalPL.toFixed(2);

let rate = trades.length == 0 ? 0 : ((wins / trades.length) * 100).toFixed(1);

document.getElementById("winRate").innerText = rate + "%";

}

showTrades();
function backupData(){

const trades = JSON.parse(localStorage.getItem("trades")) || [];

if(trades.length===0){
alert("No data available for backup.");
return;
}

const data = JSON.stringify(trades,null,2);

const blob = new Blob([data],{type:"application/json"});

const url = URL.createObjectURL(blob);

const a = document.createElement("a");

a.href = url;

a.download = "TradingJournal_Backup.json";

a.click();

URL.revokeObjectURL(url);

}
