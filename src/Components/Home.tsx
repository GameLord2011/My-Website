import React from 'react';

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

  if (age <= 0) {
    console.log("Wait how are you visiting this site, I'm not even born yet!?!");
  } else if (age >= 1 && age < Age_You_Started_Programming_This_Website) {
    console.log("Wait how are you visiting this site, I haven't programmed it yet!?!");
  } else {
    console.log(`Contrary to what (I Think) you (might have) thought, I am in fact ${age} years old.`);
  }

  return <>{age}</>;
}

const Home: React.FC = () => {
  return (
    <div>
      <div className="absolute w-[70%] h-[20%] bg-transparent top-[25%] left-[21%] mt-[-110px] ml-[-100px] p-5 rounded border-dotted border-darkgreen box-border text-center">
        <h1 className="text-center">
          I'm <b className="bg-gradient-radial from-red-500 via-yellow-400 to-purple-800 text-black border-double">GameLord2011</b>
        </h1>
      </div>
      <div className="absolute w-[25%] h-[20%] bg-transparent top-[45%] left-[43%] mt-[-110px] ml-[-100px] p-5 rounded box-border text-center">
        {/* Additional content here */}
      </div>
    </div>
  );
}

export default Home;