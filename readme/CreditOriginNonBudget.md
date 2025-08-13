# CreditOriginNonBudget Model

## Description


## Fields
| Field Name | JSON Key | DB Column | Type | Required | Validation | Description |
|------------|----------|-----------|------|----------|------------|-------------|
| ID | id,omitempty | id | int | false | omitempty,gt=0 |  |
| Sarfasl | sarfasl | sarfasl | string | true | required,max=255,regex=epns |  |
| PaymentDescription | payment_description | payment_description | string | true | required,max=255,regex=epns |  |
| Mojavez | mojavez | mojavez | string | true | required,max=255,regex=epns |  |
| NoeEtebar | noe_etebar | noe_etebar | string | true | required,max=100,regex=epns |  |
| DeletedAt | deleted_at,omitempty | deleted_at | *time.Time | false | omitempty,pasttime |  |
| AddCreditss | add_credits,omitempty |  | []*AddCredit | false |  |  |


## Relationships
| Field | Type | Relation Type | Related Table | Foreign Key |
|-------|------|---------------|---------------|-------------|
| AddCreditss | []*AddCredit | One-to-Many | add_credits | credit_non_budget_id |


## Required Fields
- sarfasl
- payment_description
- mojavez
- noe_etebar

## Example JSON
```json
{
  "id,omitempty": "...",
  "sarfasl": "...",
  "payment_description": "...",
  "mojavez": "...",
  "noe_etebar": "...",
  "deleted_at,omitempty": "...",
  "add_credits,omitempty": "..."
}
```

## API Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/credit_origin_non_budgets/create` | Create a new credit_origin_non_budgets |
| POST | `/api/credit_origin_non_budgets/batchCreate` | Create multiple credit_origin_non_budgetss |
| GET | `/api/credit_origin_non_budgets/getOne/:id` | Get a single credit_origin_non_budgets by ID |
| GET | `/api/credit_origin_non_budgets/getAll` | Get all credit_origin_non_budgetss |
| GET | `/api/credit_origin_non_budgets/getPage` | Get paginated credit_origin_non_budgetss |
| PUT | `/api/credit_origin_non_budgets/update/:id` | Update a credit_origin_non_budgets |
| GET | `/api/credit_origin_non_budgets/search` | Search credit_origin_non_budgetss |
| GET | `/api/credit_origin_non_budgets/getDeleted` | Get deleted credit_origin_non_budgetss |
| PATCH | `/api/credit_origin_non_budgets/softDelete/:id` | Soft delete a credit_origin_non_budgets |
| PATCH | `/api/credit_origin_non_budgets/batchSoftDelete` | Soft delete multiple credit_origin_non_budgetss |
| DELETE | `/api/credit_origin_non_budgets/delete/:id` | Permanently delete a credit_origin_non_budgets |
| DELETE | `/api/credit_origin_non_budgets/batchDelete` | Permanently delete multiple credit_origin_non_budgetss |
| PATCH | `/api/credit_origin_non_budgets/restore/:id` | Restore a soft-deleted credit_origin_non_budgets |
| PATCH | `/api/credit_origin_non_budgets/batchRestore` | Restore multiple soft-deleted credit_origin_non_budgetss |

