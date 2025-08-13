# NaghdPardakht Model

## Description


## Fields
| Field Name | JSON Key | DB Column | Type | Required | Validation | Description |
|------------|----------|-----------|------|----------|------------|-------------|
| ID | id,omitempty | id | int | false | omitempty,gt=0 |  |
| TakhsisEtebarID | takhsis_etebar_id | takhsis_etebar_id | int | true | required,gt=0,exists=takhsis_etebars.id |  |
| Amount | amount | amount | int64 | true | required,gt=0 |  |
| Description | description,omitempty | description | *string | false | omitempty,max=255,regex=epns |  |
| DatePardakht | date_pardakht | date_pardakht | time.Time | true | required,pasttime |  |
| PeymankarID | peymankar_id | peymankar_id | int | true | required,gt=0,exists=peymankars.id |  |
| DeletedAt | deleted_at,omitempty | deleted_at | *time.Time | false | omitempty,pasttime |  |
| TakhsisEtebar | takhsis_etebar,omitempty |  | *TakhsisEtebar | false |  |  |
| Peymankar | peymankar,omitempty |  | *Peymankar | false |  |  |
| Padashs | padash |  | *Padash | false |  |  |


## Relationships
| Field | Type | Relation Type | Related Table | Foreign Key |
|-------|------|---------------|---------------|-------------|
| TakhsisEtebar | *TakhsisEtebar | One-to-One | takhsis_etebars | takhsis_etebar_id |
| Peymankar | *Peymankar | One-to-One | peymankars | peymankar_id |
| Padashs | *Padash | One-to-One | padashs | naghd_pardakht_id |


## Required Fields
- takhsis_etebar_id
- amount
- date_pardakht
- peymankar_id

## Example JSON
```json
{
  "id,omitempty": "...",
  "takhsis_etebar_id": "...",
  "amount": "...",
  "description,omitempty": "...",
  "date_pardakht": "...",
  "peymankar_id": "...",
  "deleted_at,omitempty": "...",
  "takhsis_etebar,omitempty": "...",
  "peymankar,omitempty": "...",
  "padash": "..."
}
```

## API Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/naghd_pardakhts/create` | Create a new naghd_pardakhts |
| POST | `/api/naghd_pardakhts/batchCreate` | Create multiple naghd_pardakhtss |
| GET | `/api/naghd_pardakhts/getOne/:id` | Get a single naghd_pardakhts by ID |
| GET | `/api/naghd_pardakhts/getAll` | Get all naghd_pardakhtss |
| GET | `/api/naghd_pardakhts/getPage` | Get paginated naghd_pardakhtss |
| PUT | `/api/naghd_pardakhts/update/:id` | Update a naghd_pardakhts |
| GET | `/api/naghd_pardakhts/search` | Search naghd_pardakhtss |
| GET | `/api/naghd_pardakhts/getDeleted` | Get deleted naghd_pardakhtss |
| PATCH | `/api/naghd_pardakhts/softDelete/:id` | Soft delete a naghd_pardakhts |
| PATCH | `/api/naghd_pardakhts/batchSoftDelete` | Soft delete multiple naghd_pardakhtss |
| DELETE | `/api/naghd_pardakhts/delete/:id` | Permanently delete a naghd_pardakhts |
| DELETE | `/api/naghd_pardakhts/batchDelete` | Permanently delete multiple naghd_pardakhtss |
| PATCH | `/api/naghd_pardakhts/restore/:id` | Restore a soft-deleted naghd_pardakhts |
| PATCH | `/api/naghd_pardakhts/batchRestore` | Restore multiple soft-deleted naghd_pardakhtss |

