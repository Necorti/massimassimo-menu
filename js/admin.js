console.log("ADMIN FINAL LOADED");

/* ---------- ELEMENTS ---------- */
const catTR = document.getElementById("catTR");
const catEN = document.getElementById("catEN");
const addCategoryBtn = document.getElementById("addCategoryBtn");
const categoryList = document.getElementById("categoryList");
const productCategory = document.getElementById("productCategory");

const prodTR = document.getElementById("prodTR");
const prodEN = document.getElementById("prodEN");
const descTR = document.getElementById("descTR");
const descEN = document.getElementById("descEN");
const price = document.getElementById("price");
const addProductBtn = document.getElementById("addProductBtn");
const productList = document.getElementById("productList");

/* ---------- CATEGORY ADD ---------- */
addCategoryBtn.onclick = async () => {
  if (!catTR.value || !catEN.value) return;

  await db.collection("categories").add({
    tr: catTR.value,
    en: catEN.value,
    active: true,
    order: Date.now()
  });

  catTR.value = "";
  catEN.value = "";
};

/* ---------- CATEGORY LIST ---------- */
db.collection("categories").orderBy("order").onSnapshot(snapshot => {
  categoryList.innerHTML = "";
  productCategory.innerHTML = "<option value=''>Kategori Seç</option>";

  snapshot.forEach(doc => {
    const c = doc.data();

    const li = document.createElement("li");
    li.innerHTML = `
      ${c.tr} (${c.active ? "aktif" : "pasif"})
      <button onclick="toggleCategory('${doc.id}', ${c.active})">
        ${c.active ? "Pasif" : "Aktif"}
      </button>
    `;
    categoryList.appendChild(li);

    if (c.active) {
      const opt = document.createElement("option");
      opt.value = doc.id;
      opt.textContent = c.tr;
      productCategory.appendChild(opt);
    }
  });
});

window.toggleCategory = async (id, active) => {
  await db.collection("categories").doc(id).update({ active: !active });
};

/* ---------- PRODUCT ADD ---------- */
addProductBtn.onclick = async () => {
  if (!prodTR.value || !price.value || !productCategory.value) return;

  await db.collection("products").add({
    tr: prodTR.value,
    en: prodEN.value,
    descTR: descTR.value,
    descEN: descEN.value,
    price: Number(price.value),
    category: productCategory.value,
    active: true,
    order: Date.now()
  });

  prodTR.value = prodEN.value = descTR.value = descEN.value = price.value = "";
};

/* ---------- PRODUCT LIST ---------- */
db.collection("products").orderBy("order").onSnapshot(snapshot => {
  productList.innerHTML = "";

  snapshot.forEach(doc => {
    const p = doc.data();

    const li = document.createElement("li");
    li.innerHTML = `
      ${p.tr} – ${p.price} ₺ (${p.active ? "aktif" : "pasif"})
      <button onclick="toggleProduct('${doc.id}', ${p.active})">
        ${p.active ? "Pasif" : "Aktif"}
      </button>
    `;
    productList.appendChild(li);
  });
});

window.toggleProduct = async (id, active) => {
  await db.collection("products").doc(id).update({ active: !active });
};
