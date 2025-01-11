import Age from "@/app/api/age";

export default function Home() {
  return (
    <main className="flex">
      <div className="w-2/3 h-1/5 border-r-4 border-dotted border-Gween-300 dark:border-Gween-600 box-border content-center self-center text-center top-1/4 fixed right-1/2">
        <p>
          I&#39;m <b className="bg-rainbow text-black font-serif border-black border-double border-spacing-4">&#64;GameLord2011</b>
        </p>	
      </div>
      <div>
            <p>I am a <Age Impress_Da_Girls_Mode={false} DOB='2011-09-23' DYSTW='2024-10-30' /> year old ameture programmer.</p>
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
    </main>
  );
}
