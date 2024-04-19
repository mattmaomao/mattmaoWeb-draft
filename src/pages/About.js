import React from "react";
import { useEffect, useState } from "react";
import { getDocs } from "firebase/firestore";

import RefreshIcon from "../icons/refresh.svg";
import "../styles/About.css";

export function About({ colRef }) {
  const [quote, setQuote] = useState("");
  const [quoteContent, setQuoteContent] = useState("");

  useEffect(() => {
    anotherQuote();
  }, [colRef]);

  // get random quote from collection
  const anotherQuote = () => {
    getDocs(colRef).then((snap) => {
      const quotes = snap.docs;
      const rand = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[rand].data());
    });
  };

  // set format of next line
  useEffect(() => {
    if (quote.content) {
      const temp = quote.content.split("\\n");
      const str = temp.map((line, index) => (
        <p className="content" key={index}>
          {line}
          <br />
        </p>
      ));
      setQuoteContent(str);
    }
  }, [quote]);

  return (
    <>
      {/* content container display selected section */}
      <div className="content-container" id="content-container">
        <div className="short-info">
          <table className="text-container">
            <tbody>
              <tr>
                <th>Name</th>
                <td>Matt</td>
              </tr>
              <tr>
                <th>Skill</th>
                <td>make random thing</td>
              </tr>
              <tr>
                <th>Interest</th>
                <td>make thing</td>
              </tr>
              <tr>
                <th>Love</th>
                <td>cat, girl, cat girl</td>
              </tr>
            </tbody>
          </table>
          <div className="img-container">
            <img src="./img/chomusuke.png" alt="bruh my img :(" />
          </div>
        </div>
        {/* quote of the day */}
        <div className="quote-of-the-day">
          <div className="quote-title">
            <h3>Quote of the day:</h3>
            <button onClick={() => anotherQuote()}><img src={RefreshIcon} alt="" /></button>
          </div>

          {quoteContent}
          <p className="author">- {quote.author}</p>
        </div>
        <div className="newQuote">
          <p>
            Want to show your own quote?{" "}
            <a
              href="https://forms.gle/NX57rRUukQGc5L3F6"
              rel="noreferrer"
              target="_blank">
              <span htmlFor="showForm">Submit one in google form!</span>
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
