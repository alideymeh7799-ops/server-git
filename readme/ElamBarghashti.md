# ElamBarghashti Model

## Description


## Fields
| Field Name | JSON Key | DB Column | Type | Required | Validation | Description |
|------------|----------|-----------|------|----------|------------|-------------|
| ID | id,omitempty | id | int | false | omitempty,gt=0 |  |
| YeganID | yegan_id | yegan_id | int | true | required,gt=0,exists=yegan.id |  |
| AmelKharidID | amel_kharid_id | amel_kharid_id | int | true | required,gt=0,exists=amel_kharids.id |  |
| NoeBarghashti | noe_barghashti | noe_barghashti | string | true | required,oneof=sanad_barghashti elam_barghashti |  |
| TankhahID | tankhah_id | tankhah_id | int | true | required,gt=0,exists=tankhahs.id |  |
| Amount | amount | amount | int64 | true | required,gt=0 |  |
| MadrakYegan | madrak_yegan | madrak_yegan | string | true | required,max=50,regex=epns |  |
| DateBarghasht | date_barghasht | date_barghasht | time.Time | true | required,pasttime |  |
| DeletedAt | deleted_at,omitempty | deleted_at | *time.Time | false | omitempty,pasttime |  |
| AmelKharid | amel_kharid,omitempty |  | *AmelKharid | false |  |  |
| Tankhah | tankhah,omitempty |  | *Tankhah | false |  |  |
| Yegan | yegan,omitempty |  | *Yegan | false |  |  |


## Relationships
| Field | Type | Relation Type | Related Table | Foreign Key |
|-------|------|---------------|---------------|-------------|
| AmelKharid | *AmelKharid | One-to-One | amel_kharids | amel_kharid_id |
| Tankhah | *Tankhah | One-to-One | tankhahs | tankhah_id |
| Yegan | *Yegan | One-to-One | yegans | yegan_id |


## Required Fields
- yegan_id
- amel_kharid_id
- noe_barghashti
- tankhah_id
- amount
- madrak_yegan
- date_barghasht

## Example JSON
```json
{
  "id,omitempty": "...",
  "yegan_id": "...",
  "amel_kharid_id": "...",
  "noe_barghashti": "...",
  "tankhah_id": "...",
  "amount": "...",
  "madrak_yegan": "...",
  "date_barghasht": "...",
  "deleted_at,omitempty": "...",
  "amel_kharid,omitempty": "...",
  "tankhah,omitempty": "...",
  "yegan,omitempty": "..."
}
```

## API Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/elam_barghashtis/create` | Create a new elam_barghashtis |
| POST | `/api/elam_barghashtis/batchCreate` | Create multiple elam_barghashtiss |
| GET | `/api/elam_barghashtis/getOne/:id` | Get a single elam_barghashtis by ID |
| GET | `/api/elam_barghashtis/getAll` | Get all elam_barghashtiss |
| GET | `/api/elam_barghashtis/getPage` | Get paginated elam_barghashtiss |
| PUT | `/api/elam_barghashtis/update/:id` | Update a elam_barghashtis |
| GET | `/api/elam_barghashtis/search` | Search elam_barghashtiss |
| GET | `/api/elam_barghashtis/getDeleted` | Get deleted elam_barghashtiss |
| PATCH | `/api/elam_barghashtis/softDelete/:id` | Soft delete a elam_barghashtis |
| PATCH | `/api/elam_barghashtis/batchSoftDelete` | Soft delete multiple elam_barghashtiss |
| DELETE | `/api/elam_barghashtis/delete/:id` | Permanently delete a elam_barghashtis |
| DELETE | `/api/elam_barghashtis/batchDelete` | Permanently delete multiple elam_barghashtiss |
| PATCH | `/api/elam_barghashtis/restore/:id` | Restore a soft-deleted elam_barghashtis |
| PATCH | `/api/elam_barghashtis/batchRestore` | Restore multiple soft-deleted elam_barghashtiss |

