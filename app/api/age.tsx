import React from "react";

interface AgeProps {
    Impress_Da_Girls_Mode: boolean;
    DOB: string;
    Age_You_Started_Programming_This_Website: number;
}

const Age: React.FC<AgeProps> = ({ Impress_Da_Girls_Mode, DOB, Age_You_Started_Programming_This_Website }) => {
    const birthDate = new Date(DOB);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (Impress_Da_Girls_Mode) {
        age++;
    }

    let message = "";
    if (age <= 0) {
        message = "Wait how are you visiting this site, I'm not even born yet!?!";
    } else if (age >= 1 && age < Age_You_Started_Programming_This_Website) {
        message = "Wait how are you visiting this site, I haven't programmed it yet!?!";
    } else {
        message = `Contrary to what (I Think) you (might have) thought, I am in fact ${age} years old.`;
    }

    console.log(message);

    return (<>{age}</>);
};

export default Age;