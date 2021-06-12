import React, { useState } from "react";
import "./index.css";

export default function StockData() {

  const [date, setDate] = useState('');
  const [stock, setStock] = useState(null);
  const [isInitial, setIsInitial] = useState(true);

  async function fetchStocks() {
    const baseUrl = 'https://jsonmock.hackerrank.com/api/stocks'
    try {
      const response = await fetch(`${baseUrl}?date=${date}`);
      const { data } = await response.json();
      if (data.length) {
        setIsInitial(false);
        const firstStock = data[0];
        setStock({
          Open: firstStock.open,
          Close: firstStock.close,
          High: firstStock.high,
          Low: firstStock.low
        });
      } else {
        setStock(null);
        setIsInitial(false);
      }
    } catch (error) {
      console.log(error);// To be replaced with pop up error message
    }
  }

  return (
    <div className="layout-column align-items-center mt-50">
      <section className="layout-row align-items-center justify-content-center">
        <input
          type="text"
          className="large"
          placeholder="5-January-2000"
          id="app-input"
          data-testid="app-input"
          onChange={(e) => setDate(e.target.value)}
        />
        <button
          className=""
          id="submit-button"
          data-testid="submit-button"
          onClick={fetchStocks}
          >
            Search
          </button>
      </section>
        {
          !isInitial && stock ? (<ul className="mt-50 slide-up-fade-in styled" id="stockData" data-testid="stock-data">
          {
            Object.entries(stock).map(([key, value]) =>
              <li className="py-10" key={key}>{`${key}: ${value}`}</li>)
          }
          </ul>):
          !isInitial && !stock ?
          <div className="mt-50 slide-up-fade-in" id="no-result" data-testid="no-result">
          No Results Found
        </div> : null
        }
    </div>
  );
}
