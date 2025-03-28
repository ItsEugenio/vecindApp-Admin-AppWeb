import React, {useState, useEffect} from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HouseLine, ShieldStar  } from "@phosphor-icons/react";
import ModalTable from './ModalTable';
import axios from 'axios';
import { showToast } from './ShowToast';

function CardDataRegister({data,house}) {
    const residencialData = data[0]
    const [logsGuards, setLogsGuards] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const api = "https://vecindappback-production.up.railway.app";
    const token = localStorage.getItem("token");

    const getLogsGuard = async () => {
      try {
        const response  = await axios.get(
          `${api}/security-guards/guard/neighborhood/${residencialData.id}`,        {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        setLogsGuards(response.data)
      } catch (error) {
        showToast.error(
          "Ocurrio un error al cargar los datos",
          "Recargue la pagina"
        );
      }
    }

    useEffect(() => {
      getLogsGuard()
    }, [data]);
    
    
  return (
    <>
    {house ? (
          <Card className='py-0 overflow-hidden'>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 bg-primary/5">
            <CardTitle className="text-2xl font-medium">Casas</CardTitle>
            <HouseLine size={48} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {residencialData.numeroCasasRegistradas} / {residencialData.numeroCasas}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((residencialData.numeroCasasRegistradas / residencialData.numeroCasas) * 100)}% registradas
            </p>
            <div className="mt-4 h-2 w-full rounded-full bg-muted mb-4">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${(residencialData.numeroCasasRegistradas / residencialData.numeroCasas) * 100}%` }}
              />
            </div>
           
          </CardContent>

        </Card>
    ) : (
      <>
        <Card className='py-0 overflow-hidden'>
            <CardHeader className="flex flex-row items-center justify-between bg-primary/5 space-y-0 p-4">
              <CardTitle className="text-2xl font-medium">Vigilantes</CardTitle>
              <ShieldStar size={48} className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {residencialData.numeroVigilantesRegistados} / {residencialData.numeroVigilantes}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round((residencialData.numeroVigilantesRegistados / residencialData.numeroVigilantes) * 100)}%
                registrados
              </p>
              <div className="mt-4 h-2 w-full rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{
                    width: `${(residencialData.numeroVigilantesRegistados / residencialData.numeroVigilantes) * 100}%`,
                  }}
                />
              </div>
            </CardContent>
            <CardFooter>
          <div className='flex w-full mt-14 mb-4'>
              <Button className='w-full' onClick={() => setOpenModal(true)} variant='blue'>
                Ver registros de entrada
              </Button>
            </div>
          </CardFooter>
          </Card>
          <ModalTable 
          open={openModal}
          onOpenChange={setOpenModal}
          data={logsGuards}
          name={residencialData.nombre}
          guard={true}
          />
          </>
    )}
    </>
  )
}

export default CardDataRegister
