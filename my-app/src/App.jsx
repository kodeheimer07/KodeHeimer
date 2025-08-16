import { Route } from "react-router"
import { Routes } from "react-router"
import About from "./pages/About"
import Services from "./pages/Services"
import Navbar from "./components/Navbar"
import { useState,useEffect } from "react"
import ContactUs from "./pages/ContactUs"
import Home from "./pages/Home"
import GradientText from "./components/GradientText"
import Footer from "./components/Footer"
import RouteChangeHandler from "./components/RouteChangeHandler"

function App() {
  return (
     <>
     <RouteChangeHandler></RouteChangeHandler>
     <div className="min-h-screen w-full bg-black">
              <div
               className="fixed  top-0 w-full mx-auto z-[200]"
              >
                <Navbar></Navbar>
             </div>
              <Routes>
                      <Route path="/" element={<Home></Home>}></Route>
                      <Route path="/about" element={<About></About>}></Route>
                      <Route path="/services" element={<Services></Services>}></Route>
                      <Route path="/contactus" element={<ContactUs></ContactUs>}></Route>
              </Routes>
              <Footer></Footer>
     </div>
     </>
  )
}

export default App
