// ---------------------- CONFIG ----------------------
const BACKEND_URL = "http://web-project-alb-1310697723.ap-south-1.elb.amazonaws.com";
// ----------------------------------------------------

// MENU TOGGLE
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

// SCROLL REVEAL
const scrollRevealOption = {
  origin: "bottom",
  distance: "50px",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", { ...scrollRevealOption, origin: "right" });
ScrollReveal().reveal(".header__content p", { ...scrollRevealOption, delay: 500 });
ScrollReveal().reveal(".header__content h1", { ...scrollRevealOption, delay: 1000 });
ScrollReveal().reveal(".header__btns", { ...scrollRevealOption, delay: 1500 });

ScrollReveal().reveal(".destination__card", { ...scrollRevealOption, interval: 500 });

ScrollReveal().reveal(".showcase__image img", { ...scrollRevealOption, origin: "left" });
ScrollReveal().reveal(".showcase__content h4", { ...scrollRevealOption, delay: 500 });
ScrollReveal().reveal(".showcase__content p", { ...scrollRevealOption, delay: 1000 });
ScrollReveal().reveal(".showcase__btn", { ...scrollRevealOption, delay: 1500 });

ScrollReveal().reveal(".banner__card", { ...scrollRevealOption, interval: 500 });
ScrollReveal().reveal(".discover__card", { ...scrollRevealOption, interval: 500 });

// SWIPER
const swiper = new Swiper(".swiper", {
  slidesPerView: 3,
  spaceBetween: 20,
  loop: true,
});

// OPEN LOGIN MODAL
function openLogin() {
  document.getElementById("loginModal").style.display = "flex";
}

// LOGIN API CALL
async function login() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(`${BACKEND_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email }),
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("username", data.username);
      localStorage.setItem("email", data.email);
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid Login");
    }
  } catch (err) {
    console.error("Login error:", err);
    alert("Server not reachable. Try again later.");
  }
}

// SEARCH API CALL
async function search() {
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const people = document.getElementById("people").value;

  try {
    const res = await fetch(`${BACKEND_URL}/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, people }),
    });

    const data = await res.json();
    const result = document.getElementById("result");

    if (data.success) {
      result.innerHTML = `
        <h3>Flight Found ✈️</h3>
        From: ${data.data.from}<br>
        To: ${data.data.to}<br>
        People: ${data.data.people}<br>
        Price: ₹${data.data.price}<br>
        Total: ₹${data.data.total}<br><br>
        <button onclick="purchase()">Purchase Ticket</button>
      `;
    } else {
      result.innerHTML = "No tickets found ❌";
    }
  } catch (err) {
    console.error("Search error:", err);
    alert("Server not reachable. Try again later.");
  }
}

// ON PAGE LOAD - WELCOME MESSAGE
window.onload = function () {
  const name = localStorage.getItem("username");
  if (name && document.getElementById("welcome")) {
    document.getElementById("welcome").innerText = "Welcome, " + name + " 👋";
  }
};

// PURCHASE TICKET
function purchase() {
  const email = localStorage.getItem("email");
  alert("🎉 Ticket booked!\nSent to: " + email);
}
