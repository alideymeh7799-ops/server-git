# PrePayment Model

## Description


## Fields
| Field Name | JSON Key | DB Column | Type | Required | Validation | Description |
|------------|----------|-----------|------|----------|------------|-------------|
| ID | id | id | int | false | omitempty,gt=0 |  |
| PersonID | person_id | person_id | int | false | gt=0,exists=persons.id |  |
| PriceEzafeKar | price_ezafe_kar | price_ezafe_kar | int64 | true | required,gt=0 |  |
| SumMakhaz | sum_makhaz | sum_makhaz | float64 | true | required,gt=0 |  |
| Duration | duration | duration | int64 | true | required,gt=0 |  |
| PriceAsli | price_asli | price_asli | float64 | true | required,gt=0 |  |
| Description | description,omitempty | description | string | false | omitempty,max=255,regex=epns |  |
| TakhsisEtebarID | takhsis_etebar_id | takhsis_etebar_id | int | false | gt=0,exists=takhsis_etebars.id |  |
| PardakhtTajmieeID | pardakht_tajmiee_id | pardakht_tajmiee_id | int | false | gt=0,exists=pardakht_tajmiees.id |  |
| DeletedAt | deleted_at,omitempty | deleted_at | *time.Time | false | omitempty,pasttime |  |
| PardakhtTajmiee | pardakht,omitempty |  | *PardakhtTajmiee | false |  |  |
| TakhsisEtebar | takhsis,omitempty |  | *TakhsisEtebar | false |  |  |
| Person | person,omitempty |  | *Person | false |  |  |


## Relationships
| Field | Type | Relation Type | Related Table | Foreign Key |
|-------|------|---------------|---------------|-------------|
| PardakhtTajmiee | *PardakhtTajmiee | One-to-One | pardakht_tajmiees | pardakht_tajmiee_id |
| TakhsisEtebar | *TakhsisEtebar | One-to-One | takhsis_etebars | takhsis_etebar_id |
| Person | *Person | One-to-One | persons | person_id |


## Required Fields
- price_ezafe_kar
- sum_makhaz
- duration
- price_asli

## Example JSON
```json
{
  "id": "...",
  "person_id": "...",
  "price_ezafe_kar": "...",
  "sum_makhaz": "...",
  "duration": "...",
  "price_asli": "...",
  "description,omitempty": "...",
  "takhsis_etebar_id": "...",
  "pardakht_tajmiee_id": "...",
  "deleted_at,omitempty": "...",
  "pardakht,omitempty": "...",
  "takhsis,omitempty": "...",
  "person,omitempty": "..."
}
```

## API Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/pre_payments/create` | Create a new pre_payments |
| POST | `/api/pre_payments/batchCreate` | Create multiple pre_paymentss |
| GET | `/api/pre_payments/getOne/:id` | Get a single pre_payments by ID |
| GET | `/api/pre_payments/getAll` | Get all pre_paymentss |
| GET | `/api/pre_payments/getPage` | Get paginated pre_paymentss |
| PUT | `/api/pre_payments/update/:id` | Update a pre_payments |
| GET | `/api/pre_payments/search` | Search pre_paymentss |
| GET | `/api/pre_payments/getDeleted` | Get deleted pre_paymentss |
| PATCH | `/api/pre_payments/softDelete/:id` | Soft delete a pre_payments |
| PATCH | `/api/pre_payments/batchSoftDelete` | Soft delete multiple pre_paymentss |
| DELETE | `/api/pre_payments/delete/:id` | Permanently delete a pre_payments |
| DELETE | `/api/pre_payments/batchDelete` | Permanently delete multiple pre_paymentss |
| PATCH | `/api/pre_payments/restore/:id` | Restore a soft-deleted pre_payments |
| PATCH | `/api/pre_payments/batchRestore` | Restore multiple soft-deleted pre_paymentss |

