
const selectedProdContainer = document.getElementById("selectedOrdersPannel");
const appendNewBtn = document.getElementById("addNewOrderBtn");
const appendProductModal = document.getElementById("appendModal");
const closeModal = document.getElementById("closeModal");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInp");
const filtredProductsContainer = document.getElementById("searchResultContainer");
const displayTotalPrice = document.getElementById("totalPrice");
const paymentForm = document.querySelector(".paymentForm");


const namePattern = /^[\p{L}\p{M}]+(?:[ '-][\p{L}\p{M}]+)*$/u;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern =/^0[5-7]\d{8}$/;

const cardPattern = /^\d{13-19}$/;
const cvvPattern = /^\d{3,4}$/;
const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;

const coffeeCartKey = "coffeeCart";

document.addEventListener("DOMContentLoaded",() =>{loadSeletedProducts(); initiateTotalPrice();})


appendNewBtn.addEventListener("click", ()=>{
    appendProductModal.style.display = "flex";
});

closeModal.addEventListener("click",()=>
{
    appendProductModal.style.display = "none";
    searchInput.value = "";
});
filtredProductsContainer.addEventListener("click",appendNewOrderToOrdersList);

selectedProdContainer.addEventListener("click",removeSelectedOrder);

paymentForm.addEventListener("change",validateInputs)


function removeSelectedOrder(e)
{
    let targetRemoveBtn = e.target.closest(".remove-order");
    if(!targetRemoveBtn && !selectedProdContainer.contains(targetRemoveBtn)) return;

    let targetOrder = targetRemoveBtn.closest(".OrderPannel");
    selectedProdContainer.removeChild(targetOrder);

    let targetProduct = coffeeCart.find(p => p.id == targetRemoveBtn.dataset.productId)

    coffeeCart.splice(coffeeCart.indexOf(targetProduct),1);

    localStorage.setItem(coffeeCartKey,JSON.stringify(coffeeCart));

    updateTotalPrice(targetProduct.price,targetProduct.quantity,true);
}

// 1. Le tableau global (Catalogue complet incluant les accessoires)
const coffeeProducts = [
  { id: "c1", name: "Espresso Intense",           quantity:0,  category: "Base", price: 2.50, image: "espresso.jpg" },
  { id: "c2", name: "Cappuccino Mousseux",        quantity:0,  category: "Classique", price: 4.00, image: "cappuccino.jpg" },
  { id: "c3", name: "Latte Caramel",              quantity:0,  category: "Gourmand", price: 4.50, image: "latte.jpg" },
  { id: "c4", name: "Flat White",                 quantity:0,  category: "Classique", price: 3.80, image: "flatwhite.jpg" },
  { id: "c5", name: "Iced Matcha Latte",          quantity:0,  category: "Froid", price: 5.00, image: "matcha.jpg" },
  { id: "c6", name: "Cold Brew",                  quantity:0,  category: "Froid", price: 4.20, image: "coldbrew.jpg" },
  { id: "c7", name: "Cookie Pépites",             quantity:0,  category: "Snack", price: 2.00, image: "cookie.jpg" },
  { id: "c8", name: "Mug Isotherme Noir",         quantity:0,  category: "Accessoire", price: 15.00, image: "mug.jpg" },
  { id: "c9", name: "Filtres Papier V60 (x100)",  quantity:0,  category: "Accessoire", price: 6.50, image: "filters.jpg" },
  { id: "c10", name: "Tote Bag 'Coffee Lover'",   quantity:0,  category: "Accessoire", price: 12.00, image: "totebag.jpg" }
];

// 2. Le tableau des produits dans le panier par défaut (avec un accessoire)
let coffeeCart = [
  { id: "c1", name: "Espresso Intense",    quantity:1, category: "Base", price: 2.50, image: "espresso.jpg" },
  { id: "c3", name: "Latte Caramel",       quantity:1, category: "Gourmand", price: 4.50, image: "latte.jpg" },
  { id: "c8", name: "Mug Isotherme Noir",  quantity:1, category: "Accessoire", price: 15.00, image: "mug.jpg" }
];

let totalPrice = 0;


function loadSeletedProducts()
{
    selectedProdContainer.innerHTML="";
    
    let savedProducts =  JSON.parse(localStorage.getItem(coffeeCartKey)) ?? [];
    if(savedProducts.length > 0)
    {
        coffeeCart = JSON.parse(localStorage.getItem(coffeeCartKey))
    }
    else
    {
        localStorage.setItem(coffeeCartKey,JSON.stringify(coffeeCart));
    }
    coffeeCart.forEach(prod =>{
        selectedProdContainer.innerHTML+=`
         <div class="OrderPannel">
            <span class="remove-order" data-product-id="${prod.id}">x</span>
            <span class="OrderPannel-Info">
                <span>${prod.name}</span>
                <small>${prod.price}DH</small>
            </span>
            <div class="OrderPannel-actions">
                <button class="decreaseBtns" data-product-id ="${prod.id}">-</button>
                <small id="id_${prod.id}">${prod.quantity}</small>
                <button class="increaseBtns" data-product-id ="${prod.id}">+</button>
            </div>
        </div>
        `;
    });

    const increaseQuantityBtns = selectedProdContainer.querySelectorAll(".increaseBtns");
    const decreaseQuantityBtns = selectedProdContainer.querySelectorAll(".decreaseBtns");

    increaseQuantityBtns.forEach(btn =>{
        btn.addEventListener("click", increaseProductQuantity);
    });
    decreaseQuantityBtns.forEach(btn =>{
        btn.addEventListener("click", decreaseProductQuantity);
    });
}

function increaseProductQuantity(e)
{
    let targetBtn = e.target;
    let productId = targetBtn.dataset.productId;

    let targetProduct = coffeeCart.find(prod => prod.id === productId);

    updateTotalPrice(targetProduct.price,targetProduct.quantity,true);

    targetProduct.quantity ++;
    const displayQuantity = document.getElementById(`id_${targetProduct.id}`);
    displayQuantity.innerText = targetProduct.quantity.toString();

    updateTotalPrice(targetProduct.price,targetProduct.quantity);

}

function decreaseProductQuantity(e)
{
    let targetBtn = e.target;
    let productId = targetBtn.dataset.productId;

    let targetProduct = coffeeCart.find(prod => prod.id === productId);
    
    if(targetProduct.quantity > 1)
    {
        updateTotalPrice(targetProduct.price,targetProduct.quantity,true);

        targetProduct.quantity --;

        const displayQuantity = document.getElementById(`id_${targetProduct.id}`);
        displayQuantity.innerText = targetProduct.quantity.toString();
        
        updateTotalPrice(targetProduct.price,targetProduct.quantity);
    }

    
    
}

function debounce(callback,delay )
{
    let timerId;
    return function (...args){
        clearTimeout(timerId);
        timerId = setTimeout(()=>{

            callback.call(this,...args);

        },delay);
    }
}

let saerchDebounce = debounce(displayFiltredProducts,1000);
searchInput.addEventListener("input",(e)=>{
    saerchDebounce(e.target.value);
});

function displayFiltredProducts(searchTerm)
{
    filtredProductsContainer.innerHTML = "";
    if(searchTerm === "")
    {
        filtredProductsContainer.innerText = "please enter a product name to be shown";
    }else
    {
        let filterd = coffeeProducts.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
        filterd.forEach(p =>{
            filtredProductsContainer.innerHTML+=`
                <div class="OrderPannel OrderPannel-filtered">
         
                    <span class="OrderPannel-Info">
                        <span>${p.name}</span>
                        <small>${p.price}DH</small>
                    </span>
                    <span class="orderPannel-badge" id="badge_${p.id}">new order</span>
                    <div class="OrderPannel-actions">
                        <button class="increaseBtns addToListBtns" data-product-id="${p.id}" >+</button>
                    </div>
                </div>
            `;
            
            const productBadge = document.getElementById(`badge_${p.id}`);

            if(!coffeeCart.some(prod => prod.id === p.id ))
            {
                productBadge.innerText="new order";
                productBadge.style.cssText = `
                    padding: 5px 10px;
                    background: #0f9c02;
                    border-radius: 20px;
                    font-size: 9px;
                `;
            }else{
                productBadge.innerText="already exists";
                productBadge.style.cssText = `
                    padding: 5px 10px;
                    background: #ff0000;
                    border-radius: 20px;
                    font-size: 9px;
                `;
            }
        });
    }
}

function appendNewOrderToOrdersList(e)
{
    const addBtn = e.target.closest("button[data-product-id]");

    if(!addBtn && !filtredProductsContainer.contains(addBtn)) return;

    const targetProduct = coffeeProducts.find(p => p.id === addBtn.dataset.productId);


    if(!coffeeCart.some(p => p.id == targetProduct.id))
    {
        targetProduct.quantity = 1;
        coffeeCart.push(targetProduct);

        localStorage.setItem(coffeeCartKey,JSON.stringify(coffeeCart));

        updateTotalPrice(targetProduct.price,targetProduct.quantity);
        filtredProductsContainer.removeChild(addBtn.closest(".OrderPannel-filtered"));
        loadSeletedProducts();
    }
}

function initiateTotalPrice()
{
    if(coffeeCart.length > 0)
    {
         coffeeCart.forEach(p =>{
            totalPrice += (p.price * p.quantity);
    });
    displayTotalPrice.innerText=totalPrice.toString();
    }
   
}
function updateTotalPrice(price ,quantity,isRemoved = false)
{
    if(isNaN(price) || isNaN(quantity))return;

    if(isRemoved)
        totalPrice -= (price * quantity);
    else
        totalPrice += (price * quantity);

    if(totalPrice < 1) totalPrice = 0;
   displayTotalPrice.innerText = totalPrice.toFixed(2).toString();
}



function isValidName(name)
{
    return namePattern.test(name);
}
function isvalidEmail(email)
{
    return emailPattern.test(email);
}
function isvalidPhone(phone)
{
     return phonePattern.test(phone);
}

function onlyDigits(stringFormat)
{
    return stringFormat.replace(/\D/g,"");
}
function isValidCard(cardNumber)
{
    return cardPattern.test(cardNumber);
}
function isValidCvv(cvv)
{
    return cvvPattern.test(cvv);
}
function isValidExpiryDate(date)
{
    return expiryPattern.test(date);
}

function validateInput(input ,isvalide)
{
    let errorMsg = document.getElementById(input.name);
    if(isvalide)
        errorMsg.style.display = "none"
    else
        errorMsg.style.display = "block";   
    
}

function validateInputs(e)
{

    let targetInput = e.target;
    if(targetInput.tagName !== "INPUT") return;

    switch(targetInput.name)
    {
        case "firstName" :
            validateInput(targetInput,isValidName(targetInput.value.trim()));
        break;
        case "lastName" :
            validateInput(targetInput,isValidName(targetInput.value.trim()));
        break;
        case "email" :
            validateInput(targetInput,isvalidEmail(targetInput.value.trim()));
        break;
        case "phone" :
            validateInput(targetInput,isvalidPhone(targetInput.value.trim()));
        break;
        case "cardNumber":
            validateInput(targetInput,isValidCard(onlyDigits(targetInput.value.trim())));
        break;
        case "cvv":
            validateInput(targetInput,isValidCvv(targetInput.value.trim()));
        break;
        case "expiry":
            validateInput(targetInput,isValidExpiryDate(targetInput.value.trim()));
        break;
        default: break;
        
    }
}

