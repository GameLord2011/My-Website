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

// Little easter egg for the devs @B-)
if (age <= 0){
    console.log("Wait how are you visiting this site, I'm not even born yet!?!");
}
else if (age >= 1 && age <= 12){
    console.log("Wait how are you visiting this site, I haven't programmed it yet!?!");
}
else{
    console.log("Contarary to what (I Think) you thought, I am in fact " + age + " years old.");
}
