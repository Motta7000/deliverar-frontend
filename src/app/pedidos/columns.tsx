"use client";
//Icons
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CachedIcon from "@mui/icons-material/Cached";

import { Pedido } from "@/pedidos";
import { ColumnDef } from "@tanstack/react-table";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { ArrowUpDown, MoreHorizontal } from "lucide-react";
// import { Checkbox } from "@/components/ui/checkbox";
import { Icon } from "@mui/material";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Pedido>[] = [
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Fecha Pedido
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "fecha",
    cell: ({ row }) => {
      const fecha = row.getValue("fecha");
      const formatted = new Date(fecha as string).toLocaleDateString();
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    header: "Nro Pedido",
    accessorKey: "nro_pedido",

    cell: ({ row }) => {
      const importe = row.getValue("importe");
      const formatted = new String(importe as string).toString();
      const number = "#" + formatted;
      return <div className="font-medium">{number}</div>;
    },
  },
  {
    header: "Importe",
    accessorKey: "importe",
    cell: ({ row }) => {
      const importe = row.getValue("importe");
      const formatted = new String(importe as string).toString();
      const number = "$ " + formatted;
      return <div className="font-medium">{number}</div>;
    },
  },
  {
    header: "Estado",
    accessorKey: "estado",
    cell: ({ row }) => {
      const estado = row.getValue("estado");
      const formatted = new String(estado as string).toString();

      if (formatted == "entregado") {
        return (
          <div className="font-medium">
            <CheckCircleIcon color="inherit" width={30} height={30} />
            {formatted}
          </div>
        );
      } else if (formatted == "cancelado") {
        return (
          <div className="font-medium">
            <CancelIcon color="error" width={30} height={30} />
            {formatted}
          </div>
        );
      } else if (formatted == "en proceso") {
        return (
          <div className="font-medium">
            <CachedIcon color="primary" width={30} height={30} />
            {formatted}
          </div>
        );
      }
    },
  },
];
