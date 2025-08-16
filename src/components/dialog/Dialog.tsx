import { type MouseEvent, type ReactNode } from 'react';

import { IconButton } from '@components';

import { useDialog } from '@hooks/useDialog';

import { closeIcon } from '@utils/icon';

interface Props {
  children: ReactNode;
  controls?: ReactNode;
  icon: ReactNode;
  title: string;
  onClose?: Runnable;
}

export const Dialog = ({ children, controls, icon, title, onClose }: Props) => {
  const { close } = useDialog();

  /**
   * Close the dialog and invoke the on close callback.
   */
  const onCloseDialog = () => {
    if (onClose) {
      onClose();
    }

    close();
  };

  /**
   * On dialog click, determine if the backdrop was the click target, and if so, close the dialog.
   * @param {MouseEvent} event Mouse Event
   */
  const onDialogClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      onCloseDialog();
    }
  };

  return (
    <div
      className="flex items-center justify-center fixed bottom-0 top-0 left-0 right-0 z-[999] bg-black/60"
      role="presentation"
      onClick={onDialogClick}
    >
      <div className="flex flex-col gap-2 p-2 border-2 mx-2 w-md max-h-10/12 overflow-hidden m-auto pointer-events-auto border-black bg-grey-100">
        <div className="flex items-center justify-between p-2 border-2 border-grey-50 bg-primary-100">
          {icon}

          <span className="font-bold text-2xl">{title}</span>

          <div className="flex gap-2">
            {controls}

            <IconButton
              title="Close"
              path={closeIcon}
              onClick={onCloseDialog}
            />
          </div>
        </div>

        <div className="flex justify-center border-2 overflow-x-hidden overflow-y-auto border-grey-50 bg-primary-100">{children}</div>
      </div>
    </div>
  );
};
