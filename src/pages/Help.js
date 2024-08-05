export function Help() {
  return (
    <>
      {/* content container display selected section */}
      <div className="content-container" id="content-container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "16px",
            fontSize: "20px",
            rowGap: "16px",
          }}
        >
          <p>find any bug?</p>
          {/* <a>contact me.</a> */}
          <a
            href="https://forms.gle/GscEAARN9CtLTQnm6"
            rel="noreferrer"
            target="_blank"
            style={{textDecoration: "none", cursor: "text"}}
          >
            contact me.
          </a>
          <p>dun know how to contact me?</p>
          <p>well... idk too</p>
        </div>
      </div>
    </>
  );
}
