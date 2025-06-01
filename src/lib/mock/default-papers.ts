import type { PaperInfo } from "../model/paper-info";
import { CURRENT_USER, OTHER_USER_1, OTHER_USER_2, OTHER_USER_3 } from "./users";

const defaultPapers: Array<PaperInfo> = [
    {
        id: 1,
        title: "Quantum Computing Applications in Machine Learning",
        author: OTHER_USER_1,
        abstract: "This paper explores the intersection of quantum computing and machine learning, presenting novel algorithms that leverage quantum superposition for enhanced pattern recognition.",
        uploadDate: new Date('2024-01-15'),
        reviews: [
            {
                id: 1,
                reviewer: OTHER_USER_2,
                summary: 'Innovative and forward-thinking. The integration of quantum principles into machine learning algorithms is well-explained and shows strong potential for future applications.',
                approved: true,
            },
            {
                id: 2,
                reviewer: OTHER_USER_3,
                summary: 'Promising topic, but the paper lacks clarity in methodology and offers limited experimental validation to support its claims.',
                approved: false,
            },
        ],
        status: 'under_review',
    },
    {
        id: 2,
        title: "Sustainable Energy Storage Solutions",
        author: OTHER_USER_2,
        abstract: "An analysis of next-generation battery technologies and their potential impact on renewable energy adoption.",
        uploadDate: new Date('2024-01-20'),
        reviews: [
            {
                id: 1,
                reviewer: OTHER_USER_1,
                summary: 'Excellent theoretical foundation. The paper clearly explains complex battery chemistries with strong academic backing.',
                approved: true,
            },
            {
                id: 2,
                reviewer: OTHER_USER_3,
                summary: 'Well-researched and relevant. The author highlights key innovations that could transform the renewable sector.',
                approved: true,
            },
            {
                id: 3,
                reviewer: OTHER_USER_3,
                summary: 'A solid overview of emerging technologies. Would benefit from more real-world case studies, but still very informative.',
                approved: true,
            },
            {
                id: 4,
                reviewer: OTHER_USER_3,
                summary: 'Clear and concise. The connection between storage improvements and policy implications was particularly insightful.',
                approved: true,
            },
            {
                id: 5,
                reviewer: OTHER_USER_3,
                summary: 'Impressive scope. Covers both scientific and economic dimensions of next-gen batteries in a digestible format.',
                approved: true,
            },
        ],
        status: 'published',
    },
];

export default defaultPapers;
