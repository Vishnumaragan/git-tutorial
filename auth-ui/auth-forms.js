// Lightweight client-side handlers for demo purposes
const signInForm = document.querySelector('.sign-in form');
const signUpForm = document.querySelector('.sign-up form');

if (signInForm) {
    signInForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = signInForm.querySelector('input[type="email"]').value.trim();
        const password = signInForm.querySelector('input[type="password"]').value.trim();
        if (!email || !password) {
            alert('Please enter email and password');
            return;
        }
        alert('Signed in as ' + email + ' (demo)');
    });
}

if (signUpForm) {
    signUpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = signUpForm.querySelector('input[type="text"]').value.trim();
        const email = signUpForm.querySelector('input[type="email"]').value.trim();
        const password = signUpForm.querySelector('input[type="password"]').value.trim();
        if (!name || !email || !password) {
            alert('Please fill out all fields');
            return;
        }
        alert('Account created for ' + name + ' (demo)');
    });
}
