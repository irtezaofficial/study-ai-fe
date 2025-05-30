import {
  createRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

export default function useDisclosure<AdditionalStateType = unknown>(
  options?: UseDisclosureProps<AdditionalStateType>,
  ref = createRef<any>(),
) {
  const triggerRef = useRef<HTMLElement>();

  const {
    resetOnClose = false,
    closeOnOutsideClick = false,
    defaultState,
    defaultOpen = false,
    closedElement,
  } = options || {};
  const [disclosure, setDisclosure] = useState<{
    isOpen: boolean;
    additionalState?: AdditionalStateType | null;
  }>({
    isOpen: defaultOpen,
    additionalState: defaultState,
  });

  useImperativeHandle(ref, () => ({
    open: onOpen,
    close: onClose,
    toggle: onToggle,
    onAdditionStateChange,
    disclosure,
  }));

  useEffect(() => {
    function onClick(e: MouseEvent) {
      e?.stopPropagation();

      if (!triggerRef.current) {
        return;
      }

      if (
        closeOnOutsideClick &&
        triggerRef.current &&
        !(
          (e.target as Node).isSameNode(triggerRef.current) ||
          triggerRef.current.contains(e.target as Node as Node)
        )
      ) {
        onClose(e);
      }
    }

    window.addEventListener('click', onClick);

    return () => window.removeEventListener('click', onClick);
  }, [closeOnOutsideClick, closedElement]);

  function onOpen(
    state?: AdditionalStateType,
    e?: React.MouseEvent<HTMLElement>,
  ) {
    e?.stopPropagation();
    // Disables Background Scrolling whilst the SideDrawer/Modal is open
    if (typeof window != 'undefined' && window.document) {
      document.body.style.overflow = 'hidden';
    }
    setDisclosure({additionalState: state, isOpen: true});
    options?.onOpen?.();
  }

  function onClose(e?: React.MouseEvent<HTMLElement> | MouseEvent) {
    e?.stopPropagation();
    // Unsets Background Scrolling to use when SideDrawer/Modal is closed
    document.body.style.overflow = 'unset';
    setDisclosure(prev =>
      resetOnClose
        ? {isOpen: false, additionalState: null}
        : {...prev, isOpen: false},
    );
    options?.onClose?.();
  }

  function onAdditionStateChange(state: AdditionalStateType) {
    setDisclosure(prev => ({...prev, additionalState: state}));
  }

  function onToggle(e?: React.MouseEvent<HTMLElement>) {
    e?.stopPropagation();
    setDisclosure(prev => ({...prev, isOpen: !prev.isOpen}));
    if (disclosure.isOpen) {
      // Unsets Background Scrolling to use when SideDrawer/Modal is closed
      document.body.style.overflow = 'unset';
      options?.onClose?.();
    } else {
      // Disables Background Scrolling whilst the SideDrawer/Modal is open
      if (typeof window != 'undefined' && window.document) {
        document.body.style.overflow = 'hidden';
      }
      options?.onOpen?.();
    }
  }

  return {
    ...disclosure,
    ...options,
    onOpen,
    onClose,
    onToggle,
    onAdditionStateChange,
    triggerRef,
  };
}

export type UseDisclosureProps<T> = {
  resetOnClose?: boolean;
  closeOnOutsideClick?: boolean;
  defaultState?: T | null;
  defaultOpen?: boolean;
  closedElement?: string;
  onOpen?: (state?: T, e?: React.MouseEvent<HTMLElement>) => void;
  onClose?: (e?: React.MouseEvent<HTMLElement> | MouseEvent) => void;
};
