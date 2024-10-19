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

continueButton.onclick = () => {
    let email = emailInput.value;
    let password = passwordInput.value;

    if (validateEmail(email) == false) {
        messageAlert("Error in Email", "Enter a valid email address!", false);
    } else if (password == '') {
        messageAlert("Error in Password", "Enter a valid password", false);
    } else {
        messageAlert("Successful", "You have logged in successfully", true);
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