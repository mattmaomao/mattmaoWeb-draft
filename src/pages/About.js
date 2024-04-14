import React from "react";
import { useEffect, useRef, useState } from "react";
import { getDocs } from "firebase/firestore";

import "../styles/About.css";

export function About({ colRef }) {
  const [quote, setQuote] = useState("");
  useEffect(() => {
    getDocs(colRef).then((snap) => {
      const quotes = snap.docs;
      const rand = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[rand].data());
    });
  }, [colRef]);

  // set format of next line
  const getQuote = () => {
    if (quote.content) {
      const temp = quote.content.split("\\n");
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
            <tr>
              <th>Length</th>
              <td>6', 30cm</td>
            </tr>
          </tbody>
        </table>
        <div className="img-container">
          <img src="./img/chomusuke.png" alt="bruh my img :(" />
        </div>
      </div>
      {/* quote of the day */}
      <div className="quote-of-the-day">
        <h3>Quote of the day:</h3>
        <p className="content">{getQuote()}</p>
        <p className="author">- {quote.author}</p>
      </div>
      <div className="newQuote">
        <input type="checkbox" id="showForm" />
        <p>
          Want to show your own quote?{" "}
          <label htmlFor="showForm">Click me</label>
        </p>

        <iframe
          title="google form"
          src="https://docs.google.com/forms/d/e/1FAIpQLSc1ezBnG5uCTn4JmX8Ra9Kdy_rcwngxcYYk6CEvQseH2vX2ow/viewform?embedded=true"
          width="640"
          height="500">
          Loading...
        </iframe>
      </div>
    </>
  );
}
