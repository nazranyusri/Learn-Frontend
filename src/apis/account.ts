import { endpoints } from '@/constants';
import type {
  AddAccountRequest,
  AddAccountResponse,
  GetAccountResponse,
  GetAccountsResponse,
} from '@/schemas';
import { http } from '@/services';

export function getAccounts() {
  return http<GetAccountsResponse>(endpoints.getAccounts, {
    method: 'GET',
  });
}

export function getAccount(accountId: string) {
  return http<GetAccountResponse>(`${endpoints.getAccount}/${accountId}`, {
    method: 'GET',
  });
}

export function addAccount(data: AddAccountRequest) {
  return http<AddAccountResponse>(endpoints.addAccount, {
    method: 'POST',
    body: data,
  });
}
