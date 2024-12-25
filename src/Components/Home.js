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
    <>
      {age}
    </>
  )
}

function Home() {
  return (
    <>
      <div style={{
        position: "absolute",
        width: '70%',
        height: '20%',
        background: 'rgba(0, 0, 0, 0)',
        top: '25%',
        left: '21%',
        margin: '-110px 0 0 -100px',
        padding: '20px',
        borderRadius: '4px',
        borderStyle: 'dotted',
        borderColor: 'darkgreen',
        boxSizing: 'border-box',
        textAlign: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        alignContent: 'center'
      }}>
            <h1 style={{
              textAlign: 'center'
            }}>
                I'm <b style={{
                  background: 'radial-gradient(circle, rgba(255,0,0,1) 0%, rgba(255,165,0,1) 16%, rgba(255,255,0,1) 32%, rgba(0,255,0,1) 48%, rgba(0,0,255,1) 64%, rgba(75,0,130,1) 80%, rgba(128,0,128,1) 100%)',
                  color: '#000000',
                  borderStyle: 'double',
                  zIndex: 0
                }}>@GameLord2011</b>
            </h1>
      </div>
      <div style={{
        position: 'absolute',
        width: '25%',
        height: '20%',
        background: 'rgba(0, 0, 0, 0)',
        top: '45%',
        left: '43%',
        margin: '-110px 0 0 -100px',
        padding: '20px',
        borderRadius: '4px',
        boxSizing: 'border-box',
        textAlign: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        alignContent: 'center'
      }}>
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
