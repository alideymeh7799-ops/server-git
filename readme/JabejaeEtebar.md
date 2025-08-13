# JabejaeEtebar Model

## Description


## Fields
| Field Name | JSON Key | DB Column | Type | Required | Validation | Description |
|------------|----------|-----------|------|----------|------------|-------------|
| ID | id | id | int | false | omitempty,gt=0 |  |
| TakhsisID | takhsis_id | takhsis_id | int | true | required,gt=0,exists=takhsis_etebars.id |  |
| YeganID | yegan_id | yegan_id | int | true | required,gt=0,exists=yegans.id |  |
| DateJabejae | date_jabejae | date_jabejae | time.Time | true | required,pasttime |  |
| AmountJabejae | amount_jabejae | amount_jabejae | int64 | true | required,gt=0 |  |
| Description | description | description | string | true | required,max=255,regex=epns |  |
| DeletedAt | deleted_at,omitempty | deleted_at | *time.Time | false | omitempty,pasttime |  |
| Takhsis | takhsis,omitempty |  | *TakhsisEtebar | false |  |  |
| Yegan | yegan,omitempty |  | *Yegan | false |  |  |


## Relationships
| Field | Type | Relation Type | Related Table | Foreign Key |
|-------|------|---------------|---------------|-------------|
| Takhsis | *TakhsisEtebar | One-to-One | takhsis_etebars | takhsis_id |
| Yegan | *Yegan | One-to-One | yegans | yegan_id |


## Required Fields
- takhsis_id
- yegan_id
- date_jabejae
- amount_jabejae
- description

## Example JSON
```json
{
  "id": "...",
  "takhsis_id": "...",
  "yegan_id": "...",
  "date_jabejae": "...",
  "amount_jabejae": "...",
  "description": "...",
  "deleted_at,omitempty": "...",
  "takhsis,omitempty": "...",
  "yegan,omitempty": "..."
}
```

## API Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/jabejae_etebars/create` | Create a new jabejae_etebars |
| POST | `/api/jabejae_etebars/batchCreate` | Create multiple jabejae_etebarss |
| GET | `/api/jabejae_etebars/getOne/:id` | Get a single jabejae_etebars by ID |
| GET | `/api/jabejae_etebars/getAll` | Get all jabejae_etebarss |
| GET | `/api/jabejae_etebars/getPage` | Get paginated jabejae_etebarss |
| PUT | `/api/jabejae_etebars/update/:id` | Update a jabejae_etebars |
| GET | `/api/jabejae_etebars/search` | Search jabejae_etebarss |
| GET | `/api/jabejae_etebars/getDeleted` | Get deleted jabejae_etebarss |
| PATCH | `/api/jabejae_etebars/softDelete/:id` | Soft delete a jabejae_etebars |
| PATCH | `/api/jabejae_etebars/batchSoftDelete` | Soft delete multiple jabejae_etebarss |
| DELETE | `/api/jabejae_etebars/delete/:id` | Permanently delete a jabejae_etebars |
| DELETE | `/api/jabejae_etebars/batchDelete` | Permanently delete multiple jabejae_etebarss |
| PATCH | `/api/jabejae_etebars/restore/:id` | Restore a soft-deleted jabejae_etebars |
| PATCH | `/api/jabejae_etebars/batchRestore` | Restore multiple soft-deleted jabejae_etebarss |

