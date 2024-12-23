import React from 'react';
function Age(dob){
  const birthDate = new Date('2011-09-23');
  const today = new Date();

  // Calculate the difference in years
  let age = today.getFullYear() - birthDate.getFullYear();

  // Adjust if the birthday hasn't occurred yet this year
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  };

  // Little easter egg for the devs @B-)
  if (age <= 0){
    console.log("Wait how are you visiting this site, I'm not even born yet!?!");
  }
  else if (age >= 1 && age <= 12){
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
            <p>I am a <Age /> year old ameture programmer.</p>
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
      <a href="http://s05.flagcounter.com/more/xU6"><img className="Flag_cntr" src="https://s05.flagcounter.com/count2_US/xU6/bg_000000/txt_044002/border_044002/columns_2/maxflags_20/viewers_0/labels_1/pageviews_1/flags_0/percent_0/" alt="Flag Counter" border="0"/></a>
    </>
  );
}

export default Home;
