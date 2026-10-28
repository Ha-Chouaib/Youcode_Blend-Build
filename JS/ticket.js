
const orderOptionsContainer = document.getElementById("OrderOptions");
const pricePanel = document.getElementById("pricePanel");

document.addEventListener("DOMContentLoaded",()=> {laodTicketData(); showOrderFactor(); })

let totalPrice = 0;
let selectedOptions = [];
let cafeSignatureText = "";


function laodTicketData()
{
    let Data = localStorage.getItem("selectedOptions");

    selectedOptions =Data? JSON.parse(Data) : [];
    
    let price = totalPrice = localStorage.getItem("totalPrice");
    totalPrice = price ? Number(  JSON.parse(price) ) : 0;
    
    
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
    if(selectedOptions?.length > 0)
    {
        factorDtails.innerHTML="";

        selectedOptions?.forEach(opt => {
            const row = document.createElement("div");
            row.innerHTML= `<span>${opt?.title}</span> <samll>${opt?.price}DH</small>`;
            row.classList.add("flexBetween")
            cafeSignatureText +=`${opt?.title}. `;
            factorDtails.appendChild(row);
        });
    }else
    {
        factorDtails.innerHTML = `<span>No order options to be shown!</span>`;
    }
   

    
    const displayPrice = document.createElement("div");
    displayPrice.innerHTML = `
        <small>Total</small> <small>${totalPrice?? 0.00}DH</small> 
    `;
    displayPrice.classList.add("flexBetween");

    const paymentMsg = document.createElement("small");
    paymentMsg.innerText = "Prix de cette sélection · aucun paiement effectué."

    const OrderAgainBtn = document.createElement("button");
    OrderAgainBtn.innerText="Créer un autre café   →";
    OrderAgainBtn.addEventListener("click",() => { backToOrderPage(); }); 

    const goToPayBtn = document.createElement("button");
    goToPayBtn.innerText = "check and pay";
    goToPayBtn.addEventListener("click",()=>{location.href = "../Html/Checkout.html"})

    const paymentLastMsg = document.createElement("small");
    paymentLastMsg.innerText="✓  Votre sélection reste modifiable à tout moment.";
    
    factorFooter.appendChild(displayPrice);
    factorFooter.appendChild(paymentMsg);
    factorFooter.appendChild(OrderAgainBtn);
    // if(selectedOptions.length > 0)
        factorFooter.append(goToPayBtn);
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

function backToOrderPage()
{
    let reload = true;
    localStorage.setItem("isReloadPage",JSON.stringify(reload));
    history.back();
    
}

function displayCafeSignature()
{
    pricePanel.innerHTML=`
        <div>
        <h4>Votre café signature</h4>
        <small id="cafeSignature">...</small>
        </div>
        <button>Modifier</button>
        ` ;
        let cafeSignature= document.getElementById("cafeSignature");
        cafeSignature.innerText= cafeSignatureText;
        pricePanel.classList.add("pricePanel_TicketPhase");
}

