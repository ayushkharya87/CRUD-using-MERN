import "./App.css";
import { Route, Routes } from "react-router-dom"
import Home from "./components/Home";
import ReadUser from "./components/ReadUser";
import UpdateUser from "./components/UpdateUser";

const App = () => {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/readuser/:id" element={<ReadUser />} />
        <Route path="/updateuser/:id" element={<UpdateUser />} />
      </Routes>
    </div>
  )
}

export default App;