'use strict';
// console.log('linked');
const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');
const img3 = document.getElementById('img3');
let index = 0;

function Product(productName, fileExt) {
    this.productName = productName;
    this.imgPath = `imgs/${productName}.${fileExt}`;
    this.countShown = 0;
    this.countClicked = 0;

    Product.productList.push(this);
}

Product.productList = [];

//create a function that uses product list array to display 3 unique images

function randomImgIndex(){
    return Math.trunc(Math.random() * Product.productList.length);
}


function imgtest() {
    img1.src = Product.productList[index].imgPath;
    index += 1;
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

img1.addEventListener('click', imgtest);

let cnt = 0
while (cnt < 100){
    console.log(randomImgIndex());
    cnt += 1;
}