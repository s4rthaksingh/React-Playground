import UserContextProvider from "./context/UserContextProvider"

function App() {

  return (
    <div style={{display: "flex", justifyContent:"center", alignItems: "center", height: "100vh"}}>
      <UserContextProvider>
        Hello {user}
      </UserContextProvider>
    </div>
  )
}

export default App
