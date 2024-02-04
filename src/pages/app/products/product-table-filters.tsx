import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CheckCircle2Icon, PlusIcon, Search, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

export function ProductTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { register, formState, handleSubmit } = useForm();
  const addProductToStore = async () => {
    return;
  };
  return (
    <form
      onSubmit={handleSubmit(addProductToStore)}
      className="flex items-center justify-between gap-2"
    >
      <Dialog open={searchParams.get("newProductDialog") == "open"}>
        <div className="align-center flex flex-row items-center gap-2">
          <span className="text-sm font-semibold">Filtros:</span>
          <Input placeholder="ID do pedido" className="h-8 w-auto" />
          <Input placeholder="Nome do cliente" className="h-8 w-[320px]" />
          <Select>
            <SelectTrigger className="h-8 w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="canceled">Cancelados</SelectItem>
              <SelectItem value="proccessing">Em andamento</SelectItem>
              <SelectItem value="delivering">Em entrega</SelectItem>
              <SelectItem value="delivered">Entregue</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" variant="outline" size="xs">
            <Search className="h-3 w-3" />
            Filtrar resultados
          </Button>
          <Button type="button" variant="secondary" size="xs">
            <X className="h-3 w-3" />
            Remover filtros
          </Button>
        </div>
        <Button
          variant={"outline"}
          type="button"
          size={"default"}
          onClick={(e) => {
            setSearchParams((searchParams) => {
              // Add the new query param value to the queryString
              searchParams.set("newProductDialog", "open");
              return searchParams;
            });
          }}
        >
          <PlusIcon className="h-4 w-6 pr-2" />
          Adicionar produto
        </Button>{" "}
        <DialogContent
          onInteractOutside={() => {
            setSearchParams((searchParams) => {
              // Add the new query param value to the queryString
              searchParams.delete("newProductDialog");
              return searchParams;
            });
          }}
        >
          <DialogHeader>
            <DialogTitle>Adicione as informações do produto</DialogTitle>
          </DialogHeader>
          <DialogDescription className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do produto</Label>
              <Input {...register("name")} id="name" type="tel" />
            </div>{" "}
            <div className="space-y-2">
              <Label htmlFor="category">Categoria do produto</Label>
              <Input {...register("category")} id="category" type="tel" />
            </div>{" "}
            <div className="space-y-2">
              <Label htmlFor="price">Preço do produto (R$)</Label>
              <Input {...register("price")} id="price" type="tel" />
            </div>{" "}
            <div className="space-y-2">
              <Label htmlFor="description">Descrição do produto</Label>
              <Input {...register("description")} id="description" type="tel" />
            </div>
            <div className="flex justify-end space-x-4">
              <Button
                type="submit"
                variant="secondary"
                className="flex hover:bg-red-600"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex bg-emerald-600 hover:bg-emerald-800"
              >
                Cadastrar
              </Button>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </form>
  );
}
