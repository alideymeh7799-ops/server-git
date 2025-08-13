# Rank Model

## Description


## Fields
| Field Name | JSON Key | DB Column | Type | Required | Validation | Description |
|------------|----------|-----------|------|----------|------------|-------------|
| ID | id,omitempty | id | int | false | omitempty,gt=0 |  |
| Code | code,omitempty | code | int | false | gt=0,unique=ranks |  |
| Name | name,omitempty | name | string | true | required,unique=ranks,regex=epnpr |  |
| DeletedAt | deleted_at,omitempty | deleted_at | *time.Time | false | omitempty,pasttime |  |
| PersonalInfos | personal_infos,omitempty |  | []*PersonalInfo | false |  |  |


## Relationships
| Field | Type | Relation Type | Related Table | Foreign Key |
|-------|------|---------------|---------------|-------------|
| PersonalInfos | []*PersonalInfo | One-to-Many | peronal_infos | rank_id |


## Required Fields
- name,omitempty

## Example JSON
```json
{
  "id,omitempty": "...",
  "code,omitempty": "...",
  "name,omitempty": "...",
  "deleted_at,omitempty": "...",
  "personal_infos,omitempty": "..."
}
```

## API Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/ranks/create` | Create a new ranks |
| POST | `/api/ranks/batchCreate` | Create multiple rankss |
| GET | `/api/ranks/getOne/:id` | Get a single ranks by ID |
| GET | `/api/ranks/getAll` | Get all rankss |
| GET | `/api/ranks/getPage` | Get paginated rankss |
| PUT | `/api/ranks/update/:id` | Update a ranks |
| GET | `/api/ranks/search` | Search rankss |
| GET | `/api/ranks/getDeleted` | Get deleted rankss |
| PATCH | `/api/ranks/softDelete/:id` | Soft delete a ranks |
| PATCH | `/api/ranks/batchSoftDelete` | Soft delete multiple rankss |
| DELETE | `/api/ranks/delete/:id` | Permanently delete a ranks |
| DELETE | `/api/ranks/batchDelete` | Permanently delete multiple rankss |
| PATCH | `/api/ranks/restore/:id` | Restore a soft-deleted ranks |
| PATCH | `/api/ranks/batchRestore` | Restore multiple soft-deleted rankss |

