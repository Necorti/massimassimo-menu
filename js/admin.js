// js/admin.js

// ELEMENTS
const catTR = document.getElementById("catTR");
const catEN = document.getElementById("catEN");
const addCategoryBtn = document.getElementById("addCategoryBtn");
const categoryList = document.getElementById("categoryList");

const prodTR = document.getElementById("prodTR");
const prodEN = document.getElementById("prodEN");
const descTR = document.getElementById("descTR");
const descEN = document.getElementById("descEN");
const price = document.getElementById("price");
const productCategory = document.getElementById("productCategory");
const addProductBtn = document.getElementById("addProductBtn");
const productList = document.getElementById("productList");

// LOAD CATEGORIES
async function loadCategories() {
  categoryList.innerHTML = "";
  productCategory.innerHTML = `<option value="">Kategori Seç</option>`;

  const snap = await db.collection("categories").orderBy("order", "asc").get();

  snap.forEach(doc => {
    const c = doc.data();

    const li = document.createElement("li");
    li.textContent = `${c.nameTR} (${c.active ? "aktif" : "pasif"})`;
    categoryList.appendChild(li);

    const opt = document.createElement("option");
    opt.value = doc.id;
    opt.textContent = c.nameTR;
    productCategory.appendChild(opt);
  });
}

// LOAD PRODUCTS
async function loadProducts() {
  productList.innerHTML = "";

  const snap = await db.collection("products").orderBy("order", "asc").get();

  snap.forEach(doc => {
    const p = doc.data();
    const li = document.createElement("li");
    li.textContent = `${p.nameTR} – ${p.price} ₺`;
    productList.appendChild(li);
  });
}

// ADD CATEGORY
addCategoryBtn.addEventListener("click", async () => {
  if (!catTR.value || !catEN.value) return alert("Kategori adı boş olamaz");

  await db.collection("categories").add({
    nameTR: catTR.value,
    nameEN: catEN.value,
    order: Date.now(),
    active: true
  });

  catTR.value = "";
  catEN.value = "";
  loadCategories();
});

// ADD PRODUCT
addProductBtn.addEventListener("click", async () => {
  if (!prodTR.value || !prodEN.value || !price.value || !productCategory.value) {
    return alert("Ürün bilgileri eksik");
  }

  await db.collection("products").add({
    nameTR: prodTR.value,
    nameEN: prodEN.value,
    descTR: descTR.value,
    descEN: descEN.value,
    price: Number(price.value),
    categoryId: productCategory.value,
    order: Date.now(),
    active: true
  });

  prodTR.value = prodEN.value = descTR.value = descEN.value = price.value = "";
  loadProducts();
});

// INIT
document.addEventListener("DOMContentLoaded", () => {
  loadCategories();
  loadProducts();
});
