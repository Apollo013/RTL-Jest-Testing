import { useState } from "react";
import "./App.css";

function App() {
    const [buttonColor, setButtonColor] = useState("red");
    const newButtonColor = buttonColor === "red" ? "blue" : "red";
    const [disabled, setDisabled] = useState(false);

    return (
        <div>
            <button
                style={{ backgroundColor: disabled ? "gray" : buttonColor }}
                onClick={() => setButtonColor(newButtonColor)}
                disabled={disabled}
            >
                Change to {newButtonColor}
            </button>
            <br />
            <input
                type="checkbox"
                id="disable-button-checkbox"
                defaultChecked={disabled}
                onChange={(e) => setDisabled(e.target.checked)}
            />
            <label htmlFor="disable-button-checkbox">Disable button</label>
        </div>
    );
}

export default App;
