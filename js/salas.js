// Botones de salas
const salaButtons = document.querySelectorAll(".sala-btn");
const logoutBtn = document.getElementById("logout-btn");
const creditosBtn = document.getElementById("creditos-btn"); 

salaButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const salaFile = btn.dataset.file; 
    window.location.href = salaFile;  
  });
});

if (creditosBtn) {
  creditosBtn.addEventListener("click", () => {
    window.location.href = "creditos.html";
  });
}

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("chatUser");
  localStorage.removeItem("chatRoom");
  window.location.href = "../../index.html";
});
