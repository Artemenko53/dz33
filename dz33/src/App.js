import "./App.css";
import React, { useState } from "react";

const scaleNames = {
  cm: "Centimeters",
  mm: "Millimeters",
};

function toCentimeters(millimeters) {
  return millimeters / 10;
}

function toMillimeters(centimeters) {
  return centimeters * 10;
}

function Calculator() {
  const [length, setLength] = useState("");
  const [scale, setScale] = useState("cm");

  const handleCentimetersChange = (value) => {
    setScale("cm");
    setLength(value);
  };

  const handleMillimetersChange = (value) => {
    setScale("mm");
    setLength(value);
  };

  const centimeters =
    scale === "mm" ? tryConvert(length, toCentimeters) : length;
  const millimeters =
    scale === "cm" ? tryConvert(length, toMillimeters) : length;

  // Додаткове повідомлення, якщо довжина більше 1 метра
  const additionalMessage =
    parseFloat(centimeters) >= 100 || parseFloat(millimeters) >= 1000
      ? "Wow, that's more than 1 meter!"
      : "No, it's such small";

  return (
    <div>
      <LengthInput
        scale="cm"
        length={centimeters}
        onLengthChange={handleCentimetersChange}
      />
      <LengthInput
        scale="mm"
        length={millimeters}
        onLengthChange={handleMillimetersChange}
      />
      {additionalMessage && <p>{additionalMessage}</p>}
    </div>
  );
}

function LengthInput({ scale, length, onLengthChange }) {
  return (
    <fieldset>
      <legend>Enter length in {scaleNames[scale]}:</legend>
      <input value={length} onChange={(e) => onLengthChange(e.target.value)} />
    </fieldset>
  );
}

function tryConvert(length, convert) {
  const input = parseFloat(length);
  if (Number.isNaN(input)) {
    return "";
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

export default Calculator;
