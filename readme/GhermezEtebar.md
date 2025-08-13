# GhermezEtebar Model

## Description


## Fields
| Field Name | JSON Key | DB Column | Type | Required | Validation | Description |
|------------|----------|-----------|------|----------|------------|-------------|
| ID | id | id | int | false | omitempty,gt=0 |  |
| TakhsisEtebarId | takhsis_etebar_id | takhsis_etebar_id | int | true | required,gte=0,exists=takhsis_etebars.id |  |
| DateGhermez | date_ghermez | date_ghermez | time.Time | true | required,pasttime |  |
| AmountGhermez | amount_ghermez | amount_ghermez | int64 | true | required,gt=0 |  |
| Description | description | description | string | true | required,max=255,regex=epns |  |
| DeletedAt | deleted_at,omitempty | deleted_at | *time.Time | false | omitempty,pasttime |  |
| Takhsis | takhsis,omitempty |  | *TakhsisEtebar | false |  |  |


## Relationships
| Field | Type | Relation Type | Related Table | Foreign Key |
|-------|------|---------------|---------------|-------------|
| Takhsis | *TakhsisEtebar | One-to-One | takhsis_etebars | takhsis_etebar_id |


## Required Fields
- takhsis_etebar_id
- date_ghermez
- amount_ghermez
- description

## Example JSON
```json
{
  "id": "...",
  "takhsis_etebar_id": "...",
  "date_ghermez": "...",
  "amount_ghermez": "...",
  "description": "...",
  "deleted_at,omitempty": "...",
  "takhsis,omitempty": "..."
}
```

## API Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/ghermez_etebars/create` | Create a new ghermez_etebars |
| POST | `/api/ghermez_etebars/batchCreate` | Create multiple ghermez_etebarss |
| GET | `/api/ghermez_etebars/getOne/:id` | Get a single ghermez_etebars by ID |
| GET | `/api/ghermez_etebars/getAll` | Get all ghermez_etebarss |
| GET | `/api/ghermez_etebars/getPage` | Get paginated ghermez_etebarss |
| PUT | `/api/ghermez_etebars/update/:id` | Update a ghermez_etebars |
| GET | `/api/ghermez_etebars/search` | Search ghermez_etebarss |
| GET | `/api/ghermez_etebars/getDeleted` | Get deleted ghermez_etebarss |
| PATCH | `/api/ghermez_etebars/softDelete/:id` | Soft delete a ghermez_etebars |
| PATCH | `/api/ghermez_etebars/batchSoftDelete` | Soft delete multiple ghermez_etebarss |
| DELETE | `/api/ghermez_etebars/delete/:id` | Permanently delete a ghermez_etebars |
| DELETE | `/api/ghermez_etebars/batchDelete` | Permanently delete multiple ghermez_etebarss |
| PATCH | `/api/ghermez_etebars/restore/:id` | Restore a soft-deleted ghermez_etebars |
| PATCH | `/api/ghermez_etebars/batchRestore` | Restore multiple soft-deleted ghermez_etebarss |

