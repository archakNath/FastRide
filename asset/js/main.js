// Mobile navigation
const navOpenButton = document.querySelector("header .nav2 img");
const navCancelButton = document.querySelector(".mobile-nav img");
const mobileNav = document.querySelector(".mobile-nav");

navOpenButton.onclick = () => {
    mobileNav.style.display = "block";
}

navCancelButton.onclick = () => {
    mobileNav.style.display = "none";
}

// account login status

const profileLoginButtons = document.querySelector("header .nav2 ul")
const profileButton = document.querySelector("header .profile-dp");
profileButton.onclick = () => {
    window.location.href = '/page/profile.html';
}

if(localStorage.getItem("accountType") == 'rider' || localStorage.getItem("accountType") == 'driver'){
    profileButton.style.display = "flex";
    profileLoginButtons.style.display = "none";
    profileButton.innerHTML = localStorage.getItem("name").charAt(0);
}

// Login message
const loginDialog = document.querySelector(".login-options");
const driverSignIn = document.querySelector(".driverSignIn");
const riderSignIn = document.querySelector(".riderSignIn");
const loginButtons = document.querySelectorAll(".log-in");
const signupButtons = document.querySelectorAll(".sign-up");
const loginCancelButton = document.querySelector(".login-options .close-button");

loginButtons.forEach(button => {
    button.onclick = () => {
        mobileNav.style.display = "none";
        loginDialog.style.display = "flex";
        driverSignIn.textContent = "Sign in to driver and deliver";
        riderSignIn.textContent = "Sign in to ride";
        sessionStorage.setItem("signInType", "login");
    }
});

signupButtons.forEach(button => {
    button.onclick = () => {
        mobileNav.style.display = "none";
        loginDialog.style.display = "flex";
        driverSignIn.textContent = "Sign up to drive and deliver";
        riderSignIn.textContent = "Create a rider account";
        sessionStorage.setItem("signInType", "signin");
    }
});

driverSignIn.onclick = () => {
    sessionStorage.setItem("signInAccountType", "driver");
    if(sessionStorage.getItem("signInType") == 'login'){
        window.location.href = "/page/login.html";
    } else {
        window.location.href = "/page/sign-up.html";
    }
}

riderSignIn.onclick = () => {
    sessionStorage.setItem("signInAccountType", "rider");
    if(sessionStorage.getItem("signInType") == 'login'){
        window.location.href = "/page/login.html";
    } else {
        window.location.href = "/page/sign-up.html";
    }
}

loginCancelButton.onclick = () => {
    loginDialog.style.display = "none";
}


// Redirect to links
const driveLinks = document.querySelectorAll(".driveLink");
driveLinks.forEach(link => {
    link.onclick = () => {
        mobileNav.style.display = "none";
        document.getElementById("drive").scrollIntoView();
    }
});

const rideLinks = document.querySelectorAll(".rideLink");
rideLinks.forEach(link => {
    link.onclick = () => {
        mobileNav.style.display = "none";
        document.getElementById("main").scrollIntoView();
    }
});

// Find current location
const locateButton = document.querySelector(".locateButton");

locateButton.onclick = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                locationInput.value = `Latitude: ${latitude}, Longitude: ${longitude}`;
            },
            function (error) {
                console.error("Error getting geolocation: ", error.message);
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
    }

}

// Find best route
const findRouteButton = document.querySelector("main .text-content button");
const locationInput = document.querySelector(".locationInput");
const destinationInput = document.querySelector(".destinationInput");
const dialogBox = document.querySelector(".message");
const dialogCancelButton = document.querySelector(".message .message-box button");

findRouteButton.onclick = () => {
    if (locationInput.value == '' || destinationInput.value == '') {
        dialogBox.style.display = "flex";
    }
}

dialogCancelButton.onclick = () => {
    dialogBox.style.display = "none";
}