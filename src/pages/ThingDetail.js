import React from "react";
import { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";

import "../styles/ThingDetail.css";

export function ThingDetail({ db, itemType, itemID }) {
  const [item, setItem] = useState();

  // fetch single data of this product
  const docRef = doc(db, itemType, itemID);
  useEffect(() => {
    getDoc(docRef).then((doc) => {
      setItem(doc.data());
    });
  }, []);

  // set format of next line
  const getContent = () => {
    if (item?.content) {
      const temp = item.content.split("\\n");
      const str = temp.map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ));
      return str;
    }
  };

  return (
    <>
      {/* content container display selected section */}
      <div className="content-container" id="content-container">
        <div className="detailed">
          <p className="title">{item?.title}</p>
          <p className="date">{item?.date}</p>
          <p className="tag">{item?.tag.map((x) => "#" + x + " ")}</p>
          <p className="description">{item?.description}</p>
          {item?.image && (
            <img className="image" src={"./img/" + item?.image} alt="" />
          )}
          <p className="content">{getContent()}</p>
        </div>
      </div>
    </>
  );
}
