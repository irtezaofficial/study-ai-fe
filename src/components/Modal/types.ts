import {ModalTypeEnums} from '@Constants/enums';

export interface ModalFooterProps extends Partial<ModalTypes> {}

export interface ModalHeaderProps extends Partial<ModalTypes> {}

export interface ModalTypes {
  children?: React.ReactNode;
  onSuccess?: (e: React.ChangeEvent<any>) => void;
  onClose?: () => void;
  onOpen?: (data: unknown) => void;
  modalRef: React.RefObject<ModalRefType>;
  customBody?: React.ReactNode;
  closeOnSuccess?: boolean;
  showClose?: boolean;
  isLoading?: boolean;
  data?: unknown;
  closeOnOutsideClick?: boolean;
  defaultOpen?: boolean;
  handleClose?: () => void;
  handleSuccess?: (e: React.ChangeEvent<any>) => void;
  contentClassName?: string;
  isForm?: boolean;
  title?: string;
  footerClassName?: string;
  showCancel?: boolean;
  showSave?: boolean;
  saveText?: string;
  cancelText?: string;
  description?: React.ReactNode;
  headerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  footerStart?: React.ReactNode;
  footerEnd?: React.ReactNode;
  isDestroyOnUnmount?: boolean;
  closeButtonClassName?: string;
  childrenContainerClassName?: string;
  contractName?: string;
  documentType?: string;
}

export type ModalRefType<T = unknown> =
  | {open: (data?: T) => void; close: () => void; toggle: () => void}
  | undefined;

export interface ModalStateType {
  type?: ModalTypeEnums;
  id?: string;
}
