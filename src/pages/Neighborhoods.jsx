import React, { useState, useEffect } from "react";
import Navbar from "@/components/AppComponents/Navbar";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "@phosphor-icons/react";
import CardResidencial from "@/components/AppComponents/CardResidencial";
import ModalNeighborhood from "@/components/AppComponents/ModalNeighborhood";
import CardSkeleton from "@/components/AppComponents/CardSkeleton";
import axios from "axios";

function Neighborhoods() {
  const api = "https://vecindapp.up.railway.app";
  const token = localStorage.getItem("token");
  const [residenciales, setResidenciales] = useState([]);
  const [open, setOpen] = useState(false);

  const getResidenciales = async () => {
    try {
      const response = await axios.get(`${api}/neighborhoods`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setResidenciales(response.data);
    } catch (error) {
      showToast.error("Ocurrio al obtener los datos", "Recargue la pagina");
    }
  };

  useEffect(() => {
    getResidenciales();
  }, []);

  return (
    <>
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex flex-col justify-center items-center mb-8 mt-6">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Vecindarios
          </h1>
          <Button
            onClick={() => setOpen(true)}
            className="mt-4"
            variant="success"
          >
            <PlusCircle size={48} />
            Agregar Vecindario
          </Button>
        </div>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <CardResidencial residenciales={residenciales} home={true} />
          </div>
          {residenciales.length === 0 ? (
            <>
              <div className="flex flex-col aling-center text-center">
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                  Agrega un residencial
                </h2>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  <CardSkeleton />
                  <CardSkeleton />
                  <CardSkeleton />
                </div>
              </div>
            </>
          ) : null}
        </main>
      </main>
      <ModalNeighborhood open={open} onOpenChange={setOpen} put={false} />
    </>
  );
}

export default Neighborhoods;
