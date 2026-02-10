// js/menu.js
let currentLang = "tr";

document.getElementById("trBtn").onclick = () => {
  currentLang = "tr";
  loadMenu();
};

document.getElementById("enBtn").onclick = () => {
  currentLang = "en";
  loadMenu();
};

async function loadMenu() {
  const menuDiv = document.getElementById("menu");
  menuDiv.innerHTML = "";

  const catSnap = await db
    .collection("categories")
    .where("active", "==", true)
    .orderBy("order")
    .get();

  for (const cat of catSnap.docs) {
    const catData = cat.data();

    const h2 = document.createElement("h2");
    h2.textContent = catData[currentLang];
    menuDiv.appendChild(h2);

    const prodSnap = await db
      .collection("products")
      .where("active", "==", true)
      .where("category", "==", cat.id)
      .orderBy("order")
      .get();

    prodSnap.forEach(p => {
      const d = p.data();
      const div = document.createElement("div");
      div.innerHTML = `
        <strong>${d[currentLang]}</strong><br>
        <small>${d["desc" + currentLang.toUpperCase()] || ""}</small><br>
        <span>${d.price} ₺</span>
        <hr>
      `;
      menuDiv.appendChild(div);
    });
  }
}

loadMenu();
