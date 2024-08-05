import { useEffect, useState } from "react";
import "../styles/home.css";

export function Home() {
  // animation
  const [showText1, setShowText1] = useState(false);
  const [showText2, setShowText2] = useState(false);
  const [showText3, setShowText3] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowText1(true);
    }, 800);
    setTimeout(() => {
      setShowText2(true);
    }, 1600);
    setTimeout(() => {
      setShowText3(true);
    }, 2400);
    setTimeout(() => {
      setShowText1(false);
      setShowText2(false);
      setShowText3(false);
    }, 3400);
  }, []);

  return (
    <>
      {/* content container display selected section */}
      <div className="content-container" id="content-container">
        {/* get page accordingly */}
        <p className={(showText1 ? "text HOME_titleText show" : "text HOME_titleText")}>WELCOME</p>

        <div className={(showText2 ? "text HOME_titleText show" : "text HOME_titleText")}>TO</div>
        <div className={(showText3 ? "text HOME_titleText show" : "text HOME_titleText")}>My Website</div>
      </div>
    </>
  );
}
