import { useEffect, useState } from "react";
import "./App.css";

function abbreviateNumber(number, locale = 'en-US', options = {}) {
  const defaultOptions = {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1,
  };
  const formatter = new Intl.NumberFormat(locale, { ...defaultOptions, ...options });
  return formatter.format(number);
}


const propertyDict = {
  Tent: { income: 0.5, price: 50 },
  Apartment: { income: 1, price: 100 },
  Cottage: { income: 3, price: 300 },
  Condo: { income: 5, price: 500 },
  House: { income: 8, price: 800 },
  Townhouse: { income: 15, price: 1500 },
  Villa: { income: 30, price: 3000 },
  Shop: { income: 50, price: 5000 },
  Cafe: { income: 60, price: 6000 },
  Restaurant: { income: 120, price: 12000 },
  Bakery: { income: 160, price: 16000 },
  Gym: { income: 200, price: 20000 },
  Office: { income: 300, price: 30000 },
  Warehouse: { income: 400, price: 40000 },
  Hotel: { income: 500, price: 50000 },
  Factory: { income: 600, price: 60000 },
  Stadium: { income: 1800, price: 180000 },
  Skyscraper: { income: 2500, price: 250000 },
  DataCenter: { income: 3000, price: 300000 },
  Airport: { income: 10000, price: 1000000 },
  Seaport: { income: 15000, price: 1500000 },
  Spaceport: { income: 25000, price: 2500000 },
  Megamall: { income: 40000, price: 4000000 },
  Arcology: { income: 60000, price: 6000000 },
  Biosphere: { income: 80000, price: 8000000 },
  Fusion: { income: 120000, price: 12000000 },
  Megacity: { income: 200000, price: 20000000 },
  SpaceElevator: { income: 300000, price: 30000000 },
  Terraformer: { income: 500000, price: 50000000 },
  DysonSphere: { income: 1000000, price: 100000000 },
};

function showProperty(bal, property){
  if(!propertyDict[property]) return false;
  if(propertyDict[property].price < bal/2 || propertyDict[property].price > bal*2) return false
  else return true;
}

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
        <div className="flex flex-col gap-5">
        <p className="text-3xl">
            Balance : ${abbreviateNumber(bal)}
          </p>
          <p className="text-3xl">
            Passive Income : ${abbreviateNumber(income)}/sec
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
          <Properties properties={properties} bal={bal}/>
        </div>
      </div>
    </>
  );
}

function Workplace({ bal, setBal }) {
  return (
    <>
      <div className="flex flex-col gap-3">
        <h2>Work to earn $1</h2>
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
        if(showProperty(bal, property)) return <button
          style={{ background: bal < propertyDict[property].price && "slategray" }}
          onClick={(e) => buyHandler(e.target.value)}
          value={property}
          key={index}
        >
          Buy {property} (${abbreviateNumber(propertyDict[property].price)})
        </button>;
      })}

</div>
    </>
  );
}

function Properties({ bal, properties }) {
  return (
    <>
      <div>
        Your properties :
        {Object.keys(properties).map((property, index) => {
          if(showProperty(bal, property)) return (
            <li key={index}>
              {property} : {abbreviateNumber(properties[property])}
            </li>
          );
        })}
      </div>
    </>
  );
}

export default App;
