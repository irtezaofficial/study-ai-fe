import SearchIcon from "@Assets/icons/SearchIcon.svg"
import { CameraAlt } from "@mui/icons-material"
import { CircularProgress } from "@mui/material"
import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { QuizChecker } from "~/src/apiService/QuizChecker"
import type { QuizCheckerRequest } from "~/src/apiService/RequestTypes"
import { FileUploadModal } from "~/src/components/FileUploadModal/FileUploadModal"
import BasicTextInput from "~/src/components/Inputs/BasicTextInput"
import { NavigationRoutes } from "~/src/navigation/NavigationRoutes"
import { CenteredBox } from "~/src/theme/GeneralStyledComponents"
import Palette from "~/src/theme/Palette"
import { getOrSetQueryString } from "~/src/utils/utils"
import FileUploadResultDialog from "../../../components/FileUploadResult/FileUploadResultDialog"
import type { SearchBarProps } from "./types"

export default function SearchBar({ autoFocus = true, defaultValue = undefined }: SearchBarProps) {
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)
  const [dialogOpen, setResultsDialogOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadResult, setUploadResult] = useState<any>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  let q = getOrSetQueryString()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    q = getOrSetQueryString(e.target.value)
  }

  const onKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      navigate(NavigationRoutes.APP_ROUTES.SEARCHRESULT.replace(":q", String(q)))
      e.preventDefault()
    }
  }

  const onSearchClick = () => {
    navigate(NavigationRoutes.APP_ROUTES.SEARCHRESULT.replace(":q", String(q)))
  }

  const { mutate: quizChecker } = QuizChecker({
    onSuccess: (response) => {
      if (response) {
        setUploadResult(response)
      }
      setIsProcessing(false)
    },
    onError: (response) => {
      if (response) {
        setUploadResult(response)
      } else {
        setUploadResult({
          error: "Failed to process the uploaded file",
          success: false,
        })
      }
      setIsProcessing(false)
    },
  })

  const handleFileUpload = (file: File, contextType: string) => {
    setUploadedFile(file)
    setIsProcessing(true)
    setResultsDialogOpen(true)
    setModalOpen(false)

    try {
      const payload: QuizCheckerRequest = {
        ContextType: contextType,
        file: file,
      }
      quizChecker(payload)
    } catch (error) {
      setUploadResult({
        error: "Failed to process the uploaded file",
        success: false,
      })
      setIsProcessing(false)
    }
  }

  const handleResultsClose = () => {
    setResultsDialogOpen(false)
    setUploadResult(null)
    setUploadedFile(null)
    setIsProcessing(false)
  }

  const handleModalClose = () => {
    setModalOpen(false)
  };

  const handleOnCameraClick = () => {
    setModalOpen(true)
  };

  return (
    <CenteredBox>
      <BasicTextInput
        placeholder={"Search for a Topic"}
        sx={{
          width: { xs: "100%", sm: 850 },
          "& .MuiInputBase-root": {
            borderRadius: 100,
            backgroundColor: Palette.custom.searchBar,
          },
        }}
        autoFocus={autoFocus}
        defaultValue={defaultValue}
        icons={{
          start: {
            onClick: handleOnCameraClick,
            icon: isProcessing ? <CircularProgress size={20} /> : <CameraAlt/> 
          },
          end: {
            onClick: onSearchClick,
            icon: <SearchIcon />,
          },
        }}
        onKeyDown={onKeyPress}
        onChange={onChange}
      />

      <FileUploadModal
        open={modalOpen}
        onClose={handleModalClose}
        onUpload={handleFileUpload}
        disabled={isProcessing}
      />

      <FileUploadResultDialog
        open={dialogOpen}
        onClose={handleResultsClose}
        result={uploadResult}
        error={!uploadResult?.ReviewedAnswer ? uploadResult : undefined}
        file={uploadedFile}
        isProcessing={isProcessing}
      />
    </CenteredBox>
  )
}
