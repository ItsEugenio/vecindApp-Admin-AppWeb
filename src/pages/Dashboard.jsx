import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/AppComponents/Navbar";
import CardResidencial from "@/components/AppComponents/CardResidencial";
import CardDataRegister from "@/components/AppComponents/CardDataRegister";
import CardCode from "@/components/AppComponents/CardCode";
import TableResidents from "@/components/AppComponents/TableResidents";
import axios from "axios";
import CardSkeleton from "@/components/AppComponents/CardSkeleton";
import { ArrowLeft } from "@phosphor-icons/react";
import TableLogs from "@/components/AppComponents/TableLogs";
import { showToast } from "@/components/AppComponents/ShowToast";

function Dashboard() {
  const [neighborhood, setNeighborhood] = useState([]);
  const [residentes, setResidentes] = useState([]);
  const [logsNeigh, setLogsNeigh] = useState([]);
  const [residencialName, setResidencialName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const residencialId = location.state?.residencialId;
  const api = "https://vecindappback-production.up.railway.app";
  const token = localStorage.getItem("token");

  const getNeighborhood = async () => {
    try {
      const response = await axios.get(`${api}/neighborhoods`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const dataFilter = filterNeighborhood(response.data);
      const neighName = dataFilter[0].nombre;
      setResidencialName(neighName);
      setNeighborhood(dataFilter);
    } catch (error) {
      showToast.error("Ocurrio al obtener los datos", "Recargue la pagina");
    }
  };

  const getResidentes = async () => {
    try {
      const response = await axios.get(`${api}/neighborhoods/residents`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const dataFilter = filterResidents(response.data);
      setResidentes(dataFilter);
    } catch (error) {
      showToast.error(
        "Ocurrio al obtener los datos",
        "Recargue la pagina"
      );
    }
  };

  const filterNeighborhood = (data) => {
    const filter = data.filter((conjunto) => conjunto.id === residencialId);
    return filter.length > 0 ? filter : [];
  };

  const filterResidents = (data) => {
    const filter = data.find((conjunto) => conjunto.id === residencialId);
    return filter ? filter.residents : [];
  };

  const getLogsNeigh = async () => {
    try {
      const response = await axios.get(
        `${api}/security-guards/log/neighborhood/${residencialId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setLogsNeigh(response.data);
    } catch (error) {
      showToast.error(
        "Ocurrio al obtener los datos",
        "Recargue la pagina"
      );
    }
  };

  useEffect(() => {
    if (neighborhood === undefined) {
      navigate("/vecindarios");
    }
  }, [neighborhood]);

  useEffect(() => {
    getNeighborhood();
    getResidentes();
    getLogsNeigh();
  }, [residencialId]);

  const navigateBack = () => {
    navigate("/vecindarios");
  };

  return (
    <>
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="ml-8 pt-4">
          <Button variant="ghost" className="pl-0" onClick={navigateBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
        </div>
        <div className="ml-8 pt-2">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Vecindario {residencialName}
          </h1>
        </div>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          {neighborhood.length === 0 ? (
            <>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </div>
            </>
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <CardResidencial residenciales={neighborhood} home={false} />
                <CardDataRegister data={neighborhood} house={true} />
                <CardDataRegister data={neighborhood} house={false} />
                <CardCode data={neighborhood} />
              </div>
              <div>
                <TableResidents housesData={residentes} />
              </div>
              <div>
                <TableLogs data={logsNeigh} />
              </div>
            </>
          )}
        </main>
      </main>
    </>
  );
}

export default Dashboard;
