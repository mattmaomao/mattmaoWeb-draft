import { useState, useRef } from "react";
import { Popup } from "reactjs-popup";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

import "../styles/USER.css";

export function USER({ db, auth }) {
  const [userState, setUserState] = useState("Sign Up");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const [popMsg, setPopMsg] = useState("sign in success");
  const popupInvalid = useRef();
  const popupSuccess = useRef();
  // input popup ref, display msg
  const showPopup = (pop, msg) => {
    pop.current.open();
    setTimeout(() => {
      pop.current.close();
    }, 1500);
    setPopMsg(msg);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPw(event.target.value);
  };
  const handleSubmitUserData = (event) => {
    event.preventDefault();

    const userData = {
      username,
      email,
      pw,
    };
    if ((email !== "" && pw !== "") || userState === "Sign Out") {
      submitUser(userData);
    } else {
      showPopup(popupInvalid, "Invalid Input!");
    }
  };

  onAuthStateChanged(auth, (user) => {
    if (user)
      setUserState("Sign Out");
  })

  const submitUser = (userData) => {
    // todo
    switch (userState) {
      case "Sign In":
        signInWithEmailAndPassword(auth, userData.email, userData.pw)
          .then((cred) => {
            showPopup(popupSuccess, "sign up success");
            // Reset the form inputs
            setEmail("");
            setPw("");

            // setUserState("Sign Out");
          })
          .catch((e) => {
            console.log(e);
            showPopup(popupInvalid, "Invalid Input!");
          });

        break;

      case "Sign Out":
        signOut(auth)
          .then(() => {
            showPopup(popupSuccess, "sign out success");
            // Reset the form inputs
            setEmail("");
            setPw("");

            setUserState("Sign In");
          })
          .catch((e) => {
            console.log(e);
          });
        break;

      case "Sign Up":
        createUserWithEmailAndPassword(auth, userData.email, userData.pw)
          .then((cred) => {
            showPopup(popupSuccess, "sign up success");
            // Reset the form inputs
            setEmail("");
            setPw("");

            setUserState("Sign In");
          })
          .catch((e) => {
            console.log(e);
            showPopup(popupInvalid, "Invalid Input!");
          });
        break;

      default:
        break;
    }
  };

  return (
    <>
      {/* content container display selected section */}
      <div className="content-container" id="content-container">
        {/* sign in form */}
        <table className="USER_Table">
          <tbody>
            <tr>
              <th colSpan={2} className="title">
                <button
                  onClick={() => {
                    if (userState !== "Sign Out") setUserState("Sign In");
                  }}>
                  Sign In
                </button>{" "}
                /{" "}
                <button
                  onClick={() => {
                    if (userState !== "Sign Out") setUserState("Sign Up");
                  }}>
                  Sign Up
                </button>
              </th>
            </tr>
            <tr>
              <th>Username:</th>
              <td>
                <input
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </td>
            </tr>
            <tr>
              <th>Email:</th>
              <td>
                <input
                  type="text"
                  placeholder="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </td>
            </tr>
            <tr>
              <th>Password:</th>
              <td>
                <input
                  type="text"
                  placeholder="password"
                  value={pw}
                  onChange={handlePasswordChange}
                />
              </td>
            </tr>
            <tr>
              <th colSpan={2} className="submitBtn">
                <button type="submit" onClick={handleSubmitUserData}>
                  {userState}
                </button>
              </th>
            </tr>
          </tbody>
        </table>
        <Popup ref={popupInvalid} modal>
          {(close) => (
            <div className="popup">
              <p className="failure">{popMsg}</p>
            </div>
          )}
        </Popup>
        <Popup ref={popupSuccess} modal>
          {(close) => (
            <div className="popup">
              <p className="success">{popMsg}</p>
            </div>
          )}
        </Popup>
      </div>
    </>
  );
}
