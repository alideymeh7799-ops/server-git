# Barname Model

## Description


## Fields
| Field Name | JSON Key | DB Column | Type | Required | Validation | Description |
|------------|----------|-----------|------|----------|------------|-------------|
| ID | id | id | uint | false | omitempty,gt=0 |  |
| Code | code | code | int | true | required,gt=0,regex=epns,unique=barnames |  |
| Description | description | description | string | true | required,max=255,regex=epns |  |
| DeletedAt | deleted_at,omitempty | deleted_at | *time.Time | false | omitempty,pasttime |  |
| CreditOriginBudgets | credit_origin_budgets,omitempty |  | []*CreditOriginBudget | false |  |  |


## Relationships
| Field | Type | Relation Type | Related Table | Foreign Key |
|-------|------|---------------|---------------|-------------|
| CreditOriginBudgets | []*CreditOriginBudget | One-to-Many | credit_origin_budgets | barname_id |


## Required Fields
- code
- description

## Example JSON
```json
{
  "id": "...",
  "code": "...",
  "description": "...",
  "deleted_at,omitempty": "...",
  "credit_origin_budgets,omitempty": "..."
}
```

## API Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/barnames/create` | Create a new barnames |
| POST | `/api/barnames/batchCreate` | Create multiple barnamess |
| GET | `/api/barnames/getOne/:id` | Get a single barnames by ID |
| GET | `/api/barnames/getAll` | Get all barnamess |
| GET | `/api/barnames/getPage` | Get paginated barnamess |
| PUT | `/api/barnames/update/:id` | Update a barnames |
| GET | `/api/barnames/search` | Search barnamess |
| GET | `/api/barnames/getDeleted` | Get deleted barnamess |
| PATCH | `/api/barnames/softDelete/:id` | Soft delete a barnames |
| PATCH | `/api/barnames/batchSoftDelete` | Soft delete multiple barnamess |
| DELETE | `/api/barnames/delete/:id` | Permanently delete a barnames |
| DELETE | `/api/barnames/batchDelete` | Permanently delete multiple barnamess |
| PATCH | `/api/barnames/restore/:id` | Restore a soft-deleted barnames |
| PATCH | `/api/barnames/batchRestore` | Restore multiple soft-deleted barnamess |

