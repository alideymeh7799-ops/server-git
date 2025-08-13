# Resource Model

## Description


## Fields
| Field Name | JSON Key | DB Column | Type | Required | Validation | Description |
|------------|----------|-----------|------|----------|------------|-------------|
| ID | id,omitempty | id | int | false | omitempty,gt=0 |  |
| Name | name,omitempty | name | string | true | required,unique=resources,regex=epnpr |  |
| DeletedAt | deleted_at,omitempty | deleted_at | *time.Time | false | omitempty,pasttime |  |
| Permissions | permissions,omitempty |  | []*Permission | false |  |  |


## Relationships
| Field | Type | Relation Type | Related Table | Foreign Key |
|-------|------|---------------|---------------|-------------|
| Permissions | []*Permission | One-to-Many | permissions | resource_id |


## Required Fields
- name,omitempty

## Example JSON
```json
{
  "id,omitempty": "...",
  "name,omitempty": "...",
  "deleted_at,omitempty": "...",
  "permissions,omitempty": "..."
}
```

## API Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/resources/create` | Create a new resources |
| POST | `/api/resources/batchCreate` | Create multiple resourcess |
| GET | `/api/resources/getOne/:id` | Get a single resources by ID |
| GET | `/api/resources/getAll` | Get all resourcess |
| GET | `/api/resources/getPage` | Get paginated resourcess |
| PUT | `/api/resources/update/:id` | Update a resources |
| GET | `/api/resources/search` | Search resourcess |
| GET | `/api/resources/getDeleted` | Get deleted resourcess |
| PATCH | `/api/resources/softDelete/:id` | Soft delete a resources |
| PATCH | `/api/resources/batchSoftDelete` | Soft delete multiple resourcess |
| DELETE | `/api/resources/delete/:id` | Permanently delete a resources |
| DELETE | `/api/resources/batchDelete` | Permanently delete multiple resourcess |
| PATCH | `/api/resources/restore/:id` | Restore a soft-deleted resources |
| PATCH | `/api/resources/batchRestore` | Restore multiple soft-deleted resourcess |

