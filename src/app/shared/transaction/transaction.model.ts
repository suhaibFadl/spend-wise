import { User } from 'firebase/auth';

export type TransactionType = "all" | "income" | "outcome";

export type Transaction = {
    id: string;
    title: string;
    budget: number; 
    type: TransactionType;
    date?: Date;
    uid: string;
    // user: User;
}
