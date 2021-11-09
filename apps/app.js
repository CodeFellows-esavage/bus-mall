'use strict';
// console.log('linked');
const allImages = document.getElementById('product-images');
// const img1El = document.getElementById('img1');
// const img2El = document.getElementById('img2');
// const img3El = document.getElementById('img3');
const progress = document.getElementById('progress-tracker');
let pt = 0;
let imgIndexArray = [];
const rounds = 5;
let selectionCount = 0;

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


Product.prototype.render = function (position){
    const imgEl = document.getElementById(`${position}`)
    imgEl.src = this.imgPath;
    imgEl.alt = this.productName;
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
        // Product.list[imgIndexArray[i]].countShown += 1; //move to render function
}
    // console.log('count shown for images',Product.list[img1Index].countShown, Product.list[img2Index].countShown, Product.list[img3Index].countShown);


function renderProducts () {
    selectProducts();
    progress.textContent = `${pt} image sets out of ${rounds} complete`;
    Product.left.render('img1');
    Product.cntr.render('img2');
    Product.right.render('img3');
}

function handleImgSelection(event) {
    const id = event.target.id;
    if (selectionCount < rounds){
        if(id === 'img1'){
            Product.list[imgIndexArray[0]].countClicked += 1;
            // console.log(Product.list[imgIndexArray[0]].productName, Product.list[imgIndexArray[0]].countClicked);
            pt += 1;
            Product.prototype.renderImg();
            selectionCount += 1;
        } else if (id === 'img2'){
            Product.list[imgIndexArray[1]].countClicked += 1;
            // console.log(Product.list[imgIndexArray[1]].productName, Product.list[imgIndexArray[1]].countClicked);
            pt += 1;
            Product.prototype.renderImg();
            selectionCount += 1;
        } else if (id === 'img3'){
            Product.list[imgIndexArray[2]].countClicked += 1;
            // console.log(Product.list[imgIndexArray[2]].productName, Product.list[imgIndexArray[2]].countClicked);
            pt += 1;
            Product.prototype.renderImg();
            selectionCount += 1;
        } 
    } else {
        document.querySelector('#view-results').classList.remove('hidden');
        allImages.removeEventListener('click', handleImgSelection);
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
renderProducts();
allImages.addEventListener('click', handleImgSelection);
document.querySelector('#view-results').addEventListener('click', renderResults);


