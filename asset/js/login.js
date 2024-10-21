// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
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
var database = getDatabase();
var dataRef = ref(database);

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

// change heading according to requirement
const loginPageTitle = document.querySelector("main h2");
loginPageTitle.textContent = `Login as ${sessionStorage.getItem("signInAccountType")}`;


// validate email and password(continue button click)
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const continueButton = document.querySelector("main button");
const loader = document.querySelector(".loader");

continueButton.onclick = () => {
    let email = emailInput.value;
    let password = passwordInput.value;

    if (validateEmail(email) == false) {
        messageAlert("Error in Email", "Enter a valid email address!", false);
    } else if (password == '') {
        messageAlert("Error in Password", "Enter a valid password", false);
    } else {
        continueButton.style.display = 'none';
        loader.style.display = 'block';
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                loader.style.display = 'none';
                const user = userCredential.user;
                if (sessionStorage.getItem("signInAccountType") == 'rider') {
                    get(child(dataRef, "rider"))
                        .then((snapshot) => {
                            snapshot.forEach(element => {
                                if (element.val().Email == email) {
                                    localStorage.setItem("name", `${element.val().FirstName} ${element.val().LastName}`);
                                    localStorage.setItem("email", email);
                                    localStorage.setItem("phone", element.val().Phone);
                                    localStorage.setItem("accountType", 'rider');
                                }
                            })
                        })

                    setTimeout(() => {
                        window.location.href = '/';
                    }, 3000);
                } else {
                    get(child(dataRef, "driver"))
                        .then((snapshot) => {
                            snapshot.forEach(element => {
                                if (element.val().Email == email) {
                                    localStorage.setItem("name", `${element.val().Name}`);
                                    localStorage.setItem("email", email);
                                    localStorage.setItem("phone", element.val().Phone);
                                    localStorage.setItem("accountType", 'driver');
                                    localStorage.setItem('profilePic', element.val().ProfilePic);
                                    localStorage.setItem('licensePic', element.val().LicensePic);
                                    localStorage.setItem('registrationNumber', element.val().RegistrationNumber);
                                    localStorage.setItem("color", element.val().Color);
                                    localStorage.setItem('company', element.val().Company);
                                    localStorage.setItem('model', element.val().Model);
                                }
                            })
                        })

                    setTimeout(() => {
                        window.location.href = '/';
                    }, 3000);
                }
                messageAlert("Successful", "Login successful", true);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                messageAlert(errorCode, errorMessage, false);
                loader.style.display = 'none';
                continueButton.style.display = 'block';
            });

    }
}

// toggle password visibility

const togglePasswordButton = document.querySelector("main .horizontal img");

togglePasswordButton.onclick = () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePasswordButton.src = "/asset/resource/icons/eye-on.svg";
    } else {
        passwordInput.type = "password";
        togglePasswordButton.src = "/asset/resource/icons/eye-off.svg";
    }
}