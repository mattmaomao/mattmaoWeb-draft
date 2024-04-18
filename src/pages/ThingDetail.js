import { useState, useEffect, useInsertionEffect } from "react";
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

import "../styles/ThingDetail.css";

export function ThingDetail({ db }) {
  const { itemID } = useParams();
  const { itemType } = useParams();
  const [item, setItem] = useState();

  // fetch single data of this product
  const docRef = doc(db, itemType, itemID);
  useEffect(() => {
    getDoc(docRef).then((doc) => {
      setItem(doc.data());
    });
  }, []);

  useEffect(() => {
    console.log(item);
  }, item);

  return (
    <>
      <Header />

      {/* content container display selected section */}
      <div className="content-container" id="content-container">
        <p>detail of this thing</p>
        <div>{item?.description}</div>
      </div>

      {/* footer */}
      <Footer />
    </>
  );
}
