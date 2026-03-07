import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { LandingPage } from "./pages/LadingPage";
import { SignupPage } from "./pages/SingUp";
import {LoginPage} from "./pages/LoginPage";
import ListarUsuarios from "./pages/ListarUsuarios/ListarUsuarios";
import EditarPerson from "./pages/EditarPerson/EditarPesron";
import DeletarPerson from "./pages/DeletarPerson/DeletarPerson";


export const routes = createBrowserRouter(
    createRoutesFromElements(
       <Route>
      <Route path="/" element={<LandingPage />} />
      <Route path="/singup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/listarusuarios" element={<ListarUsuarios/>}/>
      <Route path="/editarperson/:id" element={<EditarPerson />} />
      <Route path="/deletarperson/:id" element={<DeletarPerson />} />
      
    </Route>
    )
)