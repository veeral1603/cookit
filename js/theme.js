"use script";

const body = document.querySelector("body");
const modeSwitchBtn = document.querySelector(".mode-switch");
const logo = document.querySelector(".logo");

function enableDarkMode() {
  body.classList.add("dark_mode");
  localStorage.setItem("theme", "dark");
  logo.src = `Assets/foodify-logo-dark.png`;
  modeSwitchBtn.querySelector("span").innerHTML = "light_mode";
}

function enableLightMode() {
  document.body.classList.remove("dark_mode");
  localStorage.setItem("theme", "light");
  logo.src = `Assets/foodify-logo.png`;
  modeSwitchBtn.querySelector("span").innerHTML = "dark_mode";
}

function toggleTheme() {
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme === "dark") {
    enableLightMode();
  } else {
    enableDarkMode();
  }
}

modeSwitchBtn.addEventListener("click", toggleTheme);
window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") enableDarkMode();
  else enableLightMode();
});
