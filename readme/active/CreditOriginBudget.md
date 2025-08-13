# CreditOriginBudget Model

## Description


## Fields
| Field Name | JSON Key | DB Column | Type | Required | Validation | Description |
|------------|----------|-----------|------|----------|------------|-------------|
| ID | id,omitempty | id | int | false | omitempty,gt=0 |  |
| BarnameID | barname_id | barname_id | int | true | required,gt=0,exists=barnames.id |  |
| FaaliatID | faaliat_id | faaliat_id | int | true | required,gt=0,exists=faaliats.id |  |
| Radif | radif | radif | string | true | required,max=255,regex=epns |  |
| Madeh | madeh | madeh | string | true | required,max=255,regex=epns |  |
| NoeEtebar | noe_etebar | noe_etebar | string | true | required,max=100,regex=epns |  |
| PaymentDescription | payment_description | payment_description | string | true | required,max=255,regex=epns |  |
| DeletedAt | deleted_at,omitempty | deleted_at | *time.Time | false | omitempty,pasttime |  |
| Barname | barname,omitempty |  | *Barname | false |  |  |
| Faaliat | faaliat,omitempty |  | *Faaliat | false |  |  |
| AddCredits | add_credits,omitempty |  | []*AddCredit | false |  |  |


## Relationships
| Field | Type | Relation Type | Related Table | Foreign Key |
|-------|------|---------------|---------------|-------------|
| Barname | *Barname | One-to-One | barnames | barname_id |
| Faaliat | *Faaliat | One-to-One | faaliats | faaliat_id |
| AddCredits | []*AddCredit | One-to-Many | add_credits | credit_budget_id |


## Required Fields
- barname_id
- faaliat_id
- radif
- madeh
- noe_etebar
- payment_description

## Example JSON
```json
{
  "id,omitempty": "...",
  "barname_id": "...",
  "faaliat_id": "...",
  "radif": "...",
  "madeh": "...",
  "noe_etebar": "...",
  "payment_description": "...",
  "deleted_at,omitempty": "...",
  "barname,omitempty": "...",
  "faaliat,omitempty": "...",
  "add_credits,omitempty": "..."
}
```

## API Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/credit_origin_budgets/create` | Create a new credit_origin_budgets |
| POST | `/api/credit_origin_budgets/batchCreate` | Create multiple credit_origin_budgetss |
| GET | `/api/credit_origin_budgets/getOne/:id` | Get a single credit_origin_budgets by ID |
| GET | `/api/credit_origin_budgets/getAll` | Get all credit_origin_budgetss |
| GET | `/api/credit_origin_budgets/getPage` | Get paginated credit_origin_budgetss |
| PUT | `/api/credit_origin_budgets/update/:id` | Update a credit_origin_budgets |
| GET | `/api/credit_origin_budgets/search` | Search credit_origin_budgetss |
| GET | `/api/credit_origin_budgets/getDeleted` | Get deleted credit_origin_budgetss |
| PATCH | `/api/credit_origin_budgets/softDelete/:id` | Soft delete a credit_origin_budgets |
| PATCH | `/api/credit_origin_budgets/batchSoftDelete` | Soft delete multiple credit_origin_budgetss |
| DELETE | `/api/credit_origin_budgets/delete/:id` | Permanently delete a credit_origin_budgets |
| DELETE | `/api/credit_origin_budgets/batchDelete` | Permanently delete multiple credit_origin_budgetss |
| PATCH | `/api/credit_origin_budgets/restore/:id` | Restore a soft-deleted credit_origin_budgets |
| PATCH | `/api/credit_origin_budgets/batchRestore` | Restore multiple soft-deleted credit_origin_budgetss |

