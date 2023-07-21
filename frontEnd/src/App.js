import Header from "./components/Header/Header";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import JokeCard from "./components/JokeCard/JokeCard";

// export const GlovalContext = createContext();
// import Ruta1 from "./Ruta1";
// import Ruta2 from "./Ruta2"; 

function App() {
  return (
    <>
      <Header title="WAHAHA" /> 
      <hr className="hr" /> 

      <div className="body">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<JokeCard />} />
            <Route path="/otro" element={<h1>OTRO</h1>} />
          </Routes> 
        </BrowserRouter>
      </div>
    </>
  );
};



export default App;


