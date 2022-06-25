import ReactDOM from "react-dom/client";
import App from "./pages/App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Router />
  </BrowserRouter>
);
