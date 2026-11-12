import { View, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Layout from '@/components/Layout';
import BasicHeader from '@/components/BasicHeader';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { useAccountById } from '@/hooks/useAccount';
import { formatDate } from '@/utils/formatter';
import Tag from '@/components/Tag';

export default function AccountDetailScreen() {
  const router = useRouter();
  const { accountId } = useLocalSearchParams<{ accountId: string }>();
  const { accountData, isAccountError, accountError } =
    useAccountById(accountId);

  // Mock transaction data mapped to your transactions schema
  const mockTransactions = [
    {
      id: 'tx-01',
      account_id: accountData?.accountId,
      transaction_type: 'INCOME',
      amount: '1500.00',
      description: 'Monthly Salary Deposit',
      transaction_date: '2026-11-12',
      adjustment_direction: null,
    },
    {
      id: 'tx-02',
      account_id: accountData?.accountId,
      transaction_type: 'EXPENSE',
      amount: '45.50',
      description: 'Grocery Shopping at Village Grocer',
      transaction_date: '2026-11-11',
      adjustment_direction: null,
    },
    {
      id: 'tx-03',
      account_id: accountData?.accountId,
      transaction_type: 'EXPENSE',
      amount: '15.00',
      description: 'GrabFood Delivery',
      transaction_date: '2026-11-10',
      adjustment_direction: null,
    },
    {
      id: 'tx-04',
      account_id: accountData?.accountId,
      transaction_type: 'ADJUSTMENT',
      amount: '5.00',
      description: 'Bank reconciliation balance correction',
      transaction_date: '2026-11-09',
      adjustment_direction: 'INCREASE',
    },
  ];

  const handleEdit = () => {
    router.push({
      pathname: '/accounts/edit/[accountId]',
      params: { accountId: accountData?.accountId ?? '' },
    });
  };

  return (
    <Layout>
      <BasicHeader defaultBackRoute="/accounts" />
      <View className="mt-2">
        <Text className="text-3xl font-bold text-text-primary">
          Account Overview
        </Text>
        <Text className="text-text-secondary text-sm mt-1">
          Monitor your balance, configurations, and recent ledger history
        </Text>
      </View>

      <View className="gap-6 mt-6">
        {!isAccountError ? (
          <Card className="gap-4 bg-core-surface border-core-stroke">
            <View className="flex-row justify-between items-start">
              <View>
                <Text className="text-text-secondary text-xs font-medium">
                  Account Name
                </Text>
                <Text className="text-2xl font-bold text-text-primary mt-1">
                  {accountData?.accountName ?? ''}
                </Text>
              </View>
              <Tag variant="basic" label={accountData?.accountType ?? ''} />
            </View>

            <View className="border-t border-core-stroke pt-4">
              <Text className="text-text-secondary text-xs font-medium">
                Opening Balance
              </Text>
              <Text className="text-3xl font-extrabold text-accent-primary font-mono mt-1">
                RM {accountData?.openingBalance ?? 0.0}
              </Text>
            </View>

            <View className="flex-row justify-between pt-4 border-t border-core-stroke text-xs items-center">
              <Text className="text-text-secondary">
                Type:{' '}
                <Text className="text-text-primary font-medium">
                  {accountData?.isSavingsAccount
                    ? 'Savings Account'
                    : 'Standard Account'}
                </Text>
              </Text>
              <Text className="text-text-secondary">
                Updated:{' '}
                <Text className="text-text-primary font-medium font-mono">
                  {formatDate(accountData?.updateAtDate)}
                </Text>
              </Text>
            </View>
          </Card>
        ) : (
          <Card className="items-center justify-center">
            <Text className="text-bear text-base font-semibold mb-1">
              Failed to load accounts
            </Text>
            <Text className="text-text-secondary text-xs text-center">
              {accountError?.message ||
                'Please check your connection and try again.'}
            </Text>
          </Card>
        )}

        {/* Quick Actions Toolbar */}
        <View className="flex-row gap-4">
          <Button
            variant="outline"
            title="Edit Account"
            icon="pencil-outline"
            isFullWidth={false}
            buttonClassName="flex-1"
            onPress={handleEdit}
          />

          <Button
            variant="primary"
            title="Add Transaction"
            icon="add-circle-outline"
            iconColor="#FFFFFF"
            buttonClassName="flex-1"
            onPress={() => {}}
          />
        </View>

        {/* Account-Specific Transactions Feed */}
        <View className="gap-4">
          <View className="flex-row justify-between items-center">
            <Text className="text-text-primary text-base font-bold">
              Recent Activity
            </Text>
            <Button variant="link" title="View All" onPress={() => {}} />
          </View>

          <Card className="bg-core-surface border-core-stroke p-0 overflow-hidden divide-y divide-core-stroke">
            {mockTransactions.length > 0 ? (
              mockTransactions.map((tx) => {
                const isIncome = tx.transaction_type === 'INCOME';
                const isAdjustment = tx.transaction_type === 'ADJUSTMENT';

                const amountColor = isIncome
                  ? 'text-bull'
                  : isAdjustment
                    ? 'text-text-primary'
                    : 'text-bear';

                const signPrefix = isIncome
                  ? '+'
                  : isAdjustment && tx.adjustment_direction === 'INCREASE'
                    ? '+'
                    : '-';

                return (
                  <View
                    key={tx.id}
                    className="p-4 flex-row items-center justify-between"
                  >
                    <View className="flex-row items-center gap-3 flex-1 pr-3">
                      <View
                        className={`w-10 h-10 rounded-xl items-center justify-center border border-core-stroke ${
                          isIncome
                            ? 'bg-bull/10'
                            : isAdjustment
                              ? 'bg-core-stroke/30'
                              : 'bg-bear/10'
                        }`}
                      >
                        {/* Inline icon container or custom handling */}
                      </View>
                      <View className="flex-1">
                        <Text
                          className="text-text-primary font-semibold text-sm"
                          numberOfLines={1}
                        >
                          {tx.description}
                        </Text>
                        <Text className="text-text-secondary text-xs mt-0.5 font-mono">
                          {tx.transaction_date} •{' '}
                          <Text className="uppercase font-sans">
                            {tx.transaction_type}
                          </Text>
                        </Text>
                      </View>
                    </View>

                    <View className="items-end">
                      <Text
                        className={`font-extrabold text-sm font-mono ${amountColor}`}
                      >
                        {signPrefix}RM {tx.amount}
                      </Text>
                    </View>
                  </View>
                );
              })
            ) : (
              <View className="p-6 items-center">
                <Text className="text-text-secondary text-xs">
                  No transactions recorded for this account yet.
                </Text>
              </View>
            )}
          </Card>
        </View>

        {/* Danger Zone Card (Delete Action Isolated) */}
        <Card className="gap-4">
          <View>
            <Text className="text-bear text-sm font-bold">Danger Zone</Text>
            <Text className="text-text-secondary text-xs mt-1">
              Deleting this account will permanently remove its ledger history
              and transaction data tracking.
            </Text>
          </View>

          <Button
            variant="secondary"
            title="Delete Account"
            onPress={() => {}}
            isFullWidth
          />
        </Card>
      </View>
    </Layout>
  );
}
