import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import SingleLinePage from "./pages/singleLinePage";
import { Data } from "./components/data";
import { fetchData } from "./store/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData())
   }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="ligne/:ligne" element={<SingleLinePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
