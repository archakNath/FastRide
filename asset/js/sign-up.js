// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getDatabase, ref, set, child, get, update, remove } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB54Gf3Jn40KHjXWSjd9NDK57_ZvcN_ioE",
    authDomain: "fastride-fc205.firebaseapp.com",
    databaseURL: "https://fastride-fc205-default-rtdb.firebaseio.com",
    projectId: "fastride-fc205",
    storageBucket: "fastride-fc205.appspot.com",
    messagingSenderId: "1048470810385",
    appId: "1:1048470810385:web:7b8b42d4ada944d5eaa6b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const realdb = getDatabase(app);

// message alert
function messageAlert(title, message, type) {
    const messageStack = document.querySelector(".message-stack");

    // Check if the message stack is already visible
    if (window.getComputedStyle(messageStack).display === "none") {
        const messageTitle = document.querySelector(".message-stack strong");
        const messageText = document.querySelector(".message-stack p");
        const progressBar = document.querySelector(".message-stack .message .progress .progress-bar");

        // Show the message stack
        messageStack.style.display = "flex";
        messageStack.style.opacity = 1;
        progressBar.style.width = "100%";
        messageTitle.textContent = title;
        messageText.textContent = message;

        if (type) {
            document.querySelector(".message-stack .message").style.backgroundColor = "var(--light-green)";
            document.querySelector(".message-stack .message").style.color = "var(--green)";
            document.querySelector(".message-stack .message .progress .progress-bar").style.backgroundColor = "var(--green)";
            document.querySelector(".message-stack .message img").src = "/asset/resource/icons/circle-check.svg";
        } else {
            document.querySelector(".message-stack .message").style.backgroundColor = "var(--light-red)";
            document.querySelector(".message-stack .message").style.color = "var(--red)";
            document.querySelector(".message-stack .message .progress .progress-bar").style.backgroundColor = "var(--red)";
            document.querySelector(".message-stack .message img").src = "/asset/resource/icons/error.svg";
        }

        // Progress update animation
        gsap.to(progressBar, {
            width: "0%",
            duration: 2,
            delay: 0.5
        });

        // Fade out the message after a delay
        gsap.to(".message-stack", {
            opacity: 0,
            duration: 0.5,
            delay: 2.5
        });

        // Hide the message stack after the animation finishes
        setTimeout(() => {
            messageStack.style.display = "none";
        }, 3000);
    }
}

function validateEmail(email) {
    // Regular expression for validating an email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Test the email string against the regex
    return emailRegex.test(email);
}

function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^(?:\+?1\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/;
    return phoneRegex.test(phoneNumber);
}

// validate email and password(continue button click)
const firstNameInput = document.getElementById("first-name-input");
const lastNameInput = document.getElementById("last-name-input");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const phoneInput = document.getElementById("phone-input");
const continueButton = document.querySelector("main button");
const loader = document.querySelector(".loader");

continueButton.onclick = () => {
    let firstName = firstNameInput.value;
    let lastName = lastNameInput.value;
    let email = emailInput.value;
    let password = passwordInput.value;
    let phoneNumber = phoneInput.value;

    if (firstName == '' || lastName == '') {
        messageAlert("Error in Name", "Enter your complete name", false);
    } else if (validateEmail(email) == false) {
        messageAlert("Error in Email", "Enter a valid email address!", false);
    } else if (password == '') {
        messageAlert("Error in Password", "Enter a valid password", false);
    } else if (validatePhoneNumber(phoneNumber) == false) {
        messageAlert("Error in Phone", "Enter a valid phone number", false);
    } else {
        continueButton.style.display = 'none';
        loader.style.display = 'block';
        const auth = getAuth();
        const db = getDatabase(app);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;

                localStorage.setItem("name", `${firstName} ${lastName}`);
                localStorage.setItem("email", email);
                localStorage.setItem("phone", phoneNumber);
                localStorage.setItem("accountType", sessionStorage.getItem("signInAccountType"));
                if (sessionStorage.getItem("signInAccountType") == 'driver') {
                    localStorage.setItem('password', password);
                    messageAlert("Successful", "Sign Up successful", true);
                    loader.style.display = 'none';
                    setTimeout(() => {
                        window.location.href = '/page/document.html';
                    }, 3000);
                } else {
                    set(ref(realdb, 'rider/' + email.replace(/[.#$[\]]/g, '')), {
                        FirstName: firstName,
                        LastName: lastName,
                        Email: email,
                        Password: password,
                        Phone: phoneNumber
                    }).then(() => {
                        loader.style.display = 'none';
                        messageAlert("Successful", "Sign Up successful", true);
                        setTimeout(() => {
                            window.location.href = '/';
                        }, 3000);
                    }).catch((error) => {
                        loader.style.display = 'none';
                        continueButton.style.display = 'block';
                        messageAlert('Error adding data to the database', errorMessage, false);
                    });
                }
            })
            .catch((error) => {
                loader.style.display = 'none';
                continueButton.style.display = 'block';
                const errorCode = error.code;
                const errorMessage = error.message;
                messageAlert(errorCode, errorMessage, false);
            });
    }
}

// toggle password visibility
const togglePasswordButton = document.getElementById("password-toggle-button");

togglePasswordButton.onclick = () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePasswordButton.src = "/asset/resource/icons/eye-on.svg";
    } else {
        passwordInput.type = "password";
        togglePasswordButton.src = "/asset/resource/icons/eye-off.svg";
    }
}