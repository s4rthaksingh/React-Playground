import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [bal, setBal] = useState(() => {
    const saved = localStorage.getItem('balance');
    return saved ? parseInt(saved) : 99;
  });
  const [properties, setProperties] = useState(() => {
    const savedProperties = localStorage.getItem("properties");
    return savedProperties ? JSON.parse(savedProperties) : {};
  })

  useEffect(() => {
    localStorage.setItem("balance", bal.toString());
    localStorage.setItem("properties", JSON.stringify(properties))
  },[bal, properties])

  return (
    <>
      <div className="h-screen w-screen flex items-center justify-around">
        <Workplace setBal={setBal} bal={bal} />
        <BuyOption setBal={setBal} bal={bal} properties={properties} setProperties = {setProperties}/>
        <Properties properties={properties}/>
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

function BuyOption({bal, setBal, properties, setProperties}){
  const buyApartmentHandler = () => {
    setBal(bal-100);
    let newProperties = {...properties, 'Apartment' : (properties["Apartment"] || 0) + 1};
    setProperties(newProperties);
  }

  if(bal >= 100) return <>
    <button onClick={buyApartmentHandler}>Buy apartment ($100)</button>
  </>
}

function Properties({properties}){
  return <>
    <div>
      Your properties :
      {Object.keys(properties).map((property, index) =>
        {return <li key={index}>{property} : {properties[property]}</li>}
      )}
    </div>
  </>
}

export default App;
