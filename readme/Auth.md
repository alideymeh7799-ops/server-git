# Auth Model

## Description


## Fields
| Field Name | JSON Key | DB Column | Type | Required | Validation | Description |
|------------|----------|-----------|------|----------|------------|-------------|
| ID | id,omitempty | id | int | false | omitempty,gt=0 |  |
| UserID | user_id | user_id | uuid.UUID | true | required,uuid |  |
| RefreshToken | refresh_token | refresh_token | string | true | required |  |
| IPAddress | ip_address | ip_address | string | true | required,ip |  |
| Revoked | revoked | revoked | bool | false |  |  |
| ExpiresAt | expires_at | expires_at | int | true | required,gt=0 |  |
| CreatedAt | created_at,omitempty | created_at | *time.Time | false | omitempty,pasttime |  |
| UpdatedAt | updated_at,omitempty | updated_at | *time.Time | false | omitempty,pasttime |  |
| User | user,omitempty |  | *User | false |  |  |


## Relationships
| Field | Type | Relation Type | Related Table | Foreign Key |
|-------|------|---------------|---------------|-------------|
| User | *User | One-to-One | users | user_id |


## Required Fields
- user_id
- refresh_token
- ip_address
- expires_at

## Example JSON
```json
{
  "id,omitempty": "...",
  "user_id": "...",
  "refresh_token": "...",
  "ip_address": "...",
  "revoked": "...",
  "expires_at": "...",
  "created_at,omitempty": "...",
  "updated_at,omitempty": "...",
  "user,omitempty": "..."
}
```

## API Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auths/create` | Create a new auths |
| POST | `/api/auths/batchCreate` | Create multiple authss |
| GET | `/api/auths/getOne/:id` | Get a single auths by ID |
| GET | `/api/auths/getAll` | Get all authss |
| GET | `/api/auths/getPage` | Get paginated authss |
| PUT | `/api/auths/update/:id` | Update a auths |
| GET | `/api/auths/search` | Search authss |
| GET | `/api/auths/getDeleted` | Get deleted authss |
| PATCH | `/api/auths/softDelete/:id` | Soft delete a auths |
| PATCH | `/api/auths/batchSoftDelete` | Soft delete multiple authss |
| DELETE | `/api/auths/delete/:id` | Permanently delete a auths |
| DELETE | `/api/auths/batchDelete` | Permanently delete multiple authss |
| PATCH | `/api/auths/restore/:id` | Restore a soft-deleted auths |
| PATCH | `/api/auths/batchRestore` | Restore multiple soft-deleted authss |

