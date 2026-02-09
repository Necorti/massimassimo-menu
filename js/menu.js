// js/menu.js

let LANG = localStorage.getItem("lang") || "tr";

window.setLang = function (l) {
  LANG = l;
  localStorage.setItem("lang", l);
  loadMenu();
};

window.closePopup = function () {
  document.getElementById("popup")?.classList.add("hidden");
};

async function loadMenu() {
  const menuEl = document.getElementById("menu");
  menuEl.innerHTML = "";

  const catSnap = await db
    .collection("categories")
    .where("active", "==", true)
    .orderBy("order", "asc")
    .get();

  const prodSnap = await db
    .collection("products")
    .where("active", "==", true)
    .orderBy("order", "asc")
    .get();

  const products = prodSnap.docs.map(d => ({ id: d.id, ...d.data() }));

  catSnap.forEach(catDoc => {
    const c = catDoc.data();
    const catTitle = LANG === "tr" ? c.nameTR : c.nameEN;

    const section = document.createElement("section");
    section.className = "menu-category";
    section.innerHTML = `<h2>${catTitle}</h2>`;

    const items = products.filter(p => p.categoryId === catDoc.id);

    items.forEach(p => {
      const name = LANG === "tr" ? p.nameTR : p.nameEN;
      const desc = LANG === "tr" ? p.descTR : p.descEN;

      const card = document.createElement("div");
      card.className = "menu-item";
      card.innerHTML = `
        <h3>${name}</h3>
        <p>${desc || ""}</p>
        <span class="price">${p.price} ₺</span>
      `;
      section.appendChild(card);
    });

    if (items.length > 0) menuEl.appendChild(section);
  });
}

// İlk yükleme
document.addEventListener("DOMContentLoaded", loadMenu);
