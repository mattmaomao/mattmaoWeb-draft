import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { collection } from "firebase/firestore";

import { Home } from "./Home";
import { ThingsInBlock } from "./ThingsInBlock";
import { ThingsInBar } from "./ThingsInBar";
import { ThingDetail } from "./ThingDetail";
import { About } from "./About";
import { Help } from "./Help";
import { DB } from "./DB";

import "../styles/landing.css";

export function Landing({ db }) {
  return (
    <>
      <Routes>
        <Route path="/mattmaoWeb" element={<Home />} />
        <Route
          path="/mattmaoWeb/Drawings"
          element={
            <ThingsInBlock
              itemType={"Drawings"}
              colRef={collection(db, "Drawings")}
            />
          }
        />
        <Route
          path="/mattmaoWeb/Games"
          element={
            <ThingsInBlock
              itemType={"Games"}
              colRef={collection(db, "Games")}
            />
          }
        />
        <Route
          path="/mattmaoWeb/Stories"
          element={
            <ThingsInBar
              itemType={"Stories"}
              colRef={collection(db, "Stories")}
            />
          }
        />
        <Route
          path="/mattmaoWeb/DevLogs"
          element={
            <ThingsInBar
              itemType={"DevLogs"}
              colRef={collection(db, "DevLogs")}
            />
          }
        />
        <Route
          path="/mattmaoWeb/ThingDetail/:itemType/:itemID"
          element={<ThingDetail db={db} />}
        />
        <Route
          path="/mattmaoWeb/About"
          element={<About colRef={collection(db, "Quotes")} />}
        />
        <Route path="/mattmaoWeb/Help" element={<Help />} />
        <Route path="/mattmaoWeb/Database" element={<DB db={db} />} />
      </Routes>
    </>
  );
}
