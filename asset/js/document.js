// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getDatabase, ref, set, child, get, update, remove } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js";
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
var database = getDatabase();
var dataRef = ref(database);


async function uploadProfileImage(ImgToUpload, licenseFile, name) {
    const metaData = {
        contentType: ImgToUpload.type
    }

    const storage = getStorage();

    const storageRef = sRef(storage, 'profilePicture' + "/" + name);

    const UploadTask = uploadBytesResumable(storageRef, ImgToUpload, metaData);

    UploadTask.on('state-changed', (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    },
        (error) => {
            messageAlert("Error in Upload", "Could not upload images", false);
            loader.style.display = 'none';
            continueButton.style.display = 'block';
        },
        () => {
            getDownloadURL(UploadTask.snapshot.ref).then((getDownloadURL) => {
                profileLink = getDownloadURL;
                uploadLicenseImage(licenseFile, name, getDownloadURL);
            });
        });
}

async function uploadLicenseImage(ImgToUpload, name, profileURL) {
    const metaData = {
        contentType: ImgToUpload.type
    }

    const storage = getStorage();

    const storageRef = sRef(storage, 'license' + "/" + name);

    const UploadTask = uploadBytesResumable(storageRef, ImgToUpload, metaData);

    UploadTask.on('state-changed', (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    },
        (error) => {
            messageAlert("Error in Upload", "Could not upload images", false);
            loader.style.display = 'none';
            continueButton.style.display = 'block';
        },
        () => {
            getDownloadURL(UploadTask.snapshot.ref).then((getDownloadURL) => {
                licenseLink = getDownloadURL;
                let name = localStorage.getItem('name');
                let email = localStorage.getItem('email');
                let phoneNumber = localStorage.getItem('phone');
                let password = localStorage.getItem('password');
                set(ref(realdb, 'driver/' + email.replace(/[.#$[\]]/g, '')), {
                    Name: name,
                    Email: email,
                    Password: password,
                    Phone: phoneNumber,
                    ProfilePic: profileURL,
                    LicensePic: licenseLink,
                    RegistrationNumber: registrationNumber,
                    Color: vehicleColor,
                    Company: vehicleCompany,
                    Model: vehicleModel
                }).then(() => {
                    loader.style.display = 'none';
                    localStorage.setItem('profilePic', profileURL);
                    localStorage.setItem('licensePic', licenseLink);
                    localStorage.setItem('registrationNumber', registrationNumber);
                    localStorage.setItem("color", vehicleColor);
                    localStorage.setItem('company', vehicleCompany);
                    localStorage.setItem('model', vehicleModel);
                    messageAlert("Successful", "Sign Up successful", true);
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 3000);
                }).catch((error) => {
                    loader.style.display = 'none';
                    continueButton.style.display = 'block';
                    messageAlert('Error adding data to the database', errorMessage, false);
                });
            });
        });
}

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

function validateVehicleNumber(vehicleNumber) {
    const vehicleRegex = /^[A-Z]{2}\s\d{2}\s[A-Z]{2}\s\d{4}$/;
    return vehicleRegex.test(vehicleNumber);
}

// When the image is clicked, trigger the file input
function setImageInput(button, input, preview, callback) {
    button.addEventListener('click', () => {
        input.click();
    });

    input.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                preview.style.backgroundImage = `url(${e.target.result})`;
                if (callback) {
                    callback(file);  // Pass the selected file to the callback function
                }
            };

            reader.readAsDataURL(file);  // Read the file and convert it to a data URL
        }
    });
}


let profileLink;
let licenseLink;
const profilePicPreview = document.querySelector("main .right-pane .profile-picture");
const profileInput = document.getElementById("profileInput");
const registrationNumberInput = document.getElementById("registration-number-input");
const vehicleColorInput = document.getElementById("vehicle-color-input");
const vehicleCompanyInput = document.getElementById("vehicle-company-input");
const vehicleModelInput = document.getElementById("vehicle-model-input");

// convert registration number to uppercase on input
registrationNumberInput.addEventListener('input', function () {
    this.value = this.value.toUpperCase();
});

// select image when profile pic clicked
let profileFile;
setImageInput(profilePicPreview, profileInput, profilePicPreview, (selectedImage) => {
    profileFile = selectedImage;
});

// select image with license is clicked
const inputBox = document.querySelector("main .right-pane .input");
let button = inputBox.querySelector(".button");
let preview = inputBox.querySelector(".preview");
let input = inputBox.querySelector(".input");
let licenseFile;

setImageInput(button, input, preview, (selectedImage) => {
    licenseFile = selectedImage;
});

// set driver details from session storage
const driverName = document.getElementById("driver-name");
const driverPhone = document.getElementById("driver-phone");
const driverEmail = document.getElementById("driver-email");

driverName.textContent = localStorage.getItem("name");
driverPhone.textContent = `Phone: ${localStorage.getItem("phone")}`;
driverEmail.textContent = `Email: ${localStorage.getItem("email")}`;

// continue button
let registrationNumber, vehicleColor, vehicleCompany, vehicleModel;
const continueButton = document.querySelector("main .right-pane button");
const loader = document.querySelector(".loader");
continueButton.onclick = () => {
    registrationNumber = registrationNumberInput.value;
    vehicleColor = vehicleColorInput.value;
    vehicleCompany = vehicleCompanyInput.value;
    vehicleModel = vehicleModelInput.value;
    if (profileFile == undefined) {
        messageAlert("Profile Picture", "Select a profile picture", false);
    } else if (validateVehicleNumber(registrationNumber) == false) {
        messageAlert("Registration Number", "Enter a valid registration number", false);
    } else if (vehicleColor == '') {
        messageAlert("Vehicle Color", "Enter a valid color name", false);
    } else if (vehicleCompany == 'choose') {
        messageAlert("Vehicle Company", "Choose a company name", false);
    } else if (vehicleModel == '') {
        messageAlert("Vehicle Model", "Enter a valid model name", false);
    } else if (licenseFile == undefined) {
        messageAlert("Driving License", "Select a license image", false);
    } else {
        continueButton.style.display = 'none';
        loader.style.display = 'block';
        uploadProfileImage(profileFile, licenseFile, `${localStorage.getItem('email')}.jpg`);
    }
}