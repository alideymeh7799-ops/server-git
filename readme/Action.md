# Action Model

## Description


## Fields
| Field Name | JSON Key | DB Column | Type | Required | Validation | Description |
|------------|----------|-----------|------|----------|------------|-------------|
| ID | id,omitempty | id | int | false | omitempty,gt=0 |  |
| ActionType | action_type,omitempty | action_type | int | true | required,gt=0 |  |
| ActionTime | action_time,omitempty | action_time | *time.Time | true | required,pasttime |  |
| UserID | user_id,omitempty | user_id | uuid.UUID | true | required,uuid |  |
| TableName | table_name,omitempty | table_name | string | true | required,max=50 |  |
| IsSuccess | is_success,omitempty | is_success | bool | true | required |  |
| User | user_actions,omitempty |  | *User | false |  |  |


## Relationships
| Field | Type | Relation Type | Related Table | Foreign Key |
|-------|------|---------------|---------------|-------------|
| User | *User | One-to-One | user | user_id |


## Required Fields
- action_type,omitempty
- action_time,omitempty
- user_id,omitempty
- table_name,omitempty
- is_success,omitempty

## Example JSON
```json
{
  "id,omitempty": "...",
  "action_type,omitempty": "...",
  "action_time,omitempty": "...",
  "user_id,omitempty": "...",
  "table_name,omitempty": "...",
  "is_success,omitempty": "...",
  "user_actions,omitempty": "..."
}
```

## API Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/actions/create` | Create a new actions |
| POST | `/api/actions/batchCreate` | Create multiple actionss |
| GET | `/api/actions/getOne/:id` | Get a single actions by ID |
| GET | `/api/actions/getAll` | Get all actionss |
| GET | `/api/actions/getPage` | Get paginated actionss |
| PUT | `/api/actions/update/:id` | Update a actions |
| GET | `/api/actions/search` | Search actionss |
| GET | `/api/actions/getDeleted` | Get deleted actionss |
| PATCH | `/api/actions/softDelete/:id` | Soft delete a actions |
| PATCH | `/api/actions/batchSoftDelete` | Soft delete multiple actionss |
| DELETE | `/api/actions/delete/:id` | Permanently delete a actions |
| DELETE | `/api/actions/batchDelete` | Permanently delete multiple actionss |
| PATCH | `/api/actions/restore/:id` | Restore a soft-deleted actions |
| PATCH | `/api/actions/batchRestore` | Restore multiple soft-deleted actionss |

