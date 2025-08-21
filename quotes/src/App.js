import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [quote, setQuote] = useState(null);

  const fetchQuote = async () => {
    const response = await fetch("https://api.quotable.io/random");
    const result = await response.json();
    setQuote(result);
  };

  useEffect(() => {fetchQuote()}, [])

  return (
    <div>
      {quote ? (
        <h1>
          <i>"{quote.content}"</i> - {quote.author}
        </h1>
      ) : (
        <p>Loading...</p>
      )}
      <div>
        <button onClick={fetchQuote}>New Quote</button>
      </div>
    </div>
  );
}

export default App;
