import { User } from "../auth/auth.model";

export interface Debt {
  id: number;
  description: string;
  amount: number;
  paid: boolean;
  createdAt?: string;
  updatedAt?: string;
  user?: User
}

export interface DebtSummary {
  total: number;
  paid: number;
  pending: number;
}
