import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import { db, auth } from "../../index";

export function UserInfo() {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getDoc(doc(db, "Users", user.uid)).then((doc) => {
          setUserInfo(doc.data());
        });
      } else {
        setUserInfo(null);
      }
    });
  }, []);

  return (
    <>
      <table className="USER_Table">
        <tbody>
          {/* user name */}
          <tr>
            <th>username: </th>
            <td>{userInfo?.username}</td>
          </tr>
          {/* email */}
          <tr>
            <th>email: </th>
            <td>{userInfo?.email}</td>
          </tr>
          {/* frd? */}
          <tr>
            <th>frd? </th>
            <td>{userInfo?.frd}</td>
          </tr>
          {/* email */}
          <tr>
            <th>email:</th>
            <td>{userInfo?.email}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
