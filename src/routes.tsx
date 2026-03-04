import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { LandingPage } from "./pages/LadingPage";
import { SignupPage } from "./pages/SingUp";

export const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<LandingPage />} />
            <Route path="/singup" element={<SignupPage />} />
        </Route>
    )
)