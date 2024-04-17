import React from "react";
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";
import Draggable from "react-draggable";
import { useSelector } from "react-redux";

const boxStyle = {
  border: "grey solid 2px",
  borderRadius: "10px",
  padding: "5px",
};

const DraggableBox = ({ id }) => {
  const updateXarrow = useXarrow();
  return (
    <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
      <div id={id} style={boxStyle}>
        {id}
      </div>
    </Draggable>
  );
};

export function V2Example() {
  const folders = useSelector((state) => state.allFiles.folders);
  const files = useSelector((state) => state.allFiles.value);
  return (
    <div style={{ paddingTop: 60, marginTop: 60 }}>
      <Xwrapper>
        {folders.forEach((element, index) => {
          return <DraggableBox id={`${index}`} />;
        })}
        <Xarrow start={"elem1"} end="elem2" />
      </Xwrapper>
    </div>
  );
}
