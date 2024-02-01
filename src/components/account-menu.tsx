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
import { getSelectedRestaurant } from "@/api/restaurant-info";
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
  const restaurantId = searchParams.get("restaurant");

  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserInfo(),
  });
  const { mutateAsync: logOutFunction } = useMutation({
    mutationFn: signOut,
  });

  const { data: userSelectedRestaurant, isLoading: isLoadingRestaurant } =
    useQuery({
      queryKey: ["get-selected-restaurant", restaurantId],
      queryFn: () => getSelectedRestaurant(Number(restaurantId)),
    });
  useEffect(() => {
    if (
      user?.restaurants &&
      user?.restaurants.length > 0 &&
      !userSelectedRestaurant
    ) {
      setSearchParams({ restaurant: user.restaurants[0].id });
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
                  userSelectedRestaurant?.image_url ||
                  "https://dummyimage.com/800x800/bababa/000000.png&text=restaurant+not+found"
                }
                className="h-[30px] w-[30px] rounded-full"
              />
              {userSelectedRestaurant?.name?.split("-")[0] || ""}
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
                  Trocar de Restaurante
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
            {user?.restaurants?.map((restaurant) => (
              <Button
                className="items-left relative flex h-[50px] cursor-pointer justify-between"
                key={restaurant.id}
                variant={"ghost"}
                onClick={() => {
                  setSearchParams((searchParams) => {
                    // Add the new query param value to the queryString
                    searchParams.set("restaurant", restaurant.id);
                    searchParams.delete("dialog");
                    return searchParams;
                  });
                }}
              >
                <div className="flex w-[256px] items-center">
                  <img
                    src={
                      restaurant.image_url ||
                      "https://dummyimage.com/800x800/bababa/000000.png&text=restaurant+not+found"
                    }
                    className="mr-4 h-[40px] w-[40px] rounded-full"
                  />
                  {restaurant.name}
                </div>
                {restaurantId == restaurant.id && (
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
