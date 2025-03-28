import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import ModalTable from "./ModalTable";
import axios from "axios";
import { Trash } from "@phosphor-icons/react";
import ModalDelete from "./ModalDelete";
import { showToast } from "./ShowToast";

function TableResidents({ housesData }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openNeigh, setOpenNeigh] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectResidencial, setSelectResidencial] = useState("");
  const [idResidencial, setIdResidencial] = useState("");
  const [logs, setLogs] = useState([]);
  const itemsPerPage = 5;
  const api = "https://vecindappback-production.up.railway.app";
  const token = localStorage.getItem("token");

  const filteredHouses = housesData.filter(
    (house) =>
      house.calle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      house.numeroCasa.toString().includes(searchTerm)
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredHouses.length / itemsPerPage)
  );
  const paginatedHouses = filteredHouses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const getData = async (id, name) => {
    try {
      const response = await axios.get(
        `${api}/security-guards/log/residence/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setLogs(response.data);
      setSelectResidencial(name);
      setOpenNeigh(true);
    } catch (error) {
      showToast.error("Ocurrio un error al eliminar", "Intente de nuevo");
    }
  };

  const modalDelete = (id, name) => {
    setIdResidencial(id);
    setSelectResidencial(name);
    setOpenDelete(true);
  };
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Registro de Casas</CardTitle>
          <CardDescription>Lista de residenciales</CardDescription>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por calle o número..."
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Calle</TableHead>
                <TableHead>Número de Casa</TableHead>
                <TableHead>Modo Visita</TableHead>
                <TableHead>Registros</TableHead>
                <TableHead>Eliminar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedHouses.length > 0 ? (
                paginatedHouses.map((house, index) => (
                  <TableRow key={index}>
                    <TableCell>{house.calle}</TableCell>
                    <TableCell>{house.numeroCasa}</TableCell>
                    <TableCell>
                      <Badge
                        variant={house.modoVisita ? "success" : "destructive"}
                      >
                        {house.modoVisita ? "Activo" : "Inactivo"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => getData(house.id, house.calle)}
                        variant="blue"
                      >
                        Registros
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => modalDelete(house.id, house.calle)}
                        variant="destructive"
                      >
                        <Trash />
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-4">
                    No se encontraron resultados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {filteredHouses.length > 0 && (
            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }).map((_, i) => {
                    // Show first page, last page, and pages around current page
                    if (
                      i === 0 ||
                      i === totalPages - 1 ||
                      (i >= currentPage - 2 && i <= currentPage)
                    ) {
                      return (
                        <PaginationItem key={i}>
                          <PaginationLink
                            isActive={currentPage === i + 1}
                            onClick={() => setCurrentPage(i + 1)}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }

                    // Show ellipsis for skipped pages
                    if (i === 1 && currentPage > 3) {
                      return <PaginationEllipsis key="ellipsis-1" />;
                    }

                    if (i === totalPages - 2 && currentPage < totalPages - 2) {
                      return <PaginationEllipsis key="ellipsis-2" />;
                    }

                    return null;
                  })}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
      <ModalTable
        open={openNeigh}
        onOpenChange={setOpenNeigh}
        data={logs}
        name={selectResidencial}
      />
      <ModalDelete
        open={openDelete}
        onOpenChange={setOpenDelete}
        neighborhoodId={idResidencial}
        neighborhoodName={selectResidencial}
        type="residencial"
      />
    </>
  );
}

export default TableResidents;
