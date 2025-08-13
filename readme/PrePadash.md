# PrePadash Model

## Description


## Fields
| Field Name | JSON Key | DB Column | Type | Required | Validation | Description |
|------------|----------|-----------|------|----------|------------|-------------|
| ID | id,omitempty | id | int | false | omitempty,gt=0 |  |
| PersonID | person_id | person_id | int | false | gt=0,exists=persons.id |  |
| AmountPadash | amount_padash | amount_padash | float64 | true | required,gt=0 |  |
| DeletedAt | deleted_at,omitempty | deleted_at | *time.Time | false | omitempty,pasttime |  |
| Person | person,omitempty |  | *Person | false |  |  |


## Relationships
| Field | Type | Relation Type | Related Table | Foreign Key |
|-------|------|---------------|---------------|-------------|
| Person | *Person | One-to-One | persons | person_id |


## Required Fields
- amount_padash

## Example JSON
```json
{
  "id,omitempty": "...",
  "person_id": "...",
  "amount_padash": "...",
  "deleted_at,omitempty": "...",
  "person,omitempty": "..."
}
```

## API Routes
| Method | Route | Description |
|--------|-------|-------------|

