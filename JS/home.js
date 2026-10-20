const orderOptionsContainer = document.getElementById("OrderOptions");

const laBase =
{
    categoryName: "01 La base",
    subCategories: [{title:"Espresso", price: 18.00},{title:"Filter", price: 16.00}],
    choixUnique:false
}
const laTaille =
{
    categoryName: "02 La taills",
    subCategories:  [{title:"S · 150 ml", price: 0},{title:"M · 250 ml", price: 4.00},{title:"L · 350 ml", price: 8.00}],
    choixUnique:false
}
const leLait =
{
    categoryName: "03 Le lait",
    subCategories:  [{title:"Vache", price: 0},{title:"Avoine", price: 4.00},{title:"Amande", price: 5.00}],
    choixUnique:false
}
const LaTouche =
{
    categoryName: "04  La touche en plus",
    subCategories: [{title:"Caramel", price: 3.00},{title:"Vanille", price: 3.00}],
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
    const cardsContainer = document.getElementById("div");

    const categorytitle = document.createElement("h3");
    categorytitle.innerText = opt.categoryName;
    titleSection.appendChild(categorytitle);
    
    if(opt.choixUnique)
    {
        titleSection.appendChild(choixUnique);
    }else
        titleSection,appendChild(plusieursChoix);
    
    titleSection.classList.add("flexBetween");
    


    optContainer.appendChild(titleSection);
    optContainer.appendChild(cardsContainer);
    orderOptionsContainer.appendChild(optContainer);
});
}

