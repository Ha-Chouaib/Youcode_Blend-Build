
const selectedProdContainer = document.getElementById("selectedOrdersPannel");


// 1. Le tableau global (Catalogue complet incluant les accessoires)
const coffeeProducts = [
  { id: "c1", name: "Espresso Intense", category: "Base", price: 2.50, image: "espresso.jpg" },
  { id: "c2", name: "Cappuccino Mousseux", category: "Classique", price: 4.00, image: "cappuccino.jpg" },
  { id: "c3", name: "Latte Caramel", category: "Gourmand", price: 4.50, image: "latte.jpg" },
  { id: "c4", name: "Flat White", category: "Classique", price: 3.80, image: "flatwhite.jpg" },
  { id: "c5", name: "Iced Matcha Latte", category: "Froid", price: 5.00, image: "matcha.jpg" },
  { id: "c6", name: "Cold Brew", category: "Froid", price: 4.20, image: "coldbrew.jpg" },
  { id: "c7", name: "Cookie Pépites", category: "Snack", price: 2.00, image: "cookie.jpg" },
  { id: "c8", name: "Mug Isotherme Noir", category: "Accessoire", price: 15.00, image: "mug.jpg" },
  { id: "c9", name: "Filtres Papier V60 (x100)", category: "Accessoire", price: 6.50, image: "filters.jpg" },
  { id: "c10", name: "Tote Bag 'Coffee Lover'", category: "Accessoire", price: 12.00, image: "totebag.jpg" }
];

// 2. Le tableau des produits dans le panier par défaut (avec un accessoire)
let coffeeCart = [
  { id: "c2", name: "Cappuccino Mousseux", price: 4.00, quantity: 2, image: "cappuccino.jpg" },
  { id: "c3", name: "Latte Caramel", price: 4.50, quantity: 1, image: "latte.jpg" },
  { id: "c8", name: "Mug Isotherme Noir", price: 15.00, quantity: 1, image: "mug.jpg" }
];

document.addEventListener("DOMContentLoaded",loadSeletedProducts)

function loadSeletedProducts()
{
    coffeeCart.forEach(prod =>{
        selectedProdContainer.innerHTML+=`
         <div class="OrderPannel">
            <span class="OrderPannel-Info">
                <span>${prod.name}</span>
                <small>${prod.price}DH</small>
            </span>
            <div class="OrderPannel-actions">
                <button>-</button>
                <small>${prod.quantity}</small>
                <button>+</button>
            </div>
        </div>
        `;
        
    });
}

