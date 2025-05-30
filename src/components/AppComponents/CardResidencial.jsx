import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BuildingApartment } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import ModalNeighborhood from "./ModalNeighborhood";
import CardSkeleton from "./CardSkeleton";
import ModalDelete from "./ModalDelete";
import { Trash, Pencil } from "@phosphor-icons/react";

function CardResidencial({ residenciales, home }) {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [put, setPut] = useState(false);
  const [idNeigh, setIdNeigh] = useState("");
  const [nameNeigh, setNameNeigh] = useState("");
  const navigate = useNavigate();

  const goToDashboard = (residencialSelect) => {
    const residencialId = residencialSelect;
    navigate("/dashboard", { state: { residencialId } });
  };

  return (
    <>
      {residenciales.map((residencial) => (
        <>
          <Card className="py-0 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 bg-primary/5">
              <CardTitle className="text-2xl font-medium">
                Información General
              </CardTitle>
              <BuildingApartment size={48} className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <span className="font-semibold">Nombre:</span>
                  {residencial.nombre}
                </div>
                <div>
                  <span className="font-semibold">Dirección:</span>
                  {residencial.direccion}
                </div>
                <div>
                  <span className="font-semibold">Colonia:</span>
                  {residencial.colonia}
                </div>
                <div>
                  <span className="font-semibold">Estado:</span>
                  {residencial.estado}
                </div>
                {home ? (
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Código:</span>
                    <Badge
                      variant="outline"
                      className="font-mono text-sm bg-primary/10 border-primary/20"
                    >
                      {residencial.codigo}
                    </Badge>
                  </div>
                ) : (
                  ""
                )}

                <div className="mt-4 mb-4">
                  {home ? (
                    <Button
                      className="w-full "
                      onClick={() => goToDashboard(residencial.id)}
                     
                    >
                      Administrar
                    </Button>
                  ) : (
                    <div className="flex w-full justify-center gap-4">
                      <Button
                        className="w-1/2 "
                        onClick={() => {
                          setOpen(true);
                          setPut(true);
                        }}
                        variant="success"
                      >
                        <Pencil />
                        Editar
                      </Button>
                      <Button
                        className="w-1/2"
                        onClick={() => {
                          setOpenDelete(true);
                          setIdNeigh(residencial.id);
                          setNameNeigh(residencial.nombre);
                        }}
                        variant="destructive"
                      >
                        <Trash />
                        Eliminar
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          <ModalNeighborhood
            open={open}
            onOpenChange={setOpen}
            put={put}
            data={residencial}
          />
          <ModalDelete
            open={openDelete}
            onOpenChange={setOpenDelete}
            neighborhoodId={idNeigh}
            neighborhoodName={nameNeigh}
            type="vecindario"
          />
        </>
      ))}
    </>
  );
}

export default CardResidencial;
