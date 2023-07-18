import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ portfolioStocks,onDeleteStock }) {

  function handleClickStock(stock) {
    onDeleteStock(stock);
  }

  return (
    <div>
      <h2>My Portfolio</h2>
      {portfolioStocks.map((stock) => (
        <Stock key={stock.id} stock={stock} onClickStock={handleClickStock} />
      ))}
    </div>
  );
}

export default PortfolioContainer;