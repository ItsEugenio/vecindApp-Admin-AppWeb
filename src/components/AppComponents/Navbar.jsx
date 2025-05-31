import React from "react";
import { BuildingApartment, UserMinus, Sun, Moon } from "@phosphor-icons/react";
import logo from '../../assets/iconVA1.png'
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { showToast } from "./ShowToast";
import { useTheme } from "../../context/ThemeContext";

function Navbar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const imgLogo = logo;
  
  const cerrar = () => {
    showToast.success("Termino sesión exitosamente");
    localStorage.removeItem("token");
    navigate('/');
  }

  return (
    <nav className="border-b bg-background px-4 py-3 flex items-center">
      <div className="flex items-center gap-2 justify-between w-full">
        <div className="flex items-center">
          {/* <BuildingApartment size={64} /> */}
          <img src={imgLogo} alt="logo" width='90px'/>
          <h1 className="text-2xl  font-semibold">VecindApp Admin</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            onClick={toggleTheme} 
            variant="outline" 
            size="icon"
            className="hover:bg-accent"
          >
            {theme === 'light' ? <Moon size={40} /> : <Sun size={40} />}
          </Button>
          <Button 
            onClick={()=> cerrar()} 
            className="bg-blue-950 text-white shadow-xs hover:bg-blue-950/90 focus-visible:ring-blue-950/20 dark:focus-visible:ring-blue-950/40"
          >
            <UserMinus size={40}/>
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
