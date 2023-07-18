import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolioStocks, setPortfolioStocks] = useState([]);
  
  useEffect(() => {
    fetch(" http://localhost:3001/stocks")
     .then((r) => r.json())
     .then((data) => setStocks(data));
  }, []);
 
  function handleClickStock(stock) {
    setPortfolioStocks([...portfolioStocks, stock]);
  }
 
  function handleDeleteStock(stock) {
    const updatedStocks = portfolioStocks.filter(
      (portfolioStock) => portfolioStock.id !== stock.id
    );
    setPortfolioStocks(updatedStocks);
  }

  return (
    <div>
      <SearchBar />
      <div className="row">
        <div className="col-8">
          <StockContainer 
            stocks={stocks} 
            onClickStock={handleClickStock}
            />
        </div>
        <div className="col-4">
          <PortfolioContainer 
            portfolioStocks={portfolioStocks} 
            onDeleteStock={handleDeleteStock} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
