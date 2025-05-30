import {
  checkFileValidity
} from '@Services/fileUploadService';

import {
  Box,
  BoxProps,
  FormHelperText,
  FormLabel
} from '@mui/material';
import { useMemo, useRef } from 'react';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import { toast } from 'react-toastify';

function FileUpload({
  children,
  allowedFileTypes,
  limit,
  value = [],
  disabled,
  disabledMessage = '',
  onChange,
  onUpload,
  name,
  defaultComponentProps,
  error,
  multiple,
  uploadContainerProps,
  uploadOnServer = true,
  allowOnly,
  inputRef,
  ...rest
}: FileUploadTypes) {
  const uploadRef = useRef<HTMLInputElement | null>(null);

  function handleFilesChange(files: any) {
    const filesInArray: File[] = Object.values(files ?? {});
    if (uploadRef.current) {
      uploadRef.current.value = '';
    }

    const isValid = checkFileValidity({
      filesInArray,
      value: value,
      limit,
      allowedFileTypes,
      allowOnly,
    });
    if (!isValid) return;

    let file = filesInArray[0];
    console.log('filesInArray',file)
    filesInArray.map((file) => {
      onUpload(file);
    });
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    handleErrorWhenDisabled();
    preventDefault(e);
    handleFilesChange(e.dataTransfer.files);
  }

  function handleErrorWhenDisabled() {
    if (disabled && disabledMessage) return toast.error(disabledMessage);
  }

  const {isDisabled, cursor} = useMemo(() => {
    const isDisabled =
      disabled ?? (value?.length >= (limit ?? 0) && Boolean(limit));

    return {
      isDisabled,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
    };
  }, [disabled, value?.length, limit]);

  function fileInputOnChange({
    target: {files},
  }: React.ChangeEvent<HTMLInputElement>) {
    handleFilesChange(files);
  }

  function handleClickUpload() {
    uploadRef.current?.click();
  }

  return (
    <Box flex={1}>
      {Boolean(rest.label) && (
        <FormLabel sx={{color: 'text.primary', mb: 0.5, display: 'block'}}>
          {rest.label}
        </FormLabel>
      )}
      <Box
        {...uploadContainerProps}
        onDragOver={preventDefault}
        onDrop={handleDrop}
        onClick={handleErrorWhenDisabled}>
        <Box
          {...rest}
          accept={allowedFileTypes?.join(',')}
          component="input"
          disabled={isDisabled}
          multiple={multiple}
          onChange={fileInputOnChange}
          type="file"
          hidden
          id={name}
          ref={uploadRef}
        />

        <Box
          onClick={handleClickUpload}
          sx={{
            cursor,
          }}>
          {children}
        </Box>
      </Box>
      <FormHelperText error> {error}</FormHelperText>
    </Box>
  );
}
export default FileUpload;

function preventDefault(e: React.DragEvent<HTMLDivElement>) {
  e.preventDefault();
}

export type DefaultComponentProps = {
  title?: string;
  Icon?: React.ComponentType<any>;
  showInContainer?: boolean;
  isMultiple?: boolean;
  value: UploadedFile[];
};

export type FileUploadTypes = {
  label?: string;
  name: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  accept?: string;
  error: string;
  multiple?: boolean;
  uploadContainerProps?: BoxProps;
  defaultComponentProps?: Omit<DefaultComponentProps, 'value'>;
  children?: string | JSX.Element | JSX.Element[];
  disabled?: boolean;
  disabledMessage?: string;
  limit?: number;
  allowedFileTypes?: string[];
  value: UploadedFile[];
  onChange: ControllerRenderProps<FieldValues, any>['onChange'];
  onUpload: (file: File) => void,
  uploadOnServer?: boolean;
  allowOnly?: string;
};
export type FileType = 'image' | 'video' | 'application';
export type UploadedFile = {
  url: string;
  file: File;
  name: string;
  id?: string;
  size: string;
  progress?: number;
  MediaId: number;
  error?: boolean;
  uploading?: boolean;
  fileType?: FileType;
};
