import { useState, useEffect } from "react";
import { ItemBlock } from "../components/itemBlock";
import { SortFilterBar } from "../components/SortFilterBar";
import { getDocs } from "firebase/firestore";

import "../styles/item-grid.css";

export function Things({ colRef }) {
  const [database, setDatabase] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [sortMethod, setSortList] = useState("");
  const [sortAscend, setSortAscend] = useState(true);
  const [filterList, setFilterList] = useState([]);

  const maxItemPerPage = 10;
  const [currPage, setCurrPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [firstPage, setFirtPage] = useState(true);
  const [lastPage, setLastPage] = useState(true);

  //#region sort and filter
  // get items that match sort and filter condition
  function getItem(data, sortMethod, sortAscend, filterList) {
    setItemList(() => {
      let items = [...data];
      // filter
      if (filterList.length !== 0) {
        items = [];
        data.forEach((item) => {
          item.tag.forEach((tag) => {
            if (filterList.includes(tag) && !items.includes(item))
              items.push(item);
          });
        });
      }
      // sort
      switch (sortMethod) {
        case "Title":
          items.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "Date":
          items.sort((a, b) => {
            let item1 = a.date.split("/");
            let date1 = new Date(item1[2], item1[1], item1[0]);
            let item2 = b.date.split("/");
            let date2 = new Date(item2[2], item2[1], item2[0]);
            return date2 - date1;
          });
          break;

        default:
          break;
      }
      if (!sortAscend) {
        items.reverse();
        // prevent call twice and reset
        sortAscend = !sortAscend;
      } else {
        // prevent call twice and reset
        sortAscend = !sortAscend;
      }

      const numOfPage = Math.ceil(items.length / maxItemPerPage);
      changePage(0);
      setTotalPage(numOfPage);

      return items;
    });
  }
  // get sort selection of user
  function sort(sort) {
    setSortList(sort);
    getItem(database, sort, sortAscend, filterList);
  }
  // switch sorting order between ascending, descending
  function sortOrder(ascend) {
    setSortAscend(ascend);
    getItem(database, sortMethod, ascend, filterList);
  }
  // get filter selection of user
  function filter(filters) {
    // todo
    setFilterList(filters);
    getItem(database, sortMethod, sortAscend, filters);
  }
  //#endregion

  //change page
  function changePage(pageNum) {
    setCurrPage(pageNum);
    setFirtPage(pageNum === 0);
    setLastPage(pageNum === totalPage - 1);
  }

  // grab data on load
  useEffect(() => {
    let items = [];
    // get data from firebase collection
    getDocs(colRef)
      .then((snapshot) => {
        snapshot.docs.forEach((item) => {
          items.push({ ...item.data(), id: item.id });
        });
      })
      .then(() => {
        // save data to state hook
        setDatabase(items);
        getItem(items, sortMethod, sortAscend, filterList);
      });
  }, [colRef]);
  useEffect(() => {
    console.log("reload items");
    getItem(itemList, sortMethod, sortAscend, filterList);
  }, [totalPage]);

  return (
    <>
      {/* sort and filter */}
      <SortFilterBar
        onSortChange={sort}
        onOrderChange={sortOrder}
        onFilterChange={filter}
        currPage={currPage}
        firstPage={firstPage}
        lastPage={lastPage}
        changePage={changePage}
        // get all tag in the whole collection
        tagList={[... new Set(database.map((item) => item.tag).flat().filter(Boolean))].sort()}
      />

      {/* grid/flex box */}
      <div className="thing-grid">
        {itemList
          .map((item, index) => {
            // receive and return according to item
            return <ItemBlock {...item} key={index} />;
          })
          .slice(maxItemPerPage * currPage, maxItemPerPage * (currPage + 1))}
      </div>
    </>
  );
}
