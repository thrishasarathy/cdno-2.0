(function () {
  const currentUser = JSON.parse(localStorage.getItem("cdno_current_user"));
  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }


  const notificationList = document.getElementById("notificationList");
  const historyList = document.getElementById("historyList");


  const categoryFilter = document.getElementById("categoryFilter");
  const priorityFilter = document.getElementById("priorityFilter");
  const sortMode = document.getElementById("sortMode");
  const searchInput = document.getElementById("searchInput");
  const keywordInput = document.getElementById("keywordInput");
  const autoSortToggle = document.getElementById("autoSortToggle");


  const totalCount = document.getElementById("totalCount");
  const unreadCount = document.getElementById("unreadCount");
  const optimizedCount = document.getElementById("optimizedCount");
  const hiddenNoiseCount = document.getElementById("hiddenNoiseCount");


  const welcomeText = document.getElementById("welcomeText");


  const profileUserName = document.getElementById("profileUserName");
  const profileUserEmail = document.getElementById("profileUserEmail");
  const profileUserPhone = document.getElementById("profileUserPhone");
  const profileUserPrivacy = document.getElementById("profileUserPrivacy");
  const profileInstagram = document.getElementById("profileInstagram");
  const profileWhatsapp = document.getElementById("profileWhatsapp");


  const runEngineBtn = document.getElementById("runEngineBtn");
  const refreshBtn = document.getElementById("refreshBtn");
  const saveKeywordBtn = document.getElementById("saveKeywordBtn");
  const goProfileBtn = document.getElementById("goProfileBtn");
  const logoutBtn = document.getElementById("logoutBtn");


  let currentContext = typeof getContextPreference === "function" ? getContextPreference() : "work";
  let currentNotifications = [];


  function renderProfileSnapshot() {
    profileUserName.textContent = currentUser.name || "User";
    profileUserEmail.textContent = currentUser.email || "No email";
    profileUserPhone.textContent = currentUser.phone || "Phone not added";
    profileUserPrivacy.textContent = currentUser.privacy || "Private Profile";
    profileInstagram.textContent = currentUser.instagram ? `Instagram: ${currentUser.instagram}` : "Instagram: Not connected";
    profileWhatsapp.textContent = currentUser.whatsapp ? `WhatsApp: ${currentUser.whatsapp}` : "WhatsApp: Not connected";
    welcomeText.textContent = `Welcome back, ${currentUser.name || "User"}. Your alerts are ranked based on your selected context.`;
  }


  const userFeeds = {
    "user1@gmail.com": [
      "Anna University Internal Marks Updated", "Placement Drive Reminder - TCS NQT",
      "Gmail: Internship Shortlist Mail", "Exam Hall Ticket Released",
      "LinkedIn: Recruiter Viewed Your Profile", "Scholarship Verification Pending",
      "Library Fine Reminder", "Moodle Assignment Deadline Tonight",
      "Project Review Meeting at 4 PM", "LinkedIn: 5 New Job Matches"
    ],
    "user2@gmail.com": [
      "Anna University Revaluation Result Published", "Infosys Interview Slot Confirmed",
      "WhatsApp: Final Year Project Group - 67 Messages", "UPI Debit Alert ₹1,299",
      "Hostel Fee Reminder", "LinkedIn: Application Viewed",
      "Gmail: HR Follow-up Mail", "NPTEL Assignment Reminder",
      "College Symposium Registration Closing", "Amazon Offer: Student Deal"
    ],
    "user3@gmail.com": [
      "Internal Assessment Schedule Released", "Capgemini Placement Round Update",
      "Telegram: Coding Contest Shared", "PhonePe Cashback Received",
      "Attendance Shortage Warning", "Hackathon Submission Tonight",
      "LinkedIn: New Internship Suggestions", "Mess Menu Updated",
      "Train PNR Status Updated", "YouTube: New Video from Subscribed Channel"
    ]
  };


  const sourcePool = [
    "Anna University Portal", "Placement Cell", "WhatsApp", "Instagram", "LinkedIn", "Gmail",
    "Telegram", "Google Pay", "PhonePe", "SBI", "Amazon", "Flipkart", "Moodle", "ERP",
    "Calendar", "College Admin", "NPTEL", "IRCTC", "Hostel App", "Spam Mail", "YouTube",
    "Swiggy", "Zomato", "Steam", "BGMI"
  ];


  const categoryPool = ["academic", "career", "social", "finance", "utility", "travel", "spam", "gaming"];
  const typePool = ["exam", "deadline", "career", "meeting", "finance", "social", "offer", "spam", "gaming", "travel"];


  const extraTitles = [
    "College Circular Uploaded", "LinkedIn: Recruiter Message Received", "WhatsApp: Department Group - 89 Messages",
    "Instagram: 21 New Likes", "Gmail: Interview Round Scheduled", "PhonePe Wallet Low Balance",
    "Flipkart Offer: Electronics Sale", "IRCTC Waitlist Confirmed", "Amazon Delivery Out for Delivery",
    "Spam Alert: Win iPhone Now", "Telegram: Coding Resource Shared", "Project Viva Date Updated",
    "Anna University Result Window Open", "Placement Aptitude Round Reminder", "Internship Offer Letter Available",
    "YouTube: Recommended Live Stream", "Steam Sale: New Game Discount", "BGMI Squad Invite",
    "Scholarship Form Correction Open", "College Fee Receipt Generated", "Hackathon Reminder",
    "Seminar Hall Venue Changed", "LinkedIn: 12 New Job Matches", "Attendance Updated",
    "Assignment Deadline Tomorrow", "Internal Lab Marks Published", "Spam Call Warning",
    "WhatsApp: Family Group - 145 Messages", "Gmail: OTP Requested", "Zomato Offer: Flat ₹120 Off",
    "Bank Alert: New Login Detected", "Exam Seating Arrangement Released", "Lab Record Submission Reminder",
    "Instagram: Someone Mentioned You", "Mail: College Event Invite", "Placement Mock Interview Today",
    "Google Calendar: Project Submission", "Hostel Maintenance Notice", "Swiggy: Your order is arriving",
    "Telegram: Contest Result Posted", "IRCTC Platform Change Alert", "UPI Credit Alert ₹750",
    "Career Portal: Resume Shortlisted", "Amazon Wishlist Price Drop", "YouTube: 3 New Uploads",
    "ERP: Semester Attendance Updated", "Anna University Portal Maintenance Alert",
    "Spam Promotion: Limited Cashback Offer", "Gaming Reward Unlocked", "LinkedIn: Hiring Trend Update"
  ];


  const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const randomTime = () => {
    const n = Math.floor(Math.random() * 59) + 1;
    return Math.random() > 0.5 ? `${n} min ago` : `${Math.ceil(n / 6)} hr ago`;
  };


  function generateNotificationsForUser(email) {
    const seedTitles = userFeeds[email] || ["Welcome to CDNO", "Profile Created Successfully", "New Notification Stream Activated"];
    const combinedTitles = [...seedTitles, ...extraTitles];
    const total = Math.floor(Math.random() * 18) + 92;
    const items = [];


    for (let i = 0; i < total; i++) {
      items.push({
        id: `${Date.now()}_${i}_${Math.random().toString(36).slice(2, 8)}`,
        title: randomItem(combinedTitles),
        category: randomItem(categoryPool),
        source: randomItem(sourcePool),
        type: randomItem(typePool),
        time: randomTime(),
        unread: Math.random() > 0.35,
        pinned: false,
        deleted: false
      });
    }


    return items;
  }


  function getUserNotificationKey() {
    return `cdno_notifications_${currentUser.email}`;
  }


  function getUserKeywordKey() {
    return `cdno_keywords_${currentUser.email}`;
  }


  function loadNotifications() {
    const stored = localStorage.getItem(getUserNotificationKey());
    if (stored) {
      currentNotifications = JSON.parse(stored);
    } else {
      currentNotifications = generateNotificationsForUser(currentUser.email);
      saveNotifications();
    }
  }


  function saveNotifications() {
    localStorage.setItem(getUserNotificationKey(), JSON.stringify(currentNotifications));
  }


  function refreshNotifications() {
    currentNotifications = generateNotificationsForUser(currentUser.email);
    saveNotifications();
  }


  function loadSavedKeywords() {
    const saved = localStorage.getItem(getUserKeywordKey());
    if (saved) keywordInput.value = saved;
  }


  function saveKeywords() {
    localStorage.setItem(getUserKeywordKey(), keywordInput.value.trim());
  }


  function calculatePriority(notification, context, keywords = []) {
    let score = 0;


    if (notification.category === "academic") score += 7;
    if (notification.category === "career") score += 6;
    if (notification.category === "finance") score += 7;
    if (notification.category === "utility") score += 3;
    if (notification.category === "travel") score += 4;
    if (notification.category === "social") score += 2;
    if (notification.category === "gaming") score += 1;
    if (notification.category === "spam") score -= 3;


    if (notification.type === "deadline") score += 3;
    if (notification.type === "exam") score += 4;
    if (notification.type === "meeting") score += 3;
    if (notification.type === "finance") score += 4;
    if (notification.type === "spam") score -= 4;


    if (context === "work") {
      if (notification.category === "academic") score += 2;
      if (notification.category === "career") score += 3;
      if (notification.category === "social") score -= 3;
      if (notification.category === "gaming") score -= 3;
    }


    if (context === "sleep") {
      if (notification.category === "social") score -= 4;
      if (notification.category === "utility") score -= 1;
      if (notification.category === "finance") score += 2;
      if (notification.type === "deadline") score += 1;
    }


    if (context === "weekend") {
      if (notification.category === "social") score += 2;
      if (notification.category === "career") score -= 1;
      if (notification.category === "gaming") score += 2;
    }


    const haystack = `${notification.title} ${notification.source} ${notification.category}`.toLowerCase();
    keywords.forEach(word => {
      if (word && haystack.includes(word)) score += 4;
    });


    if (notification.pinned) score += 8;


    if (score >= 11) return "HIGH";
    if (score >= 6) return "MEDIUM";
    return "LOW";
  }


  function getFilteredRankedNotifications() {
    const selectedCategory = categoryFilter.value;
    const selectedPriority = priorityFilter.value;
    const selectedSort = sortMode.value;
    const searchValue = searchInput.value.trim().toLowerCase();
    const keywords = keywordInput.value.split(",").map(k => k.trim().toLowerCase()).filter(Boolean);


    let ranked = currentNotifications
      .filter(n => !n.deleted)
      .map(item => {
        const priority = calculatePriority(item, currentContext, keywords);
        const priorityWeight = priority === "HIGH" ? 3 : priority === "MEDIUM" ? 2 : 1;
        return { ...item, priority, priorityWeight };
      });


    if (selectedCategory !== "all") ranked = ranked.filter(n => n.category === selectedCategory);
    if (selectedPriority !== "all") ranked = ranked.filter(n => n.priority === selectedPriority);


    if (searchValue) {
      ranked = ranked.filter(n =>
        `${n.title} ${n.source} ${n.category}`.toLowerCase().includes(searchValue)
      );
    }


    if (selectedSort === "priority") ranked.sort((a, b) => b.priorityWeight - a.priorityWeight);
    else if (selectedSort === "category") ranked.sort((a, b) => a.category.localeCompare(b.category));
    else if (selectedSort === "source") ranked.sort((a, b) => a.source.localeCompare(b.source));
    else if (selectedSort === "recent") ranked.reverse();


    if (autoSortToggle.checked) {
      ranked.sort((a, b) => {
        if (b.priorityWeight !== a.priorityWeight) return b.priorityWeight - a.priorityWeight;
        return Number(b.pinned) - Number(a.pinned);
      });
    }


    return ranked;
  }


  function updateSummary(ranked) {
    const allActive = currentNotifications.filter(n => !n.deleted);
    totalCount.textContent = allActive.length;
    unreadCount.textContent = allActive.filter(n => n.unread).length;
    optimizedCount.textContent = ranked.filter(n => n.priority === "HIGH").length;
    hiddenNoiseCount.textContent = allActive.filter(n => calculatePriority(n, currentContext, []) === "LOW").length;
  }


  function bindNotificationActions() {
    document.querySelectorAll(".pin-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        currentNotifications = currentNotifications.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n);
        saveNotifications();
        renderNotifications();
      });
    });


    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        currentNotifications = currentNotifications.map(n => n.id === id ? { ...n, deleted: true } : n);
        saveNotifications();
        renderNotifications();
      });
    });
  }


  function renderNotifications() {
    const ranked = getFilteredRankedNotifications();
    notificationList.innerHTML = "";


    if (!ranked.length) {
      notificationList.innerHTML = `<div class="history-card"><p>No notifications match your filters.</p></div>`;
      updateSummary([]);
      return;
    }


    ranked.forEach((notification, index) => {
      const card = document.createElement("div");
      card.className = "notification-card";


      const badgeClass =
        notification.priority === "HIGH" ? "priority-high" :
        notification.priority === "MEDIUM" ? "priority-medium" : "priority-low";


      card.innerHTML = `
        <div class="notification-top">
          <h3>#${index + 1} ${notification.title}</h3>
          <span class="priority-badge ${badgeClass}">${notification.priority}</span>
        </div>


        <div class="notification-meta">
          <span>${notification.source}</span>
          <span>${notification.category}</span>
          <span>${notification.time}</span>
          <span>Context: ${currentContext}</span>
          <span>${notification.unread ? "Unread" : "Read"}</span>
          ${notification.pinned ? `<span>Pinned</span>` : ""}
        </div>


        <div class="notification-actions">
          <button class="secondary-btn pin-btn" data-id="${notification.id}">
            ${notification.pinned ? "Unpin" : "Pin"}
          </button>
          <button class="secondary-btn delete-btn" data-id="${notification.id}">
            Delete
          </button>
        </div>
      `;


      notificationList.appendChild(card);
    });


    updateSummary(ranked);
    bindNotificationActions();
  }


  function renderHistory() {
    const history = typeof getHistory === "function" ? getHistory() : [];
    historyList.innerHTML = "";


    if (!history.length) {
      historyList.innerHTML = `<div class="history-card"><p>No optimization history yet. Run the optimizer first.</p></div>`;
      return;
    }


    history.slice(0, 8).forEach(item => {
      const card = document.createElement("div");
      card.className = "history-card";
      card.innerHTML = `
        <h3>${item.context.toUpperCase()} Mode Run</h3>
        <p>${item.createdAt}</p>
        <p>${item.notifications.length} notifications processed</p>
      `;
      historyList.appendChild(card);
    });
  }


  document.querySelectorAll(".mode-btn").forEach(btn => {
    if (btn.dataset.mode === currentContext) btn.classList.add("active");


    btn.addEventListener("click", () => {
      document.querySelectorAll(".mode-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentContext = btn.dataset.mode;


      if (typeof setContextPreference === "function") setContextPreference(currentContext);
      if (typeof saveAction === "function") saveAction("MODE_CHANGE", `Switched to ${currentContext}`);


      renderNotifications();
    });
  });


  [categoryFilter, priorityFilter, sortMode].forEach(el => el.addEventListener("change", renderNotifications));
  [searchInput, keywordInput].forEach(el => el.addEventListener("input", renderNotifications));
  autoSortToggle.addEventListener("change", renderNotifications);


  saveKeywordBtn.addEventListener("click", () => {
    saveKeywords();
    renderNotifications();
    alert("Keyword boost saved successfully.");
  });


  runEngineBtn.addEventListener("click", () => {
    const ranked = getFilteredRankedNotifications();
    if (typeof saveHistory === "function") saveHistory(currentContext, ranked);
    if (typeof saveAction === "function") saveAction("ENGINE_RUN", `Optimizer executed in ${currentContext} mode`);
    renderNotifications();
    renderHistory();
    alert("Notification optimizer executed successfully.");
  });


  refreshBtn.addEventListener("click", () => {
    refreshNotifications();
    renderNotifications();
    if (typeof saveAction === "function") saveAction("FEED_REFRESH", "Notification feed refreshed");
  });


  goProfileBtn.addEventListener("click", () => {
    window.location.href = "profile.html";
  });


  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("cdno_current_user");
    window.location.href = "login.html";
  });


  renderProfileSnapshot();
  loadNotifications();
  loadSavedKeywords();
  renderNotifications();
  renderHistory();
})();