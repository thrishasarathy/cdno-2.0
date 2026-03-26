
(function () {
  function initDB() {
    if (!localStorage.getItem("cdno_db")) {
      const initialDB = {
        contacts: [],
        actions: [],
        history: [],
        preferences: {
          context: "work"
        }
      };
      localStorage.setItem("cdno_db", JSON.stringify(initialDB));
    }
  }


  function getDB() {
    const raw = localStorage.getItem("cdno_db");
    if (!raw) {
      initDB();
      return JSON.parse(localStorage.getItem("cdno_db"));
    }
    return JSON.parse(raw);
  }


  function saveDB(data) {
    localStorage.setItem("cdno_db", JSON.stringify(data));
  }


  function saveContact(name, email, message) {
    const db = getDB();
    db.contacts.push({
      id: Date.now(),
      name,
      email,
      message,
      createdAt: new Date().toISOString()
    });
    saveDB(db);
  }


  function saveAction(type, description) {
    const db = getDB();
    db.actions.push({
      id: Date.now(),
      type,
      description,
      createdAt: new Date().toISOString()
    });
    saveDB(db);
  }


  function saveHistory(context, notifications) {
    const db = getDB();
    db.history.unshift({
      id: Date.now(),
      context,
      notifications,
      createdAt: new Date().toLocaleString()
    });
    saveDB(db);
  }


  function setContextPreference(context) {
    const db = getDB();
    db.preferences.context = context;
    saveDB(db);
  }


  function getContextPreference() {
    const db = getDB();
    return db.preferences?.context || "work";
  }


  function getHistory() {
    const db = getDB();
    return db.history || [];
  }


  window.initDB = initDB;
  window.getDB = getDB;
  window.saveDB = saveDB;
  window.saveContact = saveContact;
  window.saveAction = saveAction;
  window.saveHistory = saveHistory;
  window.setContextPreference = setContextPreference;
  window.getContextPreference = getContextPreference;
  window.getHistory = getHistory;


  initDB();
})();
