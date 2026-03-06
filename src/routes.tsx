import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { LandingPage } from "./pages/LadingPage";
import { SignupPage } from "./pages/SingUp";
import {LoginPage} from "./pages/LoginPage";
//import {DashboardPage} from "./pages/dashboardPage";

export const routes = createBrowserRouter(
    createRoutesFromElements(
       <Route>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      
    </Route>
    )
)