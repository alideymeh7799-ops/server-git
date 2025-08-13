# User Model

## Description


## Fields
| Field Name | JSON Key | DB Column | Type | Required | Validation | Description |
|------------|----------|-----------|------|----------|------------|-------------|
| ID | id,omitempty | id | uuid.UUID | false | uuid |  |
| Username | username,omitempty | username | string | true | required,unique=users,min=3,max=20,alphanum |  |
| PasswordHash | - | password_hash | string | false |  |  |
| PersonId | person_id,omitempty | person_id | int | true | required,gt=0,exists=persons.id,unique=users |  |
| ExpiresAt | expires_at | expires_at | time.Time | true | required,futuretime |  |
| StartDate | start_date | start_date | time.Time | true | required |  |
| IsActive | is_active | is_active | bool | true | required |  |
| DeletedAt | deleted_at,omitempty | deleted_at | *time.Time | false | omitempty,pasttime |  |
| Person | person,omitempty |  | *Person | false |  |  |
| UserRole | user_role,omitempty |  | *UserRole | false |  |  |
| Actions | actions,omitempty |  | []*action.Action | false |  |  |
| Auths | auths,omitempty |  | []*Auth | false |  |  |
| UserPermissions | user_permissions,omitempty |  | []*UserPermission | false |  |  |


## Relationships
| Field | Type | Relation Type | Related Table | Foreign Key |
|-------|------|---------------|---------------|-------------|
| Person | *Person | One-to-One | persons | person_id |
| UserRole | *UserRole | One-to-One | user_roles | user_id |
| Actions | []*action.Action | One-to-Many | actions | user_id |
| Auths | []*Auth | One-to-Many | auths | user_id |
| UserPermissions | []*UserPermission | One-to-Many | user_permissions | user_id |


## Required Fields
- username,omitempty
- person_id,omitempty
- expires_at
- start_date
- is_active

## Example JSON
```json
{
  "id,omitempty": "...",
  "username,omitempty": "...",
  "person_id,omitempty": "...",
  "expires_at": "...",
  "start_date": "...",
  "is_active": "...",
  "deleted_at,omitempty": "...",
  "person,omitempty": "...",
  "user_role,omitempty": "...",
  "actions,omitempty": "...",
  "auths,omitempty": "...",
  "user_permissions,omitempty": "..."
}
```

## API Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/users/create` | Create a new users |
| POST | `/api/users/batchCreate` | Create multiple userss |
| GET | `/api/users/getOne/:id` | Get a single users by ID |
| GET | `/api/users/getAll` | Get all userss |
| GET | `/api/users/getPage` | Get paginated userss |
| PUT | `/api/users/update/:id` | Update a users |
| GET | `/api/users/search` | Search userss |
| GET | `/api/users/getDeleted` | Get deleted userss |
| PATCH | `/api/users/softDelete/:id` | Soft delete a users |
| PATCH | `/api/users/batchSoftDelete` | Soft delete multiple userss |
| DELETE | `/api/users/delete/:id` | Permanently delete a users |
| DELETE | `/api/users/batchDelete` | Permanently delete multiple userss |
| PATCH | `/api/users/restore/:id` | Restore a soft-deleted users |
| PATCH | `/api/users/batchRestore` | Restore multiple soft-deleted userss |

