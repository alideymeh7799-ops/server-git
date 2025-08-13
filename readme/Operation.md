# Operation Model

## Description


## Fields
| Field Name | JSON Key | DB Column | Type | Required | Validation | Description |
|------------|----------|-----------|------|----------|------------|-------------|
| ID | id,omitempty | id | int | false | omitempty,gt=0 |  |
| Name | name,omitempty | name | string | true | required,unique=operations,regex=epnpr |  |
| Description | description,omitempty | description | string | false | omitempty,max=255,regex=epns |  |
| DeletedAt | deleted_at,omitempty | deleted_at | *time.Time | false | omitempty,pasttime |  |
| Permissions | permissions,omitempty |  | []*Permission | false |  |  |


## Relationships
| Field | Type | Relation Type | Related Table | Foreign Key |
|-------|------|---------------|---------------|-------------|
| Permissions | []*Permission | One-to-Many | permissions | operation_id |


## Required Fields
- name,omitempty

## Example JSON
```json
{
  "id,omitempty": "...",
  "name,omitempty": "...",
  "description,omitempty": "...",
  "deleted_at,omitempty": "...",
  "permissions,omitempty": "..."
}
```

## API Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/operations/create` | Create a new operations |
| POST | `/api/operations/batchCreate` | Create multiple operationss |
| GET | `/api/operations/getOne/:id` | Get a single operations by ID |
| GET | `/api/operations/getAll` | Get all operationss |
| GET | `/api/operations/getPage` | Get paginated operationss |
| PUT | `/api/operations/update/:id` | Update a operations |
| GET | `/api/operations/search` | Search operationss |
| GET | `/api/operations/getDeleted` | Get deleted operationss |
| PATCH | `/api/operations/softDelete/:id` | Soft delete a operations |
| PATCH | `/api/operations/batchSoftDelete` | Soft delete multiple operationss |
| DELETE | `/api/operations/delete/:id` | Permanently delete a operations |
| DELETE | `/api/operations/batchDelete` | Permanently delete multiple operationss |
| PATCH | `/api/operations/restore/:id` | Restore a soft-deleted operations |
| PATCH | `/api/operations/batchRestore` | Restore multiple soft-deleted operationss |

