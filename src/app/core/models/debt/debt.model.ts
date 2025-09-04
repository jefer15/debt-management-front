export interface Debt {
  id: number;
  description: string;
  amount: number;
  createdAt: Date;
  paid: boolean;
  userId: number;
}
