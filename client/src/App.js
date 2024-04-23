import "./App.css";
import FirstPage from "./FirstPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RedLight from "./redLight";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/redlight" element={<RedLight />} /> */}
          <Route path="/" element={<FirstPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
