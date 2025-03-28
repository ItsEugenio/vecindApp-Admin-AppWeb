import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TableResidentsModal from "./TableResidentsModal";
import TableGuardsModal from "./TableGuardsModal";

function ModalTable({
  open,
  onOpenChange,
  guard,
  data,
  name
}) {

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[450px] ">
          <DialogHeader>
            <DialogTitle>{guard ? `Registros de entrada y salida de vigilantes al residencial : ${name}`  : `Registros del residencial : ${name}`}</DialogTitle>
          </DialogHeader>
            {guard ? (
              <TableGuardsModal data={data} /> 
            ) : (
              <TableResidentsModal data={data} />
            )}
            
    
          <DialogFooter className="flex justify-center"></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalTable;
