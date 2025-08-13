# RolePermission Model

## Description


## Fields
| Field Name | JSON Key | DB Column | Type | Required | Validation | Description |
|------------|----------|-----------|------|----------|------------|-------------|
| ID | id,omitempty | id | int | false | omitempty,gt=0 |  |
| RoleID | role_id | role_id | int | true | required,gt=0,exists=roles.id |  |
| PermissionID | permission_id | permission_id | int | true | required,gt=0,exists=permissions.id |  |
| DeletedAt | deleted_at,omitempty | deleted_at | *time.Time | false | omitempty,pasttime |  |
| Permission | permission,omitempty |  | *Permission | false |  |  |
| Role | role,omitempty |  | *Role | false |  |  |


## Relationships
| Field | Type | Relation Type | Related Table | Foreign Key |
|-------|------|---------------|---------------|-------------|
| Permission | *Permission | One-to-One | permissions | permission_id |
| Role | *Role | One-to-One | roles | role_id |


## Required Fields
- role_id
- permission_id

## Example JSON
```json
{
  "id,omitempty": "...",
  "role_id": "...",
  "permission_id": "...",
  "deleted_at,omitempty": "...",
  "permission,omitempty": "...",
  "role,omitempty": "..."
}
```

## API Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/role_permissions/create` | Create a new role_permissions |
| POST | `/api/role_permissions/batchCreate` | Create multiple role_permissionss |
| GET | `/api/role_permissions/getOne/:id` | Get a single role_permissions by ID |
| GET | `/api/role_permissions/getAll` | Get all role_permissionss |
| GET | `/api/role_permissions/getPage` | Get paginated role_permissionss |
| PUT | `/api/role_permissions/update/:id` | Update a role_permissions |
| GET | `/api/role_permissions/search` | Search role_permissionss |
| GET | `/api/role_permissions/getDeleted` | Get deleted role_permissionss |
| PATCH | `/api/role_permissions/softDelete/:id` | Soft delete a role_permissions |
| PATCH | `/api/role_permissions/batchSoftDelete` | Soft delete multiple role_permissionss |
| DELETE | `/api/role_permissions/delete/:id` | Permanently delete a role_permissions |
| DELETE | `/api/role_permissions/batchDelete` | Permanently delete multiple role_permissionss |
| PATCH | `/api/role_permissions/restore/:id` | Restore a soft-deleted role_permissions |
| PATCH | `/api/role_permissions/batchRestore` | Restore multiple soft-deleted role_permissionss |

