import "core-js/features/array/flat-map";
import "core-js/features/map";
import "core-js/features/promise";
import "core-js/features/set";
import "raf/polyfill";
import "whatwg-fetch";
import React from "react";
import ReactDom from "react-dom";
import App from "./App";

import "./index.css";

ReactDom.render(<App />, document.getElementById("root"));
