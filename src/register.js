let allUsers = [];

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


document.getElementById("r_form").addEventListener('submit', function(event) {
    event.preventDefault();
    // Registration logic
    
    // Get form data..
    const formEl = document.getElementById("r_form");
    const formData = new FormData(formEl);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    const r_password = formData.get('r_password');

    // Password validation
    const preg = /^(?=.*\d)(?=.*[!@#$%^&*~])(?=.*[a-z]).{8,}$/;
    const presult = preg.test(r_password);

    const ereg = /^[a-zA-Z]+[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/;
    const eresult = ereg.test(email);


    // Empty form fields..
    // document.getElementById('r_form').reset();
    
    const user = allUsers.find(user => user.username === username);
    const em = allUsers.find(em => em.email === email);

    if (user) {
        alert("Username already exists!");
        return false;
    }
    if (parseInt(username)) {
        alert("Enter a valid username please!");
        return false;
    } else if (password !== r_password) {
        alert("Password confirmation doesn't match!");
        return false;
    } else if (presult == false) {
        alert("Password must be 8 characters and contain alphabetic characters, special character, and number!");
        return false;    
    } else if (eresult == false) {
        alert("Enter a valid formula for email!");
        return false;    
    } else if (em) {
        alert("Email already used!");
        return false;
    } else { 
        register(username, email, password);
    }

    async function register(username, password) {
        let cart = [];
    
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, email, cart })
        });

        if (!response.ok) {
            alert('Failed to register user!');
        } else {
            window.location.href = 'login.html';
        }
    } 
});

document.getElementById('togglePassword').addEventListener('click', function () {
    const password = document.getElementById('password');
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    this.textContent = type === 'password' ? 'Show' : 'Hide';
});

document.getElementById('toggleRPassword').addEventListener('click', function () {
    const r_password = document.getElementById('r_password');
    const type = r_password.getAttribute('type') === 'password' ? 'text' : 'password';
    r_password.setAttribute('type', type);
    this.textContent = type === 'password' ? 'Show' : 'Hide';
});

