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
