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
          function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            locationInput.value = `Latitude: ${latitude}, Longitude: ${longitude}`;
          },
          function(error) {
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
    if(locationInput.value == '' || destinationInput.value == ''){
        dialogBox.style.display = "flex";
    }
}

dialogCancelButton.onclick = () => {
    dialogBox.style.display = "none";
}