import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function Help() {
  return (
    <>
      <Header />

      {/* content container display selected section */}
      <div className="content-container" id="content-container">
        <p>send help...</p>
      </div>

      {/* footer */}
      <Footer />
    </>
  );
}
