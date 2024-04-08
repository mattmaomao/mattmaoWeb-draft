export function FilteringTag({ id, tag, selectedFilters, handleFilterChange }) {
  return (
    <>
      <label
        htmlFor={id}
        style={{
          display: "block",
          padding: "4px",
        }}>
        <input
          type="checkbox"
          id={id}
          value={tag}
          checked={selectedFilters.includes(tag)}
          onChange={(e) => handleFilterChange(e)}
        />
        &nbsp; {tag}
      </label>
    </>
  );
}
