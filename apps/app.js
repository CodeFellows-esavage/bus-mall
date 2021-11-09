'use strict';
// console.log('linked');
const allImages = document.getElementById('product-images');
const img1El = document.getElementById('img1');
const img2El = document.getElementById('img2');
const img3El = document.getElementById('img3');
const progress = document.getElementById('progress-tracker');
let pt = 0;
let imgIndexArray = [];
const rounds = 25;
let selectionCount = 0;

function Product(productName, fileExt) {
    this.productName = productName;
    this.imgPath = `imgs/${productName}.${fileExt}`;
    this.countShown = 0;
    this.countClicked = 0;

    Product.productList.push(this);
}

Product.productList = [];

//Generates a random index number for the product lis array length
Product.prototype.randomImgIndex = function(){
    return Math.trunc(Math.random() * Product.productList.length);
}

//creates a random index number for images 1 through 3. Where img 2 index cannot equal img 1 index, and img 3 index cannot equal img 1 or img 2 index.
//outputs an imgIndexArray which is referenced for rendering the images, each image that is rendered increases the countShown value for that image.
Product.prototype.selectImage = function() {
    let img1Index = Product.prototype.randomImgIndex();
    let img2Index = Product.prototype.randomImgIndex();
    let img3Index = Product.prototype.randomImgIndex();

    while (img2Index === img1Index){
        img2Index = Product.prototype.randomImgIndex();
    }
    while (img3Index === img1Index || img3Index === img2Index){
        img3Index = Product.prototype.randomImgIndex();
    }
    imgIndexArray = [img1Index, img2Index, img3Index];
    for (let i = 0; i < imgIndexArray.length; i += 1){
        Product.productList[imgIndexArray[i]].countShown += 1;
    }
    // console.log('count shown for images',Product.productList[img1Index].countShown, Product.productList[img2Index].countShown, Product.productList[img3Index].countShown);
}

Product.prototype.renderImg = function () {
    Product.prototype.selectImage();
    progress.textContent = `${pt} image sets out of ${rounds} complete`;
    img1.src = Product.productList[imgIndexArray[0]].imgPath;
    img2.src = Product.productList[imgIndexArray[1]].imgPath;
    img3.src = Product.productList[imgIndexArray[2]].imgPath;
}

function handleImgSelection(event) {
    const id = event.target.id;
    if (selectionCount < rounds){
        if(id === 'img1'){
            Product.productList[imgIndexArray[0]].countClicked += 1;
            // console.log(Product.productList[imgIndexArray[0]].productName, Product.productList[imgIndexArray[0]].countClicked);
            pt += 1;
            Product.prototype.renderImg();
            selectionCount += 1;
        } else if (id === 'img2'){
            Product.productList[imgIndexArray[1]].countClicked += 1;
            // console.log(Product.productList[imgIndexArray[1]].productName, Product.productList[imgIndexArray[1]].countClicked);
            pt += 1;
            Product.prototype.renderImg();
            selectionCount += 1;
        } else if (id === 'img3'){
            Product.productList[imgIndexArray[2]].countClicked += 1;
            // console.log(Product.productList[imgIndexArray[2]].productName, Product.productList[imgIndexArray[2]].countClicked);
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
    for(let i = 0; i < Product.productList.length; i += 1){
        const liEl = document.createElement('li');
        ulEl.appendChild(liEl);
        liEl.textContent = `${Product.productList[i].productName} had ${Product.productList[i].countClicked} votes, and was seen ${Product.productList[i].countShown} times.`
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
Product.prototype.renderImg();
allImages.addEventListener('click', handleImgSelection);
document.querySelector('#view-results').addEventListener('click', renderResults);


