# Padash Model

## Description


## Fields
| Field Name | JSON Key | DB Column | Type | Required | Validation | Description |
|------------|----------|-----------|------|----------|------------|-------------|
| ID | id | id | int | false | omitempty,gt=0 |  |
| PersonID | person_id | person_id | int | false | gt=0,exists=persons.id |  |
| NaghdPardakhtID | naghd_pardakht_id,omitempty | naghd_pardakht_id | *int | false | omitempty,gt=0,exists=naghd_pardakhts.id |  |
| TankhahID | tankhah_id,omitempty | tankhah_id | *int | false | omitempty,gt=0,exists=tankhahs.id |  |
| DatePadash | date_padash | date_padash | time.Time | true | required,pasttime |  |
| AmountPadash | amount_padash | amount_padash | int64 | true | required,gt=0 |  |
| Description | description | description | string | true | required,max=255,regex=epns |  |
| DeletedAt | deleted_at,omitempty | deleted_at | *time.Time | false | omitempty,pasttime |  |
| Person | person,omitempty |  | *Person | false |  |  |
| NaghdPardakht | naghd_pardakht,omitempty |  | *NaghdPardakht | false |  |  |
| Tankhah | tankhah,omitempty |  | *Tankhah | false |  |  |


## Relationships
| Field | Type | Relation Type | Related Table | Foreign Key |
|-------|------|---------------|---------------|-------------|
| Person | *Person | One-to-One | persons | person_id |
| NaghdPardakht | *NaghdPardakht | One-to-One | naghd_pardakhts | naghd_pardakht_id |
| Tankhah | *Tankhah | One-to-One | tankhahs | tankhah_id |


## Required Fields
- date_padash
- amount_padash
- description

## Example JSON
```json
{
  "id": "...",
  "person_id": "...",
  "naghd_pardakht_id,omitempty": "...",
  "tankhah_id,omitempty": "...",
  "date_padash": "...",
  "amount_padash": "...",
  "description": "...",
  "deleted_at,omitempty": "...",
  "person,omitempty": "...",
  "naghd_pardakht,omitempty": "...",
  "tankhah,omitempty": "..."
}
```

## API Routes
| Method | Route | Description |
|--------|-------|-------------|

