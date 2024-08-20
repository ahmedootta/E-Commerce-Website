
let luser = null;
const uId = localStorage.getItem('loggedUser');
if(uId){
                        // Call loadCart when the page loads
        window.onload = loadCart();

        async function loadCart() {

            try {
                const response = await fetch('http://localhost:3000/users');

                
                const users = await response.json();
                
            
            
                const user = users.find(user => user.id == uId);

                if (!user) {
                    console.error('User not found. Check the user ID.');
                    return;
                }
                luser = user;
                displayCart(user.cart);

            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        }


        async function displayCart(cart){
            let cartEl = document.getElementById("bodyOfTable");
            let tdEl = document.getElementById("total");

            if (cart.length == 0){
                cartEl.innerHTML += ` <div style='text-align: center; color: #ff7407; padding: 10px; font-size: x-large'> Yout Cart Is Empty !!! </div> `
                tdEl.innerText = 0 + "$"; 
                return;
            }
            let total = 0;
            for (let item of cart){
                let sum = item.price * item.quantity;
                total += sum
                if(item.quantity == 1){
                    cartEl.innerHTML += `
                    <tr>
                        <td> ${item.id} </td>
                        <td> ${item.title} </td>
                        <td> 
                        <button style="background-color: transparent; border: none; cursor: pointer;" onclick="minusItem(${item.id})">
                                    &#9664;
                                </button>
                                ${item.quantity}
                                <button style="background-color: transparent; border: none; cursor: pointer;" onclick="addItem(${item.id})">
                                    &#9654;
                                </button>
                        </td>
                        <td> <img src="${item.image}" alt="product-image" width="120px" height="120px"> </td>
                        <td> ${item.price}$ </td>
                        <td> ${ (item.price * item.quantity).toFixed(2) }$ </td>

                        
                        <td> 
                            <button class="delete-button" onclick="deleteItem(${item.id})">
                                Delete
                            </button>
                        </td>

                    </tr>
                      `       
                }else{
                    cartEl.innerHTML += `
                     <tr>
                            <td>${item.id}</td>
                            <td>${item.title}</td>
                            <td>
                                <button style="background-color: transparent; border: none; cursor: pointer;" onclick="minusItem(${item.id})">
                                    &#9664;
                                </button>
                                ${item.quantity}
                                <button style="background-color: transparent; border: none; cursor: pointer;" onclick="addItem(${item.id})">
                                    &#9654;
                                </button>
                            </td>
                            <td><img src="${item.image}" alt="product-image" width="120px" height="120px"></td>
                            <td>${item.price}$</td>
                            <td >${sum.toFixed(2)}$</td>
                            <td> 
                                <button class="delete-button" onclick="deleteItem(${item.id})">
                                    Delete
                                </button>
                            </td>
                      </tr>
                     `;
                }
            }
            tdEl.innerText = total.toFixed(2) + "$";
  
        }


        function addItem(itemId){
            let username = luser.username;
            let password = luser.password;
            let cart = luser.cart;
            for (let item of cart){
                if(item.id == itemId){
                    item.quantity += 1;
                    updateCart(username, password, cart);
                }
            }   
        }

        function minusItem(itemId){
            let username = luser.username;
            let password = luser.password;
            let cart = luser.cart;
            for (let item of cart){
                if(item.id == itemId){
                    item.quantity -= 1;
                    updateCart(username, password, cart);
                }
            }
        }


        function deleteItem(itemId){
            let username = luser.username;
            let password = luser.password;
            let cart = luser.cart;
            for (let item of cart){
                if(item.id == itemId){
                    let index = cart.indexOf(item);
                    cart.splice(index, 1);
                    updateCart(username, password, cart);
                }
            }
        }


        async function updateCart(username, password, cart) {
            try {
                const response = await fetch(`http://localhost:3000/users/${uId}`, {
                    method: 'PUT',
                    headers: {
                       'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password, cart })
                });
                if (response.ok) {
                    console.log("Cart Updated!");
                }
            } catch (error) {
                console.log("Error!: " + error);
            }
        }


        function logout(){
            localStorage.removeItem("loggedUser");
            window.location.href = 'login.html';
        }


}else{
    window.location.href = 'login.html';
}



