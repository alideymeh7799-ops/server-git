# YeganVagozar Model

## Description


## Fields
| Field Name | JSON Key | DB Column | Type | Required | Validation | Description |
|------------|----------|-----------|------|----------|------------|-------------|
| ID | id,omitempty | id | int | false | omitempty,gt=0 |  |
| Name | name | name | string | true | required,unique=yegan_vagozars,regex=epnpr |  |
| DeletedAt | deleted_at,omitempty | deleted_at | *time.Time | false | omitempty,pasttime |  |
| AddCredits | add_credits,omitempty |  | []*AddCredit | false |  |  |


## Relationships
| Field | Type | Relation Type | Related Table | Foreign Key |
|-------|------|---------------|---------------|-------------|
| AddCredits | []*AddCredit | One-to-Many | add_credits | yegan_vagozar_id |


## Required Fields
- name

## Example JSON
```json
{
  "id,omitempty": "...",
  "name": "...",
  "deleted_at,omitempty": "...",
  "add_credits,omitempty": "..."
}
```

## API Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/yegan_vagozars/create` | Create a new yegan_vagozars |
| POST | `/api/yegan_vagozars/batchCreate` | Create multiple yegan_vagozarss |
| GET | `/api/yegan_vagozars/getOne/:id` | Get a single yegan_vagozars by ID |
| GET | `/api/yegan_vagozars/getAll` | Get all yegan_vagozarss |
| GET | `/api/yegan_vagozars/getPage` | Get paginated yegan_vagozarss |
| PUT | `/api/yegan_vagozars/update/:id` | Update a yegan_vagozars |
| GET | `/api/yegan_vagozars/search` | Search yegan_vagozarss |
| GET | `/api/yegan_vagozars/getDeleted` | Get deleted yegan_vagozarss |
| PATCH | `/api/yegan_vagozars/softDelete/:id` | Soft delete a yegan_vagozars |
| PATCH | `/api/yegan_vagozars/batchSoftDelete` | Soft delete multiple yegan_vagozarss |
| DELETE | `/api/yegan_vagozars/delete/:id` | Permanently delete a yegan_vagozars |
| DELETE | `/api/yegan_vagozars/batchDelete` | Permanently delete multiple yegan_vagozarss |
| PATCH | `/api/yegan_vagozars/restore/:id` | Restore a soft-deleted yegan_vagozars |
| PATCH | `/api/yegan_vagozars/batchRestore` | Restore multiple soft-deleted yegan_vagozarss |

