import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import SingleLinePage from "./pages/singleLinePage";
import { fetchData } from "./store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.data.loading);
  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <div className="App">
      {loader !== "fulfilled" && (
        <div className="loader-container">
          <span className="loader"></span>
        </div>
      )}
      {loader === "fulfilled" && (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="ligne/:ligne" element={<SingleLinePage />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
