import { useState, useRef } from "react";
import { Popup } from "reactjs-popup";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { db, storage } from "../../index";
import "../../styles/DB.css";

export function DB() {
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

  const [popMsg, setPopMsg] = useState("");
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
    setImage(event.target.files[0]);
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

    // check if can upload
    if (
      topic !== "" &&
      title !== "" &&
      date !== "" &&
      description !== "" &&
      process.env.REACT_APP_FB_INPUTKEY !== undefined
    ) {
      submitForm(topic);
    } else {
      showPopup(popupInvalid, "invalid input");
    }
  };
  const handleSubmitQuote = (event) => {
    event.preventDefault();

    const quoteData = {
      author,
      content: Qcontent,
    };
    if (
      author !== "" &&
      Qcontent !== "" &&
      process.env.REACT_APP_FB_INPUTKEY !== undefined
    ) {
      submitQuote(quoteData);
    } else {
      showPopup(popupInvalid, "invalid input");
    }
  };

  // handle image upload
  const uploadImage = async (file, folderName = "uploads", topic) => {
    // Assuming 'userId' is available and relevant for your use-case
    const fileRef = ref(storage, `${folderName}/${topic}_${file.name}`);

    const uploadTask = uploadBytesResumable(fileRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle progress
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error("Upload failed", error);
          reject(error);
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const submitForm = async (topic) => {
    // Upload the cover image first and update the URL
    var imageLink = "";
    if (image && image instanceof File) {
      imageLink = await uploadImage(image, "cover_image", topic);
    }

    // set form data
    const formData = {
      title,
      date,
      description,
      content: Ccontent,
      link,
      image: imageLink,
      tag: tag === "" ? [] : tag.split(",").map((i) => i.trim()),
    };
    // clear empty field
    for (let key in formData) if (formData[key] === "") delete formData[key];
    console.log("Submitting form:", formData);

    const colRef = collection(db, topic);
    addDoc(colRef, formData)
      .then(() => {
        showPopup(popupSuccess, "added new content");
        // Reset the form inputs
        setTopic("");
        setTitle("");
        setDate("");
        setDescription("");
        setCContent("");
        setLink("");
        setImage("");
        setTags("");
      })
      .catch((e) => {
        showPopup(popupInvalid, e.message);
      });
  };
  const submitQuote = (quoteData) => {
    const colRef = collection(db, "Quotes");
    addDoc(colRef, quoteData)
      .then(() => {
        showPopup(popupSuccess, "added new quote");
        // Reset the form inputs
        setAuthor("");
        setQContent("");
      })
      .catch((e) => {
        showPopup(popupInvalid, e.message);
      });
  };

  return (
    <>
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
                  type="file"
                  // value={image === "" ? "" : image.name}
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
