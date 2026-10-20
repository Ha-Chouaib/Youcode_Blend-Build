const orderOptionsContainer = document.getElementById("OrderOptions");
document.addEventListener("DOMContentLoaded",()=> {loadOrderOptions();});


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

function loadOrderOptions()
{
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
                
                    <input type="radio" name="${opt.categoryName}" value="${subOpt.id}" data-price="${subOpt.price}">
                    <span><span class="checkmark" aria-hidden="true">✓</span>${subOpt.title}</span>
                    <span>${subOpt.price} DH</span>
                
            `;
        }else
        {
             subOption.innerHTML=`
                
                    <input type="checkbox" name="${opt.categoryName}" value="${subOpt.id}" data-price="${subOpt.price}">
                    <span><span class="checkmark" aria-hidden="true">✓</span>${subOpt.title}</span>
                    <span>${subOpt.price} DH</span>
                
            `;
        }

        subOption.classList.add("option");
        cardsContainer.appendChild(subOption);
    }
    


    optContainer.appendChild(titleSection);
    cardsContainer.classList.add("category");
    optContainer.appendChild(cardsContainer);
    orderOptionsContainer.appendChild(optContainer);
});
}


