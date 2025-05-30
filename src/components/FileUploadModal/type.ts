interface FileUploadModalProps {
  open: boolean;
  onClose: () => void;
  onUpload: (file: File, contextType: string) => void;
  disabled?: boolean;
  allowedFileTypes?: string[];
}
