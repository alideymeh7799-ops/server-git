# Peymankar Model

## Description


## Fields
| Field Name | JSON Key | DB Column | Type | Required | Validation | Description |
|------------|----------|-----------|------|----------|------------|-------------|
| ID | id,omitempty | id | int | false | omitempty,gt=0 |  |
| Name | name,omitempty | name | string | true | required,unique=peymankars,regex=epnpr |  |
| NumberHesab | number_hesab,omitempty | number_hesab | string | true | required,min=8,max=26,unique=peymankars,regex=enln |  |
| DeletedAt | deleted_at,omitempty | deleted_at | *time.Time | false | omitempty,pasttime |  |
| NaghdPardakhts | naghd_pardakhts |  | []*NaghdPardakht | false |  |  |


## Relationships
| Field | Type | Relation Type | Related Table | Foreign Key |
|-------|------|---------------|---------------|-------------|
| NaghdPardakhts | []*NaghdPardakht | One-to-Many | naghd_pardakhts | peymankar_id |


## Required Fields
- name,omitempty
- number_hesab,omitempty

## Example JSON
```json
{
  "id,omitempty": "...",
  "name,omitempty": "...",
  "number_hesab,omitempty": "...",
  "deleted_at,omitempty": "...",
  "naghd_pardakhts": "..."
}
```

## API Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/peymankars/create` | Create a new peymankars |
| POST | `/api/peymankars/batchCreate` | Create multiple peymankarss |
| GET | `/api/peymankars/getOne/:id` | Get a single peymankars by ID |
| GET | `/api/peymankars/getAll` | Get all peymankarss |
| GET | `/api/peymankars/getPage` | Get paginated peymankarss |
| PUT | `/api/peymankars/update/:id` | Update a peymankars |
| GET | `/api/peymankars/search` | Search peymankarss |
| GET | `/api/peymankars/getDeleted` | Get deleted peymankarss |
| PATCH | `/api/peymankars/softDelete/:id` | Soft delete a peymankars |
| PATCH | `/api/peymankars/batchSoftDelete` | Soft delete multiple peymankarss |
| DELETE | `/api/peymankars/delete/:id` | Permanently delete a peymankars |
| DELETE | `/api/peymankars/batchDelete` | Permanently delete multiple peymankarss |
| PATCH | `/api/peymankars/restore/:id` | Restore a soft-deleted peymankars |
| PATCH | `/api/peymankars/batchRestore` | Restore multiple soft-deleted peymankarss |

