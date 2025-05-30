import LoadingButton from '@Components/LoadingButton/LoadingButton';
import TitleHeader from '@Components/TitleHeader/TitleHeader';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Dialog,
  DialogProps,
  IconButton,
} from '@mui/material';
import {useImperativeHandle} from 'react';
import useDisclosure from '../hooks/useDisclousre';

export default function Modal({
  children,
  onSuccess,
  customBody,
  closeOnSuccess,
  title,
  modalRef,
  onClose,
  containerStyles = {},
  bodyContainerProps,
  okText = 'Save',
  showClose = false,
  isForm = false,
  paperStyles = {},
  cancelText = 'Cancel',
  showSave = true,
  showCancel = true,
  isLoading = false,
  footerProps,
  successBtnProps,
  cancelBtnProps,
  onShow,
  ...rest
}: ModalTypes) {
  const {
    isOpen: open,
    onAdditionStateChange,
    onClose: closeModal,
    onOpen,
    onToggle,
    additionalState,
  } = useDisclosure();

  function handleClose() {
    // @ts-ignore
    closeModal();
    onClose?.();
  }

  useImperativeHandle(
    modalRef,
    () => ({
      open: (data?: any) => {
        onOpen(data);
        onShow?.();
      },
      close: handleClose,
      toggle: () => onToggle(),
      setModalState: onAdditionStateChange,
      getModalState: () => additionalState,
    }),
    [additionalState],
  );
  function handleSuccess(
    e: React.FormEvent<HTMLFormElement> | React.ChangeEvent<any>,
  ) {
    onSuccess?.(e);

    if (closeOnSuccess) {
      handleClose();
    }
  }

  return (
    <Dialog
      sx={{
        '& .MuiPaper-root': {
          borderRadius: 1,
          padding: 3,
          minWidth: {xs: 'auto', sm: 450},
          ...paperStyles,
        },
        '& .MuiModal-backdrop': {
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        },
        ...containerStyles,
      }}
      open={open}
      onClose={handleClose}
      {...rest}>
      {children ?? (
        <>
          {showClose && (
            <Box
              component={IconButton}
              onClick={handleClose}
              position="absolute"
              top={5}
              right={5}>
              <CloseRoundedIcon sx={{fontSize: 30, color: 'black'}} />
            </Box>
          )}
          {title && (
            <Box>
              <TitleHeader title={title} />
            </Box>
          )}

          <Box
            {...(isForm && {component: 'form', onSubmit: handleSuccess})}
            {...bodyContainerProps}>
            {customBody}

            <Box display="flex" gap={1} justifyContent="end" {...footerProps}>
              {showSave && (
                <Box
                  {...successBtnProps}
                  type={isForm ? 'submit' : 'button'}
                  onClick={handleSuccess}
                  component={LoadingButton}
                  isLoading={isLoading}
                  variant="main"
                  fontWeight={600}
                  fontSize={18}
                  width={{xs: '100%'}}>
                  {okText}
                </Box>
              )}
              {showCancel && (
                <Box
                  {...cancelBtnProps}
                  component={Button}
                  width={{xs: '100%'}}
                  fontWeight={600}
                  fontSize={18}
                  variant="outlined"
                  onClick={handleClose}>
                  {cancelText}
                </Box>
              )}
            </Box>
          </Box>
        </>
      )}
    </Dialog>
  );
}

export type ModalTypes = {
  children?: React.ReactNode;
  onSuccess?: (
    e: React.FormEvent<HTMLFormElement> | React.ChangeEvent<any>,
  ) => void;
  onShow?: () => void;
  onClose?: () => void;
  modalRef: React.MutableRefObject<ModalRefType>;
  title?: string;
  okText?: string;
  cancelText?: string;
  paperStyles?: {[key: string]: any};
  isForm?: boolean;
  customBody?: React.ReactNode;
  containerStyles?: {[key: string]: any};
  closeOnSuccess?: boolean;
  showClose?: boolean;
  showSave?: boolean;
  footerProps?: BoxProps;
  showCancel?: boolean;
  bodyContainerProps?: BoxProps;
  isLoading?: boolean;
  successBtnProps?: ButtonProps;
  cancelBtnProps?: ButtonProps;
} & Omit<DialogProps, 'open'>;

export type ModalRefType =
  | {
      open: (data?: any) => void;
      close: () => void;
      toggle: () => void;
      setModalState: (state: any) => void;
      getModalState: () => any;
    }
  | undefined;
