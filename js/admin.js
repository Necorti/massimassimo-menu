console.log("ADMIN FINAL LOADED");

const catList = document.getElementById("catList");
const catSelect = document.getElementById("catSelect");
const prodList = document.getElementById("prodList");

document.getElementById("addCat").onclick = async () => {
  await db.collection("categories").add({
    tr: catTR.value,
    en: catEN.value,
    active: true,
    order: Date.now()
  });
  catTR.value = "";
  catEN.value = "";
  loadCats();
};

document.getElementById("addProd").onclick = async () => {
  await db.collection("products").add({
    tr: pTR.value,
    en: pEN.value,
    descTR: dTR.value,
    descEN: dEN.value,
    price: Number(price.value),
    category: catSelect.value,
    active: true,
    order: Date.now()
  });
  loadProds();
};

async function loadCats() {
  catList.innerHTML = "";
  catSelect.innerHTML = "";

  const snap = await db.collection("categories").orderBy("order").get();
  snap.forEach(doc => {
    const d = doc.data();

    const li = document.createElement("li");
    li.innerHTML = `
      ${d.tr} (${d.active ? "aktif" : "pasif"})
      <button onclick="toggleCat('${doc.id}', ${d.active})">Pasif</button>
    `;
    catList.appendChild(li);

    if (d.active) {
      const opt = document.createElement("option");
      opt.value = doc.id;
      opt.textContent = d.tr;
      catSelect.appendChild(opt);
    }
  });
}

async function loadProds() {
  prodList.innerHTML = "";
  const snap = await db.collection("products").orderBy("order").get();
  snap.forEach(doc => {
    const d = doc.data();
    const li = document.createElement("li");
    li.innerHTML = `
      ${d.tr} – ${d.price} ₺ (${d.active ? "aktif" : "pasif"})
      <button onclick="toggleProd('${doc.id}', ${d.active})">Pasif</button>
    `;
    prodList.appendChild(li);
  });
}

async function toggleCat(id, active) {
  await db.collection("categories").doc(id).update({ active: !active });
  loadCats();
}

async function toggleProd(id, active) {
  await db.collection("products").doc(id).update({ active: !active });
  loadProds();
}

loadCats();
loadProds();
