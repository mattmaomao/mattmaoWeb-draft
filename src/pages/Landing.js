import { useEffect, useState } from "react";
import { collection } from "firebase/firestore";

import { Home } from "./Home";
import { Things } from "./Things";
import { About } from "./About";
import { Help } from "./Help";

import "../styles/landing.css";

export function Landing({ db }) {
  const [contentPage, setContentPage] = useState(<Home />);

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
  // change the title of Things in navbar
  function changeTitle(title) {
    const ThingsTab = document.getElementById("Things");
    ThingsTab.innerText = title === "" ? "Things" : "Things => " + title;
  }

  // change content page component
  function changeContent(content) {
    let com = <Home />;
    switch (content) {
      case "/":
        com = <Home />;
        break;
      case "/Draw":
        com = <Things colRef={collection(db, "Drawings")} />;
        break;
      case "/Game":
        com = <Things colRef={collection(db, "Games")} />;
        break;
      case "/Story":
        com = <Things colRef={collection(db, "Story")} />;
        break;
      case "/DevLogs":
        com = <Things colRef={collection(db, "DevLogs")} />;
        break;
      case "/Help":
        com = <Help />;
        break;
      case "/About":
        com = <About colRef={collection(db, "Quotes")}/>;
        break;
      default:
        com = <Home />;
        break;
    }
    setContentPage(com);
  }

  return (
    <>
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
        <button
          className="nav-item button"
          onClick={() => {
            changeTitle("");
            changeContent("/");
          }}>
          Home
        </button>

        {/* make dorp bar */}
        <div className="nav-item dropdown dropdown1">
          <p id="Things">Things</p>
          <div className="dropdown-content">
            <ul>
              <li>
                <button
                  className="button"
                  onClick={() => {
                    changeTitle("Draw");
                    changeContent("/Draw");
                  }}>
                  Draw
                </button>
              </li>
              <li>
                <button
                  className="button"
                  onClick={() => {
                    changeTitle("Game");
                    changeContent("/Game");
                  }}>
                  Game
                </button>
              </li>
              <li>
                <button
                  className="button"
                  onClick={() => {
                    changeTitle("Story");
                    changeContent("/Story");
                  }}>
                  Story
                </button>
              </li>
              <li>
                <button
                  className="button"
                  onClick={() => {
                    changeTitle("Dev Logs");
                    changeContent("/DevLogs");
                  }}>
                  Dev Logs
                </button>
              </li>
            </ul>
          </div>
        </div>

        <button
          className="nav-item button"
          onClick={() => {
            changeTitle("");
            changeContent("/About");
          }}>
          About
        </button>

        <button
          className="nav-item button"
          onClick={() => {
            changeTitle("");
            changeContent("/Help");
          }}>
          Help
        </button>
      </div>

      {/* content container display selected section */}
      <div className="content-container" id="content-container">
        {/* get page accordingly */}
        {contentPage}
      </div>

      {/* footer */}
      <footer id="footer">© Made by Matt</footer>
    </>
  );
}
