var productNameInput = document.getElementById('productName');
var productPriceInput = document.getElementById('productPrice');
var productCategoryInput = document.getElementById('productCategory');
var productDescriptionInput = document.getElementById('productDescription');
var productImgInput = document.getElementById('productImage');

var productSearchInput = document.getElementById('productSearch');

var products = [];

if (localStorage.getItem('productsList') != null) {
    products = JSON.parse(localStorage.getItem('productsList'));
    displayProducts();
}

function addProduct() {
    var imgName = productImgInput.files[0]? productImgInput.files[0].name : 'imgi_28_06.jpg';

    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description: productDescriptionInput.value,
        image: `images/${imgName}`
    }

    products.push(product);

    localStorage.setItem('productsList', JSON.stringify(products))

    displayProducts();

    clearForm();
}

function clearForm() {
    productNameInput.value = '';
    productPriceInput.value = '';
    productCategoryInput.value = '';
    productDescriptionInput.value = '';
    productImgInput.value = '';
}

function displayProducts() {
    var box = '';

    for (var i = 0; i < products.length; i++) {
        box += `<div class="my-card col-md-6 col-lg-4 col-xl-3">
                    <div class="inner shadow-lg rounded-3 overflow-hidden">
                        <img class="w-100" src="${products[i].image}" alt="${products[i].name}">
                        <div class="card-body p-2">
                            <span class="badge text-bg-info text-white">index : ${i}</span>
                            <h5>Product Name : ${products[i].name}</h5>
                            <p>Price : ${products[i].price}</p>
                            <p>Category : ${products[i].category}</p>
                            <p>Description : ${products[i].description}</p>
                        </div>
                        <div class="card-footer p-2 d-flex justify-content-center gap-2">
                            <button class="btn btn-outline-warning">Update <i class="fa-solid fa-pen-to-square"></i></button>
                            <button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete <i class="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                </div>`
    }

    document.getElementById('my-rows').innerHTML = box;
}

function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem('productsList', JSON.stringify(products));
    displayProducts();
}

function searchProduct() {
    var searchValue = productSearchInput.value;
    var box = '';

    for (var i = 0; i < products.length; i++) {
        if (products[i].name.toLowerCase().includes(searchValue.toLowerCase())) {
            box += `<div class="my-card col-md-6 col-lg-4 col-xl-3">
                    <div class="inner shadow-lg rounded-3 overflow-hidden">
                        <img class="w-100" src="${products[i].image}" alt="${products[i].name}">
                        <div class="card-body p-2">
                            <span class="badge text-bg-info text-white">index : ${i}</span>
                            <h5>Product Name : ${products[i].name}</h5>
                            <p>Price : ${products[i].price}</p>
                            <p>Category : ${products[i].category}</p>
                            <p>Description : ${products[i].description}</p>
                        </div>
                        <div class="card-footer p-2 d-flex justify-content-center gap-2">
                            <button class="btn btn-outline-warning">Update <i class="fa-solid fa-pen-to-square"></i></button>
                            <button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete <i class="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                </div>`
        }
    }

    document.getElementById('my-rows').innerHTML = box;
}