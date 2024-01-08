import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type Payment = {
  id: string;
  title: string;
  task: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => (
      <Link href={`/lessons/${row.getValue("id")}`} className="capitalize">
        {row.getValue("id")}
      </Link>
    ),
  },
  {
    accessorKey: "title",
    header: "Заголовок",
    cell: ({ row }) => (
      <Link href={`/lessons/${row.getValue("id")}`} className="capitalize">
        {row.getValue("title")}
      </Link>
    ),
  },
  {
    accessorKey: "task",
    header: "Задача",
    cell: ({ row }) => (
      <Link href={`/lessons/${row.getValue("id")}`} className="capitalize">
        {(row.getValue("task") as string).substring(0, 40)}...
      </Link>
    ),
  },
];
