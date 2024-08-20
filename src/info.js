let dispaly = true;
let allUsers = [];
let luser = null;
const uId = localStorage.getItem("loggedUser");

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
        displayUser(allUsers);
        
    } catch (error) {
        console.error('Error fetching users:', error);
        alert("Error fetching data!");
    }
}

function displayUser(allUsers){
    const userEl = document.getElementById("me");
    
    const user = allUsers.find(user => user.id == uId);
    if (user){
        luser = user;
        userEl.innerHTML += `
            <p  id="user"> <span> Username: </span> ${user.username}</p>
            <hr style="width: 100%;">  
            <span> 
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"
                style="cursor: pointer;" onclick="editUser('user')">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                </svg>
            </span>
    
            <p id="pass"><span> Password: </span> ${user.password}</p>
            <hr style="width: 100%;">
            <span> 
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"
                style="cursor: pointer;" onclick="editUser('pass')">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                </svg>
            </span>
           
        `
    }
}

function editUser(id){
    if(dispaly == false){
        return;
    }else{
        const editEl = document.getElementById("edit");
        if(id == 'user'){
            editEl.innerHTML += `
            <input class = 'info' type="text" id="newuser" placeholder="Enter new Username">
            <button onclick="getChange('newuser')"> Save Changes </buttons>
        `
        dispaly = false;    
        }else{
            editEl.innerHTML += `
            <input class = 'info' type="text" id="newpass" placeholder="Enter new Password">
            <button onclick="getChange('newpass')"> Save Changes </buttons>
        `
        dispaly = false;  
        } 
    }
    
}

function getChange(inputId){
    dispaly = true
    const change = document.getElementById(inputId).value;
    if(change.length < 6){
        alert('At least 6 characters!')

    }else{
        if(inputId == 'newpass'){
            let username = luser.username;
            let password = change;
            let cart = luser.cart;
            updateInfo(username, password, cart);
        }else{
            let username = change;
            let password = luser.password;
            let cart = luser.cart;
            updateInfo(username, password, cart);
        }
        async function updateInfo(username, password, cart){
            try{
                const response = await fetch(`http://localhost:3000/users/${uId}`, {
                    method: 'PUT',
                    headers: {
                       'Content-Type':'application/json'
                    },
                    body: JSON.stringify({username, password, cart})
                })
                if(response.ok){
                    console.log("User Updated!");
                    window.location.href = 'info.html';
                }
    
            }catch(error){
                console.log("Error!: " + error);
            }
        }
    }
         
}

function logout(){
    localStorage.removeItem("loggedUser");
    window.location.href = 'login.html';
}







