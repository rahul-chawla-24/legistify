import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Lawyers from "./components/Lawyers";
import SignInSide from "./components/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInSide />}></Route>
        <Route path="/lawyers" element={<Lawyers />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
