import { accountTypes } from '@/constants';
import { ApiRequestError } from '@/services';

export type AccountType = (typeof accountTypes)[number]['value'];

export type GetAccountsResponse = {
  accountId: string;
  accountName: string;
  accountType: string;
  openingBalance: string;
  updateAtDate: string;
  isSavingsAccount: boolean;
}[];

export type GetAccountResponse = {
  accountId: string;
  accountName: string;
  accountType: string;
  openingBalance: string;
  updateAtDate: string;
  isSavingsAccount: boolean;
};

export type AddAccountRequest = {
  accountName: string;
  openingBalance: number;
  isSavingsAccount: boolean;
  accountType: AccountType;
};

export type AddAccountResponse = {
  accountName: string;
};

export interface UseAddAccountOptions {
  onSuccess?: (data: AddAccountResponse) => void;
  onError?: (error: ApiRequestError) => void;
}
