import { Route, Routes } from "react-router-dom";
import HomePage from "./chi/pages/HomePage";
import ReadExcelFile from "./chi/pages/ReadExcelFile";
import PutDataManually from "./chi/pages/PutDataManually";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/read-excel" element={<ReadExcelFile />} />
        <Route path="/data-manually" element={<PutDataManually />} />
      </Routes>
    </>
  );
}

export default App;
