export const enum UploadDocumentEnums {
  Image,
  Video,
  Pdf,
  Audio,
  Document,
  Archive,
  Text,
}

export const FileTypes: {
  [key: string]: UploadDocumentEnums;
} = {
  application: UploadDocumentEnums.Pdf,
  image: UploadDocumentEnums.Image,
  video: UploadDocumentEnums.Video,
};

export const enum FileTypeEnums {
  Image = 'image',
  Video = 'video',
  Application = 'application',
}

export enum ModalTypeEnums {
  View = 'View',
  Edit = 'Edit',
  Amend = 'Amend',
  Add = 'Add',
}
