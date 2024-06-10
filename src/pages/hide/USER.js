import { useState, useRef, useEffect } from "react";
import { Popup } from "reactjs-popup";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
} from "firebase/auth";

import { db, auth } from "../../index";
import { UserSignInUpForm } from "../../components/user/UserSignInUpForm";
import { UserInfo } from "../../components/user/UserInfo";
import "../../styles/user/USER.css";

export function USER() {
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
    }, 2000);
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
    submitUser(userData);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUserState("Sign Out");
    });
  }, [auth]);

  // Reset the form inputs
  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPw("");
  };

  const submitUser = async (userData) => {
    switch (userState) {
      case "Sign In":
        if (userData.username === "" || userData.pw === "") {
          showPopup(popupInvalid, "Invalid Input!");
          return;
        }

        // get email with username input
        const q = query(
          collection(db, "Users"),
          where("username", "==", userData.username)
        );
        const snapshot = await getDocs(q);
        var item;
        snapshot.forEach((doc) => {
          item = doc.data();
        });

        signInWithEmailAndPassword(auth, item.email, userData.pw)
          .then((cred) => {
            if (cred.user.emailVerified) {
              showPopup(popupSuccess, "sign up success");
              // Reset the form inputs
              resetForm();
            } else {
              signOut(auth);
              showPopup(popupInvalid, "please verfy your email first!");
              setUserState("Sign In");
            }
          })
          .catch((e) => {
            showPopup(popupInvalid, e.message);
          });

        break;

      case "Sign Out":
        signOut(auth)
          .then(() => {
            showPopup(popupSuccess, "sign out success");
            // Reset the form inputs
            resetForm();

            setUserState("Sign In");
          })
          .catch((e) => {
            showPopup(popupInvalid, e.message);
          });
        break;

      // disabled
      case "Sign Up":
        // if (
        //   userData.username === "" ||
        //   userData.email === "" ||
        //   userData.pw === ""
        // ) {
        //   showPopup(popupInvalid, "Invalid Input!");
        //   return;
        // }
        // createUserWithEmailAndPassword(auth, userData.email, userData.pw)
        //   .then((cred) => {
        //     // set diaplay name as username
        //     cred.user.displayName = userData.username;
        //     // add user to Users collection
        //     const itemRef = doc(db, "Users", cred.user.uid);
        //     setDoc(
        //       itemRef,
        //       {
        //         username: userData.username,
        //         email: cred.user.email,
        //         frd: "normal"
        //       },
        //       { merge: true }
        //     ).catch((e) => {
        //       showPopup(popupInvalid, e.message);
        //     });

        //     showPopup(popupSuccess, "sign up success");

        //     // ask new user to verify email
        //     sendEmailVerification(cred.user)
        //       .then(() => {
        //         showPopup(popupSuccess, "please verify your email");
        //         signOut(auth);
        //       })
        //       .catch((e) => {
        //         showPopup(popupInvalid, e.message);
        //       });

        //     // Reset the form inputs
        //     resetForm();

        //     setUserState("Sign In");
        //   })
        //   .catch((e) => {
        //     showPopup(popupInvalid, e.message);
        //   });
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
        {userState === "Sign Out" ? (
          <>
            <UserInfo />
          </>
        ) : (
          <UserSignInUpForm
            userState={userState}
            setUserState={setUserState}
            username={username}
            email={email}
            pw={pw}
            handleUsernameChange={handleUsernameChange}
            handleEmailChange={handleEmailChange}
            handlePasswordChange={handlePasswordChange}
          />
        )}
        {/* submit button */}
        <div className="submitBtn">
          <button type="submit" onClick={handleSubmitUserData}>
            {userState}
          </button>
        </div>
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
