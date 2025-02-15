'use client';

import { Toast, ToastAction } from '@vibe/core';
import {
  ComponentPropsWithoutRef,
  FC,
  ReactNode,
  useState,
  createContext,
  useContext,
} from 'react';

type Props = {
  children: ReactNode;
};

type ToastData = {
  type: ComponentPropsWithoutRef<typeof Toast>['type'];
  open: ComponentPropsWithoutRef<typeof Toast>['open'];
  actions: ToastAction[];
  children: ComponentPropsWithoutRef<typeof Toast>['children'];
  autoHideDuration: ComponentPropsWithoutRef<typeof Toast>['autoHideDuration'];
  onClose: ComponentPropsWithoutRef<typeof Toast>['onClose'];
};

type ToastDataWithoutOpen = Omit<ToastData, 'open'>;

type ToastContextData = {
  data: ToastDataWithoutOpen;
  toast: (data: Pick<ToastData, 'type' | 'children' | 'actions'>) => void;
};

const defaultData: ToastData = {
  type: 'normal',
  actions: [],
  children: '',
  open: false,
  autoHideDuration: 3000,
  onClose: () => {},
};
export const ToastContext = createContext<ToastContextData>({
  data: defaultData,
  toast: () => {},
});

export const ToastProvider: FC<Props> = ({ children }) => {
  const [data, setData] = useState<ToastDataWithoutOpen>(defaultData);
  const [open, setOpen] = useState(false);

  return (
    <ToastContext.Provider
      value={{
        data,
        toast: (data: Pick<ToastData, 'type' | 'children' | 'actions'>) => {
          setData({
            autoHideDuration: 3_000,
            ...data,
            onClose: () => setOpen(false),
          });
          setOpen(true);
        },
      }}
    >
      <Toast {...data} open={open} />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
