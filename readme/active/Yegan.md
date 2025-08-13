# Yegan Model

## Description


## Fields
| Field Name | JSON Key | DB Column | Type | Required | Validation | Description |
|------------|----------|-----------|------|----------|------------|-------------|
| ID | id,omitempty | id | int | false | omitempty,gt=0 |  |
| Code | code,omitempty | code | int | false | gte=0,unique=yegans |  |
| Name | name,omitempty | name | string | true | required,unique=yegans,regex=epnpr |  |
| DeletedAt | deleted_at,omitempty | deleted_at | *time.Time | false | omitempty,pasttime |  |
| PersonalInfos | personal_infos,omitempty |  | []*PersonalInfo | false |  |  |
| AmelKharids | amel_kharids,omitempty |  | []*AmelKharid | false |  |  |
| EmzaYegans | emza_yegans,omitempty |  | []*EmzaYegan | false |  |  |
| JabejaeEtebars | jabejae_eteabars,omitempty |  | []*JabejaeEtebar | false |  |  |
| TakhsisEtebars | takhsis_etebars,omitempty |  | []*TakhsisEtebar | false |  |  |
| ElamBarghashties | elam_barghashties,omitempty |  | []*ElamBarghashti | false |  |  |
| EtelatMailParvandes | etelaat_mail_parvandes,omitempty |  | []*EtelatMailParvande | false |  |  |


## Relationships
| Field | Type | Relation Type | Related Table | Foreign Key |
|-------|------|---------------|---------------|-------------|
| PersonalInfos | []*PersonalInfo | One-to-Many | peronal_infos | yegan_id |
| AmelKharids | []*AmelKharid | One-to-Many | amel_kharids | yegan_id |
| EmzaYegans | []*EmzaYegan | One-to-Many | emza_yegans | yegan_id |
| JabejaeEtebars | []*JabejaeEtebar | One-to-Many | jabejae_etebars | yegan_id |
| TakhsisEtebars | []*TakhsisEtebar | One-to-Many | takhsis_etebars | yegan_id |
| ElamBarghashties | []*ElamBarghashti | One-to-Many | elam_barghashtis | yegan_id |
| EtelatMailParvandes | []*EtelatMailParvande | One-to-Many | etelaat_mail_parvandes | yegan_id |


## Required Fields
- name,omitempty

## Example JSON
```json
{
  "id,omitempty": "...",
  "code,omitempty": "...",
  "name,omitempty": "...",
  "deleted_at,omitempty": "...",
  "personal_infos,omitempty": "...",
  "amel_kharids,omitempty": "...",
  "emza_yegans,omitempty": "...",
  "jabejae_eteabars,omitempty": "...",
  "takhsis_etebars,omitempty": "...",
  "elam_barghashties,omitempty": "...",
  "etelaat_mail_parvandes,omitempty": "..."
}
```

## API Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/yegans/create` | Create a new yegans |
| POST | `/api/yegans/batchCreate` | Create multiple yeganss |
| GET | `/api/yegans/getOne/:id` | Get a single yegans by ID |
| GET | `/api/yegans/getAll` | Get all yeganss |
| GET | `/api/yegans/getPage` | Get paginated yeganss |
| PUT | `/api/yegans/update/:id` | Update a yegans |
| GET | `/api/yegans/search` | Search yeganss |
| GET | `/api/yegans/getDeleted` | Get deleted yeganss |
| PATCH | `/api/yegans/softDelete/:id` | Soft delete a yegans |
| PATCH | `/api/yegans/batchSoftDelete` | Soft delete multiple yeganss |
| DELETE | `/api/yegans/delete/:id` | Permanently delete a yegans |
| DELETE | `/api/yegans/batchDelete` | Permanently delete multiple yeganss |
| PATCH | `/api/yegans/restore/:id` | Restore a soft-deleted yegans |
| PATCH | `/api/yegans/batchRestore` | Restore multiple soft-deleted yeganss |

