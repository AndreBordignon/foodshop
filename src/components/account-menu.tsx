import { Building, LogOut, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

export function AccountMenu() {
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="outline"
          className="flex select-none items-center gap-2"
        >
          Food Shop
          <ChevronDown className="h-4 w-4" />
        </Button>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            <span>Andre Bordignon</span>
            <span className="text-xs font-normal text-muted-foreground">
              andrebordignonn@gmail.com
            </span>
          </DropdownMenuLabel>
          <DropdownMenuItem>
            <Building className="mr-2 w-6" />
            <span>Perfil da Loja</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-rose-500 dark:text-rose-400">
            <Button asChild variant={"ghost"}>
              <LogOut
                className="mr-2 w-6"
                onClick={() => {
                  localStorage.clear(), navigate("/sign-in");
                }}
              />
            </Button>
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}
