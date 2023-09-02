import React, { useState } from 'react';
import { Button } from '../ui/button';
import { CheckCheck, Copy } from 'lucide-react';

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
    <button className='bg-slate-100 p-1 rounded' onClick={handleCopyClick}>
      {isCopied ? <CheckCheck color="green" /> : <Copy className='' />}
    </button>
  );
};

export default CopyToClipboardButton;

