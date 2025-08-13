# UserPermission Model

## Description


## Fields
| Field Name | JSON Key | DB Column | Type | Required | Validation | Description |
|------------|----------|-----------|------|----------|------------|-------------|
| ID | id,omitempty | id | int | false | omitempty,gt=0 |  |
| UserID | user_id,omitempty | user_id | uuid.UUID | true | required,uuid,exists=users.id |  |
| PermissionID | permission_id,omitempty | permission_id | int | true | required,gt=0,exists=permissions.id |  |
| DeletedAt | deleted_at,omitempty | deleted_at | *time.Time | false | omitempty,pasttime |  |
| Permission | permission,omitempty |  | *Permission | false |  |  |
| User | user,omitempty |  | *User | false |  |  |


## Relationships
| Field | Type | Relation Type | Related Table | Foreign Key |
|-------|------|---------------|---------------|-------------|
| Permission | *Permission | One-to-One | permissions | permission_id |
| User | *User | One-to-One | users | user_id |


## Required Fields
- user_id,omitempty
- permission_id,omitempty

## Example JSON
```json
{
  "id,omitempty": "...",
  "user_id,omitempty": "...",
  "permission_id,omitempty": "...",
  "deleted_at,omitempty": "...",
  "permission,omitempty": "...",
  "user,omitempty": "..."
}
```

## API Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/user_permissions/create` | Create a new user_permissions |
| POST | `/api/user_permissions/batchCreate` | Create multiple user_permissionss |
| GET | `/api/user_permissions/getOne/:id` | Get a single user_permissions by ID |
| GET | `/api/user_permissions/getAll` | Get all user_permissionss |
| GET | `/api/user_permissions/getPage` | Get paginated user_permissionss |
| PUT | `/api/user_permissions/update/:id` | Update a user_permissions |
| GET | `/api/user_permissions/search` | Search user_permissionss |
| GET | `/api/user_permissions/getDeleted` | Get deleted user_permissionss |
| PATCH | `/api/user_permissions/softDelete/:id` | Soft delete a user_permissions |
| PATCH | `/api/user_permissions/batchSoftDelete` | Soft delete multiple user_permissionss |
| DELETE | `/api/user_permissions/delete/:id` | Permanently delete a user_permissions |
| DELETE | `/api/user_permissions/batchDelete` | Permanently delete multiple user_permissionss |
| PATCH | `/api/user_permissions/restore/:id` | Restore a soft-deleted user_permissions |
| PATCH | `/api/user_permissions/batchRestore` | Restore multiple soft-deleted user_permissionss |

