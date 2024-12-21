export function ItemBar({
  id,
  title,
  link,
  date,
  tag,
  description,
  itemType,
  viewItem,
}) {
  // set the link for detailed page/ external link
  const setLink = () => {
    if (link) {
      return (
        <a href={link} rel="noreferrer" target="_blank" className="title">
          <strong>{title}</strong>
        </a>
      );
    } else {
      return (
        <button
          onClick={() => viewItem([itemType, id])}
          className="title title-btn"
        >
          <strong>{title}</strong>
        </button>
      );
    }
  };

  return (
    <>
      {/* item block */}
      <div className="bars">
        {/* title */}
        {setLink()}
        {/* date */}
        <p className="date">{date.split("/")[0] + "/" + date.split("/")[1]}</p>
        {/* tag */}
        <p className="tags">
          {tag && tag.slice(0, 5).map((x) => "#" + x + " ")}
        </p>
        {/* short description */}
        <p className="description">{description}</p>
      </div>
    </>
  );
}
