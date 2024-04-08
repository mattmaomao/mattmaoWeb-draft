export function ItemBlock({ title, image, date, tag, description }) {
  return (
    <>
      {/* item block */}
      <div className="things">
        {/* image */}
        <img className="thing-image" src={image} alt="where's my img :(" />
        {/* info */}
        <div className="thing-info">
          {/* title */}
          <p>
            <strong>{title}</strong>
          </p>
          {/* date */}
          <p>{date}</p>
          {/* tag */}
          <p className="tags">
            {tag && tag.map((x) => "#" + x + " ")}
          </p>
          {/* short description */}
          <p className="description">
            {description}
          </p>
        </div>
      </div>
    </>
  );
}
