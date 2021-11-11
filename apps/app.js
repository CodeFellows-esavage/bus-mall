'use strict';

function Product(productName, fileExt) {
    this.productName = productName;
    this.imgPath = `imgs/${productName}.${fileExt}`;
    this.countViewed = 0;
    this.countClicked = 0;

    Product.list.push(this);
}

Product.list = [];
Product.left = null;
Product.cntr = null;
Product.right = null;
Product.lastValues = [];
Product.currentRound = 0;
Product.ttlRounds = 100;


Product.prototype.render = function (position){
    const imgEl = document.getElementById(`${position}-position`)
    imgEl.src = this.imgPath;
    imgEl.alt = this.productName;
    
    this.countViewed += 1;
}

//Generates a random index number for the product lis array length
function randomProduct() {
    const listIndex = Math.trunc(Math.random() * Product.list.length);
    return Product.list[listIndex];
}

//creates a random index number for images 1 through 3. Where img 2 index cannot equal img 1 index, and img 3 index cannot equal img 1 or img 2 index.
//outputs an imgIndexArray which is referenced for rendering the images, each image that is rendered increases the countViewed value for that image.

function selectProducts() {
    Product.lastValues = [Product.left, Product.cntr, Product.right];

    //TODO maybe make a cannot use array, push new left value into current array being checked then check cntr against this new array of 4 items, then push the cntr value into the cannot use arry and check the right against the new array of 5

    Product.left = randomProduct();
    Product.cntr = randomProduct();
    Product.right = randomProduct();

    for (let i = 0; i < Product.lastValues.length; i += 1){
        while(Product.left === Product.lastValues[i]){
            if (i === 0){
                Product.left = randomProduct();
            } else{
                Product.left = randomProduct();
                i = 0;
            }
        }
    }
    for (let i = 0; i < Product.lastValues.length; i += 1){
        while(Product.cntr === Product.left || Product.cntr === Product.lastValues[i]){
            if (i === 0){
                Product.cntr = randomProduct();
            } else{
                Product.cntr = randomProduct();
                i = 0;
            }
        }
    }
    for (let i = 0; i < Product.lastValues.length; i += 1){
        while(Product.right === Product.left || Product.right === Product.cntr || Product.right === Product.lastValues[i]){
            if (i === 0){
                Product.right = randomProduct();
            } else{
                Product.right = randomProduct();
                i = 0;
            }
        }
    } 
}   


function renderProducts () {
    const progress = document.getElementById('progress-tracker');
    progress.textContent = `${Product.currentRound} image sets out of ${Product.ttlRounds} complete`;

    selectProducts();
    Product.left.render('left');
    Product.cntr.render('cntr');
    Product.right.render('right');
}

function handleProductSurvey(event) {
    const id = event.target.id;

    if (Product.currentRound < Product.ttlRounds){
        if(id === 'left-position'){
            Product.left.countClicked += 1;
            Product.currentRound += 1;
            renderProducts();
        } else if (id === 'cntr-position'){
            Product.cntr.countClicked += 1;
            Product.currentRound += 1;
            renderProducts();
        } else if (id === 'right-position'){
            Product.right.countClicked += 1;
            Product.currentRound += 1;
            renderProducts();
        } 
    } else {
        storage();
        removeProductEventListener();
        addViewResultsBtn();     
    }
}

function checkForStored(){
    let localProducts = JSON.parse(localStorage.getItem('GOATS'));

    if (localProducts){
        for (let i = 0; i < localProducts.length; i++){
            let filePath = localProducts[i].imgPath;
            
            new Product (`${localProducts[i].productName}`, `${filePath.slice(filePath.length - 3, filePath.length)}`);
            Product.list[i].countClicked = localProducts[i].countClicked;
            Product.list[i].countViewed = localProducts[i].countViewed;
        }
    } else{
        genProducts();
    }
}

function storage() {
    localStorage.setItem('GOATS', JSON.stringify(Product.list));
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

function renderResults() {
    const sectionEl = document.querySelector('#results');
    const ulEl = document.createElement('ul');
    sectionEl.appendChild(ulEl);
    for(let i = 0; i < Product.list.length; i += 1){
        const liEl = document.createElement('li');
        ulEl.appendChild(liEl);
        liEl.textContent = `${Product.list[i].productName} had ${Product.list[i].countClicked} votes, and was seen ${Product.list[i].countViewed} times.`
    }
    renderChart();
}

function renderChart(){
    const productNames = [];
    const productClicks = [];
    const productViews = [];

    for (let i = 0; i < Product.list.length; i += 1){
        productNames.push(Product.list[i].productName);
        productClicks.push(Product.list[i].countClicked);
        productViews.push(Product.list[i].countViewed);
    }

    const context = document.getElementById('results-chart').getContext('2d');
    const productChart = new Chart(context, {
        type: 'horizontalBar',

        data: {
            labels: productNames,
            datasets: [
                {
                label: 'Product Clicks',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: productClicks
                },
                {
                label: 'Product Views',
                backgroundColor: 'rgb(66, 135, 245)',
                borderColor: 'rgb(66, 135, 245)',
                data: productViews    
                }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function genProducts() {
    new Product('bag', 'jpg');
    new Product('banana', 'jpg');
    new Product('bathroom', 'jpg');
    new Product('boots', 'jpg');
    new Product('breakfast', 'jpg');
    new Product('bubblegum', 'jpg');
    // new Product('chair', 'jpg');
    // new Product('cthulhu', 'jpg');
    // new Product('dog-duck', 'jpg');
    // new Product('dragon', 'jpg');
    // new Product('pen', 'jpg');
    // new Product('pet-sweep', 'jpg');
    // new Product('scissors', 'jpg');
    // new Product('shark', 'jpg');
    // new Product('sweep', 'png');
    // new Product('tauntaun', 'jpg');
    // new Product('unicorn', 'jpg');
    // new Product('water-can', 'jpg');
    // new Product('wine-glass', 'jpg');
}

//Execution order
// genProducts();
checkForStored();
addProductEventListener();
renderProducts();




