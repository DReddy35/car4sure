import { createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
// import Home from "./pages/Home";
// import Policies from "./pages/Policies";
// import Vehicles from "./pages/Vehicles";
// import Coverages from "./pages/Coverages";
// import Policyholders from "./pages/Policyholders";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* <Route path="/" element={<Home />} /> */}
      {/* <Route path="/policies" element={<Policies />} />
      <Route path="/vehicles" element={<Vehicles />} />
      <Route path="/coverages" element={<Coverages />} />
      <Route path="/policyholders" element={<Policyholders />} /> */}
    </>
  )
);

export default router;