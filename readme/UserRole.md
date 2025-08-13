# UserRole Model

## Description


## Fields
| Field Name | JSON Key | DB Column | Type | Required | Validation | Description |
|------------|----------|-----------|------|----------|------------|-------------|
| ID | id,omitempty | id | int | false | omitempty,gt=0 |  |
| UserID | user_id,omitempty | user_id | uuid.UUID | true | required,uuid,exists=users.id |  |
| RoleID | role_id,omitempty | role_id | int | true | required,gt=0,exists=roles.id |  |
| DeletedAt | deleted_at,omitempty | deleted_at | *time.Time | false | omitempty,pasttime |  |
| User | user,omitempty |  | *User | false |  |  |
| Role | role,omitempty |  | *Role | false |  |  |


## Relationships
| Field | Type | Relation Type | Related Table | Foreign Key |
|-------|------|---------------|---------------|-------------|
| User | *User | One-to-One | users | user_id |
| Role | *Role | One-to-One | roles | role_id |


## Required Fields
- user_id,omitempty
- role_id,omitempty

## Example JSON
```json
{
  "id,omitempty": "...",
  "user_id,omitempty": "...",
  "role_id,omitempty": "...",
  "deleted_at,omitempty": "...",
  "user,omitempty": "...",
  "role,omitempty": "..."
}
```

## API Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/user_roles/create` | Create a new user_roles |
| POST | `/api/user_roles/batchCreate` | Create multiple user_roless |
| GET | `/api/user_roles/getOne/:id` | Get a single user_roles by ID |
| GET | `/api/user_roles/getAll` | Get all user_roless |
| GET | `/api/user_roles/getPage` | Get paginated user_roless |
| PUT | `/api/user_roles/update/:id` | Update a user_roles |
| GET | `/api/user_roles/search` | Search user_roless |
| GET | `/api/user_roles/getDeleted` | Get deleted user_roless |
| PATCH | `/api/user_roles/softDelete/:id` | Soft delete a user_roles |
| PATCH | `/api/user_roles/batchSoftDelete` | Soft delete multiple user_roless |
| DELETE | `/api/user_roles/delete/:id` | Permanently delete a user_roles |
| DELETE | `/api/user_roles/batchDelete` | Permanently delete multiple user_roless |
| PATCH | `/api/user_roles/restore/:id` | Restore a soft-deleted user_roles |
| PATCH | `/api/user_roles/batchRestore` | Restore multiple soft-deleted user_roless |

