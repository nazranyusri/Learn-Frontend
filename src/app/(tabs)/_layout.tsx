import { Tabs } from 'expo-router';
import CustomIcon from '@/components/CustomIcon';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1d4ed8',
        headerShown: false,
      }}
    >
      {/* Home - Dashboard: total wealth, income, spending, savings progress, budgets, and recent activity */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <CustomIcon
              provider="Feather"
              name="home"
              size="medium"
              color={color}
            />
          ),
        }}
      />

      {/* Transactions - Income, expenses, transfers, categories, and transaction history. */}
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Transactions',
          tabBarIcon: ({ color }) => (
            <CustomIcon
              provider="Feather"
              name="list"
              size="medium"
              color={color}
            />
          ),
        }}
      />

      {/* Accounts - Bank accounts, e-wallets, cash, investments, EPF, and balance snapshots. */}
      <Tabs.Screen
        name="accounts"
        options={{
          title: 'Accounts',
          tabBarIcon: ({ color }) => (
            <CustomIcon
              provider="Feather"
              name="credit-card"
              size="medium"
              color={color}
            />
          ),
        }}
      />

      {/* Goals - Savings plans, financial goals, allocations, and progress. */}
      <Tabs.Screen
        name="goals"
        options={{
          title: 'Goals',
          tabBarIcon: ({ color }) => (
            <CustomIcon
              provider="Feather"
              name="target"
              size="medium"
              color={color}
            />
          ),
        }}
      />

      {/* More - Budgets, recurring transactions, reports, settings, profile, and categories.*/}
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: ({ color }) => (
            <CustomIcon
              provider="Feather"
              name="more-horizontal"
              size="medium"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
