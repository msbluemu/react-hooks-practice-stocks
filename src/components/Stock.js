import React from "react";

function Stock({stock, onClickStock, onDeleteStock }) {
  const {id, ticker, name, type, price } = stock;

  function handleClick(){
    if (onClickStock) {
      onClickStock(stock); // Add the stock
    } else if (onDeleteStock) {
      onDeleteStock(stock); // Delete the stock
    }
  }
  
  return (
    <div>
      <div className="card" onClick={handleClick}>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{price}</p>
        </div>
      </div>
    </div>
  );
}
export default Stock;
