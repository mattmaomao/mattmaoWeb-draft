import { useEffect, useRef } from "react";

export function About() {
  const style = {
    ".short-info": {
      display: "flex",
      justifyContent: "space-between",
      margin: "0 2%",
      paddingTop: "20px",
      marginBottom: "20px",
    },
    ".text-container": {
      textAlign: "right",
      minWidth: "40%",
      maxWidth: "70%",
      overflow: "hidden",
      borderCollapse: "collapse",
    },
    ".text-container tr": { borderBottom: "1px #3332 solid" },
    ".text-container tr:last-child": { borderBottom: "none" },
    ".text-container th": {
      paddingLeft: "4px",
      paddingRight: "20px",
      whiteSpace: "nowrap",
      alignItems: "center",
      textAlign: "center",
      borderRight: "1px #3332 solid",
    },
    ".text-container td": {
      paddingLeft: "40px",
      paddingRight: "4px",
      whiteSpace: "nowrap",
    },
    ".img-container": {
      width: "240px",
      height: "240px",
      backgroundColor: "#888",
    },
    ".img-container img": { width: "100%", height: "100%" },
    ".longer-info": { margin: "0 10px", lineHeight: 1.2 },
  };

  const ref = useRef(null);
  // set css for this component only
  useEffect(() => {
    if (ref.current) {
      for (const selector in style) {
        const elements = ref.current.querySelectorAll(selector);
        const styles = style[selector];

        elements.forEach((element) => {
          for (const prop in styles) {
            element.style[prop] = styles[prop];
          }
        });
      }
    }
  }, []);

  return (
    <>
      <div ref={ref}>
        <div className="short-info">
          <table className="text-container">
            <tbody>
              <tr>
                <th>Name</th>
                <td>Matt</td>
              </tr>
              <tr>
                <th>Skill</th>
                <td>make random shit</td>
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
                <td>190, 30 (cm)</td>
              </tr>
            </tbody>
          </table>
          <div className="img-container">
            <img src="./img/chomusuke.png" alt="bruh my img :(" />
          </div>
        </div>
        <div className="longer-info">
          Wtf is this shit. gonna replace this with random quote of the day.
        </div>
      </div>
    </>
  );
}
