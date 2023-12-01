import { Link } from "react-router-dom";
import { linesWithColors } from "../data/lines";
import { useState } from "react";
export default function Layout() {
    const [toggle, setToggle] = useState(false);
  
    const handleClick = () => {
      setToggle(!toggle);
    };
  
    return (
      <header>
        <h1 className="logo">METROPLE</h1>

      </header>
    );
  }