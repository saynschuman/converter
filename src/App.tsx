import { Convert } from "./Convert";
import { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Convert />
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
