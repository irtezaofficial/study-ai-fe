import {
  CheckCircle,
  Error,
  InsertDriveFile,
} from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { getSizeToShow } from '~/src/services/fileUploadService';
import Palette from '~/src/theme/Palette';
import { FileUploadResultDialogProps } from './FileUploadResultDialogProps';

const FileUploadResultDialog: React.FC<FileUploadResultDialogProps> = ({
  open,
  onClose,
  result,
  error,
  file,
  isProcessing,
}) => {
  // const handleCopyToClipboard = (text: string) => {
  //   navigator.clipboard.writeText(text).then(() => {
  //     toast.success('Copied to clipboard!');
  //   }).catch(() => {
  //     toast.error('Failed to copy to clipboard');
  //   });
  // };

  const renderProcessingState = () => (
    <Box display="flex" flexDirection="column" alignItems="center" py={4}>
      <CircularProgress size={60} sx={{ mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        Processing your file...
      </Typography>
      <Typography variant="body2" color="text.secondary" textAlign="center">
        Please wait while we analyze your uploaded document.
      </Typography>
    </Box>
  );

  const renderErrorState = () => (
    <Box display="flex" flexDirection="column" alignItems="center" py={4}>
      <Error color="error" sx={{ fontSize: 60, mb: 2 }} />
      <Typography variant="h6" gutterBottom color="error">
        Processing Failed
      </Typography>
      <Typography variant="body2" color="text.secondary" textAlign="center">
        {error?.data?.detail || 'An error occurred while processing your file.'}
      </Typography>
    </Box>
  );

  const renderSuccessState = () => (
    <Box>
      <Box display="flex" alignItems="center" mb={3}>
        <CheckCircle color="success" sx={{ fontSize: 40, mr: 2 }} />
        <Box>
          <Typography variant="h6">
            File Processed Successfully
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {file?.name || 'Your document has been analyzed'}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* File Information */}
      {file && (
        <Box mb={3}>
          <Typography variant="subtitle1" gutterBottom fontWeight="bold">
            File Information
          </Typography>
          <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
            <Box display="flex" alignItems="center" mb={1}>
              <InsertDriveFile sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="body2">
                <strong>Name:</strong> {file?.name}
              </Typography>
            </Box>
            <Typography variant="body2" gutterBottom>
              <strong>Size:</strong> {getSizeToShow(file?.size)}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Type:</strong> Word Document
            </Typography>
          </Paper>
        </Box>
      )}

      {/* Extracted Content or Summary */}
      {result?.ReviewedAnswer && (
        <Box mb={3}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <TextField 
              fullWidth            
              multiline
              value={result.ReviewedAnswer}
            ></TextField>
          </Box>
        </Box>
      )}
    </Box>
  );

  const getDialogContent = () => {
    if (isProcessing) return renderProcessingState();
    if (error) return renderErrorState();
    if (result) return renderSuccessState();
    return null;
  };

  const getDialogActions = () => {
    if (isProcessing) {
      return (
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
                bgcolor: Palette.primary.light,
                '&:hover': {
                  bgcolor: Palette.primary.light,
                  boxShadow: '0 2px 11px rgba(0,0,0,1)',
                }}}
        >
          <Typography color={Palette.primary.main}>Cancel</Typography>
        </Button>
      );
    }

    if (error) {
      return (
        <>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
                bgcolor: Palette.primary.main,
                '&:hover': {
                  bgcolor: Palette.primary.main,
                  boxShadow: '0 2px 11px rgba(0,0,0,1)',
                }}}
        >
          <Typography color={'white'}>Close</Typography>
        </Button>
        </>
      );
    }

    return (
      <Button
        onClick={onClose}
        variant="contained"
        sx={{
              bgcolor: Palette.primary.main,
              '&:hover': {
                bgcolor: Palette.primary.main,
                boxShadow: '0 2px 11px rgba(0,0,0,1)',
              }}}
      >
        <Typography color={'white'}>Close</Typography>
      </Button>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={isProcessing ? undefined : onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { minHeight: 400 }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        {isProcessing ? 'Processing Document' : 'Document Analysis Results'}
      </DialogTitle>
      
      <DialogContent dividers>
        {getDialogContent()}
      </DialogContent>
      
      <DialogActions sx={{ p: 2 }}>
        {getDialogActions()}
      </DialogActions>
    </Dialog>
  );
};

export default FileUploadResultDialog;