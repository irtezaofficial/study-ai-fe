import {QuizCheckerResponse} from '~/src/apiService/ResponseTypes';

export interface FileUploadResultDialogProps {
  open: boolean;
  onClose: () => void;
  result: QuizCheckerResponse;
  error?: any;
  file?: File | null;
  isProcessing: boolean;
}
