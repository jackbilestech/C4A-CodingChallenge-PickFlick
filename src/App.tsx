import * as React from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Gallery, Picker } from "./components/Gallery";

export default function App() {
  return (
    <div className="App">
      <Gallery width={"500px"} height={"500px"} id="gallery" grid={[2, 2]} />
      {/* <Picker /> */}
    </div>
  );
}
