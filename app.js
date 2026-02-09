import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const menu = document.getElementById("menu");

async function loadMenu() {

  const categoriesSnap = await getDocs(collection(db, "categories"));
  const productsSnap = await getDocs(collection(db, "products"));

  const categories = [];
  categoriesSnap.forEach(doc => {
    const c = doc.data();
    if (c.active) categories.push({ id: doc.id, ...c });
  });

  categories.sort((a,b)=>a.order-b.order);

  const products = [];
  productsSnap.forEach(doc => {
    const p = doc.data();
    if (p.active) products.push(p);
  });

  menu.innerHTML = "";

  categories.forEach(cat => {

    menu.innerHTML += `<h2>${cat.nameTR}</h2>`;

    const items = products
      .filter(p => p.categoryId === cat.id)
      .sort((a,b)=>(a.order||0)-(b.order||0));

    items.forEach(p=>{
      menu.innerHTML += `
        <div class="card">
          <h3>${p.nameTR}</h3>
          <p>${p.descTR}</p>
          <strong>${p.price} ₺</strong>
        </div>
      `;
    });

  });
}

loadMenu();
