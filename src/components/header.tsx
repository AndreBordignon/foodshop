import { Pizza, Home, UtensilsCrossed } from "lucide-react";
import { Separator } from "./ui/separator";
import { NavLink } from "./nav-link";
import { ThemeToggle } from "./theme/theme-toggle";
import { AccountMenu } from "./account-menu";
import BarcodeIcon from "./icons/barcode";

export function Header() {
  const urlParams = location.search;
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Pizza className="h-6 w-6" />
        <Separator orientation="vertical" className="h-6" />

        <nav className="align-center flex space-x-5 active:text-red-500 lg:space-x-6">
          <NavLink to={`/${urlParams}`}>
            <Home className="h-4 w-5" />
            Início
          </NavLink>
          <NavLink to={`/products${urlParams}`}>
            <BarcodeIcon className="h-4 w-5" />
            Produtos
          </NavLink>
          <NavLink to={`/orders${urlParams}`}>
            <UtensilsCrossed className="h-4 w-5" />
            Pedidos
          </NavLink>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </div>
  );
}
