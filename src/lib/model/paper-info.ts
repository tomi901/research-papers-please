
export interface UserInfo {
    id: number;
    name: string;
}

export interface PaperUploadInfo {
    title: string;
    abstract: string;
}

export interface PaperInfo {
    id: number;
    title: string;
    author: UserInfo;
    abstract: string;
    uploadDate: Date;
    reviews: ReviewInfo[];
    status: PaperStatus;
}

export interface ReviewInfo {
    id: number;
    reviewer: UserInfo;
    summary: string;
    approved: boolean;
}

export interface ReviewUploadData {
    paperId: number;
    summary: string;
    approved: boolean;
}

export type PaperStatus = 'under_review' | 'published' | 'rejected';
