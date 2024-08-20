// Call loadProducts when the page loads
window.onload = loadProducts();


function loadProducts(){
    const products = JSON.parse(localStorage.getItem("products"));
    if (products){
        displayProducts(products);
    }else{
        fetchProducts("https://dummyjson.com/products");
    }
}

async function fetchProducts(url){
    try{
        const response = await fetch(url);
        const productObject = await response.json();
     
        const products = productObject.products;
        localStorage.setItem("products", JSON.stringify(products));
        displayProducts(products);
    }catch(error){
        alert("Error while fetching: " + error);
    }
}

function displayProducts(products) {
    const productSection = document.getElementById("products");

    products.forEach(product => {
        productSection.innerHTML += `
        <div class="grid-item" onclick="redirectToProductDetails('${product.id}')">
            <p>${product.title}</p>
            <img src="${product.images[0]}" alt="${product.title}" width="150px" height="180px"/>
            <p style="color: green;">Price: $${product.price}</p>
        </div>
        `;
    });
    fetchCategories();
}

function redirectToProductDetails(productId) {
    window.location.href = `product.html?id=${productId}`;
}


async function fetchCategories() {
    
    let Categories = [];
    try {
        const response = await fetch('https://dummyjson.com/products/category-list');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        Categories = await response.json();
        displayCategories(Categories)
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
    
}

function displayCategories(categories){
    const catDrop = document.getElementById('cat');
    categories.forEach(category => {
        catDrop.innerHTML += `
        <a href='./category.html?category=${category}' class="dropdown-item">${category}</a>
        `;
    });

}


function logout(){
    localStorage.removeItem("loggedUser");
    window.location.href = 'login.html';
}