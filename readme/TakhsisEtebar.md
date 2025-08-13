# TakhsisEtebar Model

## Description


## Fields
| Field Name | JSON Key | DB Column | Type | Required | Validation | Description |
|------------|----------|-----------|------|----------|------------|-------------|
| ID | id | id | int | false | omitempty,gt=0 |  |
| AmountTakhsis | amount_takhsis | amount_takhsis | int64 | true | required,gt=0 |  |
| SharhTakhsis | sharh_takhsis | sharh_takhsis | string | true | required,max=255,regex=epns |  |
| DateTakhsis | date_takhsis | date_takhsis | time.Time | true | required,pasttime |  |
| AddCreditId | add_credit_id | add_credit_id | int | true | required,gt=0,exists=add_credits.id |  |
| YeganId | yegan_id | yegan_id | int | true | required,gt=0,exists=yegans.id |  |
| DeletedAt | deleted_at,omitempty | deleted_at | *time.Time | false | omitempty,pasttime |  |
| AddCredit | add_credit |  | *AddCredit | false |  |  |
| Yegan | yegan |  | *Yegan | false |  |  |
| JabejaeEteabars | jabejae_eteabars |  | []*JabejaeEtebar | false |  |  |
| Tankhahs | tankhahs |  | []*Tankhah | false |  |  |
| PrePayments | pre_payments |  | []*PrePayment | false |  |  |
| NaghdPardakhts | naghd_pardakhts |  | []*NaghdPardakht | false |  |  |
| GhermezEteabars | ghermez_eteabars |  | []*GhermezEtebar | false |  |  |


## Relationships
| Field | Type | Relation Type | Related Table | Foreign Key |
|-------|------|---------------|---------------|-------------|
| AddCredit | *AddCredit | One-to-One | add_credits | takhsis_etebar_id |
| Yegan | *Yegan | One-to-One | yegans | yegan_id |
| JabejaeEteabars | []*JabejaeEtebar | One-to-Many | jabejae_etebars | takhsis_etebar_id |
| Tankhahs | []*Tankhah | One-to-Many | tankhahs | takhsis_etebar_id |
| PrePayments | []*PrePayment | One-to-Many | pre_payments | takhsis_etebar_id |
| NaghdPardakhts | []*NaghdPardakht | One-to-Many | naghd_pardakhts | takhsis_etebar_id |
| GhermezEteabars | []*GhermezEtebar | One-to-Many | ghermez_etebars | takhsis_etebar_id |


## Required Fields
- amount_takhsis
- sharh_takhsis
- date_takhsis
- add_credit_id
- yegan_id

## Example JSON
```json
{
  "id": "...",
  "amount_takhsis": "...",
  "sharh_takhsis": "...",
  "date_takhsis": "...",
  "add_credit_id": "...",
  "yegan_id": "...",
  "deleted_at,omitempty": "...",
  "add_credit": "...",
  "yegan": "...",
  "jabejae_eteabars": "...",
  "tankhahs": "...",
  "pre_payments": "...",
  "naghd_pardakhts": "...",
  "ghermez_eteabars": "..."
}
```

## API Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/takhsis_etebars/create` | Create a new takhsis_etebars |
| POST | `/api/takhsis_etebars/batchCreate` | Create multiple takhsis_etebarss |
| GET | `/api/takhsis_etebars/getOne/:id` | Get a single takhsis_etebars by ID |
| GET | `/api/takhsis_etebars/getAll` | Get all takhsis_etebarss |
| GET | `/api/takhsis_etebars/getPage` | Get paginated takhsis_etebarss |
| PUT | `/api/takhsis_etebars/update/:id` | Update a takhsis_etebars |
| GET | `/api/takhsis_etebars/search` | Search takhsis_etebarss |
| GET | `/api/takhsis_etebars/getDeleted` | Get deleted takhsis_etebarss |
| PATCH | `/api/takhsis_etebars/softDelete/:id` | Soft delete a takhsis_etebars |
| PATCH | `/api/takhsis_etebars/batchSoftDelete` | Soft delete multiple takhsis_etebarss |
| DELETE | `/api/takhsis_etebars/delete/:id` | Permanently delete a takhsis_etebars |
| DELETE | `/api/takhsis_etebars/batchDelete` | Permanently delete multiple takhsis_etebarss |
| PATCH | `/api/takhsis_etebars/restore/:id` | Restore a soft-deleted takhsis_etebars |
| PATCH | `/api/takhsis_etebars/batchRestore` | Restore multiple soft-deleted takhsis_etebarss |

