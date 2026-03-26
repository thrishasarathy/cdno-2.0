(function () {
  const DEMO_USERS = [
    {
      name: "User One",
      email: "user1@gmail.com",
      password: "1234",
      phone: "9876543210",
      instagram: "@user1",
      whatsapp: "Connected",
      privacy: "Private Profile"
    },
    {
      name: "User Two",
      email: "user2@gmail.com",
      password: "1234",
      phone: "9876501234",
      instagram: "@user2",
      whatsapp: "Connected",
      privacy: "Friends Only"
    },
    {
      name: "User Three",
      email: "user3@gmail.com",
      password: "1234",
      phone: "9876512340",
      instagram: "@user3",
      whatsapp: "Connected",
      privacy: "Public Profile"
    }
  ];


  function initUsers() {
    if (!localStorage.getItem("cdno_users")) {
      localStorage.setItem("cdno_users", JSON.stringify(DEMO_USERS));
    }
  }


  function getUsers() {
    return JSON.parse(localStorage.getItem("cdno_users")) || [];
  }


  function saveUsers(users) {
    localStorage.setItem("cdno_users", JSON.stringify(users));
  }


  function setCurrentUser(user) {
    localStorage.setItem("cdno_current_user", JSON.stringify(user));
  }


  function getCurrentUser() {
    return JSON.parse(localStorage.getItem("cdno_current_user"));
  }


  function logout() {
    localStorage.removeItem("cdno_current_user");
    window.location.href = "login.html";
  }


  initUsers();


  // LOGIN
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();


      const email = document.getElementById("loginEmail").value.trim().toLowerCase();
      const password = document.getElementById("loginPassword").value.trim();
      const error = document.getElementById("loginError");


      const users = getUsers();
      const user = users.find(u => u.email.toLowerCase() === email && u.password === password);


      if (!user) {
        error.style.display = "block";
        error.textContent = "Invalid email or password.";
        return;
      }


      setCurrentUser(user);
      window.location.href = "notifications.html";
    });
  }


  // SIGNUP
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();


      const name = document.getElementById("signupName").value.trim();
      const email = document.getElementById("signupEmail").value.trim().toLowerCase();
      const password = document.getElementById("signupPassword").value.trim();
      const phone = document.getElementById("signupPhone").value.trim();
      const instagram = document.getElementById("signupInstagram").value.trim();
      const whatsapp = document.getElementById("signupWhatsapp").value.trim();
      const privacy = document.getElementById("signupPrivacy").value;
      const error = document.getElementById("signupError");


      const users = getUsers();
      const exists = users.some(u => u.email.toLowerCase() === email);


      if (exists) {
        error.style.display = "block";
        error.textContent = "Account already exists with this email.";
        return;
      }


      const newUser = {
        name,
        email,
        password,
        phone,
        instagram: instagram || "Not connected",
        whatsapp: whatsapp || "Not connected",
        privacy
      };


      users.push(newUser);
      saveUsers(users);
      setCurrentUser(newUser);
      window.location.href = "notifications.html";
    });
  }


  // PROFILE PAGE
  const currentUser = getCurrentUser();


  if (window.location.pathname.includes("profile.html")) {
    if (!currentUser) {
      window.location.href = "login.html";
    } else {
      const setText = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
      };


      setText("profileName", currentUser.name || "User");
      setText("profileEmail", currentUser.email || "No email");
      setText("profilePhone", currentUser.phone || "No phone");
      setText("profilePrivacy", currentUser.privacy || "Private Profile");
      setText("profileInstagram", `Instagram: ${currentUser.instagram || "Not connected"}`);
      setText("profileWhatsapp", `WhatsApp: ${currentUser.whatsapp || "Not connected"}`);


      const logoutBtn = document.getElementById("logoutProfileBtn");
      if (logoutBtn) logoutBtn.addEventListener("click", logout);
    }
  }


  // Protect dashboard
  if (window.location.pathname.includes("notifications.html")) {
    if (!currentUser) {
      window.location.href = "login.html";
    }
  }


  window.getCurrentUser = getCurrentUser;
  window.logoutCDNO = logout;
})();
