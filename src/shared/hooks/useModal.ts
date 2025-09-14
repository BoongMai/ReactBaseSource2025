import { useCallback, useState } from 'react';

interface UseModalOptions {
  defaultOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export const useModal = (options: UseModalOptions = {}) => {
  const { defaultOpen = false, onOpen, onClose } = options;

  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [loading, setLoading] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
    onOpen?.();
  }, [onOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  const toggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [isOpen, open, close]);

  const setLoadingState = useCallback((loadingState: boolean) => {
    setLoading(loadingState);
  }, []);

  return {
    isOpen,
    loading,
    open,
    close,
    toggle,
    setLoading: setLoadingState,
  };
};
