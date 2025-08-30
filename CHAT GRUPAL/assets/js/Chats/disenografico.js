// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDDjhIzb_jcQg0kiB77GXdzdsr7tM8Gsyc",
  authDomain: "chat-grupal-1d734.firebaseapp.com",
  projectId: "chat-grupal-1d734",
  storageBucket: "chat-grupal-1d734.firebasestorage.app",
  messagingSenderId: "1045018122909",
  appId: "1:1045018122909:web:660c1d980822005b239274"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let displayName = null;
let currentUser = null;
let photoURL = null;
const roomName = "3ro Diseño"; 
const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");
const backBtn = document.getElementById("back-btn");

window.addEventListener("load", () => {
  const savedUser = localStorage.getItem("chatUser");
  if (!savedUser) {
    window.location.href = "../../index.html";
    return;
  }

  const userData = JSON.parse(savedUser);
  displayName = userData.name;
  photoURL = userData.photoURL || "default-avatar.png";
  currentUser = userData.uid;

  listenForMessages();
});

sendBtn.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress", e => { if (e.key === "Enter") sendMessage(); });

function sendMessage() {
  const text = messageInput.value.trim();
  if (text === "") return;

  db.collection("3roDiseño").add({
    room: roomName,
    uid: currentUser,
    name: displayName,
    photo: photoURL,
    text,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });

  messageInput.value = "";
}

function listenForMessages() {
  db.collection("3roDiseño")
    .where("room", "==", roomName)
    .orderBy("createdAt")
    .onSnapshot(snapshot => {
      messagesDiv.innerHTML = "";

      snapshot.forEach(doc => {
        const msg = doc.data();
        if (!msg.text || msg.text.trim() === "") return;

        const msgDiv = document.createElement("div");
        msgDiv.classList.add("message");
        msgDiv.classList.add(msg.uid === currentUser ? "mine" : "other");

        const img = document.createElement("img");
        img.src = msg.photo || "default-avatar.png";
        img.onerror = () => { img.src = "default-avatar.png"; };

        const contentDiv = document.createElement("div");
        contentDiv.classList.add("message-content");

        const nameNode = document.createElement("div");
        nameNode.classList.add("message-name");
        nameNode.textContent = msg.name || "Anonimo";

        const textNode = document.createElement("div");
        textNode.textContent = msg.text;

        const timeNode = document.createElement("div");
        timeNode.classList.add("timestamp");
        if (msg.createdAt?.toDate) {
          const time = msg.createdAt.toDate();
          timeNode.textContent = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }

        contentDiv.appendChild(nameNode);
        contentDiv.appendChild(textNode);
        contentDiv.appendChild(timeNode);

        msgDiv.appendChild(img);
        msgDiv.appendChild(contentDiv);

        messagesDiv.appendChild(msgDiv);
      });

      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    });
}

backBtn.addEventListener("click", () => {
  window.location.href = "salas.html";
});

document.getElementById("creditos-btn").addEventListener("click", () => {
    window.location.href = "creditos.html";
  });