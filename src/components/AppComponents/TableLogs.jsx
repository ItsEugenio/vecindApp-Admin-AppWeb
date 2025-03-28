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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function TableLogs({ data, neigh }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 5;

 
  const filteredEntries = data.filter(
    (entry) =>
      entry.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.placaCarro.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.vigilante.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.residencia.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Cálculo de paginación
  const totalPages = Math.max(
    1,
    Math.ceil(filteredEntries.length / itemsPerPage)
  );
  const paginatedEntries = filteredEntries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Resetear la paginación cuando cambia el filtro de búsqueda
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  

  return (
    <Card className="overflow-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Registro de Entradas</CardTitle>
        <CardDescription>
          Lista de registros de entrada de visitantes
        </CardDescription>
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por residencia, nombre, placa o vigilante..."
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
              <TableHead>Residencia</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Fecha de Entrada</TableHead>
              <TableHead>Placa de Carro</TableHead>
              <TableHead>Vigilante</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedEntries.length > 0 ? (
              paginatedEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.residencia}</TableCell>
                  <TableCell>{entry.nombre}</TableCell>
                  <TableCell>
                    {new Date(entry.fechaEntrada).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{entry.placaCarro}</TableCell>
                  <TableCell>{entry.vigilante}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  No se encontraron resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {filteredEntries.length > 0 && (
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }).map((_, i) => {
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
  );
}

export default TableLogs;
