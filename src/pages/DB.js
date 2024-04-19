import { useState, useRef } from "react";
import { Popup } from "reactjs-popup";
import { addDoc, collection } from "firebase/firestore";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import "../styles/DB.css";

export function DB({ db }) {
  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [Ccontent, setCContent] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");
  const [tag, setTags] = useState("");

  const [author, setAuthor] = useState("");
  const [Qcontent, setQContent] = useState("");

  const popupInvalid = useRef();
  const popupSuccess = useRef();

  const handleTopicChange = (event) => {
    setTopic(event.target.value);
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleCContentChange = (event) => {
    setCContent(event.target.value);
  };
  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };
  const handleImageChange = (event) => {
    setImage(event.target.value);
  };
  const handleTagsChange = (event) => {
    setTags(event.target.value);
  };
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };
  const handleQContentChange = (event) => {
    setQContent(event.target.value);
  };

  const handleSubmitContent = (event) => {
    event.preventDefault();

    const formData = {
      title,
      date,
      description,
      content: Ccontent,
      link,
      image,
      tag: tag === "" ? [] : tag.split(",").map((i) => i.trim()),
    };
    for (let key in formData) if (formData[key] === "") delete formData[key];

    if (topic !== "" && title !== "" && date !== "" && description !== "" && process.env.REACT_APP_FB_INPUTKEY !== undefined) {
      submitForm(topic, formData);

      // Reset the form inputs
      setTopic("");
      setTitle("");
      setDate("");
      setDescription("");
      setCContent("");
      setLink("");
      setImage("");
      setTags("");
    } else {
      popupInvalid.current.open();
      setTimeout(() => {
        popupInvalid.current.close();
      }, 1500);
    }
  };
  const handleSubmitQuote = (event) => {
    event.preventDefault();

    const quoteData = {
      author,
      content: Qcontent,
    };
    if (author !== "" && Qcontent !== "" && process.env.REACT_APP_FB_INPUTKEY !== undefined) {
      submitQuote(quoteData);

      // Reset the form inputs
      setAuthor("");
      setQContent("");
    } else {
      popupInvalid.current.open();
      setTimeout(() => {
        popupInvalid.current.close();
      }, 1500);
    }
  };

  const submitForm = (topic, formData) => {
    console.log("Submitting form:", formData);
    const colRef = collection(db, topic);
    addDoc(colRef, formData);
  };
  const submitQuote = (quoteData) => {
    const colRef = collection(db, "Quotes");
    addDoc(colRef, quoteData);
  };

  return (
    <>
      <Header />

      {/* content container display selected section */}
      <div className="content-container" id="content-container">
        <table className="DB_Table">
          <tbody>
            <tr>
              <th colSpan={2} className="title">
                Add Content
              </th>
            </tr>
            <tr>
              <th>
                Topic<span className="required">*</span>:
              </th>
              <td>
                <select value={topic} onChange={handleTopicChange}>
                  <option value="">Select a topic</option>
                  <option value="Drawings">Draw</option>
                  <option value="Games">Game</option>
                  <option value="Stories">Story</option>
                  <option value="DevLogs">DevLogs</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>
                Title<span className="required">*</span>:
              </th>
              <td>
                <input
                  type="text"
                  placeholder="title"
                  value={title}
                  onChange={handleTitleChange}
                />
              </td>
            </tr>
            <tr>
              <th>
                Date<span className="required">*</span>:
              </th>
              <td>
                <input
                  type="text"
                  value={date}
                  placeholder="dd/mm/yyyy"
                  onChange={handleDateChange}
                />
              </td>
            </tr>
            <tr>
              <th>
                Description<span className="required">*</span>:
              </th>
              <td>
                <input
                  type="text"
                  value={description}
                  placeholder="description &nbsp;(short one will do)"
                  onChange={handleDescriptionChange}
                />
              </td>
            </tr>
            <tr>
              <th>Content:</th>
              <td>
                <input
                  type="text"
                  value={Ccontent}
                  placeholder="content &nbsp;(u need one for story/ dev log)"
                  onChange={handleCContentChange}
                />
              </td>
            </tr>
            <tr>
              <th>Link:</th>
              <td>
                <input
                  type="text"
                  value={link}
                  placeholder="github link &nbsp;(mainly for game)"
                  onChange={handleLinkChange}
                />
              </td>
            </tr>
            <tr>
              <th>Image:</th>
              <td>
                <input
                  type="text"
                  value={image}
                  placeholder="imgName.png &nbsp;(block display image)"
                  onChange={handleImageChange}
                />
              </td>
            </tr>
            <tr>
              <th>Tag:</th>
              <td>
                <input
                  type="text"
                  value={tag}
                  placeholder="tag1, tag2, ..."
                  onChange={handleTagsChange}
                />
              </td>
            </tr>
            <tr>
              <th colSpan={2} className="submitBtn">
                <button type="submit" onClick={handleSubmitContent}>
                  Submit
                </button>
              </th>
            </tr>
          </tbody>
        </table>
        {/* second form */}
        <table className="DB_Table">
          <tbody>
            <tr>
              <th colSpan={2} className="title">
                Add Quote
              </th>
            </tr>
            <tr>
              <th>
                Author<span className="required">*</span>:
              </th>
              <td>
                <input
                  type="text"
                  placeholder="author"
                  value={author}
                  onChange={handleAuthorChange}
                />
              </td>
            </tr>
            <tr>
              <th>
                Content<span className="required">*</span>:
              </th>
              <td>
                <input
                  type="text"
                  placeholder="content"
                  value={Qcontent}
                  onChange={handleQContentChange}
                />
              </td>
            </tr>
            <tr>
              <th colSpan={2} className="submitBtn">
                <button type="submit" onClick={handleSubmitQuote}>
                  Submit
                </button>
              </th>
            </tr>
          </tbody>
        </table>
        <Popup ref={popupInvalid} modal>
          {(close) => (
            <div className="popup">
              <p className="failure">invalid input</p>
            </div>
          )}
        </Popup>
        <Popup ref={popupSuccess} modal>
          {(close) => (
            <div className="popup">
              <p className="success">new item added</p>
            </div>
          )}
        </Popup>
      </div>

      {/* footer */}
      <Footer />
    </>
  );
}
