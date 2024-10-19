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
    } else if (validatePhoneNumber(phoneNumber)==false){
        messageAlert("Error in Phone", "Enter a valid phone number", false);
    } else {
        messageAlert("Successful", "Sign Up successful", true);
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