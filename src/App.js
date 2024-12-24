import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadAll } from "@tsparticles/all";

import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

function App() {

  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      await loadAll(engine);
      //await loadFull(engine);
      //await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  if(init){
    return (
      <>
      <BrowserView>
      <Suspense 
        fallback={
          <div
          style={{textAlign: 'center', color: "#ffffff"}}>
              Loading...
          </div>}
      >
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        url='/assets/json/particles.json'
      />
      <Router>
      <nav>
        <div className="dropdown">
          <button className="dropbtn">
          Pages
          </button>
          <div className="dropdown-content">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      </Router>
      <div
    className='attribs'
    >
      <a href='https://github-readme-stats.vercel.app'><img src='https://github-readme-stats.vercel.app/api?username=GameLord2011&theme=shadow_green&show_icons=true&rank_icon=github' alt="Stats"></img></a>
    </div>
      <a href="http://s05.flagcounter.com/more/xU6"><img className="Flag_cntr" src="https://s05.flagcounter.com/count2_US/xU6/bg_000000/txt_044002/border_044002/columns_2/maxflags_20/viewers_0/labels_1/pageviews_1/flags_0/percent_0/" alt="Flag Counter" border="0"/></a>
      </Suspense>
      </BrowserView>
      <MobileView>
      <Suspense 
        fallback={
          <div
          style={{textAlign: 'center', color: "#ffffff"}}>
              Loading...
          </div>}
      >
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        url='/assets/json/particles.json'
      />
      <Router>
      <nav>
        <div className="dropdown">
          <button className="dropbtn">
          Pages
          </button>
          <div className="dropdown-content">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      </Router>
      </Suspense>
      </MobileView>
      </>
    );
  }

  return (
    <>
      <BrowserView>
      <Suspense 
        fallback={
          <div
          style={{textAlign: 'center', color: "#ffffff"}}>
              Loading...
          </div>}
      >
      <Router>
      <nav>
        <div className="dropdown">
          <button className="dropbtn">
          Pages
          </button>
          <div className="dropdown-content">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      </Router>
      <div
    className='attribs'
    >
      <a href='https://github-readme-stats.vercel.app'><img src='https://github-readme-stats.vercel.app/api?username=GameLord2011&theme=shadow_green&show_icons=true&rank_icon=github' alt="Stats"></img></a>
    </div>
      <a href="http://s05.flagcounter.com/more/xU6"><img className="Flag_cntr" src="https://s05.flagcounter.com/count2_US/xU6/bg_000000/txt_044002/border_044002/columns_2/maxflags_20/viewers_0/labels_1/pageviews_1/flags_0/percent_0/" alt="Flag Counter" border="0"/></a>
      </Suspense>
      </BrowserView>
      <MobileView>
      <Suspense 
        fallback={
          <div
          style={{textAlign: 'center', color: "#ffffff"}}>
              Loading...
          </div>}
      >
      <Router>
      <nav>
        <div className="dropdown">
          <button className="dropbtn">
          Pages
          </button>
          <div className="dropdown-content">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      </Router>
      </Suspense>
      </MobileView>
      </>
  );
}

export default App;
