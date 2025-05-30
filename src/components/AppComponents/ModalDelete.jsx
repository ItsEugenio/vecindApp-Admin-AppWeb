import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import axios from "axios";
import { Trash } from "@phosphor-icons/react";
import { showToast } from "./ShowToast";

function ModalDelete({
  open,
  onOpenChange,
  neighborhoodId,
  neighborhoodName,
  type,
}) {
  const [openConfirm, setOpenConfirm] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const api = "https://vecindapp.up.railway.app";

  const deleteNeighborhood = async () => {
    const id = neighborhoodId;
    try {
      const response = await axios.delete(`${api}/neighborhoods/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      showToast.success(
        "Vecindario eliminado correctamente",
        "Datos guardados"
      );
      navigate("/vecindarios");
    } catch (error) {
      showToast.error(
        "Ocurrio un error al eliminar",
        "Intente de nuevo"
      );
    }
  };

  const deleteResidencial = async () => {
    const id = neighborhoodId;
    try {
      const response = await axios.delete(`${api}/residents/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      showToast.success(
        "Residente eliminado correctamente",
        "Datos guardados"
      );
      navigate(0);
    } catch (error) {
      
      showToast.error(
        "Ocurrio un error al eliminar al residente",
        "Intente de nuevo"
      );
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Eliminar {type} {neighborhoodName}
            </DialogTitle>
            <DialogDescription className="mt-8">
              ¿Estás seguro que deseas eliminar este {type}?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Esta acción eliminará el {type} seleccionado. Para confirmar, haz
              clic en el botón eliminar.
            </p>
          </div>
          <DialogFooter className="flex justify-center">
            <Button onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={() => setOpenConfirm(true)}>
              <Trash size={28} />
              Elimiar {type}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openConfirm} onOpenChange={setOpenConfirm}>
        <DialogContent className="sm:max-w-[400px] ">
          <DialogHeader>
            <DialogTitle>
              Esta seguro de eliminar el {type}: {neighborhoodName}
            </DialogTitle>
            <DialogDescription>
              Esta accion no puede revertirse, ¿Esta seguro de continuar?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex justify-center">
            {type === "vecindario" ? (
              <Button
                onClick={() => deleteNeighborhood()}
                variant="destructive"
              >
                Si, Eliminar {type}
              </Button>
            ) : (
              <Button onClick={() => deleteResidencial()} variant="destructive">
                Si, Eliminar {type}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalDelete;
