import { type ReactNode, createContext, useContext } from 'react';

interface Dialog {
  close: Runnable;
  open: Consumer<ReactNode>;
}

export const DialogContext = createContext<Dialog>({ close: () => {}, open: () => {} });

export const useDialog = () => useContext(DialogContext);
