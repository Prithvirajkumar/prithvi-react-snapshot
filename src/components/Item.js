import React from "react";
import Container from "./Container";

const Item = ({ searchTerm }) => {
  if (searchTerm === "error") {
    throw new Error(`Houston, I'm a new Nav Error`);
  }

  return (
    <div>
      <h2>{searchTerm} Pictures</h2>
      <Container searchTerm={searchTerm} />
    </div>
  );
};

export default Item;
