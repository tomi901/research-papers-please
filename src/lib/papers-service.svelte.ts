import defaultPapers from "./mock/default-papers";
import type { PaperInfo, PaperUploadInfo, ReviewInfo, ReviewUploadData, UserInfo } from "./model/paper-info";
import { CURRENT_USER } from "./mock/users";

let user = $state(CURRENT_USER);
let wallet = $state({ tokens: 100 });
let papers = $state(defaultPapers);

export const REQUIRED_REVIEW_TOKENS = 10;

export function getUserStore(): UserInfo {
    return user;
}

export function getTokensStore(): { tokens: number } {
    return wallet;
}

export function getPapersStore(): PaperInfo[] {
    return papers;
}

export function addPaper(paperData: PaperUploadInfo) {
    const currentPapers = papers;
    const currentUser = user;
    const newPaper: PaperInfo = {
        id: currentPapers.length + 1,
        abstract: paperData.abstract,
        title: paperData.title,
        author: currentUser,
        reviews: [],
        status: 'under_review',
        uploadDate: new Date(),
    };
    papers = [...currentPapers, newPaper];
}

export function submitReview(reviewData: ReviewUploadData) {
    if (wallet.tokens < REQUIRED_REVIEW_TOKENS) {
        throw new Error('Not enough tokens');
    }

    const currentPapers = papers;
    const currentUser = user;
    const paperIndex = currentPapers.findIndex(p => p.id == reviewData.paperId);
    if (paperIndex < 0) {
        throw new Error(`No paper id ${reviewData.paperId} found.`)
    }
    const paper = currentPapers[paperIndex];

    const review: ReviewInfo = {
        id: paper.reviews.length + 1,
        reviewer: currentUser,
        summary: reviewData.summary,
        approved: reviewData.approved,
    };
    paper.reviews = [...paper.reviews, review];
    wallet.tokens -= REQUIRED_REVIEW_TOKENS;
}
