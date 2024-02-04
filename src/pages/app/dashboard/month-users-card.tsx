import { DollarSign, Loader2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { CardSkeleton } from "./card-skeleton";

export function UsersReceiptCard() {
  const usersReceipt = {
    receipt: 40000,
    diffFromLastMonth: 20,
  };
  const isLoadingUsersReceipt = false;
  return (
    <Card className="h-36">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Receita total (mês)
        </CardTitle>
        {isLoadingUsersReceipt ? (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        ) : (
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        )}
      </CardHeader>
      <CardContent className="space-y-1">
        {usersReceipt ? (
          <>
            <span className="text-2xl font-bold">
              {usersReceipt.receipt.toLocaleString("pt-BR", {
                currency: "BRL",
                style: "currency",
              })}
            </span>
            <p className="text-xs text-muted-foreground">
              <span
                className={
                  usersReceipt.diffFromLastMonth > 0
                    ? "text-emerald-500"
                    : "text-red-500"
                }
              >
                {usersReceipt.diffFromLastMonth > 0
                  ? `+${usersReceipt.diffFromLastMonth}`
                  : usersReceipt.diffFromLastMonth}
                %
              </span>{" "}
              em relação ao mês passado
            </p>
          </>
        ) : (
          <CardSkeleton />
        )}
      </CardContent>
    </Card>
  );
}
