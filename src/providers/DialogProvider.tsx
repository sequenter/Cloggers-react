import { DialogContext } from '@hooks/useDialog';

import { type ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: ReactNode;
}

export const DialogProvider = ({ children }: Props) => {
  const [dialog, setDialog] = useState<ReactNode>(null);

  const close = () => setDialog(null);

  const open = (node: ReactNode) => setDialog(node);

  return (
    <DialogContext.Provider value={{ close, open }}>
      {children}

      {dialog !== null ? createPortal(dialog, document.body) : null}
    </DialogContext.Provider>
  );
};
