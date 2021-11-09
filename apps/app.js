'use strict';

function Product(productName, fileExt) {
    this.productName = productName;
    this.imgPath = `imgs/${productName}.${fileExt}`;
    this.countShown = 0;
    this.countClicked = 0;

    Product.list.push(this);
}

Product.list = [];
Product.left = null;
Product.cntr = null;
Product.right = null;
Product.surveyRound = 0;
Product.ttlSurveyRounds = 5;

Product.prototype.render = function (position){
    const imgEl = document.getElementById(`${position}-position`)
    imgEl.src = this.imgPath;
    imgEl.alt = this.productName;
    
    this.countShown += 1;
}

//Generates a random index number for the product lis array length
function randomProduct() {
    const listIndex = Math.trunc(Math.random() * Product.list.length);
    return Product.list[listIndex];
}

//creates a random index number for images 1 through 3. Where img 2 index cannot equal img 1 index, and img 3 index cannot equal img 1 or img 2 index.
//outputs an imgIndexArray which is referenced for rendering the images, each image that is rendered increases the countShown value for that image.
function selectProducts() {
    Product.left = randomProduct();

    do {
        Product.cntr = randomProduct();
    } while (Product.left === Product.cntr)
    
    do {
        Product.right = randomProduct();
    } while (Product.right === Product.left || Product.right === Product.cntr)
}

function renderProducts () {
    const progress = document.getElementById('progress-tracker');
    progress.textContent = `${Product.surveyRound} image sets out of ${Product.ttlSurveyRounds} complete`;

    selectProducts();
    Product.left.render('left');
    Product.cntr.render('cntr');
    Product.right.render('right');
}

function handleProductSurvey(event) {
    const id = event.target.id;

    if (Product.surveyRound < Product.ttlSurveyRounds){
        if(id === 'left-position'){
            Product.left.countClicked += 1;
            Product.surveyRound += 1;
            renderProducts();
        } else if (id === 'cntr-position'){
            Product.cntr.countClicked += 1;
            Product.surveyRound += 1;
            renderProducts();
        } else if (id === 'right-position'){
            Product.right.countClicked += 1;
            Product.surveyRound += 1;
            renderProducts();
        } 
    } else {
        removeProductEventListener();
        addViewResultsBtn();     
    }
}

function renderResults() {
    const sectionEl = document.querySelector('#results');
    const ulEl = document.createElement('ul');
    sectionEl.appendChild(ulEl);
    for(let i = 0; i < Product.list.length; i += 1){
        const liEl = document.createElement('li');
        ulEl.appendChild(liEl);
        liEl.textContent = `${Product.list[i].productName} had ${Product.list[i].countClicked} votes, and was seen ${Product.list[i].countShown} times.`
    }
}

function addProductEventListener() {
    const allImages = document.getElementById('product-images');
    allImages.addEventListener('click', handleProductSurvey);
}

function removeProductEventListener() {
    const allImages = document.getElementById('product-images');
    allImages.removeEventListener('click', handleProductSurvey);
}

function addViewResultsBtn () {
    document.querySelector('#view-results').classList.remove('hidden');
    document.querySelector('#view-results').addEventListener('click', renderResults);
}

const bag = new Product('bag', 'jpg');
const banana = new Product('banana', 'jpg');
const bathroom = new Product('bathroom', 'jpg');
const boots = new Product('boots', 'jpg');
const breakfast = new Product('breakfast', 'jpg');
const bubblegum = new Product('bubblegum', 'jpg');
const chair = new Product('chair', 'jpg');
const cthulhu = new Product('cthulhu', 'jpg');
const dogduck = new Product('dog-duck', 'jpg');
const dragon = new Product('dragon', 'jpg');
const pen = new Product('pen', 'jpg');
const petsweep = new Product('pet-sweep', 'jpg');
const scissors = new Product('scissors', 'jpg');
const shark = new Product('shark', 'jpg');
const sweep = new Product('sweep', 'png');
const tauntaun = new Product('tauntaun', 'jpg');
const unicorn = new Product('unicorn', 'jpg');
const watercan = new Product('water-can', 'jpg');
const wineglass = new Product('wine-glass', 'jpg');


//Execution order
addProductEventListener();
renderProducts();




