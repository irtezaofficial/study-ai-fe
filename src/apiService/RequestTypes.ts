export enum DeviceType {
  Android = 1,
  iOS = 2,
  Web = 3,
}

export enum UploadDocumentTypes {
  Image = 0,
  Video = 1,
  Pdf = 2,
  Audio = 3,
  Document = 4,
  Archive = 5,
}

export interface ListRequest {
  keyword?: string;
  pageNumber?: number;
  pageSize?: number;
  status?: number;
}

export type BaseTokenRequest = {
  deviceId?: string;
  deviceType?: DeviceType;
  fcmToken?: string;
  appVersion?: string;
  deviceName?: string;
};

export interface TokenRequest extends BaseTokenRequest {}

export type UpdateProfileRequest = {
  pictureId: number;
  firstName: string;
  lastName: string;
};

export type UpdateProfilePictureRequest = {
  pictureId: number | null;
};

export type AnswerCheckerRequest = {
  question: string;
  answer: string;
};

export type QuizCheckerRequest = {
  file: File;
  ContextType: string;
};

export type UploadDocumentInitRequest = {
  name: string | null;
  extension: string;
  size: number | null;
  isPrivate: boolean;
  fileType: UploadDocumentTypes;
};

export type ChangePasswordRequest = {
  oldPassword: string;
  newPassword: string;
  logOutOfAllAccounts: boolean;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type VerifyOtpRequestRequest = {
  otp: string;
  email: string;
};

export type ResetPasswordRequest = {
  email: string;
  password: string;
  token: string;
};
