import { Route, Routes } from "react-router-dom"
import HomePage from "./chi/pages/HomePage"
import ReadExcelFile from "./chi/pages/ReadExcelFile"

function App() {
  

  return (
    <>
       <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/read-excel" element={<ReadExcelFile/>}/>
       </Routes>
    </>
  )
}

export default App
