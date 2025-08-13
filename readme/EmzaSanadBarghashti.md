# EmzaSanadBarghashti Model

## Description


## Fields
| Field Name | JSON Key | DB Column | Type | Required | Validation | Description |
|------------|----------|-----------|------|----------|------------|-------------|
| FromLetter | from_letter,omitempty | from_letter | *string | false | omitempty,max=50,regex=epns | از نامه‌های ارسالی |
| ToLetter | to_letter,omitempty | to_letter | *string | false | omitempty,max=50,regex=epns | به نامه‌های ارسالی |
| LetterTitle | letter_title,omitempty | letter_title | *string | false | omitempty,max=250,regex=epns | عنوان نامه‌های ارسالی |
| LetterChiefName | letter_chief_name,omitempty | letter_chief_name | *string | false | omitempty,max=50,regex=epns | نام رئیس نامه‌های ارسالی |
| LetterActionPerson | letter_action_person,omitempty | letter_action_person | *string | false | omitempty,max=50,regex=epns | اقدام‌کننده نامه‌های ارسالی |
| LetterCreditChief | letter_credit_chief,omitempty | letter_credit_chief | *string | false | omitempty,max=50,regex=epns | رئیس اعتبارات نامه‌های ارسالی |
| Phone | phone,omitempty | phone | *string | false | omitempty,min=4,max=11,regexp=tel | تلفن |


## Relationships
| Field | Type | Relation Type | Related Table | Foreign Key |
|-------|------|---------------|---------------|-------------|


## Required Fields
- 

## Example JSON
```json
{
  "from_letter,omitempty": "...",
  "to_letter,omitempty": "...",
  "letter_title,omitempty": "...",
  "letter_chief_name,omitempty": "...",
  "letter_action_person,omitempty": "...",
  "letter_credit_chief,omitempty": "...",
  "phone,omitempty": "..."
}
```

## API Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/emza_sanad_barghashtis/create` | Create a new emza_sanad_barghashtis |
| POST | `/api/emza_sanad_barghashtis/batchCreate` | Create multiple emza_sanad_barghashtiss |
| GET | `/api/emza_sanad_barghashtis/getOne/:id` | Get a single emza_sanad_barghashtis by ID |
| GET | `/api/emza_sanad_barghashtis/getAll` | Get all emza_sanad_barghashtiss |
| GET | `/api/emza_sanad_barghashtis/getPage` | Get paginated emza_sanad_barghashtiss |
| PUT | `/api/emza_sanad_barghashtis/update/:id` | Update a emza_sanad_barghashtis |
| GET | `/api/emza_sanad_barghashtis/search` | Search emza_sanad_barghashtiss |
| GET | `/api/emza_sanad_barghashtis/getDeleted` | Get deleted emza_sanad_barghashtiss |
| PATCH | `/api/emza_sanad_barghashtis/softDelete/:id` | Soft delete a emza_sanad_barghashtis |
| PATCH | `/api/emza_sanad_barghashtis/batchSoftDelete` | Soft delete multiple emza_sanad_barghashtiss |
| DELETE | `/api/emza_sanad_barghashtis/delete/:id` | Permanently delete a emza_sanad_barghashtis |
| DELETE | `/api/emza_sanad_barghashtis/batchDelete` | Permanently delete multiple emza_sanad_barghashtiss |
| PATCH | `/api/emza_sanad_barghashtis/restore/:id` | Restore a soft-deleted emza_sanad_barghashtis |
| PATCH | `/api/emza_sanad_barghashtis/batchRestore` | Restore multiple soft-deleted emza_sanad_barghashtiss |

