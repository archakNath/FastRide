// set information
const accountType = document.getElementById("account-type");
const profilePic = document.getElementById('profilePic');
const license = document.getElementById('license');
const nameText = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const vehicleDetail = document.querySelector('main .vehicle-details');
const registrationNumber = document.getElementById('registrationNumber');
const vehicleColor = document.getElementById('color');
const vehicleCompany = document.getElementById('company');
const vehicleModel = document.getElementById('model');

accountType.textContent = `Account Type: ${localStorage.getItem("accountType").charAt(0).toUpperCase() + localStorage.getItem("accountType").slice(1)}`;
if(localStorage.getItem("accountType") == 'driver'){
    profilePic.style.display = 'block';
    license.style.display = 'block';
    vehicleDetail.style.display = 'block';
    profilePic.src = localStorage.getItem("profilePic");
    license.href = localStorage.getItem('licensePic')
    registrationNumber.textContent = `Registration Number: ${localStorage.getItem('registrationNumber')}`;
    vehicleColor.textContent = `Color: ${localStorage.getItem('color')}`;
    vehicleCompany.textContent = `Car Company: ${localStorage.getItem('company')}`;
    vehicleModel.textContent = `Car Model: ${localStorage.getItem('model')}`;
}
nameText.textContent = localStorage.getItem("name");
email.textContent = `Email: ${localStorage.getItem("email")}`;
phone.textContent = `Phone: ${localStorage.getItem("phone")}`;

// logout button
const confirmationWindow = document.querySelector(".confirm-window");
const logoutButton = document.querySelector("main button");
const mainLogoutButton = document.querySelector(".confirm-window .logout");
const cancelButton = document.querySelector(".confirm-window .cancel");

logoutButton.onclick = () => {
    confirmationWindow.style.display = 'flex';
}

cancelButton.onclick = () => {
    confirmationWindow.style.display = 'none';
}

mainLogoutButton.onclick = () => {
    localStorage.clear();
    window.location.href = '/';
}