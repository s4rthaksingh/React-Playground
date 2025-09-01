import { useEffect, useState } from "react";
import "./App.css";



const propertyDict = {
  Apartment: { income: 1, price: 100 },
  House: { income: 5, price: 400 },
  Mansion: { income: 25, price: 2000 },
  Office: { income: 100, price: 10000 },
  Hotel: { income: 500, price: 50000 },
  Skyscraper: { income: 2500, price: 250000 },
};

function App() {
  const [bal, setBal] = useState(() => {
    const saved = localStorage.getItem("balance");
    return saved ? parseInt(saved) : 0;
  });
  const [properties, setProperties] = useState(() => {
    const savedProperties = localStorage.getItem("properties");
    let beginningProperties = {};
    for(const property in propertyDict) beginningProperties[property] = 0;
    return savedProperties ? JSON.parse(savedProperties) : beginningProperties;
  });
  const [income, setIncome] = useState(0);

  useEffect(() => {
    localStorage.setItem("balance", bal.toString());
    localStorage.setItem("properties", JSON.stringify(properties));
  }, [bal, properties]);

  useEffect(() => {
    let addition = 0;
    for(const property in propertyDict){
      addition += propertyDict[property].income * properties[property];
    }
    setIncome(addition);
    const interval = setInterval(() => {
      setBal((currentBal) => currentBal + addition);
    }, 1000);

    return () => clearInterval(interval);
  }, [properties]);

  return (
    <>
      <div className="h-screen w-screen flex flex-col items-center justify-around">
        <div>
          <p className="text-3xl">
            Income : ${income}/sec
          </p>
        </div>
        <div className="flex items-center justify-around w-screen">
          <Workplace setBal={setBal} bal={bal} />
          <BuyOption
            setBal={setBal}
            bal={bal}
            properties={properties}
            setProperties={setProperties}
          />
          <Properties properties={properties} />
        </div>
      </div>
    </>
  );
}

function Workplace({ bal, setBal }) {
  return (
    <>
      <div className="flex flex-col gap-3">
        <h2>Your balance : {bal}</h2>
        <button
          onClick={() => {
            setBal(bal + 1);
          }}
        >
          Work
        </button>
      </div>
    </>
  );
}

function BuyOption({ bal, setBal, properties, setProperties }) {
  const buyHandler = (p) => {
    if (bal < propertyDict[p].price) return;
    setBal(bal - propertyDict[p].price);
    let newProperties = {
      ...properties,
      [p]: properties[p] + 1,
    };
    setProperties(newProperties);
  };

  return (
    <>
      <div className="flex flex-col gap-2">

      {Object.keys(propertyDict).map((property, index) => {
        return <button
          style={{ background: bal < propertyDict[property].price && "slategray" }}
          onClick={(e) => buyHandler(e.target.value)}
          value={property}
          key={index}
        >
          Buy {property} (${propertyDict[property].price})
        </button>;
      })}

</div>
    </>
  );
}

function Properties({ properties }) {
  return (
    <>
      <div>
        Your properties :
        {Object.keys(properties).map((property, index) => {
          return (
            <li key={index}>
              {property} : {properties[property]}
            </li>
          );
        })}
      </div>
    </>
  );
}

export default App;
