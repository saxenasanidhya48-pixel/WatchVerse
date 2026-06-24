console.log("🎬 WatchVerse Loaded");

function setTheme(theme){

document.body.setAttribute("data-theme", theme);

localStorage.setItem("watchverse-theme", theme);

}

window.addEventListener("load", () => {

const savedTheme =
localStorage.getItem("watchverse-theme");

if(savedTheme){

document.body.setAttribute(
"data-theme",
savedTheme
);

}

});
let watchverseData =
JSON.parse(localStorage.getItem("watchverseData")) || [];

const entries = document.getElementById("entries");

const addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", addEntry);

function addEntry(){

const item = {

id: Date.now(),

type: document.getElementById("type").value,

title: document.getElementById("title").value,

genre: document.getElementById("genre").value,

platform: document.getElementById("platform").value,

rating: document.getElementById("rating").value,

status: document.getElementById("status").value,

notes: document.getElementById("notes").value,

seasonStatus:
document.getElementById("seasonStatus").value

};

if(item.title.trim()===""){
alert("Enter a title");
return;
}

watchverseData.push(item);

saveData();

renderEntries();

clearForm();

}

function saveData(){

localStorage.setItem(
"watchverseData",
JSON.stringify(watchverseData)
);

}

function clearForm(){

document.getElementById("title").value="";
document.getElementById("genre").value="";
document.getElementById("platform").value="";
document.getElementById("rating").value="";
document.getElementById("notes").value="";

}

function renderEntries(){

entries.innerHTML="";

watchverseData.forEach(item=>{

const card =
document.createElement("div");

card.className="entry-card";

card.innerHTML=`

<h3>${item.title}</h3>

<p>🎭 ${item.type}</p>

<p>📚 ${item.genre}</p>

<p>📺 ${item.platform}</p>

<p class="rating">
⭐ ${item.rating} Stars
</p>

<p>
${item.status}
</p>
<p>
🎬 ${item.seasonStatus}
</p>
<p>
${item.notes}
</p>

<button
class="delete-btn"
onclick="deleteEntry(${item.id})"
>
Delete
</button>

`;

entries.appendChild(card);

});

updateStats();

}

function deleteEntry(id){

watchverseData =
watchverseData.filter(
item=>item.id!==id
);

saveData();

renderEntries();

}

function updateStats(){

document.getElementById(
"totalEntries"
).textContent =
watchverseData.length;

document.getElementById(
"watchedCount"
).textContent =
watchverseData.filter(
x=>x.status==="Watched"
).length;

document.getElementById(
"planCount"
).textContent =
watchverseData.filter(
x=>x.status==="Plan To Watch"
).length;

}

renderEntries();
// Task 5: Search Working Implementation
document.getElementById("search").addEventListener("input", function() {
    let filter = this.value.toLowerCase();
    let entriesContainer = document.getElementById("entries");
    let cards = entriesContainer.getElementsByClassName("entry-card");
    
    for (let i = 0; i < cards.length; i++) {
        let title = cards[i].getElementsByTagName("h3")[0].innerText.toLowerCase();
        cards[i].style.display = title.includes(filter) ? "" : "none";
    }
});
