// script/auth.js

document.addEventListener('DOMContentLoaded', () => {
  console.log("Auth module loaded.");

  // Cache DOM Elements
  const loginView = document.getElementById('login-view');
  const registerView = document.getElementById('register-view');
  const switchToRegister = document.getElementById('switch-to-register');
  const switchToLogin = document.getElementById('switch-to-login');
  
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  
  const loginError = document.getElementById('login-error');
  const regError = document.getElementById('reg-error');

  // View Switching Logic
  if (switchToRegister && switchToLogin) {
    switchToRegister.addEventListener('click', (e) => {
      e.preventDefault();
      loginView.style.display = 'none';
      registerView.style.display = 'block';
      registerView.parentElement.appendChild(registerView); // reset anim
    });

    switchToLogin.addEventListener('click', (e) => {
      e.preventDefault();
      registerView.style.display = 'none';
      loginView.style.display = 'block';
    });
  }

  // --- Core Mock Authentication using LocalStorage ---
  
  // Registration Flow
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('reg-name').value;
      const email = document.getElementById('reg-email').value;
      const pass = document.getElementById('reg-password').value;

      let users = JSON.parse(localStorage.getItem('codemastery_users')) || [];
      
      // Check if user exists
      if (users.find(u => u.email === email)) {
        regError.textContent = "Email already registered!";
        regError.style.display = "block";
        return;
      }
      
      // Save User
      const newUser = { name, email, pass, id: Date.now().toString() };
      users.push(newUser);
      localStorage.setItem('codemastery_users', JSON.stringify(users));
      
      // Auto-login
      loginUser(newUser);
    });
  }

  // Login Flow
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const pass = document.getElementById('login-password').value;

      let users = JSON.parse(localStorage.getItem('codemastery_users')) || [];
      const user = users.find(u => u.email === email && u.pass === pass);

      if (user) {
        loginUser(user);
      } else {
        loginError.textContent = "Invalid email or password.";
        loginError.style.display = "block";
      }
    });
  }

  function loginUser(user) {
    // Save session
    localStorage.setItem('codemastery_session', JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email
    }));
    
    // Redirect to dashboard
    window.location.href = 'dashboard.html';
  }

  // Session Protection Wrapper functionality
  // (Could be invoked on dashboard/learn pages)
  window.checkSession = function() {
    const session = localStorage.getItem('codemastery_session');
    if (!session) {
      window.location.href = 'login.html';
      return null;
    }
    return JSON.parse(session);
  }

  window.logout = function() {
    localStorage.removeItem('codemastery_session');
    window.location.href = 'index.html';
  }
});
