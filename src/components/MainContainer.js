import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolioStocks, setPortfolioStocks] = useState([]);
  const [sortedStocks, setSortedStocks] = useState([...stocks]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  useEffect(() => {
    fetch(" http://localhost:3001/stocks")
     .then((r) => r.json())
     .then((data) => setStocks(data));
  }, []);
 
  
    const handleSort = (sortType) => {
      // Perform sorting logic based on the selected sort type
      let sortedData = [];
  
      if (sortType === "Alphabetically") {
        sortedData = stocks.sort((a, b) =>
          a.ticker.localeCompare(b.ticker)
        );
      } else if (sortType === "Price") {
        sortedData = stocks.sort((a, b) => a.price - b.price);
      }
      setSortedStocks([...sortedData]);
    };
  

  function handleClickStock(stock) {
    setPortfolioStocks([...portfolioStocks, stock]);
  }
 
  function handleDeleteStock(stock) {
    const updatedStocks = portfolioStocks.filter(
      (portfolioStock) => portfolioStock.id !== stock.id
    );
    setPortfolioStocks(updatedStocks);
  }
  
  const handleCategoryChange = (e) => {
    const category = e.target.value;

    setSelectedCategory(category);

    if (category === "All") {
      setFilteredStocks(stocks);
    } else {
      const filtered = stocks.filter((stock) => stock.type === category);
      setFilteredStocks(filtered);
    }
  };

  return (
    <div>
      <SearchBar onSort={handleSort} selectedCategory={selectedCategory} handleCategory={handleCategoryChange}/>
      <div className="row">
        <div className="col-8">
          <StockContainer 
            stocks={selectedCategory === "All" ? stocks : filteredStocks} 
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
