// js/firebase.js

// Firebase compat (HTML'de yükledik)
const firebaseConfig = {
  apiKey: "AIzaSyCS6c9TVCfC2Del5KXsuHJVdpX23FoC9CQ",
  authDomain: "massi-massimo-menu-fb869.firebaseapp.com",
  projectId: "massi-massimo-menu-fb869",
  storageBucket: "massi-massimo-menu-fb869.firebasestorage.app",
  messagingSenderId: "356570284139",
  appId: "1:356570284139:web:972a784cf15731ad3b712e"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Global export
window.db = db;
