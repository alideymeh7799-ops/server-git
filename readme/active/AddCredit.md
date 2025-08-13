# AddCredit Model

## Description


## Fields
| Field Name | JSON Key | DB Column | Type | Required | Validation | Description |
|------------|----------|-----------|------|----------|------------|-------------|
| ID | id,omitempty | id | int | false | omitempty,gt=0 |  |
| NumberEtebar | number_etebar | number_etebar | string | true | required,max=50,regex=epns |  |
| DateEtebar | date_etebar | date_etebar | time.Time | true | required,pasttime |  |
| YeganVagozarID | yegan_vagozar_id | yegan_vagozar_id | int | true | required,gt=0,exists=yegan_vagozars.id |  |
| CreditBudgetID | credit_budget_id,omitempty | credit_budget_id | *int | false | omitempty,gt=0,exists=credit_origin_budgets.id |  |
| CreditNonBudgetID | credit_non_budget_id,omitempty | credit_non_budget_id | *int | false | omitempty,gt=0,exists=credit_origin_non_budgets.id |  |
| AmountEtebar | amount_etebar | amount_etebar | int64 | true | required,gt=0,regex=en_digits |  |
| DeletedAt | deleted_at,omitempty | deleted_at | *time.Time | false | omitempty,pasttime |  |
| YeganVagozar | yegan_vagozar,omitempty |  | []*Yegan | false |  |  |
| CreditOriginBudgets | credit_origin_budgets,omitempty |  | []*CreditOriginBudget | false |  |  |
| CreditOriginNonBudgets | credit_origin_non_budget,omitempty |  | []*CreditOriginNonBudget | false |  |  |
| TakhsisEtebars | takhsis_etebars,omitempty |  | []*TakhsisEtebar | false |  |  |


## Relationships
| Field | Type | Relation Type | Related Table | Foreign Key |
|-------|------|---------------|---------------|-------------|
| YeganVagozar | []*Yegan | One-to-Many | yegan_vagozars | yegan_vagozar_id |
| CreditOriginBudgets | []*CreditOriginBudget | One-to-Many | credit_origin_budgets | credit_origin_budget_id |
| CreditOriginNonBudgets | []*CreditOriginNonBudget | One-to-Many | credit_origin_non_budgets | credit_origin_non_budget_id |
| TakhsisEtebars | []*TakhsisEtebar | One-to-Many | takhsis_etebars | add_credit_id |


## Required Fields
- number_etebar
- date_etebar
- yegan_vagozar_id
- amount_etebar

## Example JSON
```json
{
  "id,omitempty": "...",
  "number_etebar": "...",
  "date_etebar": "...",
  "yegan_vagozar_id": "...",
  "credit_budget_id,omitempty": "...",
  "credit_non_budget_id,omitempty": "...",
  "amount_etebar": "...",
  "deleted_at,omitempty": "...",
  "yegan_vagozar,omitempty": "...",
  "credit_origin_budgets,omitempty": "...",
  "credit_origin_non_budget,omitempty": "...",
  "takhsis_etebars,omitempty": "..."
}
```

## API Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/add_credits/create` | Create a new add_credits |
| POST | `/api/add_credits/batchCreate` | Create multiple add_creditss |
| GET | `/api/add_credits/getOne/:id` | Get a single add_credits by ID |
| GET | `/api/add_credits/getAll` | Get all add_creditss |
| GET | `/api/add_credits/getPage` | Get paginated add_creditss |
| PUT | `/api/add_credits/update/:id` | Update a add_credits |
| GET | `/api/add_credits/search` | Search add_creditss |
| GET | `/api/add_credits/getDeleted` | Get deleted add_creditss |
| PATCH | `/api/add_credits/softDelete/:id` | Soft delete a add_credits |
| PATCH | `/api/add_credits/batchSoftDelete` | Soft delete multiple add_creditss |
| DELETE | `/api/add_credits/delete/:id` | Permanently delete a add_credits |
| DELETE | `/api/add_credits/batchDelete` | Permanently delete multiple add_creditss |
| PATCH | `/api/add_credits/restore/:id` | Restore a soft-deleted add_credits |
| PATCH | `/api/add_credits/batchRestore` | Restore multiple soft-deleted add_creditss |

