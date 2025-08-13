# Role Model

## Description


## Fields
| Field Name | JSON Key | DB Column | Type | Required | Validation | Description |
|------------|----------|-----------|------|----------|------------|-------------|
| ID | id,omitempty | id | int | false | omitempty,gt=0 |  |
| Name | name | name | string | true | required,unique=roles,regex=epnpr |  |
| Description | description,omitempty | description | *string | false | omitempty,max=255,regex=epns |  |
| DeletedAt | deleted_at,omitempty | deleted_at | *time.Time | false | omitempty,pasttime |  |
| UserRoles | user_roles,omitempty |  | []*UserRole | false |  |  |
| RolePermissions | role_permissions,omitempty |  | []*RolePermission | false |  |  |


## Relationships
| Field | Type | Relation Type | Related Table | Foreign Key |
|-------|------|---------------|---------------|-------------|
| UserRoles | []*UserRole | One-to-Many | user_roles | role_id |
| RolePermissions | []*RolePermission | One-to-Many | role_permissions | role_id |


## Required Fields
- name

## Example JSON
```json
{
  "id,omitempty": "...",
  "name": "...",
  "description,omitempty": "...",
  "deleted_at,omitempty": "...",
  "user_roles,omitempty": "...",
  "role_permissions,omitempty": "..."
}
```

## API Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/roles/create` | Create a new roles |
| POST | `/api/roles/batchCreate` | Create multiple roless |
| GET | `/api/roles/getOne/:id` | Get a single roles by ID |
| GET | `/api/roles/getAll` | Get all roless |
| GET | `/api/roles/getPage` | Get paginated roless |
| PUT | `/api/roles/update/:id` | Update a roles |
| GET | `/api/roles/search` | Search roless |
| GET | `/api/roles/getDeleted` | Get deleted roless |
| PATCH | `/api/roles/softDelete/:id` | Soft delete a roles |
| PATCH | `/api/roles/batchSoftDelete` | Soft delete multiple roless |
| DELETE | `/api/roles/delete/:id` | Permanently delete a roles |
| DELETE | `/api/roles/batchDelete` | Permanently delete multiple roless |
| PATCH | `/api/roles/restore/:id` | Restore a soft-deleted roles |
| PATCH | `/api/roles/batchRestore` | Restore multiple soft-deleted roless |

