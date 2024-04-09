import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { collection } from "firebase/firestore";

import { Home } from "./Home";
import { Things } from "./Things";
import { About } from "./About";
import { Help } from "./Help";

import "../styles/landing.css";

export function Landing({ db }) {
  //set content container height
  useEffect(() => {
    const headerHeight = document.getElementById("header").offsetHeight;
    const navHeight = document.getElementById("nav-bar").offsetHeight;
    const footerHeight = document.getElementById("footer").offsetHeight;
    const minHeight =
      window.innerHeight - headerHeight - navHeight - footerHeight;

    const container = document.getElementById("content-container");
    container.style.minHeight = minHeight.toString() + "px";
  }, []);
  // set nav bar z-index to top
  useEffect(() => {
    const navBar = document.getElementById("nav-bar");
    navBar.style.zIndex = "1";
  });

  function changeTitle(title) {
    const ThingsTab = document.getElementById("Things");
    ThingsTab.innerText = title === "" ? "Things" : "Things => " + title;
  }

  console.log(db);

  return (
    <>
      <Router>
        {/* setting button */}
        <div className="setting">
          {/* later */}
          {/* night mode toggle */}
          <label className="dark-switch">
            <input id="dark-slider" type="checkbox" />
            <span className="dark-slider"></span>
          </label>
          {/* white space */}
          &nbsp;
        </div>

        {/* header */}
        <div className="header" id="header">
          header ~put image here~
        </div>

        {/* nav bar */}
        <div className="nav-bar" id="nav-bar">
          <Link
            className="nav-item button"
            to="mattmaoWeb/"
            onClick={() => changeTitle("")}>
            <button>Home</button>
          </Link>

          {/* make dorp bar */}
          <div className="nav-item dropdown dropdown1">
            <p id="Things">Things</p>
            <div className="dropdown-content">
              <ul>
                <li>
                  <Link
                    className="button"
                    to="mattmaoWeb/Draw"
                    onClick={() => changeTitle("Draw")}>
                    <button>Draw</button>
                  </Link>
                </li>
                <li>
                  <Link
                    className="button"
                    to="mattmaoWeb/Game"
                    onClick={() => changeTitle("Game")}>
                    <button>Game</button>
                  </Link>
                </li>
                <li>
                  <Link
                    className="button"
                    to="mattmaoWeb/Story"
                    onClick={() => changeTitle("Story")}>
                    <button>Story</button>
                  </Link>
                </li>
                <li>
                  <Link
                    className="button"
                    to="mattmaoWeb/Devlogs"
                    onClick={() => changeTitle("Dev Logs")}>
                    <button>Dev Logs</button>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <Link
            className="nav-item button"
            to="mattmaoWeb/About"
            onClick={() => changeTitle("")}>
            <button>About</button>
          </Link>

          <Link
            className="nav-item button"
            to="mattmaoWeb/Help"
            onClick={() => changeTitle("")}>
            <button>Help</button>
          </Link>
        </div>
        
        {/* content container display selected section */}
        <div className="content-container" id="content-container">
          {/* get page accordingly */}

          <Routes>
            <Route exact path="mattmaoWeb/" element={<Home />}></Route>

            <Route
              path="mattmaoWeb/Draw"
              element={<Things colRef={collection(db, "Drawings")} />}></Route>
            <Route
              path="mattmaoWeb/Game"
              element={<Things colRef={collection(db, "Games")} />}></Route>
            <Route
              path="mattmaoWeb/Story"
              element={<Things colRef={collection(db, "Drawings")} />}></Route>
            <Route
              path="mattmaoWeb/Devlogs"
              element={<Things colRef={collection(db, "DevLogs")} />}></Route>

            <Route path="mattmaoWeb/Help" element={<Help />}></Route>
            <Route path="mattmaoWeb/About" element={<About />}></Route>
          </Routes>
        </div>

        {/* footer */}
        <footer id="footer">Footer</footer>
      </Router>
    </>
  );
}
