import { collection } from "firebase/firestore";

import { Home } from "./Home";
import { ThingsInBlock } from "./ThingsInBlock";
import { ThingsInBar } from "./ThingsInBar";
import { ThingDetail } from "./ThingDetail";
import { About } from "./About";
import { Help } from "./Help";
import { DB } from "./hide/DB";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

import { db } from "../index";
import "../styles/landing.css";
import { useEffect, useState } from "react";

export function Landing() {
  const [page, setPage] = useState("Home");
  const [comp, setComp] = useState(<Home />);
  const [itemInfo, setItemInfo] = useState("");

  const viewItem = (info) => {
    setItemInfo(info);
    setPage("ThingDetail");
  };

  useEffect(() => {
    switch (page) {
      case "Home":
        setComp(<Home />);
        break;
      case "Drawings":
        setComp(
          <ThingsInBlock
            viewItem={viewItem}
            itemType={"Drawings"}
            colRef={collection(db, "Drawings")}
          />
        );
        break;
      case "Games":
        setComp(
          <ThingsInBlock
            viewItem={viewItem}
            itemType={"Games"}
            colRef={collection(db, "Games")}
          />
        );
        break;
      case "Stories":
        setComp(
          <ThingsInBar
            viewItem={viewItem}
            itemType={"Stories"}
            colRef={collection(db, "Stories")}
          />
        );
        break;
      case "DevLogs":
        setComp(
          <ThingsInBar
            viewItem={viewItem}
            itemType={"DevLogs"}
            colRef={collection(db, "DevLogs")}
          />
        );
        break;
      case "ThingDetail":
        setComp(<ThingDetail itemType={itemInfo[0]} itemID={itemInfo[1]} />);
        break;
      case "About":
        setComp(<About colRef={collection(db, "Quotes")} />);
        break;
      case "Help":
        setComp(<Help />);
        break;
      // secret
      case "Database":
        setComp(<DB />);
        break;
      default:
        setComp(<Home />);
        break;
    }
  }, [page, db]);

  return (
    <>
      <Header setPage={setPage} />
      {comp}
      <Footer />
    </>
  );
}
