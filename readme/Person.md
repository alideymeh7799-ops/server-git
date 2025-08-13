# Person Model

## Description


## Fields
| Field Name | JSON Key | DB Column | Type | Required | Validation | Description |
|------------|----------|-----------|------|----------|------------|-------------|
| ID | id,omitempty | id | int | false | omitempty,gt=0 | ID |
| Name | name,omitempty | name | string | true | required,regex=epnpr | نام |
| Family | family,omitempty | family | string | true | required,regex=epnpr | نام خانوادگی |
| PersonnelNumber | personnel_number,omitempty | personnel_number | string | true | required,regex=en_digits,unique=person | شماره پرسنلی |
| IDNumber | id_number,omitempty | id_number | string | true | required,regex=en_digits,unique=person | کد ملی |
| DeletedAt | deleted_at,omitempty | deleted_at | *time.Time | false | omitempty,pasttime | حذف نرم |
| AmelKharid | amel_kharid,omitempty |  | *AmelKharid | false |  |  |
| PersonalInfo | personal_info,omitempty |  | *PersonalInfo | false |  |  |
| User | user,omitempty |  | *User | false |  |  |
| PrePayments | pre_payment,omitempty |  | []*PrePayment | false |  |  |
| Padashs | padash,omitempty |  | []*Padash | false |  |  |


## Relationships
| Field | Type | Relation Type | Related Table | Foreign Key |
|-------|------|---------------|---------------|-------------|
| AmelKharid | *AmelKharid | One-to-One | amel_kharids | person_id |
| PersonalInfo | *PersonalInfo | One-to-One | peronal_infos | person_id |
| User | *User | One-to-One | users | person_id |
| PrePayments | []*PrePayment | One-to-Many | pre_payments | person_id |
| Padashs | []*Padash | One-to-Many | padashs | person_id |


## Required Fields
- name,omitempty
- family,omitempty
- personnel_number,omitempty
- id_number,omitempty

## Example JSON
```json
{
  "id,omitempty": "...",
  "name,omitempty": "...",
  "family,omitempty": "...",
  "personnel_number,omitempty": "...",
  "id_number,omitempty": "...",
  "deleted_at,omitempty": "...",
  "amel_kharid,omitempty": "...",
  "personal_info,omitempty": "...",
  "user,omitempty": "...",
  "pre_payment,omitempty": "...",
  "padash,omitempty": "..."
}
```

## API Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/persons/create` | Create a new persons |
| POST | `/api/persons/batchCreate` | Create multiple personss |
| GET | `/api/persons/getOne/:id` | Get a single persons by ID |
| GET | `/api/persons/getAll` | Get all personss |
| GET | `/api/persons/getPage` | Get paginated personss |
| PUT | `/api/persons/update/:id` | Update a persons |
| GET | `/api/persons/search` | Search personss |
| GET | `/api/persons/getDeleted` | Get deleted personss |
| PATCH | `/api/persons/softDelete/:id` | Soft delete a persons |
| PATCH | `/api/persons/batchSoftDelete` | Soft delete multiple personss |
| DELETE | `/api/persons/delete/:id` | Permanently delete a persons |
| DELETE | `/api/persons/batchDelete` | Permanently delete multiple personss |
| PATCH | `/api/persons/restore/:id` | Restore a soft-deleted persons |
| PATCH | `/api/persons/batchRestore` | Restore multiple soft-deleted personss |

