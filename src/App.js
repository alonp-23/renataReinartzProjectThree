import "./App.css";
import { Routes, Route } from "react-router-dom";
import Makeup from "./components/Makeup";
import Cart from './components/Cart';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Makeup />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;