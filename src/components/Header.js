import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getCurrThing, setCurrThing } from "./GlobalVarible";
import { SecretInput } from "../components/SecretInput";

export function Header() {
  //set content container height
  useEffect(() => {
    const bannerHeight = document.getElementById("banner").offsetHeight;
    const navHeight = document.getElementById("nav-bar").offsetHeight;
    const footerHeight = document.getElementById("footer").offsetHeight;
    const minHeight =
      window.innerHeight - bannerHeight - navHeight - footerHeight;

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
    setCurrThing(title);
  }

  useEffect(() => {
    const ThingsTab = document.getElementById("Things");
    ThingsTab.innerText =
      getCurrThing() === "" ? "Things" : "Things => " + getCurrThing();
  }, [getCurrThing()]);

  const navigate = useNavigate();

  // change content page component
  function changeContent(content) {
    setCurrThing("");
    switch (content) {
      case "/":
        navigate("/mattmaoWeb");
        break;
      case "/Drawings":
        navigate("/mattmaoWeb/Drawings");
        break;
      case "/Games":
        navigate("/mattmaoWeb/Games");
        break;
      case "/Stories":
        navigate("/mattmaoWeb/Stories");
        break;
      case "/DevLogs":
        navigate("/mattmaoWeb/DevLogs");
        break;
      case "/ThingDetail":
        navigate("/mattmaoWeb/ThingDetail");
        break;
      case "/Help":
        navigate("/mattmaoWeb/Help");
        break;
      case "/About":
        navigate("/mattmaoWeb/About");
        break;
      case "/Database":
        navigate("/mattmaoWeb/Database");
        break;
      default:
        break;
    }
  }

  // open database
  const openDBFunc = () => {
    changeContent("/Database");
  };
  const openDB = SecretInput(process.env.REACT_APP_FB_INPUTKEY, openDBFunc);
  const closeDBFunc = () => {
    changeContent("/");
  };
  const closeDB = SecretInput("byedatabase", closeDBFunc);

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
      </div>

      {/* nav bar */}
      <div className="nav-bar" id="nav-bar">
        <button
          className="nav-item button"
          onClick={() => {
            changeContent("/");
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
                    changeContent("/Drawings");
                    changeTitle("Drawings");
                  }}>
                  Drawings
                </button>
              </li>
              <li>
                <button
                  className="button"
                  onClick={() => {
                    changeContent("/Games");
                    changeTitle("Games");
                  }}>
                  Games
                </button>
              </li>
              <li>
                <button
                  className="button"
                  onClick={() => {
                    changeContent("/Stories");
                    changeTitle("Stories");
                  }}>
                  Stories
                </button>
              </li>
              <li>
                <button
                  className="button"
                  onClick={() => {
                    changeContent("/DevLogs");
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
            changeContent("/About");
            changeTitle("");
          }}>
          About
        </button>

        <button
          className="nav-item button"
          onClick={() => {
            changeContent("/Help");
            changeTitle("");
          }}>
          Help
        </button>
      </div>
    </>
  );
}
