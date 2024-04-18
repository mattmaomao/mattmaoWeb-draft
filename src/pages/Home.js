import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function Home() {
  return (
    <>
      <Header />

      {/* content container display selected section */}
      <div className="content-container" id="content-container">
        {/* get page accordingly */}
        <p>my home</p>
      </div>

      {/* footer */}
      <Footer />
    </>
  );
}
