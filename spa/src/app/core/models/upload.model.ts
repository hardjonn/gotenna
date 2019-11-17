export interface UploadModel {
  file: File | null;
}

export interface UploadState {
  uploading: boolean;
  error: string | null;
}
