package schema

// CreditAccountCode is the Go enum type matching the Postgres enum.
type CreditAccountCode string

const (
	AccountCodeBudgeted    CreditAccountCode = "budgeted"
	AccountCodeNonBudgeted CreditAccountCode = "non_budgeted"
)
