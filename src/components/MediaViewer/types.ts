import { UploadedFile } from "@Components/Inputs/FileUpload";
import { ModalTypes } from "@Components/Modal/Modal";
import { BoxProps } from "@mui/material";
import {
  DetailedHTMLProps,
  HtmlHTMLAttributes,
  VideoHTMLAttributes,
} from "react";

export type RenderMediaProps = {
  imageProps?: BoxProps & HtmlHTMLAttributes<HTMLImageElement>;
  videoProps?: BoxProps &
    DetailedHTMLProps<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>;
  isSelected?: boolean;
  generalProps?: BoxProps;
  mediaItem: UploadedFile;
};

export type MediaViewerProps = {
  media: UploadedFile[];
  data?: number;
  viewOnly?: boolean;
};
export type MediaViewerModalProps = ModalTypes & MediaViewerProps;
