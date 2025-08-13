# PersonalInfo Model

## Description


## Fields
| Field Name | JSON Key | DB Column | Type | Required | Validation | Description |
|------------|----------|-----------|------|----------|------------|-------------|
| ID | id,omitempty | id | int | false | omitempty,gt=0 |  |
| NumberHesab | number_hesab | number_hesab | string | true | required,min=8,max=26,unique=personal_infos,regex=enln |  |
| Mhsa | mhsa | mhsa | int | true | required,gt=0 |  |
| Mfmo | mfmo | mfmo | int | true | required,gt=0 |  |
| Mhso | mhso | mhso | int | true | required,gt=0 |  |
| PersonID | person_id | person_id | int | true | required,gt=0,exists=person.id,unique=personal_infos |  |
| YeganID | yegan_id | yegan_id | int | true | required,gt=0,exists=yegan.id |  |
| RankID | rank_id | rank_id | int | true | required,gt=0,exists=rank.id |  |
| DeletedAt | deleted_at,omitempty | deleted_at | *time.Time | false | omitempty,pasttime |  |
| Person | person,omitempty |  | *Person | false |  |  |
| Yegan | yegan,omitempty |  | *Yegan | false |  |  |
| Rank | rank,omitempty |  | *Rank | false |  |  |


## Relationships
| Field | Type | Relation Type | Related Table | Foreign Key |
|-------|------|---------------|---------------|-------------|
| Person | *Person | One-to-One | person | person_id |
| Yegan | *Yegan | One-to-One | yegan | yegan_id |
| Rank | *Rank | One-to-One | rank | rank_id |


## Required Fields
- number_hesab
- mhsa
- mfmo
- mhso
- person_id
- yegan_id
- rank_id

## Example JSON
```json
{
  "id,omitempty": "...",
  "number_hesab": "...",
  "mhsa": "...",
  "mfmo": "...",
  "mhso": "...",
  "person_id": "...",
  "yegan_id": "...",
  "rank_id": "...",
  "deleted_at,omitempty": "...",
  "person,omitempty": "...",
  "yegan,omitempty": "...",
  "rank,omitempty": "..."
}
```

## API Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/personal_infos/create` | Create a new personal_infos |
| POST | `/api/personal_infos/batchCreate` | Create multiple personal_infoss |
| GET | `/api/personal_infos/getOne/:id` | Get a single personal_infos by ID |
| GET | `/api/personal_infos/getAll` | Get all personal_infoss |
| GET | `/api/personal_infos/getPage` | Get paginated personal_infoss |
| PUT | `/api/personal_infos/update/:id` | Update a personal_infos |
| GET | `/api/personal_infos/search` | Search personal_infoss |
| GET | `/api/personal_infos/getDeleted` | Get deleted personal_infoss |
| PATCH | `/api/personal_infos/softDelete/:id` | Soft delete a personal_infos |
| PATCH | `/api/personal_infos/batchSoftDelete` | Soft delete multiple personal_infoss |
| DELETE | `/api/personal_infos/delete/:id` | Permanently delete a personal_infos |
| DELETE | `/api/personal_infos/batchDelete` | Permanently delete multiple personal_infoss |
| PATCH | `/api/personal_infos/restore/:id` | Restore a soft-deleted personal_infos |
| PATCH | `/api/personal_infos/batchRestore` | Restore multiple soft-deleted personal_infoss |

