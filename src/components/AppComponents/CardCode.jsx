import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Blueprint  } from "@phosphor-icons/react";

function CardCode({ data }) {
  const residentialData = data[0];
  return (
    <Card className='py-0 overflow-hidden'>
      <CardHeader className="flex flex-row items-center justify-between bg-primary/5 space-y-0 p-4">
        <CardTitle className="text-2xl font-medium">
          Código Residencial
        </CardTitle>
        <Blueprint size={48} className="text-muted-foreground" />
      </CardHeader>
      <CardContent className='mb-4'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center justify-center p-2 bg-primary/10 rounded-lg border-2 border-primary/20">
                <span className="text-2xl font-mono font-bold text-primary">
                  {residentialData.codigo}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Código único del residencial</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}

export default CardCode;
