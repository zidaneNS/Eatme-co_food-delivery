import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import PlaceCart from "./components/PlaceCart";
import Dashboard from "./components/Dashboard";
import LoginPage from "./components/LoginPage";

function App() {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  return (
    <>
      <Header setIsAuth={setIsAuth} />
      {isAuth && (
        <LoginPage setIsAuth={setIsAuth} />
      )}
      <Routes>
        <Route path="/" element={<Home setIsAuth={setIsAuth} />} />
        <Route path="/place-cart" element={<PlaceCart />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
