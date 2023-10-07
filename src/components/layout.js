import { lignesWithColors } from "../data/lignes";
import { useState } from "react";
export default function Layout() {
    const [toggle, setToggle] = useState(false);
    return (
        <header>
            <h1 className="logo">METROPLE</h1>
            <nav onClick={() => setToggle(!toggle)}>Ligne
             {toggle && <ul>
                {lignesWithColors.map((item) => (
                    <li key={item.Ligne}>{item.Ligne}</li>
                ))}
            </ul>}
            </nav>
           
        </header>
    );
}