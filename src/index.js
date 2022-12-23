import * as React from "react";
import { render } from "react-dom";
import { ReactGrid, Column, Row, Highlight } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import "./index.css";

const getPeople = () => [
  { user: "user_1", data1: "34", data2: "4", data3: "64" },
  { user: "user_2", data1: "66", data2: "57", data3: "6234" },
  { user: "user_3", data1: "84", data2: "495", data3: "9864" },
];

const getColumns = () => [
  { columnId: 0, width: 150 },
  { columnId: 1, width: 150 },
  { columnId: 2, width: 150 },
  { columnId: 3, width: 150 },
];

const headerRow = {
  rowId: "header",
  cells: [
    { type: "header", text: "User" },
    { type: "header", text: "Data1" },
    { type: "header", text: "Data2" },
    { type: "header", text: "Data3" },
  ],
};

const getRows = (people) => [
  headerRow,
  ...people.map((person, idx) => ({
    rowId: idx,
    cells: [
      { type: "text", text: person.user },
      { type: "text", text: person.data1 },
      { type: "text", text: person.data2 },
      { type: "text", text: person.data3 },
    ],
  })),
];

function App() {
  const obj = {
    user: "user_1",
    row: 1,
    column: 3,
  };
  const [objrow, setObjrow] = React.useState("");
  const [objColumn, setObjColumn] = React.useState("");
  const [objuser, setObjUser] = React.useState("");
  const handleRow = () => {
    // console.log("handleRow");
    setObjrow(Math.floor(Math.random() * 3));
  };
  obj.row = objrow;
  const handleColumn = () => {
    // console.log("handlecolumn");

    setObjColumn(Math.floor(Math.random() * 4));
  };
  obj.column = objColumn;
  function generateRandomColor() {
    // console.log("generateRandomColor");

    let maxVal = 0xffffff; // 16777215
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    setObjUser(`#${randColor.toUpperCase()}`);
  }
  obj.user = objuser;
  const highlights = [];
  const assignobj = {
    columnId: "",
    rowId: "",
    borderColor: "",
  };
  React.useEffect(() => {
    Object.entries(obj).map(([key, val]) => {
      if (key === "user") {
        assignobj.borderColor = val;
      }
      if (key === "row") {
        assignobj.rowId = val;
      }
      if (key === "column") {
        assignobj.columnId = val;
      }
    });
    highlights.push(assignobj);
    setHighLight(highlights);
  }, [objrow, objuser, objColumn]);

  const [highLight, setHighLight] = React.useState([]);

  const [people] = React.useState(getPeople());

  const handleHighlight = () => {
    setInterval(() => {
      handleRow();
      handleColumn();
      generateRandomColor();
    }, 500);
  };

  const rows = getRows(people);
  const columns = getColumns();

  return (
    <>
      <ReactGrid rows={rows} columns={columns} highlights={highLight} />
      <button onClick={handleHighlight}>Mock to Highlight</button>
    </>
  );
}

render(<App />, document.getElementById("root"));
