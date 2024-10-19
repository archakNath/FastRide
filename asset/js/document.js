function validateVehicleNumber(vehicleNumber) {
    const vehicleRegex = /^[A-Z]{2}\s\d{2}\s[A-Z]{2}\s\d{4}$/;
    return vehicleRegex.test(vehicleNumber);
}

// When the image is clicked, trigger the file input
function setImageInput(button, input, preview) {
    button.addEventListener('click', () => {
        input.click();
    });

    // When an image is selected, display it as the new image
    input.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                preview.style.backgroundImage = `url(${e.target.result})`;  // Set the selected image as the new src
            };

            reader.readAsDataURL(file);  // Read the file and convert it to a data URL
        }
    });
}



const profilePicPreview = document.querySelector("main .right-pane .profile-picture");
const profileInput = document.getElementById("profileInput");
const registrationNumberInput = document.getElementById("registration-number-input");

// convert registration number to uppercase on input
registrationNumberInput.addEventListener('input', function () {
    this.value = this.value.toUpperCase();
});

// select image when profile pic clicked
setImageInput(profilePicPreview, profileInput, profilePicPreview);

// select image with license is clicked
const inputBox = document.querySelector("main .right-pane .input");
let button = inputBox.querySelector(".button");
let preview = inputBox.querySelector(".preview");
let input = inputBox.querySelector(".input");

setImageInput(button, input, preview);

// set driver details from session storage
const driverName = document.getElementById("driver-name");
const driverPhone = document.getElementById("driver-phone");
const driverEmail = document.getElementById("driver-email");

driverName.textContent = sessionStorage.getItem("name");
driverPhone.textContent = `Phone: ${sessionStorage.getItem("phone")}`;
driverEmail.textContent = `Email: ${sessionStorage.getItem("email")}`;