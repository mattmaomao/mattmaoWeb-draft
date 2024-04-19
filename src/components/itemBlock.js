export function ItemBlock({ id, title, link, image, date, tag, description, itemType, viewItem }) {
  // set the link for detailed page/ external link
  const setLink = () => {
    if (link) {
      return (
        <a href={link} rel="noreferrer" target="_blank">
          <strong>{title}</strong>
        </a>
      );
    } else {
      return (
        <button onClick={() => viewItem([itemType, id])} className="title title-btn">
          <strong>{title}</strong>
        </button>
      );
    }
  };

  return (
    <>
      {/* item block */}
      <div className="blocks">
        {/* image */}
        <img
          className="block-image"
          src={"./img/" + image}
          alt="where's my img :("
        />
        {/* info */}
        <div className="block-info">
          {/* title */}
          {setLink()}
          {/* date */}
          <p>{date}</p>
          {/* tag */}
          <p className="tags">{tag && tag.map((x) => "#" + x + " ")}</p>
          {/* short description */}
          <p className="description">{description}</p>
        </div>
      </div>
    </>
  );
}
