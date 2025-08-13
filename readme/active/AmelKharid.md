# AmelKharid Model

## Description


## Fields
| Field Name | JSON Key | DB Column | Type | Required | Validation | Description |
|------------|----------|-----------|------|----------|------------|-------------|
| ID | id,omitempty | id | int | false | omitempty,gt=0 |  |
| PersonID | person_id | person_id | int | true | required,gt=0,exists=person.id |  |
| YeganID | yegan_id | yegan_id | int | true | required,gt=0,exists=yegan.id |  |
| NumberHesab | number_hesab | number_hesab | string | true | required,min=8,max=26,unique=personal_infos,regex=enln |  |
| OnvanHesab | onvan_hesab | onvan_hesab | string | true | required,max=100,regex=epns |  |
| DeletedAt | deleted_at,omitempty | deleted_at | *time.Time | false | omitempty,pasttime |  |
| Person | person,omitempty |  | *Person | false |  |  |
| Yegan | yegan,omitempty |  | *Yegan | false |  |  |
| ElamBarghashties | elam_barghashties,omitempty |  | []*ElamBarghashti | false |  |  |
| Tankhahs | tankhahs,omitempty |  | []*Tankhah | false |  |  |


## Relationships
| Field | Type | Relation Type | Related Table | Foreign Key |
|-------|------|---------------|---------------|-------------|
| Person | *Person | One-to-One | persons | person_id |
| Yegan | *Yegan | One-to-One | yegans | yegan_id |
| ElamBarghashties | []*ElamBarghashti | One-to-Many | elam_barghashtis | amel_kharid_id |
| Tankhahs | []*Tankhah | One-to-Many | tankhahs | amel_kharid_id |


## Required Fields
- person_id
- yegan_id
- number_hesab
- onvan_hesab

## Example JSON
```json
{
  "id,omitempty": "...",
  "person_id": "...",
  "yegan_id": "...",
  "number_hesab": "...",
  "onvan_hesab": "...",
  "deleted_at,omitempty": "...",
  "person,omitempty": "...",
  "yegan,omitempty": "...",
  "elam_barghashties,omitempty": "...",
  "tankhahs,omitempty": "..."
}
```

## API Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/amel_kharids/create` | Create a new amel_kharids |
| POST | `/api/amel_kharids/batchCreate` | Create multiple amel_kharidss |
| GET | `/api/amel_kharids/getOne/:id` | Get a single amel_kharids by ID |
| GET | `/api/amel_kharids/getAll` | Get all amel_kharidss |
| GET | `/api/amel_kharids/getPage` | Get paginated amel_kharidss |
| PUT | `/api/amel_kharids/update/:id` | Update a amel_kharids |
| GET | `/api/amel_kharids/search` | Search amel_kharidss |
| GET | `/api/amel_kharids/getDeleted` | Get deleted amel_kharidss |
| PATCH | `/api/amel_kharids/softDelete/:id` | Soft delete a amel_kharids |
| PATCH | `/api/amel_kharids/batchSoftDelete` | Soft delete multiple amel_kharidss |
| DELETE | `/api/amel_kharids/delete/:id` | Permanently delete a amel_kharids |
| DELETE | `/api/amel_kharids/batchDelete` | Permanently delete multiple amel_kharidss |
| PATCH | `/api/amel_kharids/restore/:id` | Restore a soft-deleted amel_kharids |
| PATCH | `/api/amel_kharids/batchRestore` | Restore multiple soft-deleted amel_kharidss |

