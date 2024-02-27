'use client'
import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

type CopyToClipboardButtonProps = {
  textToCopy: string;
}

const CopyToClipboardButton = ({ textToCopy } : CopyToClipboardButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
  };

  return (
    <button className='border-2 border-slate-300 dark:border-gray-700 bg-slate-100 dark:bg-gray-950 p-2 rounded active:animate-click' onClick={handleCopyClick}>
      {isCopied ? <Check className='w-4 h-4' color="green" /> : <Copy className='w-4 h-4' />}
    </button>
  );
};

export default CopyToClipboardButton;
