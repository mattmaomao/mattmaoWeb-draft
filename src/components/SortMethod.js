export function SortMethod({ id, methodName, selectedSort, handleSortChange }) {
  return (
    <>
      <label
        htmlFor={id}
        style={{
          display: "block",
          margin: "4px",
        }}>
        <input
          type="radio"
          id={id}
          value={methodName}
          checked={selectedSort == methodName}
          onChange={(e) => handleSortChange(e)}
          onClick={() => {
            var dropdownList = document.getElementById("sort-dropdown");
            dropdownList.classList.toggle("show");
          }}
        />
        &nbsp; {methodName}
      </label>
    </>
  );
}
