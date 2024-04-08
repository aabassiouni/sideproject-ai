"use client";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

type CopyToClipboardButtonProps = {
  textToCopy: string;
};

const CopyToClipboardButton = ({ textToCopy }: CopyToClipboardButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
  };

  return (
    <button
      type="button"
      className="rounded border-2 border-slate-300 bg-slate-100 p-2 active:animate-click dark:border-gray-700 dark:bg-gray-950"
      onClick={handleCopyClick}
    >
      {isCopied ? <Check className="h-4 w-4" color="green" /> : <Copy className="h-4 w-4" />}
    </button>
  );
};

export default CopyToClipboardButton;
