import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableRow,
  TableHead,
  TableHeader,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { ArrowRight, Search, X } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { ProductTableRow } from "./product-table-row";
import { ProductTableFilters } from "./product-table-filters";
import { Pagination } from "@/components/pagination";
import { checkStatus } from "@/api/sign-in";
import { getAllStoreProducts } from "@/api/products";
import { useSearchParams } from "react-router-dom";

export function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const storeId = searchParams.get("store");
  const { data: products, isLoading } = useQuery({
    queryKey: ["products", storeId],
    queryFn: () => getAllStoreProducts(storeId),
  });
  console.log(products);
  return (
    <>
      <Helmet title="Produtos" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>

        <div className="space-y-2.5">
          <ProductTableFilters />

          <div className="bproduct rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[140px]">Identificador</TableHead>
                  <TableHead className="w-[180px]">Realizado há</TableHead>
                  <TableHead className="w-[140px]">Status</TableHead>
                  <TableHead>Nome do produto</TableHead>
                  <TableHead className="w-[160px]">Valor do produto</TableHead>
                  <TableHead className="w-[164px]"></TableHead>
                  <TableHead className="w-[132px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products &&
                  products.map((product: any, index: any) => {
                    return (
                      <ProductTableRow key={index} productData={product} />
                    );
                  })}
              </TableBody>
            </Table>
          </div>
          <Pagination pageIndex={0} totalCount={105} perPage={10} />
        </div>
      </div>
    </>
  );
}
