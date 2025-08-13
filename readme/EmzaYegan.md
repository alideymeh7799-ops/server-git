# EmzaYegan Model

## Description


## Fields
| Field Name | JSON Key | DB Column | Type | Required | Validation | Description |
|------------|----------|-----------|------|----------|------------|-------------|
| ID | id,omitempty | id | int | false | omitempty,gt=0 |  |
| YeganID | yegan_id | yegan_id | int | true | required,gt=0,exists=yegan.id |  |
| RHesabDari | r_hesab_dari,omitempty | r_hesab_dari | *string | false | omitempty,max=255,regex=epns | رئیس حسابداری |
| RService | r_service,omitempty | r_service | *string | false | omitempty,max=255,regex=epns | رئیس سرویس |
| FYegan | f_yegan,omitempty | f_yegan | *string | false | omitempty,max=255,regex=epns | فرمانده ی یگان |
| AzName | az_name,omitempty | az_name | *string | false | omitempty,max=255,regex=epns | از نامه |
| BeName | be_name,omitempty | be_name | *string | false | omitempty,max=255,regex=epns | به نامه |
| MozoName | mozo_name,omitempty | mozo_name | *string | false | omitempty,max=255,regex=epns | موضوع نامه |
| Tel | tel,omitempty | tel | *string | false | omitempty,min=4,max=11,regexp=tel | تلفن |
| DeletedAt | deleted_at,omitempty | deleted_at | *time.Time | false | omitempty,pasttime |  |


## Relationships
| Field | Type | Relation Type | Related Table | Foreign Key |
|-------|------|---------------|---------------|-------------|


## Required Fields
- yegan_id

## Example JSON
```json
{
  "id,omitempty": "...",
  "yegan_id": "...",
  "r_hesab_dari,omitempty": "...",
  "r_service,omitempty": "...",
  "f_yegan,omitempty": "...",
  "az_name,omitempty": "...",
  "be_name,omitempty": "...",
  "mozo_name,omitempty": "...",
  "tel,omitempty": "...",
  "deleted_at,omitempty": "..."
}
```

## API Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/emza_yegans/create` | Create a new emza_yegans |
| POST | `/api/emza_yegans/batchCreate` | Create multiple emza_yeganss |
| GET | `/api/emza_yegans/getOne/:id` | Get a single emza_yegans by ID |
| GET | `/api/emza_yegans/getAll` | Get all emza_yeganss |
| GET | `/api/emza_yegans/getPage` | Get paginated emza_yeganss |
| PUT | `/api/emza_yegans/update/:id` | Update a emza_yegans |
| GET | `/api/emza_yegans/search` | Search emza_yeganss |
| GET | `/api/emza_yegans/getDeleted` | Get deleted emza_yeganss |
| PATCH | `/api/emza_yegans/softDelete/:id` | Soft delete a emza_yegans |
| PATCH | `/api/emza_yegans/batchSoftDelete` | Soft delete multiple emza_yeganss |
| DELETE | `/api/emza_yegans/delete/:id` | Permanently delete a emza_yegans |
| DELETE | `/api/emza_yegans/batchDelete` | Permanently delete multiple emza_yeganss |
| PATCH | `/api/emza_yegans/restore/:id` | Restore a soft-deleted emza_yegans |
| PATCH | `/api/emza_yegans/batchRestore` | Restore multiple soft-deleted emza_yeganss |

