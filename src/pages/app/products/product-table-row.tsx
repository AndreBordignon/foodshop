import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import { ArrowRight, Search, X } from "lucide-react";
interface Product {
  id: number;
  name: string;
  description: string;
  priceInCents?: number;
  image_url: string;
  createdAt: Date;
  isActive: boolean;
}
export function ProductTableRow({ productData }: any) {
  console.log(productData);
  return (
    <TableRow>
      <TableCell>
        <Button variant="outline" size="xs">
          <Search className="h-3 w-3" />
          <span className="sr-only">Detalhes do produto</span>
        </Button>
      </TableCell>
      <TableCell className="text-mono text-xs font-medium">
        #{productData.id}
      </TableCell>
      <TableCell className="text-muted-foreground">Há 15 minutos</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${productData.isActive ? "bg-emerald-500" : ""} bg-slate-400`}
          />
          {productData.isActive ? "Ativo" : "Inativo"}
        </div>
      </TableCell>
      <TableCell className="font-medium">{productData.name}</TableCell>
      <TableCell className="font-medium">
        {(productData.priceInCents / 100).toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}
      </TableCell>
      <TableCell>
        <Button variant="outline" size="xs">
          <ArrowRight className="mr-2 h-3 w-3" />
          Aprovar
        </Button>
      </TableCell>
      <TableCell>
        <Button variant="ghost" size="xs">
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}
