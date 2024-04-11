export function ItemBlock({ title, link, image, date, tag, description }) {
  const setLink = () => {
    if (link) {
      return <a href={link} rel="noreferrer" target="_blank">
        <strong>{title}</strong>
      </a>;
    }
    else {
      return <p><strong>{title}</strong></p>
    }
  };

  return (
    <>
      {/* item block */}
      <div className="things">
        {/* image */}
        <img
          className="thing-image"
          src={"./img/" + image}
          alt="where's my img :("
        />
        {/* info */}
        <div className="thing-info">
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
