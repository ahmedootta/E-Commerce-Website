
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

document.getElementById("l_form").addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get form data..
    const formEl = document.getElementById("l_form");
    const formData = new FormData(formEl);
    const username = formData.get('lusername');
    const password = formData.get('lpassword');

    // Find user in allUsers array
    const user = allUsers.find(user => user.username === username && user.password === password);
    
    if (user) {
        localStorage.setItem("loggedUser", user.id); // Store user ID as a string
        window.location.href = 'index.html';
    } else {
        alert("Login failed! Invalid username or password.");
        document.getElementById('l_form').reset();
    }
});

document.getElementById('togglePassword').addEventListener('click', function () {
    const password = document.getElementById('lpassword');
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    this.textContent = type === 'password' ? 'Show' : 'Hide';
});
