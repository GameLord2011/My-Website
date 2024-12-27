import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadAll } from "@tsparticles/all";
import { BrowserView, MobileView } from 'react-device-detect';

const App: React.FC = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadAll(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container: any): Promise<void> => {
    console.log(container);
  };

  if (init) {
    return (
      <>
        <BrowserView>
          <Suspense fallback={<div className="text-center text-white">Loading...</div>}>
            <Particles id="tsparticles" particlesLoaded={particlesLoaded} url='/assets/json/particles.json' />
            <Router>
              <nav className="dropdown">
                <button className="dropbtn">Pages</button>
                <div className="dropdown-content">
                  <Link to="/">Home</Link>
                  <Link to="/about">About</Link>
                  <Link to="/contact">Contact</Link>
                </div>
              </nav>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </Router>
            <div className='attribs'>
              <a href='https://github-readme-stats.vercel.app'>
                <img src='https://github-readme-stats.vercel.app/api?username=GameLord2011&theme=shadow_green&show_icons=true&rank_icon=github' alt="Stats" />
              </a>
            </div>
            <a href="http://s05.flagcounter.com/more/xU6">
              <img className="Flag_cntr" src="https://s05.flagcounter.com/count2_US/xU6/bg_000000/txt_044002/border_044002/columns_2/maxflags_20/viewers_0/labels_1/pageviews_1/flags_0/percent_0/" alt="Flag Counter" />
            </a>
          </Suspense>
        </BrowserView>
        <MobileView>
          <Suspense fallback={<div className="text-center text-white">Loading...</div>}>
            <Particles id="tsparticles" particlesLoaded={particlesLoaded} url='/assets/json/particles.json' />
            <Router>
              <nav className="dropdown">
                <button className="dropbtn">Pages</button>
                <div className="dropdown-content">
                  <Link to="/">Home</Link>
                  <Link to="/about">About</Link>
                  <Link to="/contact">Contact</Link>
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
  return null;
}

export default App;