export interface IUploadFileResponse {
    status: number;
    message: string;
    errors: { [key: string]: any } | null;
}
  