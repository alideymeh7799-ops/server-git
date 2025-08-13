# EtelatMailParvande Model

## Description


## Fields
| Field Name | JSON Key | DB Column | Type | Required | Validation | Description |
|------------|----------|-----------|------|----------|------------|-------------|
| ID | id,omitempty | id | int | false | gte=0 |  |
| YeganID | yegan_id,omitempty | yegan_id | int | true | required,gt=0,exists=yegans.id |  |
| OnvanMail | onvan_mail,omitempty | onvan_mail | *string | false | omitempty,max=255,regex=epns |  |
| ShPTakhsisBudget | sh_p_takhsis_budget,omitempty | sh_p_takhsis_budget | *string | false | omitempty,max=30,regex=^[0-9\\u06F0-\\u06F9./\\- ]+$ |  |
| ShPTankhahBudget | sh_p_tankhah_budget,omitempty | sh_p_tankhah_budget | *string | false | omitempty,max=30,regex=^[0-9\\u06F0-\\u06F9./\\- ]+$ |  |
| ShPNaghdPardakhtBudget | sh_p_naghd_pardakht_budget,omitempty | sh_p_naghd_pardakht_budget | *string | false | omitempty,max=30,regex=^[0-9\\u06F0-\\u06F9./\\- ]+$ |  |
| ShPElamBarghashtBudget | sh_p_eelam_barghasht_budget,omitempty | sh_p_eelam_barghasht_budget | *string | false | omitempty,max=30,regex=^[0-9\\u06F0-\\u06F9./\\- ]+$ |  |
| ShPSanadBarghashtBudget | sh_p_sanad_barghasht_budget,omitempty | sh_p_sanad_barghasht_budget | *string | false | omitempty,max=30,regex=^[0-9\\u06F0-\\u06F9./\\- ]+$ |  |
| ShPCreditBudget | sh_p_credit_budget,omitempty | sh_p_credit_budget | *string | false | omitempty,max=30,regex=^[0-9\\u06F0-\\u06F9./\\- ]+$ |  |
| ShPCreditNonBudget | sh_p_credit_non_budget,omitempty | sh_p_credit_non_budget | *string | false | omitempty,max=30,regex=^[0-9\\u06F0-\\u06F9./\\- ]+$ |  |
| ShPTakhsisNonBudget | sh_p_takhsis_non_budget,omitempty | sh_p_takhsis_non_budget | *string | false | omitempty,max=30,regex=^[0-9\\u06F0-\\u06F9./\\- ]+$ |  |
| ShPTankhahNonBudget | sh_p_tankhah_non_budget,omitempty | sh_p_tankhah_non_budget | *string | false | omitempty,max=30,regex=^[0-9\\u06F0-\\u06F9./\\- ]+$ |  |
| ShPNaghdPardakhtNonBudget | sh_p_naghd_pardakht_non_budget,omitempty | sh_p_naghd_pardakht_non_budget | *string | false | omitempty,max=30,regex=^[0-9\\u06F0-\\u06F9./\\- ]+$ |  |
| ShPElamBarghashtNonBudget | sh_p_eelam_barghasht_non_budget,omitempty | sh_p_eelam_barghasht_non_budget | *string | false | omitempty,max=30,regex=^[0-9\\u06F0-\\u06F9./\\- ]+$ |  |
| ShPSanadBarghashtNonBudget | sh_p_sanad_barghasht_non_budget,omitempty | sh_p_sanad_barghasht_non_budget | *string | false | omitempty,max=30,regex=^[0-9\\u06F0-\\u06F9./\\- ]+$ |  |
| ShPMotefareghe | sh_p_motefareghe,omitempty | sh_p_motefareghe | *string | false | omitempty,max=30,regex=^[0-9\\u06F0-\\u06F9./\\- ]+$ |  |
| DeletedAt | deleted_at,omitempty | deleted_at | *time.Time | false | omitempty,pasttime |  |
| Yegan | yegan,omitempty |  | *Yegan | false |  |  |


## Relationships
| Field | Type | Relation Type | Related Table | Foreign Key |
|-------|------|---------------|---------------|-------------|
| Yegan | *Yegan | One-to-One | yegans | yegan_id |


## Required Fields
- yegan_id,omitempty

## Example JSON
```json
{
  "id,omitempty": "...",
  "yegan_id,omitempty": "...",
  "onvan_mail,omitempty": "...",
  "sh_p_takhsis_budget,omitempty": "...",
  "sh_p_tankhah_budget,omitempty": "...",
  "sh_p_naghd_pardakht_budget,omitempty": "...",
  "sh_p_eelam_barghasht_budget,omitempty": "...",
  "sh_p_sanad_barghasht_budget,omitempty": "...",
  "sh_p_credit_budget,omitempty": "...",
  "sh_p_credit_non_budget,omitempty": "...",
  "sh_p_takhsis_non_budget,omitempty": "...",
  "sh_p_tankhah_non_budget,omitempty": "...",
  "sh_p_naghd_pardakht_non_budget,omitempty": "...",
  "sh_p_eelam_barghasht_non_budget,omitempty": "...",
  "sh_p_sanad_barghasht_non_budget,omitempty": "...",
  "sh_p_motefareghe,omitempty": "...",
  "deleted_at,omitempty": "...",
  "yegan,omitempty": "..."
}
```

## API Routes
| Method | Route | Description |
|--------|-------|-------------|

