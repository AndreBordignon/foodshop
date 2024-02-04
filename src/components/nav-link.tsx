import { ComponentProps } from "react";
import { Link, useLocation } from "react-router-dom";

export function NavLink(props: any) {
  const currentPath = location.pathname;

  // Comparação opcionalmente sem parâmetros de consulta

  return (
    <Link
      {...props}
      data-current={currentPath === props.to.split("?")[0]}
      className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[current=true]:text-red-700"
    />
  );
}
