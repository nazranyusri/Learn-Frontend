import { endpoints } from '@/constants';
import type { AddAccountRequest, AddAccountResponse, GetAccountsResponse } from '@/schemas';
import { http } from '@/services';

export function getAccounts() {
  return http<GetAccountsResponse>(endpoints.getAccounts, {
    method: 'GET',
  });
}

export function addAccount(data: AddAccountRequest) {
  return http<AddAccountResponse>(endpoints.addAccount, {
    method: 'POST',
    body: data
  });
}
