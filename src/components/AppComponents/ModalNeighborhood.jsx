import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router";
import axios from "axios";
import { Pencil, PlusCircle } from "@phosphor-icons/react";
import { showToast } from "./ShowToast";

const estadosMexico = [
  "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas", "Chihuahua","Ciudad de México",
  "Coahuila", "Colima", "Durango","Estado de México", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco",
  "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla", "Querétaro", "Quintana Roo",
  "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas"
];


function ModalNeighborhood({ open, onOpenChange, put, data }) {
  const [newNeighborhood, setNewNeighborhood] = useState({
    nombre: "",
    direccion: "",
    colonia: "",
    estado: "",
    numeroCasas: "",
    numeroVigilantes: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const api = "https://vecindapp.up.railway.app";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewNeighborhood((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const allFieldsFilled = Object.values(newNeighborhood).every(
      (value) => value.trim() !== ""
    );
    setIsButtonDisabled(!allFieldsFilled);
  }, [newNeighborhood]);

  const handleEstadoChange = (value) => {
    setNewNeighborhood((prev) => ({ ...prev, estado: value }));
  };

  const validateUpdate = () => {
    if (
      parseInt(newNeighborhood.numeroCasas, 10) < data.numeroCasasRegistradas ||
      parseInt(newNeighborhood.numeroVigilantes, 10) < data.numeroVigilantesRegistados
    ) {
      showToast.error("Los valores de casas o vigilantes no pueden ser menores a los registrados.", "Revisa los datos");
      return false;
    }
    return true;
  };

  const saveNewNieghborood = async () => {
    if (!validateUpdate()) return;

    try {
      await axios.patch(
        `${api}/neighborhoods/${data.id}`,
        {
          ...newNeighborhood,
          numeroCasas: parseInt(newNeighborhood.numeroCasas, 10),
          numeroVigilantes: parseInt(newNeighborhood.numeroVigilantes, 10),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      showToast.success("Vecindario actualizado correctamente", "Datos guardados");
      navigate(0);
    } catch (error) {
      showToast.error("Ocurrió un error al actualizar", "Intente de nuevo");
    }
  };

  const createNeigh = async () => {
    try {
      await axios.post(
        `${api}/neighborhoods`,
        {
          ...newNeighborhood,
          numeroCasas: parseInt(newNeighborhood.numeroCasas, 10),
          numeroVigilantes: parseInt(newNeighborhood.numeroVigilantes, 10),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      showToast.success("Vecindario creado correctamente", "Datos guardados");
      navigate(0);
    } catch (error) {
      showToast.error("Ocurrió un error al crear", "Intente de nuevo");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {put ? "Actualizar Datos del vecindario" : "Agregar un vecindario"}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {Object.keys(newNeighborhood).map((key) => (
            <div key={key} className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor={key} className="text-center">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Label>
              {key === "estado" ? (
                <Select onValueChange={handleEstadoChange}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder={put ? `${data.estado}` : "Seleccione un estado"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {estadosMexico.map((estado) => (
                        <SelectItem key={estado} value={estado}>{estado}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  id={key}
                  name={key}
                  type={key.includes("numero") ? "number" : "text"}
                  placeholder={put ? `${data[key]}` : `Ingrese ${key}`}
                  required
                  value={newNeighborhood[key]}
                  onChange={handleChange}
                  className="col-span-3"
                />
              )}
            </div>
          ))}
        </div>
        <DialogFooter className="flex justify-center">
          <Button variant="destructive" onClick={() => onOpenChange(false)}>Cancelar</Button>
          {put ? (
            <Button onClick={saveNewNieghborood} variant="success" disabled={isButtonDisabled}>
              <Pencil /> Actualizar datos
            </Button>
          ) : (
            <Button onClick={createNeigh} variant="success" disabled={isButtonDisabled}>
              <PlusCircle /> Agregar Vecindario
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ModalNeighborhood;
