import { Button } from "@/components/ui/button";
import { useState } from "react";
import { UsersReceiptCard } from "./month-users-card";
import { useQuery } from "@tanstack/react-query";
import { checkStatus } from "@/api/sign-in";

export function Dashboard() {
  const { data: statusResponse, isLoading } = useQuery({
    queryKey: ["status"],
    queryFn: () => checkStatus(),
  });
  return (
    <div className="flex h-screen">
      <div className="flex flex-row">
        <div className="mr-2 w-[500px]">
          <UsersReceiptCard />
        </div>
        <div className="mr-2">
          <UsersReceiptCard />
        </div>
        <div className="mr-2">
          <UsersReceiptCard />
        </div>
      </div>
    </div>
  );
}
