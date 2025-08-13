# EmzaCont Model

## Description


## Fields
| Field Name | JSON Key | DB Column | Type | Required | Validation | Description |
|------------|----------|-----------|------|----------|------------|-------------|
| RHesabDariDaraei | r_hesab_dari_daraei,omitempty | r_hesab_dari_daraei | *string | false | omitempty,max=50,regex=epns |  |
| RMomayezi | r_momayezi,omitempty | r_momayezi | *string | false | omitempty,max=50,regex=epns |  |
| RSandogh | r_sandogh,omitempty | r_sandogh | *string | false | omitempty,max=50,regex=epns |  |
| RDaraei | r_daraei,omitempty | r_daraei | *string | false | omitempty,max=50,regex=epns |  |
| MTanzimPadash | m_tanzim_padash,omitempty | m_tanzim_padash | *string | false | omitempty,max=50,regex=epns |  |
| MTanzimEzafekar | m_tanzim_ezafekar,omitempty | m_tanzim_ezafekar | *string | false | omitempty,max=50,regex=epns |  |
| MTanzimEtebarBudget | m_tanzim_etebar_budget,omitempty | m_tanzim_etebar_budget | *string | false | omitempty,max=50,regex=epns |  |
| MTanzimEtebarNonBudget | m_tanzim_etebar_non_budget,omitempty | m_tanzim_etebar_non_budget | *string | false | omitempty,max=50,regex=epns |  |
| RHesabDariCont | r_hesab_dari_cont,omitempty | r_hesab_dari_cont | *string | false | omitempty,max=50,regex=epns |  |
| RCont | r_cont,omitempty | r_cont | *string | false | omitempty,max=50,regex=epns |  |
| AzName | az_name,omitempty | az_name | *string | false | omitempty,max=100,regex=epns |  |
| BeName | be_name,omitempty | be_name | *string | false | omitempty,max=100,regex=epns |  |
| MozoName | mozo_name,omitempty | mozo_name | *string | false | omitempty,max=255,regex=epns |  |
| Tel | tel,omitempty | tel | *string | false | omitempty,min=4,max=11,regexp=tel |  |
| NiroKhedmati | niro_khedmati,omitempty | niro_khedmati | *string | false | omitempty,max=50,regex=epns |  |
| YeganOmdeh | yegan_omdeh,omitempty | yegan_omdeh | *string | false | omitempty,max=50,regex=epns |  |
| FYeganOmdeh | f_yegan_omdeh,omitempty | f_yegan_omdeh | *string | false | omitempty,max=50,regex=epns |  |


## Relationships
| Field | Type | Relation Type | Related Table | Foreign Key |
|-------|------|---------------|---------------|-------------|


## Required Fields
- 

## Example JSON
```json
{
  "r_hesab_dari_daraei,omitempty": "...",
  "r_momayezi,omitempty": "...",
  "r_sandogh,omitempty": "...",
  "r_daraei,omitempty": "...",
  "m_tanzim_padash,omitempty": "...",
  "m_tanzim_ezafekar,omitempty": "...",
  "m_tanzim_etebar_budget,omitempty": "...",
  "m_tanzim_etebar_non_budget,omitempty": "...",
  "r_hesab_dari_cont,omitempty": "...",
  "r_cont,omitempty": "...",
  "az_name,omitempty": "...",
  "be_name,omitempty": "...",
  "mozo_name,omitempty": "...",
  "tel,omitempty": "...",
  "niro_khedmati,omitempty": "...",
  "yegan_omdeh,omitempty": "...",
  "f_yegan_omdeh,omitempty": "..."
}
```

## API Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/emza_conts/create` | Create a new emza_conts |
| POST | `/api/emza_conts/batchCreate` | Create multiple emza_contss |
| GET | `/api/emza_conts/getOne/:id` | Get a single emza_conts by ID |
| GET | `/api/emza_conts/getAll` | Get all emza_contss |
| GET | `/api/emza_conts/getPage` | Get paginated emza_contss |
| PUT | `/api/emza_conts/update/:id` | Update a emza_conts |
| GET | `/api/emza_conts/search` | Search emza_contss |
| GET | `/api/emza_conts/getDeleted` | Get deleted emza_contss |
| PATCH | `/api/emza_conts/softDelete/:id` | Soft delete a emza_conts |
| PATCH | `/api/emza_conts/batchSoftDelete` | Soft delete multiple emza_contss |
| DELETE | `/api/emza_conts/delete/:id` | Permanently delete a emza_conts |
| DELETE | `/api/emza_conts/batchDelete` | Permanently delete multiple emza_contss |
| PATCH | `/api/emza_conts/restore/:id` | Restore a soft-deleted emza_conts |
| PATCH | `/api/emza_conts/batchRestore` | Restore multiple soft-deleted emza_contss |

