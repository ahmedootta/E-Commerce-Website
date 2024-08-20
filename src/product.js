let allUsers = [];
let images;
let i = 0;


document.addEventListener('DOMContentLoaded', function() {
    getAllUsers();
});

async function getAllUsers() {
    try {
        const response = await fetch('http://localhost:3000/users');
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        allUsers = await response.json();
        
    } catch (error) {
        console.error('Error fetching users:', error);
        alert("Error fetching data!");
    }
}

let pId = null
window.onload = getItemId();


function getItemId(){
    var params = new URLSearchParams(window.location.search);
    var id = params.get("id");
    pId = id;
    console.log(pId)
    displayItem(pId);
}

async function displayItem(id){
    const response = await fetch (`https://dummyjson.com/products/${id}`)
    if(!response.ok){
        throw new Error ("Error Fetching data!");
    }
    const product = await response.json();
    images = product.images;
    if (product){
        const itemPlace = document.getElementById("hereIsItem"); 
        itemPlace.innerHTML += `
            <div id="product-details">
                <div class="detail-item">
                    <span class="detail-title">Product-ID:</span>
                    <span class="detail-value">${product.id}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-title">Title:</span>
                    <span class="detail-value">${product.title}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-title">Description:</span>
                    <span class="detail-value">${product.description}</span>
                </div>
            </div>

            <div id="prod" class="image-slider">
                <button class="arrow left-arrow" onclick="leftImage()">&#10094;</button>
                <img src="${product.images[0]}" alt="Product-Image" class="product-image">
                <button class="arrow right-arrow" onclick="rightImage()">&#10095;</button>
            </div>

            <div style="text-align: center; margin-top: 5px; font-size: xx-large;"> 
                <span> Price: </span> ${product.price}$
            </div>

            <div class="action-buttons">
                <button class="btn continue-shopping" onclick="history.back()">Continue Shopping</button>
                <button class="btn add-to-cart" onclick="addItemToCart()">Add to Cart</button>    
            </div>
        `       
    }else{
        alert("Product wasn't found!");
    }

}


function rightImage(){
    const imgElement = document.getElementById('prod').querySelector('img');
    const length = images.length
    if (i < length-1){
        i++;
        imgElement.setAttribute('src', images[i])
    }else{
        return;
    }
   
}


function leftImage(){
    const imgElement = document.getElementById('prod').querySelector('img');
    if(i > 0){
        i--;
        imgElement.setAttribute('src', images[i])
    }else{
        return;
    }
   
}



async function addItemToCart(){
    console.log(pId)
    const response = await fetch (`https://dummyjson.com/products/${pId}`)
    if(!response.ok){
        throw new Error ("Error Fetching data!");
    }
    const targetProduct = await response.json();
    
    const product = {
        "id": targetProduct.id,
        "title": targetProduct.title,
        "description": targetProduct.description,
        "price": targetProduct.price,
        "image": targetProduct.images[0],
        "quantity": 1
    }

    const uId = localStorage.getItem("loggedUser");
    if(!uId){
        window.location.href = 'login.html';
    }
    console.log(uId);
    
    const loggedUser = allUsers.find(user => user.id == uId)
    if (loggedUser){
        loggedUser.cart.push(product);
        let username = loggedUser.username;
        let password = loggedUser.password;
        let cart = loggedUser.cart;
        updateCart(username, password, cart);
    }


    async function updateCart(username, password, cart){
        try{
            const response = await fetch(`http://localhost:3000/users/${uId}`, {
                method: 'PUT',
                headers: {
                   'Content-Type':'application/json'
                },
                body: JSON.stringify({username, password, cart})
            })
            if(response.ok){
                console.log("Cart Updated!");
                window.location.href = 'cart.html';
            }

        }catch(error){
            console.log("Error!: " + error);
        }
    }  
}

function logout(){
    localStorage.removeItem("loggedUser");
    window.location.href = 'login.html';
}
            

