// Variables del DOM
const avatarImages = document.querySelectorAll(".avatar-options");
const deselectBtn = document.getElementById("deselect-avatar");
const nameInput = document.getElementById("name");
const startBtn = document.getElementById("start-btn");
const photoInput = document.getElementById("photo");
const previewDiv = document.getElementById("photo-preview");
const previewImg = document.getElementById("preview-img");
const removeBtn = document.getElementById("remove-photo");

let selectedAvatar = "";

avatarImages.forEach(img => {
  img.addEventListener("click", () => {
    if (photoInput.files.length === 0) {
      avatarImages.forEach(i => i.classList.remove("selected"));
      img.classList.add("selected");
      selectedAvatar = img.src;
      checkReady();
    }
  });
});

deselectBtn.addEventListener("click", () => {
  avatarImages.forEach(img => img.classList.remove("selected"));
  selectedAvatar = "";
  checkReady();
});

function checkReady() {
  startBtn.disabled = !(nameInput.value.trim() !== "" && (selectedAvatar || photoInput.files.length > 0));
}
nameInput.addEventListener("input", checkReady);

photoInput.addEventListener("change", () => {
  if (photoInput.files && photoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = e => {
      previewImg.src = e.target.result;
      previewDiv.style.display = "flex";

      avatarImages.forEach(img => img.classList.remove("selected"));
      selectedAvatar = "";
      checkReady();
    }
    reader.readAsDataURL(photoInput.files[0]);
  }
});

removeBtn.addEventListener("click", () => {
  photoInput.value = "";
  previewImg.src = "";
  previewDiv.style.display = "none";
  checkReady();
});

startBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  let photoURL = selectedAvatar;

  const uid = 'user_' + Math.random().toString(36).substr(2, 9);

  if (photoInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = e => {
      photoURL = e.target.result;
      saveAndGo(name, photoURL, uid);
    }
    reader.readAsDataURL(photoInput.files[0]);
  } else {
    saveAndGo(name, photoURL, uid);
  }
});

function saveAndGo(name, photoURL, uid) {
  localStorage.setItem("chatUser", JSON.stringify({ uid, name, photoURL }));
  window.location.href = "assets/html/salas.html";
}
setTimeout(() => {
      document.getElementById("welcome-screen").style.display = "none";
      document.getElementById("project-logo").style.display = "block";
      document.querySelector(".login-container").style.display = "block";
    }, 3000);

