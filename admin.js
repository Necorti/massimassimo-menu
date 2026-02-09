import { db } from "./firebase.js";
import {
 collection,
 addDoc,
 getDocs,
 deleteDoc,
 doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* INPUTS */
const catTR = document.getElementById("catTR");
const catEN = document.getElementById("catEN");
const catOrder = document.getElementById("catOrder");

const nameTR = document.getElementById("nameTR");
const nameEN = document.getElementById("nameEN");
const descTR = document.getElementById("descTR");
const descEN = document.getElementById("descEN");
const price = document.getElementById("price");
const order = document.getElementById("order");

const addCat = document.getElementById("addCat");
const addProduct = document.getElementById("addProduct");

const catList = document.getElementById("catList");
const productList = document.getElementById("productList");
const categorySelect = document.getElementById("categorySelect");

/* LOAD CATEGORIES */
async function loadCategories(){
 catList.innerHTML="";
 categorySelect.innerHTML="";

 const snap = await getDocs(collection(db,"categories"));

 snap.forEach(d=>{
  const c = d.data();

  catList.innerHTML+=`
   <div>
    ${c.nameTR}
    <button data-id="${d.id}" class="delCat">Sil</button>
   </div>
  `;

  categorySelect.innerHTML+=`
   <option value="${d.id}">${c.nameTR}</option>
  `;
 });

 document.querySelectorAll(".delCat").forEach(btn=>{
  btn.onclick = async()=>{
   await deleteDoc(doc(db,"categories",btn.dataset.id));
   loadCategories();
  };
 });
}

/* LOAD PRODUCTS */
async function loadProducts(){
 productList.innerHTML="";

 const snap = await getDocs(collection(db,"products"));

 snap.forEach(d=>{
  const p = d.data();

  productList.innerHTML+=`
   <div>
    ${p.nameTR} - ${p.price}₺
    <button data-id="${d.id}" class="delProd">Sil</button>
   </div>
  `;
 });

 document.querySelectorAll(".delProd").forEach(btn=>{
  btn.onclick = async()=>{
   await deleteDoc(doc(db,"products",btn.dataset.id));
   loadProducts();
  };
 });
}

/* ADD CATEGORY */
addCat.onclick = async()=>{
 await addDoc(collection(db,"categories"),{
  nameTR: catTR.value,
  nameEN: catEN.value,
  order: Number(catOrder.value),
  active: true,
  visibleFromHour: 0,
  visibleToHour: 24
 });
 loadCategories();
};

/* ADD PRODUCT */
addProduct.onclick = async()=>{
 await addDoc(collection(db,"products"),{
  nameTR: nameTR.value,
  nameEN: nameEN.value,
  descTR: descTR.value,
  descEN: descEN.value,
  price: Number(price.value),
  order: Number(order.value),
  categoryId: categorySelect.value,
  active: true
 });
 loadProducts();
};

loadCategories();
loadProducts();
