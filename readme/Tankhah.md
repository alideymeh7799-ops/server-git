# Tankhah Model

## Description


## Fields
| Field Name | JSON Key | DB Column | Type | Required | Validation | Description |
|------------|----------|-----------|------|----------|------------|-------------|
| ID | id,omitempty | id | int | false | omitempty,gt=0 |  |
| AmelKharidID | amel_kharid_id,omitempty | amel_kharid_id | int | true | required,gt=0,exists=amel_kharids.id |  |
| Amount | amount | amount | int64 | true | required,gt=0 |  |
| Description | description | description | string | true | required,max=255,regex=epns |  |
| DateTankhah | date_tankhah | date_tankhah | time.Time | true | required,pasttime |  |
| TakhsisEtebarID | takhsis_etebar_id | takhsis_etebar_id | int | true | required,gt=0,exists=takhsis_etebars.id |  |
| DeletedAt | deleted_at,omitempty | deleted_at | *time.Time | false | omitempty,pasttime |  |
| AmelKharid | amel_kharid,omitempty |  | *AmelKharid | false |  |  |
| TakhsisEtebar | takhsis_etebar,omitempty |  | *TakhsisEtebar | false |  |  |
| Padashs | padash,omitempty |  | *Padash | false |  |  |


## Relationships
| Field | Type | Relation Type | Related Table | Foreign Key |
|-------|------|---------------|---------------|-------------|
| AmelKharid | *AmelKharid | One-to-One | amel_kharids | amel_kharid_id |
| TakhsisEtebar | *TakhsisEtebar | One-to-One | takhsis_etebars | takhsis_etebar_id |
| Padashs | *Padash | One-to-One | padashs | tankhah_id |


## Required Fields
- amel_kharid_id,omitempty
- amount
- description
- date_tankhah
- takhsis_etebar_id

## Example JSON
```json
{
  "id,omitempty": "...",
  "amel_kharid_id,omitempty": "...",
  "amount": "...",
  "description": "...",
  "date_tankhah": "...",
  "takhsis_etebar_id": "...",
  "deleted_at,omitempty": "...",
  "amel_kharid,omitempty": "...",
  "takhsis_etebar,omitempty": "...",
  "padash,omitempty": "..."
}
```

## API Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/tankhahs/create` | Create a new tankhahs |
| POST | `/api/tankhahs/batchCreate` | Create multiple tankhahss |
| GET | `/api/tankhahs/getOne/:id` | Get a single tankhahs by ID |
| GET | `/api/tankhahs/getAll` | Get all tankhahss |
| GET | `/api/tankhahs/getPage` | Get paginated tankhahss |
| PUT | `/api/tankhahs/update/:id` | Update a tankhahs |
| GET | `/api/tankhahs/search` | Search tankhahss |
| GET | `/api/tankhahs/getDeleted` | Get deleted tankhahss |
| PATCH | `/api/tankhahs/softDelete/:id` | Soft delete a tankhahs |
| PATCH | `/api/tankhahs/batchSoftDelete` | Soft delete multiple tankhahss |
| DELETE | `/api/tankhahs/delete/:id` | Permanently delete a tankhahs |
| DELETE | `/api/tankhahs/batchDelete` | Permanently delete multiple tankhahss |
| PATCH | `/api/tankhahs/restore/:id` | Restore a soft-deleted tankhahs |
| PATCH | `/api/tankhahs/batchRestore` | Restore multiple soft-deleted tankhahss |

