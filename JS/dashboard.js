// import Swal from 'sweetalert2'
// const Swal = require('sweetalert2')
// import Swal from 'https://jsdelivr.net';

const mainPanel = document.getElementById("MainPanel");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const firstBar = document.getElementById("step1_step2_bar");
const secondBar = document.getElementById("step2_step3_bar");

const step1Ring = document.getElementById("step1");
const step2Ring = document.getElementById("step2");
const step3Ring = document.getElementById("step3");

const step1TitleBox = document.getElementById("step1Title");
const step2TitleBox = document.getElementById("step2Title");
const step3TitleBox = document.getElementById("step3Title");




const generalMode = "general";
const optionsMode = "options";
const vereficationMode = "validation";

const targetField_productName = "prodName";
const targetField_productPrice = "prodPrice";
const targetField_productCategory = "prodCategory";
const targetField_productDiscount = "prodDiscount";
const targetField_productPromoExpiry = "prodPromoExpiry";
const targetField_productImagePath = "prodImagePath";


let currentMode = generalMode;


let allowNavigation = false;
let errorMsg = null;
const defaultImagePath = "../Assets/Café M.png";

let cafeCategories = ["Base", "Classique", "Gourmand","Classique","Froid","Accessoire"];
let cafeProducts=[];
let currentCafe = { name:"", price: 0, category: cafeCategories[0], hasPromo: false, discountPercentage:0, promoExpiry: Date.now(), size:"M",
                ingredients:[], notes:"",ImagePath:defaultImagePath};


function initApp()
{
    initiateCurrentCofeObject(currentCafe);
    drawGeneralInfoPanel();
    currentMode = generalMode;
    prevBtn.style.display = "none";
    nextBtn.innerText = ">";
}
function initiateCurrentCofeObject(obj)
{
    obj = { name:"", price: 0, category: cafeCategories[0], hasPromo: false, discountPercentage:0, promoExpiry: Date.now(), size:"M",
                ingredients:[], notes:"" , imagePath:"../Assets/Café M.png"};
}

function drawGeneralInfoPanel()
{
    let fragment = document.createDocumentFragment();
    step1SideEffects();

    mainPanel.innerHTML = `
            <div class = "flex flex-row justify-between items-center w-full">
                <div class="flex flex-col justify-center ">
                    <h2 class="text-lg  font-black" >Informations Générales</h2>
                    <small>Commencez par les information de base de votre produit</small>
                </div>
                <div class=" max-w-md ">
                    <span id="removeImg" class="hidden bg-black flex items-center justify-center w-7 h-7 rounded-full relative left-[95%]" >X</span>
                      <label class="relative flex flex-col items-center justify-center w-full h-[100px] p-4 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg class="w-8 h-8 mb-3 text-gray-400" aria-hidden="true" xmlns="http://w3.org" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                          </svg>
                          <p class="mb-1 text-sm text-gray-500 font-medium"><span class="text-[#394B32] font-bold">Click to upload</span> or drag and drop</p>
                          <p class="text-xs text-gray-400">PNG, JPG or WebP up to 5MB</p>
                        </div>

                        <img id="boxImagePreview" src="" alt="Product Preview" class="hidden absolute inset-0 w-full h-full object-cover" />
                        <input type="file" id="productImage" class="hidden" accept="image/*" />
                      </label>
                </div>

            </div>
            
            <div class="h-[80%] rounded-lg flex flex-col gap-4">
                <label class="">
                    <span class="font-bold" >Nom du produit</span>
                    <div class="bg-[#f6f2f2aa] w-[100%] rounded-lg h-[40px] flex flex-row items-center gap-5 text-black">
                        <span class="font-black flex-row flex justify-center items-center w-[30px]">☕︎</span>
                        <input class=" bg-[#f6f2f2] grow h-[100%] rounded-lg  " 
                        type="text" name="productName" placeholder="Ex: Latte Caramel">
                    </div>
                    
                </label>
                <div class="flex flex-row justify-between text-black gap-5">
                    <label class=" flex flex-col gap-2 w-[50%]">
                        <span>Prix de base</span>
                        <div class="bg-[#f6f2f2aa] w-[100%] rounded-lg h-[40px] flex flex-row items-center gap-5">
                            <span class="font-black flex-row flex justify-center items-center w-[30px]">$</span>
                            <input class="bg-[#f6f2f2] grow h-[100%] rounded-lg grow" name="productPrice" type="number" min="1" maxlength="5" placeholder="Ex: 60.00">
                        </div>
                    </label>
                    <label class="w-[50%] flex flex-col gap-2">
                        <span>Categorie</span>
                        <select id="cafeCategory" class="gorw bg-[#f6f2f2] h-[40px] rounded-full cursor-pointer  text-center py-2">
                            <option value="" disabled selected>selectionnez une categories</option>
                            
                        </select>
                    </label>
                </div>

                <div class="bg-[black] rounded-lg flex flex-row gap-10 justify-between items-start p-5 ">
                    <label id="promoBox" class="flex flex-col gap-1 items-center justify-center w-[70%] bg-[black] rounded-full py-5 cursor-pointer shadow-[inset_10px_10px_20px_5px_#fefefe5b]">
                        <input class="width-[40px] sr-only peer" type="checkbox" name="promotion">
                        <div class="relative w-12 h-7 bg-[#213422] rounded-full border border-black/30
                          transition-colors duration-300 ease-in-out
                          peer-checked:bg-[#2e4c30]

                          after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                          after:w-[21px] after:h-[21px] after:bg-white after:rounded-full 
                          after:border after:border-black/20
                          after:transition-all after:duration-300 after:ease-in-out

                          peer-checked:after:translate-x-5">
                        </div>
                        <div class="flex flex-col justify-center items-center gap-1 text-center">
                            <span><svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 6V22M12 6H8.46429C7.94332 6 7.4437 5.78929 7.07533 5.41421C6.70695 5.03914 6.5 4.53043 6.5 4C6.5 3.46957 6.70695 2.96086 7.07533 2.58579C7.4437 2.21071 7.94332 2 8.46429 2C11.2143 2 12 6 12 6ZM12 6H15.5357C16.0567 6 16.5563 5.78929 16.9247 5.41421C17.293 5.03914 17.5 4.53043 17.5 4C17.5 3.46957 17.293 2.96086 16.9247 2.58579C16.5563 2.21071 16.0567 2 15.5357 2C12.7857 2 12 6 12 6ZM20 11V18.8C20 19.9201 20 20.4802 19.782 20.908C19.5903 21.2843 19.2843 21.5903 18.908 21.782C18.4802 22 17.9201 22 16.8 22L7.2 22C6.07989 22 5.51984 22 5.09202 21.782C4.71569 21.5903 4.40973 21.2843 4.21799 20.908C4 20.4802 4 19.9201 4 18.8V11M2 7.6L2 9.4C2 9.96005 2 10.2401 2.10899 10.454C2.20487 10.6422 2.35785 10.7951 2.54601 10.891C2.75992 11 3.03995 11 3.6 11L20.4 11C20.9601 11 21.2401 11 21.454 10.891C21.6422 10.7951 21.7951 10.6422 21.891 10.454C22 10.2401 22 9.96005 22 9.4V7.6C22 7.03995 22 6.75992 21.891 6.54601C21.7951 6.35785 21.6422 6.20487 21.454 6.10899C21.2401 6 20.9601 6 20.4 6L3.6 6C3.03995 6 2.75992 6 2.54601 6.10899C2.35785 6.20487 2.20487 6.35785 2.10899 6.54601C2 6.75992 2 7.03995 2 7.6Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            </span>
                            <span> <h4>Produit en promotion</h4> <small>Proposer une offre speciale sure ce produit</small></span>
                        </div>
                    </label>
                     
                    <div class="flex flex-row justify-between items-center gap-10 w-[100%] bg-[black] border backdrop-blur-sm rounded-lg h-[150px] p-5 ">
                        <label class="w-1/2 flex gap-2 flex-col ">
                            <span>Poutcentage de reduction</span>
                            <div class="w-full flex bg-[#394B32] rounded-full h-[40px] ">
                                <input class="text-black bg-[#f6f2f2] grow h-[100%] rounded-lg "
                                 type="number" min="1" maxlength="3" placeholder="Ex: 20" name="promoPercent">
                                <span class="w-[30px] flex justify-center items-center">%</span>
                            </div>
                        </label>
                        <label class="w-1/2 flex flex-col gap-2 ">
                            <span>Date de fin de promo</span>
                            <input class="text-black bg-[#fdf8f8de] h-[40px] rounded-full" type="date" placeholder="jj/mm/aaaa" name="promoExpiry">
                        </label>
                    </div>
                </div>

            </div>
    `;

    cafeCategories.forEach(c =>{
        const categoryOption = document.createElement("option");
        categoryOption.value = c;
        categoryOption.innerText = c;
        categoryOption.style.cssText =`

            background: black;
            color: #4b6636;
            cursor: pointer;
            font-size: 15px;
            font-weight: semi-bold;
        `;

        fragment.append(categoryOption);
    });
    let cafeCategorySelectElement = document.getElementById("cafeCategory");
    cafeCategorySelectElement.append(fragment);

    fragment = null;
    currentMode = generalMode;

    const ImagePathInput = document.getElementById("productImage");
    const DisplayImageEle = document.getElementById("boxImagePreview");
    const RemoveImgEle = document.getElementById("removeImg");
    
    ImagePathInput.addEventListener("change",(e)=>{

    const filesList = e.target.files;

    if (filesList && filesList.length > 0) {
      const file = filesList[0];

      if (file.type.startsWith('image/')) {
         const reader = new FileReader();

        reader.onload = function(e) {
          if (e.target.result) {

            DisplayImageEle.src = e.target.result;
            currentCafe.ImagePath = e.target.result;
            
            RemoveImgEle.classList.remove('hidden');
            DisplayImageEle.classList.remove('hidden');
          }
        };

        reader.readAsDataURL(file);
      }}


      });
      RemoveImgEle.addEventListener("click",(e)=>{
        e.preventDefault();
        e.target.src = "";
        DisplayImageEle.classList.add('hidden');
        RemoveImgEle.classList.add('hidden');
        ImagePathInput.value ="";
        currentCafe.ImagePath = defaultImagePath;
      });

}


function drawCracteristiques_OptionsPanel()
{
    step2SideEffects();
    mainPanel.innerHTML = `
    <div class="h-[20%] flex flex-col justify-center gap-1 ">
                <h2 class="text-lg  font-black" >Informations Générales</h2>
                <small>Commencez par les information de base de votre produit</small>
            </div>

            <div class="flex flex-col gap-5">
                <div class=" flex flex-row justify-between items-center"> 
                <div class="bg-[#0000008b] flex flex-col gap-3 w-[40%] rounded-lg p-10">
                    <div class="flex flex-col gap-1">
                        <span class="font-bold">Tailles disponible</span>
                        <small>slectionnez les tails proposees</small>
                    </div>
                    <div class="flex flex-row gap-2">
                        <div class="flex flex-row gap-2">
                            <label class="tailleOption cursor-pointer flex items-center justify-center bg-[#394B32] w-[50px] rounded-full shadow-[inset_1px_1px_10px_1px_#f8faf8b7]">
                                <input class="w-px " style="appearance: none;" name="taille" value="S" type="radio">
                                <span >S</span>
                            </label>
                            <label class="tailleOption cursor-pointer flex items-center justify-center bg-[#394B32] w-[50px] rounded-full shadow-[inset_1px_1px_10px_1px_#f8faf8b7]">
                                <input class="w-px " checked style="appearance: none;" name="taille" value="M" type="radio">
                                <span >M</span>
                            </label>
                            <label class="tailleOption cursor-pointer flex items-center justify-center bg-[#394B32] w-[50px] rounded-full shadow-[inset_1px_1px_10px_1px_#f8faf8b7]">
                                <input class="w-px " style="appearance: none;" name="taille" value="L" type="radio">
                                <span >L</span>
                            </label>
                            <label class="tailleOption cursor-pointer flex items-center justify-center bg-[#394B32] w-[50px] rounded-full shadow-[inset_1px_1px_10px_1px_#f8faf8b7]">
                                <input class="w-px " style="appearance: none;" name="taille" value="XL" type="radio">
                                <span >XL</span>
                            </label>
                
                        </div>
                        <button  class="cursor-pointer flex items-center justify-center bg-[#0c8e01fe] min-w-[fit-content] px-5 py-2 text-black rounded-lg shadow-[inset_1px_1px_10px_1px_#E8DBC7]">+ Ajouter</button>
                    </div>
                </div>

                <div class="bg-[#0000008b] flex flex-col gap-3 w-[40%] rounded-lg p-10">
                    <div class="flex flex-col gap-1">
                        <span class="font-bold">Ingredients (pour le cafe)</span>
                        <small>Indiquez les Ingredients principaux.</small>
                    </div>
                    <div class="flex flex-row gap-3">
                        <div class="flex flex-row gap-2">
                            <span data-value="Arabica" class="ingredients  flex items-center justify-between bg-[#394B32] w-[fit-content] rounded-full shadow-[inset_1px_1px_10px_1px_#f8faf8b7] pl-5 pr-2"><small>Arabica</small> <span class="cursor-pointer ml-2 bg-black w-[20px] h-[20px]  rounded-full flex items-center justify-center">x</span></span>
                            <span data-value="Robusta" class="ingredients flex items-center justify-between bg-[#394B32] w-[fit-content] rounded-full shadow-[inset_1px_1px_10px_1px_#f8faf8b7] pl-5 pr-2"><small>Robusta</small> <span class="cursor-pointer ml-2 bg-black w-[20px] h-[20px]  rounded-full flex items-center justify-center">x</span></span>
                        </div>
                        <button class="cursor-pointer flex items-center justify-center bg-[#0c8e01fe] min-w-[fit-content] px-5 py-2 text-black rounded-lg shadow-[inset_1px_1px_10px_1px_#E8DBC7]">+ Ajouter</button>
                    </div>
                </div>
            </div>

                <div class="bg-[#00000023] rounded-lg flex flex-col gap-3 p-5">
                     <div class="flex flex-col">
                        <span class="font-bold">Notes speciales</span>
                        <small>Ajoutez une note si necessaire.</small>
                    </div>
                    <textarea id="notes" class="border-2 border-black rounded-lg px-5 text-center outline-none" name="notes" id="" placeholder="Ex: Produit recommande..."></textarea>
                </div>
                
            </div>
    `;

    mainPanel.addEventListener("change",(e)=>{
        let targetSize = e.target;
        if(targetSize.type === 'radio')
        {
            currentCafe.size = targetSize.value;
        }
    });
    currentMode = optionsMode;

}

function drawValidationPanel()
{
    step3SideEffects();
    mainPanel.innerHTML = `
    
    <div class="flex flex-row justify-between">

                <div>
                <span class="font-bold">Resume du produit</span>
                <div class="bg-black  w-[300px] h-[300px] rounded-lg flex flex-col items-center gap-4">
                    <figure><img class="rounded-full" src="${currentCafe.ImagePath}" width="100px" height="100px" alt=""></figure>
                    <div class="flex flex-col gap-4">
                        <h3 class="border-b-2 border-b-[#394B32]">${currentCafe.name}</h3>
                        <span class="bg-[#394B32] rounded-full w-[50px] flex items-center justify-center">cafe</span>
                        <span>Prix de base: <span class="font-black">${currentCafe.price.toFixed(2)}DH</span></span>
                        <div><span class="flex items-center justify-center rounded-full bg-[#f6f2f2] text-black ">-${currentCafe.discountPercentage}%</span> <span class="opacity-[.5]">promo jusqu'au: <span>${currentCafe.promoExpiry.toLocaleDateString('en-US')}</span> </span>  </div>
                    </div>
                </div>
            </div>
            
            <!-- Caractéristiques -->
            <div class=" shadow-[inset_2px_2px_15px_5px_#394B32,0px_0px_20px_2px_#0000008b] rounded-lg px-5 py-2">
                <h3 class="font-bold">Caractéristiques</h3>
                <div><span>Tailles:</span>  <span>${currentCafe.size}</span></div>
                <div><span>Ingredients:</span>  <span id="ingredientsDisplay"></span></div>
            </div>
            <div class=" shadow-[inset_2px_2px_15px_5px_#394B32,0px_0px_20px_2px_#0000008b] rounded-lg px-5 py-2">
                <h3 class="font-bold">Informations supplementaires</h3>
                <span>Notes:</span> <p>${currentCafe.notes || "no notes" }</p>
            </div>

            </div>
    `;
    const displayGredientsEle = document.getElementById("ingredientsDisplay");
    
    currentCafe.ingredients.forEach(ing =>{
        displayGredientsEle.innerText += ing + "/";
    });
    currentMode = vereficationMode;
}


function forwordSwitch(mode)
{
     switch(mode)
        {
            case generalMode :
                drawCracteristiques_OptionsPanel();
                break;
            case optionsMode  :
                drawValidationPanel();
                break;
            case  vereficationMode :
                drawValidationPanel();
                break;
            default: break;

        }
}
function backWordSwitch(mode)
{
    switch(mode)
        {
            case optionsMode :
                drawGeneralInfoPanel();
                break;
            case vereficationMode :
                drawCracteristiques_OptionsPanel();
                break;
            case generalMode :
                drawGeneralInfoPanel();
                break;
            default: break;

        }
}
function switchPanels(mode , isBackword = true)
{
    if(allowNavigation)
    {
         if(isBackword)
        backWordSwitch(mode);    
        else
        forwordSwitch(mode);
    }else
    {

    }

   
    
}


function step1SideEffects()
{
    step1Ring.classList.add("onStep");

    step2Ring.classList.remove("onStep");
    step3Ring.classList.remove("onStep");

    firstBar.classList.remove("barOnProgress");
    secondBar.classList.remove("barOnProgress");

    step1TitleBox.classList.add("onProgresstitleBox");
    step2TitleBox.classList.remove("onProgresstitleBox");
    step3TitleBox.classList.remove("onProgresstitleBox");
    
    nextBtn.classList.remove("confirmBtn");

}
function step2SideEffects()
{
    step2Ring.classList.add("onStep");

    step3Ring.classList.remove("onStep");

    firstBar.classList.add("barOnProgress");
    secondBar.classList.remove("barOnProgress");

    step2TitleBox.classList.add("onProgresstitleBox");
    step1TitleBox.classList.remove("onProgresstitleBox");
    step3TitleBox.classList.remove("onProgresstitleBox");

    confirmBtnStateChanged(false);
}
function step3SideEffects()
{
    step3Ring.classList.add("onStep");

    secondBar.classList.add("barOnProgress");

    step3TitleBox.classList.add("onProgresstitleBox");
    step2TitleBox.classList.remove("onProgresstitleBox");
    step1TitleBox.classList.remove("onProgresstitleBox");

    confirmBtnStateChanged();
}

function confirmBtnStateChanged(isConfirmMode = true)
{
    if(isConfirmMode)
    {
        nextBtn.classList.add("confirmBtn");
        nextBtn.innerText = "confirm";
    }else
    {
        nextBtn.classList.remove("confirmBtn");
        nextBtn.innerText = ">";
    }
}

function isPositiveNumber(term)
{
    if(isNaN(term) || (Number(term) < 0 ) ) return false;
    return true;
}

function validateImagePath(path)
{

}

function validateProductName(term)
{
    if(term === "") return pickErrorMsg(targetField_productName);
    return null;
}

function validateProductPrice(term)
{
    if( term === "" || !isPositiveNumber(term)) return pickErrorMsg(targetField_productPrice) ;
    return null;
}

function validateProductCategory(term)
{
    if(term == "" || ! cafeCategories.includes(term)) return pickErrorMsg(targetField_productCategory);
    return null;
}

function validateProductDiscount(term)
{
   if(term === "" || !isPositiveNumber(term)) return pickErrorMsg(targetField_productDiscount);
   return null;
}

function validateProductExpiryDate(term)
{
    let date = new Date(term);
    if( term == "" || date < Date.now()) return pickErrorMsg(targetField_productPromoExpiry);
    return null;
}


function validateCoffeeRequiredData( name , price, category)
{
     return validateProductName(name) ?? validateProductPrice(price) ?? validateProductCategory(category);
   
}
function validateCoffeeOptionalData(discount, expiryDate)
{
    return validateProductDiscount(discount) ?? validateProductExpiryDate(expiryDate);
}


function collectGeneralDataAndValidate()
{
   const cafeNameElement = document.querySelector(`input[name="productName"]`);
    const cafePriceElement = document.querySelector(`input[name="productPrice"]`);
    const cafeCategoryElement = document.getElementById("cafeCategory");
    const cafePromoElement = document.querySelector(`input[name="promotion"]`);
    const cafePromoDiscountElement =document.querySelector(`input[name="promoPercent"]`);
    const cafePromoExpiryElement = document.querySelector(`input[name="promoExpiry"]`);


    let name = cafeNameElement.value;
    let price = cafePriceElement.value;
    let category = cafeCategoryElement.value;
    let discount = "0";
    let expiry = "--/--/--";

    
    errorMsg = validateCoffeeRequiredData(name,price,category);

    if(cafePromoElement.checked)
    {
        
        discount = cafePromoDiscountElement.value;
        expiry = cafePromoExpiryElement.value;
        errorMsg = errorMsg ?? validateCoffeeOptionalData(discount,expiry);
        if(errorMsg == null) currentCafe.hasPromo = true;
    } 

    
    if(errorMsg == null)
    {
        currentCafe.name = name;
        currentCafe.price = Number( price );
        currentCafe.category = category;
        currentCafe.discountPercentage = Number(discount);
        currentCafe.promoExpiry = new Date(expiry);

        allowNavigation =true;
    }else
    {
        allowNavigation =false;

        Swal.fire({
          title: 'Error!',
          text: errorMsg,
          icon: 'error',
          confirmButtonText: 'Cool'
        })
        
    }


    
}


function collectCaracteristiquesOptionsData()
{
    let ingredientsList = [];
    let notes = "";

    

    const ingredients = document.querySelectorAll(".ingredients");
    ingredients.forEach(ing =>{
        ingredientsList.push(ing.dataset.value);
    }) ;

    const notesEle = document.getElementById("notes");
    notes = notesEle.value;

    currentCafe.ingredients = ingredientsList;
    currentCafe.notes = notes;


}


function pickErrorMsg(targetField)
{
    switch(targetField)
    {
        case targetField_productName:
            return"Invalide product name please enter it in valid format";
        case targetField_productPrice:
           return"price value is invalide";
        case targetField_productCategory:
           return"cafe category is required";
        case targetField_productDiscount:
           return"In case you check the Promotion discount amount is required, and must be valid value";
        case targetField_productPromoExpiry:
            return"In case you check the Promotion expiry date is required, and must be valid value";
        case targetField_productImagePath:
            return" sorry! check the image existance, if not exists will set default one!";
    }
}

function UplaodcofeData()
{
    const cafeNameElement = document.querySelector(`input[name="productName"]`);
    const cafePriceElement = document.querySelector(`input[name="productPrice"]`);
    const cafeCategoryElement = document.getElementById("cafeCategory");
    const cafePromoElement = document.querySelector(`input[name="promotion"]`);
    const cafePromoDiscountElement =document.querySelector(`input[name="promoPercent"]`);
    const cafePromoExpiryElement = document.querySelector(`input[name="promoExpiry"]`);

    if(currentMode == generalMode)
    {
        cafeNameElement.value = currentCafe.name;
        cafePriceElement.value = currentCafe.price;
        cafeCategoryElement.value = currentCafe.category;

        cafePromoElement.checked = currentCafe.hasPromo;
        if( currentCafe.hasPromo)
        {
            cafePromoDiscountElement.value = currentCafe.discountPercentage;
            cafePromoExpiryElement.value = currentCafe.promoExpiry;
        }
        
    }
    if(currentMode == optionsMode)
    {
        
        document.getElementById("notes").value = currentCafe.notes;
        document.querySelector(`input[value="${currentCafe.size}"]`).checked = true;
    }
    
}


document.addEventListener("DOMContentLoaded", ()=>
{
    initApp();
});
mainPanel.addEventListener("submit",(e)=>{
    e.preventDefault();
});

prevBtn.addEventListener("click",()=>
{
    switchPanels(currentMode);
    UplaodcofeData();
    if(currentMode === generalMode)
    {
        prevBtn.style.display = "none";
    }
});

nextBtn.addEventListener("click",()=>
{

    if(currentMode == vereficationMode)
    {

        const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
        },
        buttonsStyling: true
        });
        swalWithBootstrapButtons.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, add it!",
          cancelButtonText: "No, just ignore!",
          reverseButtons: true
        }).then((result) => {
            
        if (result.isConfirmed)
        {
            cafeProducts.push(currentCafe);
        
            initApp();

            swalWithBootstrapButtons.fire({
                title: "Added!",
                text: "Your product has been added sucessfuly",
                icon: "success"
            });

            console.log(cafeProducts);
        } 
        else if (result.dismiss === Swal.DismissReason.cancel)
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "No product is Added",
          icon: "error"
        });
    });

}else
    {
        if(currentMode == optionsMode)
        {
           collectCaracteristiquesOptionsData();


        } 
        if(currentMode == generalMode) collectGeneralDataAndValidate();

        switchPanels(currentMode, false);

         if(currentMode !== generalMode)
            prevBtn.style.display = "block";
    }

    
});
