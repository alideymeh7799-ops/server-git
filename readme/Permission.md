# Permission Model

## Description


## Fields
| Field Name | JSON Key | DB Column | Type | Required | Validation | Description |
|------------|----------|-----------|------|----------|------------|-------------|
| ID | id,omitempty | id | int | false | omitempty,gt=0 |  |
| Name | name,omitempty | name | string | true | required,unique=permissions,regex=epnpr |  |
| OperationId | operation_id,omitempty | operation_id | int | false | gt=0,exists=operation.id |  |
| ResourceId | resource_id,omitempty | resource_id | int | false | gt=0,exists=resource.id |  |
| Description | description,omitempty | description | *string | false | omitempty,max=255,regex=epns |  |
| DeletedAt | deleted_at,omitempty | deleted_at | *time.Time | false | omitempty,pasttime |  |
| Operation | operation,omitempty |  | *Operation | false |  |  |
| Resource | resource,omitempty |  | *Resource | false |  |  |
| RolePermissions | role_permissions,omitempty |  | []*RolePermission | false |  |  |
| UserPermissions | user_permissions,omitempty |  | []*UserPermission | false |  |  |


## Relationships
| Field | Type | Relation Type | Related Table | Foreign Key |
|-------|------|---------------|---------------|-------------|
| Operation | *Operation | One-to-One | operations | operation_id |
| Resource | *Resource | One-to-One | resources | resource_id |
| RolePermissions | []*RolePermission | One-to-Many | role_permissions | permission_id |
| UserPermissions | []*UserPermission | One-to-Many | user_permissions | permission_id |


## Required Fields
- name,omitempty

## Example JSON
```json
{
  "id,omitempty": "...",
  "name,omitempty": "...",
  "operation_id,omitempty": "...",
  "resource_id,omitempty": "...",
  "description,omitempty": "...",
  "deleted_at,omitempty": "...",
  "operation,omitempty": "...",
  "resource,omitempty": "...",
  "role_permissions,omitempty": "...",
  "user_permissions,omitempty": "..."
}
```

## API Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/permissions/create` | Create a new permissions |
| POST | `/api/permissions/batchCreate` | Create multiple permissionss |
| GET | `/api/permissions/getOne/:id` | Get a single permissions by ID |
| GET | `/api/permissions/getAll` | Get all permissionss |
| GET | `/api/permissions/getPage` | Get paginated permissionss |
| PUT | `/api/permissions/update/:id` | Update a permissions |
| GET | `/api/permissions/search` | Search permissionss |
| GET | `/api/permissions/getDeleted` | Get deleted permissionss |
| PATCH | `/api/permissions/softDelete/:id` | Soft delete a permissions |
| PATCH | `/api/permissions/batchSoftDelete` | Soft delete multiple permissionss |
| DELETE | `/api/permissions/delete/:id` | Permanently delete a permissions |
| DELETE | `/api/permissions/batchDelete` | Permanently delete multiple permissionss |
| PATCH | `/api/permissions/restore/:id` | Restore a soft-deleted permissions |
| PATCH | `/api/permissions/batchRestore` | Restore multiple soft-deleted permissionss |

