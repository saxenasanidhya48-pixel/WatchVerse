console.log("🎬 WatchVerse Loaded");

function setTheme(theme){

document.body.className = theme;

localStorage.setItem("watchverse-theme", theme);

}

window.addEventListener("load", () => {

const savedTheme =
localStorage.getItem("watchverse-theme");

if(savedTheme){

document.body.className = savedTheme;
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


<div class="badge-container">
        ${item.genre ? `<p class="genre-badge ${getGenreClass(item.genre)}">🧩 ${item.genre}</p>` : ""}
        ${item.platform ? `<p class="platform-badge ${getPlatformClass(item.platform)}">📺 ${item.platform}</p>` : ""}
        ${item.status ? `<p class="status-badge ${getStatusClass(item.status)}">${item.status}</p>` : ""}
    </div>

    <p class="rating">
    ⭐ ${item.rating} Stars
    </p>
</p>
<p>
🎬 ${item.seasonStatus}
</p>
<p>
${item.notes}
</p>
<button 
    class="edit-btn" 
    onclick="editEntry(${item.id})" 
    style="background: #3b82f6; color: white; border: none; padding: 10px 14px; border-radius: 10px; cursor: pointer; margin-bottom: 8px;">
    Edit
</button>
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

function deleteEntry(id) {
    let confirmDelete = confirm("Bhai, sure ho na? Ye entry permanent delete ho jayegi!");
    if (confirmDelete) {
        watchverseData = watchverseData.filter(item => item.id !== id);
        saveData();
        renderEntries();
    }
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
// Task 6: Edit Entry (Paste this in script.js)
function editEntry(id) {
    const item = watchverseData.find(i => i.id === id);
    
    // Data form mein wapas daalo
    document.getElementById("title").value = item.title;
    document.getElementById("genre").value = item.genre;
    document.getElementById("platform").value = item.platform;
    document.getElementById("rating").value = item.rating;
    document.getElementById("status").value = item.status;
    document.getElementById("seasonStatus").value = item.seasonStatus;
    document.getElementById("notes").value = item.notes;

    // Add button ko "Update" mein badlo
    const addBtn = document.getElementById("addBtn");
    addBtn.innerText = "💾 Update Entry";
    addBtn.onclick = function() { updateEntry(id); };
}

// Update logic
function updateEntry(id) {
    const index = watchverseData.findIndex(i => i.id === id);
    watchverseData[index] = {
        id: id,
        type: document.getElementById("type").value,
        title: document.getElementById("title").value,
        genre: document.getElementById("genre").value,
        platform: document.getElementById("platform").value,
        rating: document.getElementById("rating").value,
        status: document.getElementById("status").value,
        seasonStatus: document.getElementById("seasonStatus").value,
        notes: document.getElementById("notes").value
    };
    
    saveData();
    renderEntries();
    clearForm();
    
    // Button wapas "Add" bana do
    const addBtn = document.getElementById("addBtn");
    addBtn.innerText = "➕ Add Entry";
    addBtn.onclick = addEntry;
}
function getGenreClass(genre) {
    const g = genre.toLowerCase();
    if (g.includes("action")) return "genre-action";
    if (g.includes("comedy")) return "genre-comedy";
    if (g.includes("drama")) return "genre-drama";
    if (g.includes("sci-fi") || g.includes("sci fi")) return "genre-scifi";
    return "genre-default";
}
function getPlatformClass(platform) {
    const p = platform.toLowerCase();
    if (p.includes("netflix")) return "platform-netflix";
    if (p.includes("disney")) return "platform-disney";
    if (p.includes("prime")) return "platform-prime";
    return "platform-default";
}
function getStatusClass(status) {
    const s = status.toLowerCase();
    if (s.includes("watched")) return "status-watched";
    if (s.includes("ongoing")) return "status-ongoing";
    if (s.includes("plan")) return "status-planning";
    return "status-default";
}
function updateDashboard() {
    const data = JSON.parse(localStorage.getItem("watchverseData")) || [];
    document.getElementById("total-entries").innerText = data.length;
}

window.addEventListener("load", () => {
    updateDashboard();
});
