import { Close, CloudUpload, Info, QuestionAnswer } from "@mui/icons-material"
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormLabel,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  styled,
  TextField,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
} from "@mui/material"
import type React from "react"
import { useState } from "react"
import { toast } from "react-toastify"
import { AllowedFileTypes } from "~/src/constants/app"
import Palette from "~/src/theme/Palette"

export function FileUploadModal({
  open,
  onClose,
  onUpload,
  allowedFileTypes = AllowedFileTypes.application,
}: FileUploadModalProps) {
  const [file, setFile] = useState<File | null>(null)
  const [contextType, setContextType] = useState("")
  const [dragActive, setDragActive] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      validateAndSetFile(selectedFile)
    }
  }

  const validateAndSetFile = (selectedFile: File) => {
    // Check file type
    if (allowedFileTypes && !allowedFileTypes.includes(selectedFile.type)) {
      const allowedExtensions = allowedFileTypes.map((type) => type.split("/")[1]).join(", ")
      toast.error(`Invalid file type. Only ${allowedExtensions} files are allowed.`)
      return
    }

    // Check file size (10MB limit)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (selectedFile.size > maxSize) {
      toast.error("File size must be less than 10MB")
      return
    }

    setFile(selectedFile)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0])
    }
  }

  const handleSubmit = () => {
    if (!file) {
      toast.error("Please select a file")
      return
    }
    if (!contextType.trim()) {
      toast.error("Please enter a context type")
      return
    }

    onUpload(file, contextType.trim())
    handleClose()
  }

  const handleClose = () => {
    onClose()
    setFile(null)
    setContextType("")
    setDragActive(false)
  }

  const removeFile = () => {
    setFile(null)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const TakeFileInput = () => (
    <input type="file" hidden onChange={handleFileChange} accept={allowedFileTypes?.join(",")} />
  );

  const FormatTooltipContent = () => (
    <Box 
      maxWidth={300}
      margin={"0px"}
      padding={"0px"}>
      <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
        Document Format Requirements:
      </Typography>
      <List dense sx={{ py: 0 }}>
        {/* <ListItem sx={{ px: 0, py: 0.5 }}>
          <ListItemIcon sx={{ minWidth: 24 }}>
            <Topic fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Topic"
            secondary="Start with the main topic/subject"
            primaryTypographyProps={{ variant: "body2", fontWeight: "medium" }}
            secondaryTypographyProps={{ variant: "caption" }}
          />
        </ListItem> */}
        <ListItem sx={{ px: 0, py: 0.5 }}>
          <ListItemIcon sx={{ minWidth: 24 }}>
            <QuestionAnswer fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText
            color={Palette.primary.main}
            primary="Questions & Answers"
            secondary="List questions clearly with corresponding answers"
            primaryTypographyProps={{ variant: "body2", fontWeight: "medium" }}
            secondaryTypographyProps={{ variant: "caption" }}
          />
        </ListItem>
      </List>
      <Typography variant="caption"  sx={{ mt: 1, display: "block" }}>
        This helps our AI better understand and analyze your document structure.
      </Typography>
    </Box>
  )

  const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Typography fontWeight={"medium"} >
          Upload Document
        <LightTooltip title={<FormatTooltipContent />} placement="right" >
          <IconButton >
            <Info color="primary" />
          </IconButton>
        </LightTooltip>
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <Typography variant="subtitle1" fontWeight={'medium'} color="text.secondary" sx={{ mb: 3 }}>
          Upload a file and provide a topic/context for analysis
        </Typography>

        <Box sx={{ mb: 3 }}>
          {/* Context Type Input */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <FormLabel sx={{ color: "text.primary", fontWeight: "medium" }}>
              Topic
            </FormLabel>
          </Box>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Enter the topic or context for your document.."
            value={contextType}
            onChange={(e) => setContextType(e.target.value)}
            variant="outlined"
            size="small"
          />
        </Box>

        {/* File Upload Area */}
        <Box sx={{ mb: 2 }}>
          <FormLabel sx={{ color: "text.primary", fontWeight: "medium", mb: 1, display: "block" }}>Document</FormLabel>
          <Paper
            variant="outlined"
            sx={{
              p: 3,
              textAlign: "center",
              border: "2px dashed",
              borderColor: dragActive ? "primary.main" : "grey.300",
              backgroundColor: dragActive ? "primary.50" : "transparent",
              // cursor: "pointer",
              transition: "all 0.2s ease",
              // "&:hover": {
              //   borderColor: "grey.400",
              //   backgroundColor: "grey.50",
              // },
            }}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {file ? (
              <Box>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "grey.50",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CloudUpload sx={{ mr: 1, color: "text.secondary" }} />
                    <Box sx={{ textAlign: "left" }}>
                      <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                        {file.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatFileSize(file.size)}
                      </Typography>
                    </Box>
                  </Box>
                  <IconButton size="small" onClick={removeFile}>
                    <Close fontSize="small" />
                  </IconButton>
                </Paper>
              </Box>
            ) : (
              <>
               <CloudUpload sx={{ fontSize: 48, color: "text.primary", mb: 1 }} />
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Drop your file here, or
                  <Button
                    component="label"
                    variant="text"
                    sx={{ textDecoration: "underline" }}
                  >
                    browse
                    {TakeFileInput()}
                  </Button>
                </Typography>
                <Typography variant="caption" color="text.primary">
                  PDF, DOC, DOCX files up to 10MB
                </Typography> 
              </>
            )}
          </Paper>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button 
          onClick={handleClose} 
          variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!file || !contextType.trim()}
          startIcon={<CloudUpload color="action" />}
          sx={{
                bgcolor: Palette.primary.main,
                '&:hover': {
                  bgcolor: Palette.primary.main,
                  boxShadow: '0 2px 11px rgba(0,0,0,1)',
                }}}
        >
          <Typography color={'white'}>Upload & Analyze</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  )
}
