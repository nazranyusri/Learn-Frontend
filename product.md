Absolutely. This is best written as a **project-level agent context document**: it should explain the product vision, scope, architectural intent, business rules, and design principles so an AI coding agent can make consistent decisions without repeatedly asking what the project is trying to accomplish.

# Personal Finance & Wealth Tracker

## 1. Project Purpose

This project is a production-oriented personal finance and wealth tracking application.

The goal is to build an application that allows users to understand:

- How much money they earn
- How much they spend
- Where their money is currently held
- How much they are saving
- Whether they are meeting their savings target
- How their wealth changes over time
- How much they have allocated toward specific financial goals
- Whether they are staying within their budgets
- What recurring financial commitments they have

The project is intended to demonstrate the design and implementation of a **realistic, maintainable backend system**, rather than simply building a CRUD application.

The application should therefore prioritize:

- Data integrity
- Correct financial calculations
- Clear domain modeling
- Transaction consistency
- Proper separation of concerns
- Secure user data isolation
- Maintainable APIs
- Scalable database design
- Production-oriented error handling and observability

---

# 2. Core Product Concept

The application revolves around three related but distinct concepts:

### Where the money is

Represented by `accounts`.

Examples:

- Maybank
- CIMB
- Touch 'n Go eWallet
- GrabPay
- Cash
- EPF
- Investment account

### How money moves

Represented by `transactions`.

Examples:

- Salary received
- Food purchased
- Electricity bill paid
- Money transferred from Maybank to savings
- Investment contribution
- Manual balance adjustment

### What the money is intended for

Represented by `financial_goals`, `budgets`, and savings planning.

Examples:

- Emergency fund
- Japan trip
- New car
- House deposit
- Monthly savings target

These concepts should remain separated.

An account describes the **location of money**.

A transaction describes a **financial event**.

A financial goal describes the **purpose of money**.

---

# 3. Primary User Flow

A typical user should be able to:

1. Create an account.
2. Configure their default currency.
3. Add their financial accounts.
4. Configure their expected income/salary.
5. Define a desired savings percentage.
6. Record income and expenses.
7. Record transfers between accounts.
8. Categorize expenses.
9. Create monthly budgets.
10. Create financial goals.
11. Allocate money toward those goals.
12. Track recurring expenses/income.
13. View current wealth.
14. View spending trends.
15. View savings progress.
16. View wealth growth over time.

The dashboard should eventually provide a concise financial overview without requiring the user to manually calculate figures.

---

# 4. Core Financial Concepts

## 4.1 Income

Income represents money entering the user's financial system.

Examples:

- Salary
- Freelance income
- Bonus
- Dividend
- Other income

Income should be represented through transactions rather than simply modifying an account balance.

Example:

```text
Salary
RM5,000
     ↓
Maybank Account
```

The corresponding transaction would be:

```text
type   = INCOME
amount = 5000
account = Maybank
```

---

# 5. Expenses

Expenses represent money leaving the user's financial system because it was spent.

Examples:

- Food
- Transport
- Utilities
- Shopping
- Healthcare
- Entertainment
- Subscriptions
- Travel

Expenses should have a category whenever appropriate.

Example:

```text
RM25
Food
Lunch
Maybank
```

The transaction would be:

```text
type     = EXPENSE
amount   = 25
category = Food
account  = Maybank
```

Expenses should contribute to spending calculations.

---

# 6. Transfers

Transfers are movements of money between the user's own accounts.

A transfer is **not an expense**.

Example:

```text
Maybank
RM1,000
   │
   │ transfer
   ↓
Savings Account
RM1,000
```

This must not result in:

```text
Monthly spending = RM1,000
```

because the user has not spent the money. They have simply moved it.

Transfers therefore need special handling in the transaction model.

The system should be able to identify both sides of a transfer and associate them with a common transfer identifier.

Example:

```text
Transfer Group: ABC123

Maybank
  TRANSFER OUT
  RM1,000

Savings Account
  TRANSFER IN
  RM1,000
```

When calculating expenses, neither side should be counted as an expense.

---

# 7. Savings

Savings are intentionally different from simply calculating:

```text
income - expenses
```

The application should allow the user to define a desired savings percentage.

Example:

```text
Monthly income:      RM5,000
Savings percentage:  20%

Savings target:
RM5,000 × 20%
= RM1,000
```

The application should then track actual savings activity.

The purpose is to answer:

```text
Target savings:  RM1,000
Actual savings:  RM800

Progress: 80%
```

Actual savings should preferably come from explicit savings allocations or qualifying transfers toward savings/financial goals.

Do not assume that all money left over after expenses is automatically "saved".

A user may have:

```text
Income       RM5,000
Expenses     RM3,000
Remaining    RM2,000
```

but that does not necessarily mean they intentionally saved RM2,000.

The system should distinguish between:

- Money remaining
- Money transferred to savings
- Money allocated to a financial goal

---

# 8. Financial Goals

Users should be able to define goals for specific purposes.

Examples:

```text
Emergency Fund
Target: RM15,000

Japan Trip
Target: RM8,000

New Car
Target: RM30,000
```

A goal should contain:

- Name
- Goal type
- Target amount
- Optional target date
- Active/inactive status

The current amount should generally be derived from financial activity rather than permanently stored as an independent value.

For example:

```text
Japan Trip
Target: RM8,000

Allocated:
RM1,000
RM500
RM700

Current:
RM2,200

Progress:
27.5%
```

This prevents duplicated state from becoming inconsistent.

---

# 9. Accounts and Wealth

The user may have multiple financial accounts.

Examples:

```text
Maybank                 RM5,000
Touch 'n Go              RM300
GrabPay                  RM150
Cash                     RM200
EPF                     RM40,000
Investment Account       RM10,000
--------------------------------
Total Wealth            RM55,650
```

Accounts should support different account types:

- BANK
- EWALLET
- CASH
- INVESTMENT
- PENSION
- OTHER

The system should distinguish between account types where appropriate.

For example, an EPF account may not have every individual underlying transaction recorded in this application.

Instead, the user may periodically update its externally observed balance.

This is why `account_balance_snapshots` exists.

---

# 10. Wealth History

The application should eventually show wealth growth over time.

Example:

```text
January     RM40,000
February    RM42,500
March       RM44,200
April       RM47,000
May         RM49,500
June        RM52,000
```

This enables charts such as:

```text
RM
55k |                         ●
50k |                    ●
45k |              ●
40k | ●──────●
    +-------------------------
      Jan Feb Mar Apr May Jun
```

Balance snapshots are particularly useful for externally managed accounts such as:

- EPF
- Investments
- Other assets whose complete transaction history is not maintained in the application.

---

# 11. Spending Analysis

The system should provide spending analytics.

Examples:

### Monthly spending

```text
September 2026

Food          RM650
Transport     RM300
Shopping      RM450
Bills         RM500
Travel        RM200

Total         RM2,100
```

### Spending by category

The user should be able to see where their money goes.

Potential categories include:

- Food
- Transport
- Bills
- Healthcare
- Shopping
- Travel
- Entertainment
- Subscriptions
- Education
- Other

Categories may be system-provided or user-created.

---

# 12. Budgets

Users should be able to create monthly category budgets.

Example:

```text
Food
Budget: RM700
Spent:  RM620
Remaining: RM80
```

Another example:

```text
Shopping
Budget: RM500
Spent:  RM650

Over budget: RM150
```

The system should calculate budget usage from transactions rather than maintaining an independently updated "spent" field.

---

# 13. Recurring Transactions

Users should be able to define recurring financial events.

Examples:

```text
Netflix
RM55/month

Rent
RM1,500/month

Salary
RM5,000/month

Insurance
RM1,200/year
```

Recurring transactions should define:

- Account
- Category
- Amount
- Transaction type
- Frequency
- Next occurrence
- Active/inactive status

A recurring transaction represents a **template/rule**.

It should not be confused with the actual transaction that occurs.

When a recurring event is processed, it should create a normal transaction.

---

# 14. Dashboard

The eventual dashboard should provide a high-level overview.

Potential dashboard metrics:

```text
Total Wealth
RM55,650

Monthly Income
RM5,000

Monthly Spending
RM2,100

Savings Target
RM1,000

Actual Savings
RM1,200

Savings Progress
120%

Net Cash Flow
RM2,900
```

Additional sections may include:

- Wealth breakdown
- Spending by category
- Recent transactions
- Budget progress
- Financial goal progress
- Wealth growth chart
- Upcoming recurring transactions

The dashboard should derive these values from authoritative financial data rather than maintaining many duplicated counters.

---

# 15. Database Design Philosophy

The database should prioritize **source-of-truth data**.

For example, avoid storing:

```text
monthly_spending
daily_spending
savings_progress
goal_current_amount
category_total
```

as permanent fields simply because they are displayed on the dashboard.

These are derived values.

Instead:

```text
transactions
    ↓
aggregate
    ↓
monthly spending
```

and:

```text
transactions / goal allocations
    ↓
aggregate
    ↓
goal progress
```

This reduces the risk of duplicated values becoming inconsistent.

Caching or materialized reporting structures can be introduced later if performance requires them.

---

# 16. Financial Data Integrity

Financial data should be treated as sensitive and important.

The system should avoid casually deleting posted transactions.

Instead of permanently deleting a historical financial event, future implementations should consider:

- Voiding
- Reversals
- Adjustments
- Audit history

For example, if a user accidentally records:

```text
Expense RM500
```

the system should eventually support correcting it through an auditable mechanism rather than silently destroying the original record.

For the initial implementation, however, do not introduce unnecessary accounting complexity unless it directly improves correctness.

---

# 17. User Data Isolation

Every user's financial data must be isolated.

A request from User A must never be able to access:

```text
User B's accounts
User B's transactions
User B's goals
User B's budgets
```

The application layer should always verify ownership.

For example, do not blindly execute:

```sql
SELECT *
FROM accounts
WHERE id = $1;
```

when serving a user-specific request.

Prefer:

```sql
SELECT *
FROM accounts
WHERE id = $1
  AND user_id = $2;
```

where `$2` represents the authenticated user.

Database-level protections such as composite foreign keys or PostgreSQL Row-Level Security may be introduced where appropriate.

---

# 18. Backend Architecture

The backend should use a layered architecture.

Conceptually:

```text
HTTP Request
     ↓
Route
     ↓
Controller
     ↓
Service
     ↓
Repository / Data Access
     ↓
PostgreSQL
```

### Routes

Responsible for defining HTTP endpoints.

Example:

```text
POST /api/v1/transactions
GET  /api/v1/transactions
GET  /api/v1/accounts
POST /api/v1/accounts
GET  /api/v1/dashboard
```

Routes should remain thin.

### Controllers

Responsible for:

- Reading request data
- Calling services
- Returning HTTP responses

Controllers should not contain significant business logic.

### Services

Contain domain/business logic.

Examples:

```text
transactionService
accountService
budgetService
goalService
dashboardService
```

Services should answer questions such as:

- Is this transfer valid?
- Does this account belong to the user?
- Can this transaction be created?
- How should savings progress be calculated?

### Repository / Data Access

Responsible for PostgreSQL interaction.

Database queries should not be scattered throughout controllers.

---

# 19. API Design

The API should use RESTful conventions where appropriate.

Example:

```text
GET    /api/v1/accounts
POST   /api/v1/accounts
GET    /api/v1/accounts/:id
PATCH  /api/v1/accounts/:id
DELETE /api/v1/accounts/:id

GET    /api/v1/transactions
POST   /api/v1/transactions
GET    /api/v1/transactions/:id
PATCH  /api/v1/transactions/:id

GET    /api/v1/goals
POST   /api/v1/goals
PATCH  /api/v1/goals/:id

GET    /api/v1/budgets
POST   /api/v1/budgets

GET    /api/v1/dashboard
```

API versioning should be considered from the beginning:

```text
/api/v1/...
```

The API should use appropriate HTTP status codes and consistent error responses.

---

# 20. Authentication and Security

Users must authenticate before accessing personal financial data.

Passwords must never be stored as plaintext.

The database stores:

```text
password_hash
```

not:

```text
password
```

Password hashing should use a modern password hashing algorithm such as Argon2id or bcrypt.

Authentication should establish the authenticated user's identity, which is then used throughout the service layer to enforce ownership.

The system should also consider:

- Input validation
- SQL injection prevention through parameterized queries
- Rate limiting
- Secure session/token handling
- CORS
- Request size limits
- Authentication middleware
- Authorization checks
- Sensitive error handling

---

# 21. Monetary Values

Monetary values should not be represented using JavaScript floating-point arithmetic as the authoritative financial representation.

PostgreSQL should use `NUMERIC`.

Example:

```sql
NUMERIC(19,4)
```

rather than:

```sql
FLOAT
```

This avoids many floating-point precision problems.

The application should also avoid calculations such as:

```javascript
0.1 + 0.2;
```

being treated as exact financial arithmetic without appropriate decimal handling.

---

# 22. Important Business Rules

The following rules should remain consistent throughout the project.

### Rule 1 — Expenses reduce available money

```text
EXPENSE
```

represents money being spent.

### Rule 2 — Income increases available money

```text
INCOME
```

represents money received.

### Rule 3 — Transfers are not expenses

Moving money between the user's own accounts must not increase spending.

### Rule 4 — Savings are explicit

Do not automatically define:

```text
savings = income - expenses
```

as actual savings.

### Rule 5 — Derived metrics should generally be calculated

Examples:

```text
monthly spending
budget usage
goal progress
savings progress
net cash flow
```

should normally be derived from underlying financial records.

### Rule 6 — Financial goals should not duplicate transaction state

A goal's current amount should generally be calculated from allocations/transactions.

### Rule 7 — Recurring transactions are templates

The recurring definition is not itself the actual financial transaction.

### Rule 8 — Transfers need both sides

A transfer between accounts must preserve both the source and destination.

### Rule 9 — User ownership must always be enforced

A user must only be able to access their own financial records.

### Rule 10 — Historical financial records should be treated carefully

Do not casually hard-delete posted financial records.

---

# 23. Current Core Database Model

The current planned tables are:

```text
users
user_settings
accounts
transactions
categories
financial_goals
savings_plans
budgets
recurring_transactions
account_balance_snapshots
```

High-level relationships:

```text
users
 │
 ├── user_settings
 │
 ├── accounts
 │    ├── transactions
 │    └── account_balance_snapshots
 │
 ├── categories
 │    ├── transactions
 │    └── budgets
 │
 ├── financial_goals
 │    ├── transactions
 │    └── recurring_transactions
 │
 ├── savings_plans
 │
 ├── budgets
 │
 ├── recurring_transactions
 │
 └── transactions
```

This is the initial domain model, not a restriction against future improvements.

---

# 24. Production-Oriented Goals

This project should demonstrate more than basic CRUD.

The backend should eventually demonstrate concepts such as:

- Authentication
- Authorization
- PostgreSQL
- Database transactions
- Input validation
- Error handling
- Structured logging
- Metrics
- Health checks
- API versioning
- Rate limiting
- Caching where justified
- Redis where appropriate
- Background jobs
- Recurring transaction processing
- Database migrations
- Automated testing
- Integration testing
- Observability
- Graceful shutdown
- Configuration management
- Docker
- CI/CD

These should be introduced when they solve an actual problem rather than added merely to increase the technology list.

---

# 25. Architecture Principles for Agents

When modifying or extending this project, agents should follow these principles.

### Prefer simple domain models

Do not introduce complicated accounting systems unless the requirements justify them.

### Keep business logic out of routes

Routes should primarily connect HTTP requests to controllers.

### Keep controllers thin

Business rules belong in services.

### Keep database access centralized

Avoid scattering raw SQL throughout unrelated application files.

### Prefer database constraints over application assumptions

If a rule can safely be enforced by PostgreSQL, consider enforcing it there as well.

### Validate at the API boundary

Invalid user input should be rejected before reaching deeper layers.

### Do not duplicate derived state unnecessarily

If a value can reliably be calculated from authoritative records, prefer calculation over duplicated storage.

### Protect ownership boundaries

Every user-owned resource must be scoped to the authenticated user.

### Do not over-engineer prematurely

The application is intended to be production-oriented, but production-oriented does not mean introducing every possible distributed-system pattern.

Use complexity when it provides a concrete benefit.

---

# 26. Expected Development Direction

The project should evolve incrementally.

A reasonable development order is:

```text
1. Database
      ↓
2. Authentication
      ↓
3. Accounts
      ↓
4. Transactions
      ↓
5. Categories
      ↓
6. Savings planning
      ↓
7. Financial goals
      ↓
8. Budgets
      ↓
9. Recurring transactions
      ↓
10. Dashboard / analytics
      ↓
11. Observability
      ↓
12. Performance / caching
      ↓
13. Advanced financial features
```

Each stage should remain functional before moving to the next.

---

# 27. Future Features

Potential future functionality includes:

- Net worth tracking
- Liabilities
- Credit cards
- Loans
- Investment holdings
- Investment performance
- Multiple currencies
- Currency exchange rates
- Emergency fund calculations
- Financial health indicators
- Automated recurring transaction execution
- Notifications
- Budget alerts
- Savings recommendations
- Importing bank statements
- CSV transaction import
- Financial reports
- Monthly summaries
- Yearly summaries
- Exporting financial data
- Audit logs

These are future considerations and should not be implemented unless specifically requested.

---

# 28. Definition of Success

The project is successful when a user can use it to answer, with reliable data:

> How much money do I have?

> Where is my money?

> How much did I spend this month?

> What did I spend it on?

> How much did I earn?

> How much did I intentionally save?

> Am I meeting my savings target?

> How much have I allocated toward my goals?

> Am I exceeding any budgets?

> How has my wealth changed over time?

The technical implementation should demonstrate that these answers can be produced from a coherent, well-designed financial data model rather than from manually maintained dashboard counters.

---

# 29. Agent Instruction

When working on this project, treat this document as the **source of product intent and architectural direction**.

Before implementing a new feature:

1. Understand which financial concept the feature belongs to.
2. Determine the authoritative source of its data.
3. Avoid duplicating existing financial state without a clear reason.
4. Preserve user-data isolation.
5. Preserve financial correctness.
6. Prefer database constraints for enforceable invariants.
7. Keep business logic in the service/domain layer.
8. Keep HTTP concerns in controllers/routes.
9. Keep database concerns in the data-access layer.
10. Add complexity only when it solves a concrete requirement.

If an implementation decision conflicts with these principles, prefer the design that preserves **financial correctness, data integrity, maintainability, and clear domain boundaries**.
