# PardakhtTajmiee Model

## Description


## Fields
| Field Name | JSON Key | DB Column | Type | Required | Validation | Description |
|------------|----------|-----------|------|----------|------------|-------------|
| ID | id | id | int64 | false | omitempty,gt=0 |  |
| Description | description | description | string | true | required,max=255,regex=epns |  |
| DatePardakht | date_pardakht | date_pardakht | time.Time | true | required,pasttime |  |
| AmountPardakht | amount_pardakht | amount_pardakht | int64 | true | required,gt=0 |  |
| DeletedAt | deleted_at,omitempty | deleted_at | *time.Time | false | omitempty,pasttime |  |
| PrePayments | pre_payments |  | []*PrePayment | false |  |  |


## Relationships
| Field | Type | Relation Type | Related Table | Foreign Key |
|-------|------|---------------|---------------|-------------|
| PrePayments | []*PrePayment | One-to-Many | pre_payments | pardakht_tajmiee_id |


## Required Fields
- description
- date_pardakht
- amount_pardakht

## Example JSON
```json
{
  "id": "...",
  "description": "...",
  "date_pardakht": "...",
  "amount_pardakht": "...",
  "deleted_at,omitempty": "...",
  "pre_payments": "..."
}
```

## API Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/pardakht_tajmiees/create` | Create a new pardakht_tajmiees |
| POST | `/api/pardakht_tajmiees/batchCreate` | Create multiple pardakht_tajmieess |
| GET | `/api/pardakht_tajmiees/getOne/:id` | Get a single pardakht_tajmiees by ID |
| GET | `/api/pardakht_tajmiees/getAll` | Get all pardakht_tajmieess |
| GET | `/api/pardakht_tajmiees/getPage` | Get paginated pardakht_tajmieess |
| PUT | `/api/pardakht_tajmiees/update/:id` | Update a pardakht_tajmiees |
| GET | `/api/pardakht_tajmiees/search` | Search pardakht_tajmieess |
| GET | `/api/pardakht_tajmiees/getDeleted` | Get deleted pardakht_tajmieess |
| PATCH | `/api/pardakht_tajmiees/softDelete/:id` | Soft delete a pardakht_tajmiees |
| PATCH | `/api/pardakht_tajmiees/batchSoftDelete` | Soft delete multiple pardakht_tajmieess |
| DELETE | `/api/pardakht_tajmiees/delete/:id` | Permanently delete a pardakht_tajmiees |
| DELETE | `/api/pardakht_tajmiees/batchDelete` | Permanently delete multiple pardakht_tajmieess |
| PATCH | `/api/pardakht_tajmiees/restore/:id` | Restore a soft-deleted pardakht_tajmiees |
| PATCH | `/api/pardakht_tajmiees/batchRestore` | Restore multiple soft-deleted pardakht_tajmieess |

