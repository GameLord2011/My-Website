const birthDate = new Date('2011-09-23');
const today = new Date();

// Calculate the difference in years
let age = today.getFullYear() - birthDate.getFullYear();

// Adjust if the birthday hasn't occurred yet this year
const monthDiff = today.getMonth() - birthDate.getMonth();
if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
};
document.getElementById("age").innerHTML = age;