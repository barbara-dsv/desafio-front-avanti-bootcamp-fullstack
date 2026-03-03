import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { LandingPage } from "./pages/LadingPage";

export const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<LandingPage />} />
        </Route>
    )
)