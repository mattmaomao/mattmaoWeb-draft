import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
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
      tag: tag === "" ? [] : tag.split(",").map(i => i.trim()),
    };
    for (let key in formData) if (formData[key] === "") delete formData[key];

    if (topic !== "" && title !== "" && date !== "" && description !== "")
      submitForm(topic, formData);

    // Reset the form inputs
    setTopic("");
    setTitle("");
    setDate("");
    setDescription("");
    setLink("");
    setImage("");
    setTags("");
  };
  const handleSubmitQuote = (event) => {
    event.preventDefault();

    const quoteData = {
      author,
      content: Qcontent,
    };
    if (author !== "" && Qcontent !== "") submitQuote(quoteData);

    // Reset the form inputs
    setAuthor("");
    setCContent("");
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
      <table className="DB_Table">
        <tbody>
          <tr>
            <th colSpan={2} className="title">
              Add Content
            </th>
          </tr>
          <tr>
            <th>
              <label>
                Topic<span className="required">*</span>:
              </label>
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
              <label>
                Title<span className="required">*</span>:
              </label>
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
              <label>
                Date<span className="required">*</span>:
              </label>
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
              <label>
                Description<span className="required">*</span>:
              </label>
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
            <th>
              <label>Content:</label>
            </th>
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
            <th>
              <label>Link:</label>
            </th>
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
            <th>
              <label>Image:</label>
            </th>
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
            <th>
              <label>Tags:</label>
            </th>
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
              <label>
                Author<span className="required">*</span>:
              </label>
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
              <label>
                Content<span className="required">*</span>:
              </label>
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
    </>
  );
}
