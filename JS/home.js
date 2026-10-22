
const orderOptionsContainer = document.getElementById("OrderOptions");
let orderBtn = null;
let orderPriceDisplay = null;
let cafeSignature = null;
const pricePanel = document.getElementById("pricePanel");

document.addEventListener("DOMContentLoaded",()=> {loadOrderOptions(); switchPricePannelContent();});

const laBase =
{
    categoryName: "01 La base",
    subCategories: [{id:11, title:"Espresso", price: 18.00},{id:12, title:"Filter", price: 16.00}],
    choixUnique:false
}
const laTaille =
{
    categoryName: "02 La taills",
    subCategories:  [{id:21, title:"S · 150 ml", price: 0},{id:22, title:"M · 250 ml", price: 4.00},{id:23, title:"L · 350 ml", price: 8.00}],
    choixUnique:false
}
const leLait =
{
    categoryName: "03 Le lait",
    subCategories:  [{id:31, title:"Vache", price: 0},{id:32, title:"Avoine", price: 4.00},{id:33, title:"Amande", price: 5.00}],
    choixUnique:false
}
const LaTouche =
{
    categoryName: "04  La touche en plus",
    subCategories: [{id:41, title:"Caramel", price: 3.00},{id:42, title:"Vanille", price: 3.00}],
    choixUnique:true
}

const orderOpts = [laBase,laTaille,leLait,LaTouche];

let totalPrice = 0;
let selectedOptions = [];
let cafeSignatureText = "";


function caffeOrder(e)
{
    if(e.target.type === "radio")
    {
        const Optionsgroup = document.querySelectorAll(`input[name="${e.target.name}"]`);
        Optionsgroup.forEach( opt =>{
            if(selectedOptions.includes(opt) && !opt.checked)
            {

                selectedOptions.splice(selectedOptions.indexOf(opt),1);
                totalPrice -= Number(opt.value);
            }
        })
    }
    
    if(!selectedOptions.includes(e.target) && e.target.checked)
    {
        selectedOptions.push(e.target);
        totalPrice += Number( e.target.value);

    }
    
    
    if(selectedOptions.includes(e.target) && !e.target.checked)
    {
        selectedOptions.splice(selectedOptions.indexOf(e.target),1);
        totalPrice -= Number( e.target.value);
    }

    orderPriceDisplay.innerText = `${totalPrice} DH`;   
}

function loadOrderOptions()
{
    orderOptionsContainer.innerHTML="";
    const choixUnique = "Choix unique";
    const plusieursChoix = "Plusieurs choix";
    orderOpts.forEach((opt) =>{

    const optContainer = document.createElement("div");
    const titleSection = document.createElement("div");
    const cardsContainer = document.createElement("div");

    const categorytitle = document.createElement("h3");
    categorytitle.innerText = opt.categoryName;
    titleSection.appendChild(categorytitle);
    
    if(opt.choixUnique)
    {
        titleSection.append(choixUnique);
    }else
        titleSection.append(plusieursChoix);
    
    titleSection.classList.add("flexBetween");

    for(let subOpt of opt.subCategories)
    {
        const subOption = document.createElement("label");
        if(opt.choixUnique == false)
        {
            subOption.innerHTML=`
                
                    <input type="radio" name="${opt.categoryName}" value="${subOpt.price}" data_id="${subOpt.id}" data-title = "${subOpt.title}">
                    <span><span class="checkmark" aria-hidden="true">✓</span>${subOpt.title}</span>
                    <span>${subOpt.price} DH</span>
                
            `;
        }else
        {
             subOption.innerHTML=`
                
                    <input type="checkbox" name="${opt.categoryName}" value="${subOpt.price}" data_id="${subOpt.id}" data-title="${subOpt.title}">
                    <span><span class="checkmark" aria-hidden="true">✓</span>${subOpt.title}</span>
                    <span>${subOpt.price} DH</span>
                
            `;
        }

        subOption.classList.add("option");
        subOption.querySelector("input").addEventListener("change",caffeOrder);
        cardsContainer.appendChild(subOption);

    }
    

    optContainer.appendChild(titleSection);
    cardsContainer.classList.add("category");
    optContainer.appendChild(cardsContainer);
    orderOptionsContainer.classList.remove("factorContainer");
    orderOptionsContainer.appendChild(optContainer);
});
}

function showOrderFactor()
{
    
    const factorHeader = document.createElement("div");
    const factorDtails = document.createElement("div");
    const factorFooter = document.createElement("div");

    factorHeader.innerHTML=`
    <span class="badge">✓  Sélection ajoutée</span>
    <h3>Votre récapitulatif</h3>
    <small>Une création personnalisée · Quantité : 1</small>
    `;
    selectedOptions.forEach(opt => {
        const row = document.createElement("div");
        row.innerHTML= `<span>${opt.dataset.title}</span> <samll>${opt.value}</small>`;
        row.classList.add("flexBetween")
        cafeSignatureText +=`${opt.dataset.title}. `;
        factorDtails.appendChild(row);
    });

    
    const displayPrice = document.createElement("div");
    displayPrice.innerHTML = `
        <small>Total</small> <small>${totalPrice}DH</small>
    `;
    displayPrice.classList.add("flexBetween");

    const paymentMsg = document.createElement("small");
    paymentMsg.innerText = "Prix de cette sélection · aucun paiement effectué."

    const OrderAgainBtn = document.createElement("button");
    OrderAgainBtn.innerText="Créer un autre café   →";
    OrderAgainBtn.addEventListener("click",() => { totalPrice = 0; selectedOptions=[]; loadOrderOptions(); switchPricePannelContent();});

    const paymentLastMsg = document.createElement("small");
    paymentLastMsg.innerText="✓  Votre sélection reste modifiable à tout moment.";
    
    factorFooter.appendChild(displayPrice);
    factorFooter.appendChild(paymentMsg);
    factorFooter.appendChild(OrderAgainBtn);
    factorFooter.appendChild(paymentLastMsg);

    factorHeader.classList.add("factorHeader");
    factorDtails.classList.add("factorDetails");
    factorFooter.classList.add("factorFooter");

    orderOptionsContainer.innerHTML="";

    orderOptionsContainer.appendChild(factorHeader);
    orderOptionsContainer.appendChild(factorDtails);
    orderOptionsContainer.appendChild(factorFooter);
    orderOptionsContainer.classList.add("factorContainer");
    
}

function switchPricePannelContent(isOrderPhase=true)
{
    if(isOrderPhase)
    {
        pricePanel.innerHTML = `
        <div>
                <small>Votre création · Café sur mesure</small>
                <Small id="orderPrice">00.00DH</Small>
            </div>
            <button id="orderBtn" class="pricePanel_OrderPhase_orderBtn">Ajouter au panier   →</button>
        `;        
        pricePanel.classList.remove("pricePanel_TicketPhase");
        pricePanel.classList.add("pricePanel_OrderPhase");
        

        orderPriceDisplay = document.getElementById("orderPrice");
        orderBtn = document.getElementById("orderBtn"); 
        orderBtn.addEventListener("click",()=>{showOrderFactor(); switchPricePannelContent(false);});

    }else
    {
        pricePanel.innerHTML=`
        <div>
        <h4>Votre café signature</h4>
        <small id="cafeSignature">...</small>
        </div>
        <button>Modifier</button>
        ` ;
        cafeSignature= document.getElementById("cafeSignature");
        cafeSignature.innerText= cafeSignatureText;
        pricePanel.classList.add("pricePanel_TicketPhase");
        pricePanel.classList.remove("pricePanel_OrderPhase");
    }
    
}


