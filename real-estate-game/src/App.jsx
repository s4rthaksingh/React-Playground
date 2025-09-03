import { useEffect, useState } from "react";
import "./App.css";

function abbreviateNumber(number, locale = 'en-US', options = {}) {
  const suffixes = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc'];
  const defaultOptions = {
    maximumFractionDigits: 1
  };
  const opts = { ...defaultOptions, ...options };

  let num;
  if (typeof number === 'bigint') {
    num = number;
  } else if (typeof number === 'number') {
    num = BigInt(Math.floor(number));
  } else {
    throw new Error('Input must be a number or BigInt');
  }

  let magnitude = 0n;
  let divisor = 1000n;

  while (num >= divisor && magnitude < BigInt(suffixes.length - 1)) {
    num /= 1000n;
    magnitude++;
  }
  const displayNumber = Number(num);

  const formattedNumber = displayNumber.toLocaleString(locale, opts);

  return `${formattedNumber}${suffixes[Number(magnitude)]}`;
}


const propertyDict = {
  "Tent": { income: 0.5, price: 50 },
  "Apartment": { income: 1, price: 100 },
  "Cottage": { income: 3, price: 300 },
  "Condo": { income: 5, price: 500 },
  "House": { income: 8, price: 800 },
  "Townhouse": { income: 15, price: 1500 },
  "Villa": { income: 30, price: 3000 },
  "Shop": { income: 50, price: 5000 },
  "Cafe": { income: 60, price: 6000 },
  "Restaurant": { income: 120, price: 12000 },
  "Bakery": { income: 160, price: 16000 },
  "Gym": { income: 200, price: 20000 },
  "Office": { income: 300, price: 30000 },
  "Warehouse": { income: 400, price: 40000 },
  "Hotel": { income: 500, price: 50000 },
  "Factory": { income: 600, price: 60000 },
  "Stadium": { income: 1800, price: 180000 },
  "Skyscraper": { income: 2500, price: 250000 },
  "DataCenter": { income: 3000, price: 300000 },
  "Airport": { income: 10000, price: 1000000 },
  "Seaport": { income: 15000, price: 1500000 },
  "Spaceport": { income: 25000, price: 2500000 },
  "Megamall": { income: 40000, price: 4000000 },
  "Arcology": { income: 60000, price: 6000000 },
  "Biosphere": { income: 80000, price: 8000000 },
  "Fusion": { income: 120000, price: 12000000 },
  "Megacity": { income: 200000, price: 20000000 },
  "SpaceElevator": { income: 300000, price: 30000000 },
  "Terraformer": { income: 500000, price: 50000000 },
  "DysonSphere": { income: 1000000, price: 100000000 },
  "OrbitalRing": { income: 2000000, price: 200000000 },
  "Nanofactory": { income: 4000000, price: 400000000 },
  "AIHub": { income: 6000000, price: 600000000 },
  "QuantumLab": { income: 9000000, price: 900000000 },
  "WormholeGate": { income: 15000000, price: 1500000000 },
  "PlanetaryForge": { income: 25000000, price: 2500000000 },
  "GalacticBank": { income: 40000000, price: 4000000000 },
  "StarLifter": { income: 60000000, price: 6000000000 },
  "SolarCollector": { income: 100000000, price: 10000000000 },
  "AstroCity": { income: 150000000, price: 15000000000 },
  "OrbitalHabitat": { income: 200000000, price: 20000000000 },
  "ExoplanetBase": { income: 300000000, price: 30000000000 },
  "StellarForge": { income: 500000000, price: 50000000000 },
  "DysonNet": { income: 800000000, price: 80000000000 },
  "HyperShipyard": { income: 1200000000, price: 120000000000 },
  "TimeReactor": { income: 1800000000, price: 180000000000 },
  "DimensionalHub": { income: 2500000000, price: 250000000000 },
  "GalaxyFarm": { income: 4000000000, price: 400000000000 },
  "UniverseFactory": { income: 6000000000, price: 600000000000 },
  "RealityForge": { income: 9000000000, price: 900000000000 },
  "InfinityCore": { income: 15000000000, price: 1500000000000 },
  "MultiverseAnchor": { income: 25000000000, price: 2500000000000 },
  "OmegaEngine": { income: 40000000000, price: 4000000000000 },
  "SingularityPlant": { income: 60000000000, price: 6000000000000 },
  "GodMachine": { income: 100000000000, price: 10000000000000 },
  "CosmosArchitect": { income: 150000000000, price: 15000000000000 },
  "MetaForge": { income: 200000000000, price: 20000000000000 },
  "HyperDyson": { income: 300000000000, price: 30000000000000 },
  "DimensionMiner": { income: 500000000000, price: 50000000000000 },
  "VoidHarvester": { income: 800000000000, price: 80000000000000 },
  "EternalForge": { income: 1200000000000, price: 120000000000000 },
  "OmniFabricator": { income: 1800000000000, price: 180000000000000 },
  "InfinityTower": { income: 2500000000000, price: 250000000000000 },
  "HyperverseHub": { income: 4000000000000, price: 400000000000000 },
  "OmegaForge": { income: 6000000000000, price: 600000000000000 },
  "SingularityCore": { income: 9000000000000, price: 900000000000000 },
  "TranscendenceHub": { income: 15000000000000, price: 1500000000000000 },
  "EternitySpire": { income: 25000000000000, price: 2500000000000000 },
  "CosmicForge": { income: 40000000000000, price: 4000000000000000 },
  "InfinityMatrix": { income: 60000000000000, price: 6000000000000000 },
  "RealityAnchor": { income: 90000000000000, price: 9000000000000000 },
  "VoidEngine": { income: 150000000000000, price: 15000000000000000 },
  "EventHorizonHub": { income: 250000000000000, price: 25000000000000000 },
  "QuantumSingularity": { income: 400000000000000, price: 40000000000000000 },
  "OmegaConstruct": { income: 600000000000000, price: 60000000000000000 },
  "HyperRealityForge": { income: 900000000000000, price: 90000000000000000 },
  "MultiverseEngine": { income: 1500000000000000, price: 150000000000000000 },
  "OmniverseCore": { income: 2500000000000000, price: 250000000000000000 },
  "InfinityForge": { income: 4000000000000000, price: 400000000000000000 },
  "GodForge": { income: 6000000000000000, price: 600000000000000000 },
  "CosmosCore": { income: 9000000000000000, price: 900000000000000000 },
  "UltimateConstruct": { income: 15000000000000000, price: 1500000000000000000 },
  "AbsoluteMachine": { income: 25000000000000000, price: 2500000000000000000 },
  "InfinityEngine": { income: 40000000000000000, price: 4000000000000000000 },
  "RealityOverlord": { income: 60000000000000000, price: 6000000000000000000 },
  "UniverseOverseer": { income: 90000000000000000, price: 9000000000000000000 },
  "CosmosOverlord": { income: 100000000000000000, price: 10000000000000000000 },
  "RealitySovereign": { income: 150000000000000000, price: 15000000000000000000 },
  "InfinityOverlord": { income: 200000000000000000, price: 20000000000000000000 },
  "Omniscience": { income: 300000000000000000, price: 30000000000000000000 },
  "Omnipotence": { income: 500000000000000000, price: 50000000000000000000 },
  "EternityEngine": { income: 750000000000000000, price: 75000000000000000000 },
  "Chronoverse": { income: 1000000000000000000, price: 100000000000000000000 },
  "AlphaOmega": { income: 1500000000000000000, price: 150000000000000000000 },
  "Primordial": { income: 2000000000000000000, price: 200000000000000000000 },
  "Allfather": { income: 3000000000000000000, price: 300000000000000000000 },
  "SingularityOverlord": { income: 5000000000000000000, price: 500000000000000000000 },
  "MetaOverseer": { income: 7500000000000000000, price: 750000000000000000000 },
  "ParadoxCore": { income: 10000000000000000000, price: 1000000000000000000000 },
  "AnsibleGrid": { income: 15000000000000000000, price: 1500000000000000000000 },
  "Continuum": { income: 20000000000000000000, price: 2000000000000000000000 },
  "Overmind": { income: 30000000000000000000, price: 3000000000000000000000 },
  "Pantheon": { income: 50000000000000000000, price: 5000000000000000000000 },
  "SingularityArray": { income: 75000000000000000000, price: 7500000000000000000000 },
  "OmniMatrix": { income: 100000000000000000000, price: 10000000000000000000000 },
  "Hypercosm": { income: 150000000000000000000, price: 15000000000000000000000 },
  "Totality": { income: 200000000000000000000, price: 20000000000000000000000 }
};


function showProperty(bal, property){
  const last = Object.keys(propertyDict)[Object.keys(propertyDict).length-1]
  if(!propertyDict[property]) return false;
  if(property == last) return bal > propertyDict[last].price;
  else if((propertyDict[property].price < bal/2 || propertyDict[property].price > bal*2)) return false
  else return true;
}

function App() {
  const [bal, setBal] = useState(() => {
    const saved = localStorage.getItem("balance");
    return saved ? parseInt(saved) : 0;
  });
  const [properties, setProperties] = useState(() => {
    const savedProperties = JSON.parse(localStorage.getItem("properties")) || {};
    let beginningProperties = {};
    for(const property in propertyDict) beginningProperties[property] = savedProperties[property] ?? 0;
    return beginningProperties;
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
      <div className="h-screen w-screen flex flex-col items-center justify-around m-10 p-10">
        <div className="flex flex-col gap-5">
        <p className="text-3xl">
            Balance : ${abbreviateNumber(bal)}
          </p>
          <p className="text-3xl">
            Passive Income : ${abbreviateNumber(income)}/sec
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-30 items-center justify-around w-screen p-5">
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
