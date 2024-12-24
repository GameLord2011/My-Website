import React from 'react';

//Definily a stupid idea... eh, what the heck

function Age({ Impress_Da_Girls_Mode, DOB , Age_You_Started_Programming_This_Website}){
  const birthDate = new Date(DOB);
  const today = new Date();

  // Calculate the difference in years
  let age = today.getFullYear() - birthDate.getFullYear();

  // Adjust if the birthday hasn't occurred yet this year
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  };

  if(Impress_Da_Girls_Mode === true){
    age++;
  }

  // Little easter egg for the devs @B-)
  if (age <= 0){
    console.log("Wait how are you visiting this site, I'm not even born yet!?!");
  }
  else if (age >= 1 && age < Age_You_Started_Programming_This_Website){
    console.log("Wait how are you visiting this site, I haven't programmed it yet!?!");
  }
  else{
    console.log("Contarary to what (I Think) you (might have) thought, I am in fact " + age + " years old.");
  }
  return(
    <b>
      {age}
    </b>
  )
}

function Home() {
  return (
    <>
      <div className="center_panel">
            <h1>
                I'm <b className="name">@GameLord2011</b>
            </h1>
      </div>
      <div className="center_panel_mn">
            <p>I am a <Age Impress_Da_Girls_Mode={false} DOB='2011-09-23' Age_You_Started_Programming_This_Website={13} /> year old ameture programmer.</p>
            <p>I program in:</p>
            <ul>
                <li>C</li>
                <li>C++</li>
                <li>C#</li>
                <li>Js</li>
                <li>Html</li>
                <li>Css</li>
                <li>Bash</li>
                <li>Batch</li>
                <li>Powershell Script</li>
                <li>Python</li>
                <li>Hlsl</li>
                <li>Json</li>
            </ul>
      </div>
    </>
  );
}

export default Home;
