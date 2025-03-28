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

function TableGuardsModal({ data }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filtra los datos por nombre, placa de carro o vigilante
  const filteredEntries = data.filter(
    (entry) =>
      entry.email.toLowerCase().includes(searchTerm.toLowerCase()) 
    
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
        <CardTitle>Registro de Entradas de vigilantes</CardTitle>
        <CardDescription>
          Lista de registros de entrada de vigilantes
        </CardDescription>
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por email del vigilantes"
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
             
              <TableHead>Email</TableHead>
              <TableHead>Fecha de Entrada</TableHead>
              <TableHead>Fecha de Salida</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedEntries.length > 0 ? (
              paginatedEntries.map((entry) => (
                <TableRow key={entry.id}>
                  
                  <TableCell>{entry.email}</TableCell>
                  <TableCell>
                    {new Date(entry.entrada).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(entry.salida).toLocaleDateString()}
                  </TableCell>
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

export default TableGuardsModal;

