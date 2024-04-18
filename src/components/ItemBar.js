export function ItemBar({ title, link, date, tag, description }) {
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
        <p className="title">
          <strong>{title}</strong>
        </p>
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
        <p className="date">{date}</p>
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
