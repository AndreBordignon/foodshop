import {
  Building,
  LogOut,
  ChevronDown,
  Building2,
  Utensils,
  VerifiedIcon,
  Verified,
  Check,
  CheckCircle,
  CheckCircle2Icon,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/api/user-account";
import { useEffect, useLayoutEffect } from "react";

import { useSearchParams } from "react-router-dom";
import { getSelectedStore } from "@/api/store-info";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { signOut } from "@/api/sign-in";
export function AccountMenu() {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const dialog = searchParams.get("dialog");
  const storeId = searchParams.get("store");

  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserInfo(),
  });
  const { mutateAsync: logOutFunction } = useMutation({
    mutationFn: signOut,
  });

  const { data: userSelectedStore, isLoading: isLoadingStore } = useQuery({
    queryKey: ["get-selected-store", storeId],
    queryFn: () => getSelectedStore(Number(storeId)),
  });
  useEffect(() => {
    if (user?.stores && user?.stores.length > 0 && !userSelectedStore) {
      setSearchParams({ store: user.stores[0].id });
    }
  }, [user]);

  return (
    <>
      <Dialog open={dialog === "open"}>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex select-none items-center justify-end gap-2">
              <img
                src={
                  userSelectedStore?.image_url ||
                  "https://dummyimage.com/800x800/bababa/000000.png&text=store+not+found"
                }
                className="h-[30px] w-[30px] rounded-full"
              />
              {userSelectedStore?.name?.split("-")[0] || ""}
              <ChevronDown className="h-4 w-4" />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="mt-1 flex flex-col pl-4">
              <span>{user?.firstName}</span>
              <span className="text-xs font-normal text-muted-foreground">
                {user?.email}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuItem className="mt-1 p-0">
              <Button
                className="mr-2"
                variant="ghost"
                onClick={() => {
                  sessionStorage.clear(), navigate("/sign-in");
                }}
              >
                <Building className="mr-2 w-4" />
                <span>Perfil da Loja</span>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem className="mt-1 p-0 text-rose-500 dark:text-rose-400">
              <Button
                variant={"ghost"}
                onClick={() => {
                  logOutFunction();
                  navigate("/sign-in");
                }}
              >
                <LogOut className="mr-2 w-4" />
                Sair
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem className="mt-1 p-0 text-rose-500 dark:text-rose-400">
              <DialogTrigger>
                <Button
                  onClick={() => {
                    setSearchParams((searchParams) => {
                      // Add the new query param value to the queryString
                      searchParams.set("dialog", "open");
                      return searchParams;
                    });
                  }}
                  variant={"ghost"}
                >
                  <Utensils className="mr-2 w-4" />
                  Trocar de loja
                </Button>
              </DialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DialogContent
          onInteractOutside={() => {
            setSearchParams((searchParams) => {
              // Add the new query param value to the queryString
              searchParams.delete("dialog");
              return searchParams;
            });
          }}
        >
          <DialogHeader>
            <DialogTitle>Trocar loja selecionada</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {user?.stores?.map((store) => (
              <Button
                className="items-left relative flex h-[50px] cursor-pointer justify-between"
                key={store.id}
                variant={"ghost"}
                onClick={() => {
                  setSearchParams((searchParams) => {
                    // Add the new query param value to the queryString
                    searchParams.set("store", store.id);
                    searchParams.delete("dialog");
                    return searchParams;
                  });
                }}
              >
                <div className="flex w-[256px] items-center">
                  <img
                    src={
                      store.image_url ||
                      "https://dummyimage.com/800x800/bababa/000000.png&text=store+not+found"
                    }
                    className="mr-4 h-[40px] w-[40px] rounded-full"
                  />
                  {store.name}
                </div>
                {storeId == store.id && (
                  <CheckCircle2Icon className="text-green-500" />
                )}
              </Button>
            ))}
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
}
