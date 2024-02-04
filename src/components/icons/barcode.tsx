import * as React from "react";

function BarcodeIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-barcode"
      {...props}
    >
      <path d="M3 5v14M8 5v14M12 5v14M17 5v14M21 5v14" />
    </svg>
  );
}

export default BarcodeIcon;
