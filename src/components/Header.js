import { useEffect, useState } from "react";

import { SecretInput } from "../components/SecretInput";
import { auth } from "../index";

export function Header({ setPage }) {
  const [currThing, setCurrThing] = useState("");
  //set content container height
  useEffect(() => {
    const bannerHeight = document.getElementById("banner").offsetHeight;
    const navHeight = document.getElementById("nav-bar").offsetHeight;
    const footerHeight = document.getElementById("footer").offsetHeight;
    const minHeight =
      window.innerHeight - bannerHeight - navHeight - footerHeight;

    const container = document.getElementById("content-container");
    container.style.minHeight = minHeight.toString() + "px";
  });
  // set nav bar z-index to top
  useEffect(() => {
    const navBar = document.getElementById("nav-bar");
    navBar.style.zIndex = "1";
  });

  // change the title of Things in navbar
  function changeTitle(title) {
    setCurrThing(title);
  }
  useEffect(() => {
    const ThingsTab = document.getElementById("Things");
    ThingsTab.innerText =
      currThing === "" ? "Things" : "Things => " + currThing;
  }, [currThing]);

  // change content page component
  function changeContent(content) {
    setCurrThing("");
    setPage(content);
  }

  // secret---------------------------------------
  // open database
  const openDBPage = () => {
    changeContent("Database");
  };
  const openDB = SecretInput(process.env.REACT_APP_FB_INPUTKEY, openDBPage);
  const goHome = () => {
    changeContent("Home");
  };
  const closeDB = SecretInput("gohome", goHome);

  // manage user
  const openUserPage = () => {
    changeContent("User");
  };
  const openUser = SecretInput("gouser", openUserPage);
  // secret---------------------------------------

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

      {/* banner */}
      <div className="banner" id="banner">
        banner ~put image here~
        {/* sneaky button for user to login */}
        <button
          className="signin-smolbtn"
          id="user"
          onClick={() => {
            setPage("User");
          }}>
          sign in?
        </button>
      </div>

      {/* nav bar */}
      <div className="nav-bar" id="nav-bar">
        <button
          className="nav-item button"
          onClick={() => {
            changeContent("Home");
            changeTitle("");
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
                    changeContent("Drawings");
                    changeTitle("Drawings");
                  }}>
                  Drawings
                </button>
              </li>
              <li>
                <button
                  className="button"
                  onClick={() => {
                    changeContent("Games");
                    changeTitle("Games");
                  }}>
                  Games
                </button>
              </li>
              <li>
                <button
                  className="button"
                  onClick={() => {
                    changeContent("Stories");
                    changeTitle("Stories");
                  }}>
                  Stories
                </button>
              </li>
              <li>
                <button
                  className="button"
                  onClick={() => {
                    changeContent("DevLogs");
                    changeTitle("Dev Logs");
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
            changeContent("About");
            changeTitle("");
          }}>
          About
        </button>

        <button
          className="nav-item button"
          onClick={() => {
            changeContent("Help");
            changeTitle("");
          }}>
          Help
        </button>
      </div>
    </>
  );
}
