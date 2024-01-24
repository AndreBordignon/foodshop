import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Dashboard() {
  const [color, setColor] = useState("#fff");
  return (
    <div className="flex h-screen items-center justify-center">
      <Button onClick={() => alert("clicado")} className={`[${color}]`}>
        Ola mundo 2
      </Button>
    </div>
  );
}
