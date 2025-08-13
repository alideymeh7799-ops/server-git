# Faaliat Model

## Description


## Fields
| Field Name | JSON Key | DB Column | Type | Required | Validation | Description |
|------------|----------|-----------|------|----------|------------|-------------|
| ID | id | id | int | false | omitempty,gt=0 |  |
| Code | code | code | int | true | required,gt=0,unique=faaliats |  |
| Description | description,omitempty | description | string | false | omitempty,max=255,regex=epns |  |
| DeletedAt | deleted_at,omitempty | deleted_at | *time.Time | false | omitempty,pasttime |  |
| CreditOriginBudgets | credit_origin_budgets,omitempty |  | []*CreditOriginBudget | false |  |  |


## Relationships
| Field | Type | Relation Type | Related Table | Foreign Key |
|-------|------|---------------|---------------|-------------|
| CreditOriginBudgets | []*CreditOriginBudget | One-to-Many | credit_origin_budgets | faaliat_id |


## Required Fields
- code

## Example JSON
```json
{
  "id": "...",
  "code": "...",
  "description,omitempty": "...",
  "deleted_at,omitempty": "...",
  "credit_origin_budgets,omitempty": "..."
}
```

## API Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/faaliats/create` | Create a new faaliats |
| POST | `/api/faaliats/batchCreate` | Create multiple faaliatss |
| GET | `/api/faaliats/getOne/:id` | Get a single faaliats by ID |
| GET | `/api/faaliats/getAll` | Get all faaliatss |
| GET | `/api/faaliats/getPage` | Get paginated faaliatss |
| PUT | `/api/faaliats/update/:id` | Update a faaliats |
| GET | `/api/faaliats/search` | Search faaliatss |
| GET | `/api/faaliats/getDeleted` | Get deleted faaliatss |
| PATCH | `/api/faaliats/softDelete/:id` | Soft delete a faaliats |
| PATCH | `/api/faaliats/batchSoftDelete` | Soft delete multiple faaliatss |
| DELETE | `/api/faaliats/delete/:id` | Permanently delete a faaliats |
| DELETE | `/api/faaliats/batchDelete` | Permanently delete multiple faaliatss |
| PATCH | `/api/faaliats/restore/:id` | Restore a soft-deleted faaliats |
| PATCH | `/api/faaliats/batchRestore` | Restore multiple soft-deleted faaliatss |

