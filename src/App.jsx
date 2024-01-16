import React, { useState, useEffect } from "react";

const App = () => {
  //Taken the name from kaggle dataset
  const initialData = [
    "Lucas",
    "Jordan",
    "Sophia",
    "Lillian",
    "Parker",
    "Serenity",
    "Brooks",
    "Saurabh",
    "Rahul",
    "Raj",
    "Suyash",
    "Ankit",
  ];

  const [inputValue, setInputValue] = useState("");

  const [matchingData, setMatchingData] = useState([]);

  const [enteredData, setEnteredData] = useState([]);

  const [availableData, setAvailableData] = useState(initialData.sort());

  const [ChipIndex, setChipIndex] = useState(-1);

  const inputRef = React.createRef();

  const handleInputChange = (event) => {
    const value = event.target.value.trim().toLowerCase();
    setInputValue(value);

    const filteredData = availableData.filter((item) =>
      item.toLowerCase().includes(value)
    );
    setMatchingData(filteredData);
  };

  const DataClick = (index) => {
    const selectedData = matchingData[index];

    setEnteredData((prevEnteredData) => [...prevEnteredData, selectedData]);

    setAvailableData((prevAvailableData) =>
      prevAvailableData.filter((item) => item !== selectedData).sort()
    );

    setInputValue("");
    setMatchingData([]);

    inputRef.current.focus();
  };

  const handleRemoveItem = (index) => {
    setAvailableData((prevAvailableData) =>
      [...prevAvailableData, enteredData[index]].sort()
    );

    setEnteredData((prevEnteredData) =>
      prevEnteredData.filter((_, i) => i !== index)
    );

    setChipIndex(-1);

    inputRef.current.focus();
  };

  const handleBackspacePress = (event) => {
    if (
      event.key === "Backspace" &&
      inputValue === "" &&
      enteredData.length > 0
    ) {
      if (ChipIndex !== -1) {
        handleRemoveItem(ChipIndex);
      } else {
        setChipIndex(enteredData.length - 1);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleBackspacePress);

    return () => {
      document.removeEventListener("keydown", handleBackspacePress);
    };
  }, [handleBackspacePress]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10%",
      }}
    >
      <div
        style={{
          fontSize: "20px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
        }}
      >
        {enteredData.map((item, index) => (
          <div
            style={{
              margin: "5px",
              backgroundColor: ChipIndex === index ? "lightgray" : "",
              width: "auto",
              padding: "5px",
              borderRadius: "8px",
            }}
            key={index}
            onClick={() => setChipIndex(index)}
          >
            {item}
            <span
              style={{
                marginLeft: "5px",
                border: "1px solid black",
                borderRadius: "10%",
                padding: "2px",
                cursor: "pointer",
              }}
              onClick={() => handleRemoveItem(index)}
            >
              x
            </span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search data"
          ref={inputRef}
          style={{
            height: "20px",
            width: "20rem",
            padding: "10px",
            border: "2px solid black",
            borderRadius: "10px",
          }}
        />

        {inputValue && (
          <div
            style={{
              display: matchingData.length > 0 ? "block" : "none",
              maxHeight: "230px",
              overflowY: "auto",
            }}
          >
            {matchingData.map((item, index) => (
              <div
                key={index}
                onClick={() => DataClick(index)}
                style={{
                  marginTop: "20px ",
                  border: "2px solid gray",
                  borderRadius: "10px",
                  padding: "7px",
                }}
              >
                <div
                 
                  style={{
                    backgroundColor: "gray",
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "15px",
                    height: "25px",
                    border: "1px solid",
                    borderRadius: "50%",
                    fontSize: "1rem",
                    fontWeight: "400",
                    color: "black",
                    position: "relative",
                    marginRight: "8px",
                  }}
                >
                  <div>{item.charAt(0)}</div>
                </div>
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
