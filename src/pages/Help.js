import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../index";

export function Help() {
  // debug
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user ? "bruh" : "bruh buhr");
    });
  }, []);

  return (
    <>
      {/* content container display selected section */}
      <div className="content-container" id="content-container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "16px",
            fontSize: "20px",
            rowGap: "16px",
          }}>
          <p>find any bug?</p>
          <p>contact me.</p>
          <p>dun know how to contact me?</p>
          <p>well... idk too</p>
        </div>
      </div>
    </>
  );
}
