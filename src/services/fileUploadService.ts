import {UploadedFile} from '@Components/Inputs/FileUpload';
import {toast} from 'react-toastify';

function checkFileValidity({
  filesInArray,
  value,
  limit = 0,
  allowedFileTypes,
  withoutExtension = false,
  allowOnly,
}: CheckFileValidityProps) {
  if (
    Boolean(limit) &&
    (filesInArray.length > limit ||
      (value?.length ?? 0) + filesInArray.length > limit)
  ) {
    toast.error(`You can upload only ${limit} files`);
    return false;
  }

  if (
    allowOnly &&
    !filesInArray.every(
      (file: {[key: string]: any}) => file.type.split('/')[0] === allowOnly,
    )
  ) {
    toast.error(`Invalid File Type, only ${allowOnly} is allowed `);
    return false;
  }

  if (
    allowedFileTypes &&
    !filesInArray.every((file: {[key: string]: any}) =>
      allowedFileTypes?.includes(
        withoutExtension ? file.type.split('/')[0] : file.type,
      ),
    )
  ) {
    toast.error(
      `Invalid File Type  only ${allowedFileTypes
        .map(type => type.split('/')[1])
        .join(', ')} files are allowed `,
    );
    return false;
  }
  return true;
}

function getSizeToShow(size: number) {
  const sizeInKb = size / 1024;
  if (sizeInKb < 1024) {
    return `${sizeInKb.toFixed(2)} KB`;
  }
  const sizeInMb = sizeInKb / 1024;
  return `${sizeInMb.toFixed(2)} MB`;
}

type CheckFileValidityProps = {
  filesInArray: {[key: string]: any}[];
  value?: UploadedFile[];
  limit?: number;
  withoutExtension?: boolean;
  allowedFileTypes?: string[];
  allowOnly?: string;
};

export type UploadedFiles = {
  url?: string;
  file?: File;
  MediaId?: number;
  uploading?: boolean;
};

export {checkFileValidity, getSizeToShow};
