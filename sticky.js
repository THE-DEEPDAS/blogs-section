document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    
    const isLoggedIn = localStorage.getItem('loggedIn');
    console.log('Is logged in:', isLoggedIn);
    
    if (isLoggedIn === 'true') {
        showStickyNote();
    } else {
        document.getElementById('initial').style.display = 'block';
        document.getElementById('logoutButton').style.display = 'none';
    }
});

// Show the login/signup form when "Add Notes" is clicked
document.getElementById('addNotesButton').addEventListener('click', () => {
    document.getElementById('initial').style.display = 'none';
    document.getElementById('authForm').style.display = 'block';
});

// Handle form submission for login or sign-up
document.getElementById('authForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;

    console.log('Form submitted');
    console.log('Email:', email);
    console.log('Password:', password);

    // Retrieve existing users from local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    console.log('Existing users:', users);

    const existingUser = users.find(user => user.email === email);
    console.log('Matching user:', existingUser);

    if (existingUser) {
        if (existingUser.password === password) {
            // Update the logged-in status and user email
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('currentUserEmail', email);
            alert('Login Successful');
            showStickyNote();
        } else {
            alert('Invalid credentials');
        }
    } else {
        // New user, sign up
        users.push({ email, password });
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('currentUserEmail', email);
        alert('Sign Up Successful');
        showStickyNote();
    }
});

// Show sticky note and handle saving notes
function showStickyNote() {
    const currentUserEmail = localStorage.getItem('currentUserEmail');
    console.log('Current user email:', currentUserEmail);

    if (currentUserEmail) {
        document.getElementById('stickyNote').style.display = 'block';
        document.getElementById('logoutButton').style.display = 'block';
        document.getElementById('authForm').style.display = 'none';
        
        // Load existing note for the current user
        const noteKey = `noteContent_${currentUserEmail}`;
        const noteContent = localStorage.getItem(noteKey);
        console.log('Loaded note content for', currentUserEmail, ':', noteContent);
        
        if (noteContent !== null) {
            document.getElementById('noteContent').value = noteContent;
        } else {
            document.getElementById('noteContent').value = ''; // Empty note if none exists
        }

        // Remove existing event listeners for saveNote button
        const saveNoteButton = document.getElementById('saveNote');
        saveNoteButton.removeEventListener('click', saveNoteHandler);

        // Add a new event listener to saveNote button
        saveNoteButton.addEventListener('click', saveNoteHandler);

        // Remove existing event listeners for logoutButton
        const logoutButton = document.getElementById('logoutButton');
        logoutButton.removeEventListener('click', logoutHandler);

        // Add a new event listener to logout button
        logoutButton.addEventListener('click', logoutHandler);
    }
}

// Save note handler function
function saveNoteHandler() {
    const currentUserEmail = localStorage.getItem('currentUserEmail');
    const content = document.getElementById('noteContent').value;
    console.log('Saving note content for', currentUserEmail, ':', content);
    const noteKey = `noteContent_${currentUserEmail}`;
    localStorage.setItem(noteKey, content);
    alert('Note saved');
}

// Logout handler function
function logoutHandler() {
    console.log('Logging out');
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('currentUserEmail');
    document.getElementById('stickyNote').style.display = 'none';
    document.getElementById('logoutButton').style.display = 'none';
    document.getElementById('authForm').style.display = 'none';
    document.getElementById('initial').style.display = 'block';
   
    
    alert('Logged out');
}

// Switch between login and sign-up
document.getElementById('switchToLogin').addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Switching to Login form');
    document.getElementById('formTitle').textContent = 'Login';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
});
