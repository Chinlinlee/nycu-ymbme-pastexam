export interface IUploadForm {
    semNo: number;
    uploader: string;
    teachersName: string;
    courseId: number;
    category: string;
    description: string;
    file: File;
}

export interface IUploadProgressResponse {
    progress: number;
    progressNum: number;
    semNo: number;
    category: string;
    teachersName: string;
    uploadedDataId: number;
    uploader: string;
    createdAt: string;
    updatedAt: string;
}