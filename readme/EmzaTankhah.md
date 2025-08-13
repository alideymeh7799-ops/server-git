# EmzaTankhah Model

## Description

## Fields

| Field Name                 | JSON Key                                 | DB Column                      | Type     | Required | Validation                  | Description                  |
| -------------------------- | ---------------------------------------- | ------------------------------ | -------- | -------- | --------------------------- | ---------------------------- |
| UnitAccountingChief        | unit_accounting_chief,omitempty          | unit_accounting_chief          | \*string | false    | omitempty,max=50,regex=epns | رئیس حسابداری یگان           |
| UnitAccountingRank         | unit_accounting_rank,omitempty           | unit_accounting_rank           | \*string | false    | omitempty,max=50,regex=epns | درجه حسابداری یگان           |
| UnitAccountingFullName     | unit_accounting_full_name,omitempty      | unit_accounting_full_name      | \*string | false    | omitempty,max=50,regex=epns | نام و نشان حسابداری یگان     |
| UnitServiceChief           | unit_service_chief,omitempty             | unit_service_chief             | \*string | false    | omitempty,max=50,regex=epns | رئیس سرویس یگان              |
| UnitServiceRank            | unit_service_rank,omitempty              | unit_service_rank              | \*string | false    | omitempty,max=50,regex=epns | درجه رئیس سرویس یگان         |
| UnitServiceFullName        | unit_service_full_name,omitempty         | unit_service_full_name         | \*string | false    | omitempty,max=50,regex=epns | نام و نشات رئیس سرویس یگان   |
| MajorUnitCommander         | major_unit_commander,omitempty           | major_unit_commander           | \*string | false    | omitempty,max=50,regex=epns | فرمانده یگان عمده            |
| MajorUnitCommanderFullName | major_unit_commander_full_name,omitempty | major_unit_commander_full_name | \*string | false    | omitempty,max=50,regex=epns | نام و نشان فرمانده یگان عمده |
| FinanceKontChief           | finance_kont_chief,omitempty             | finance_kont_chief             | \*string | false    | omitempty,max=50,regex=epns | رئیس کنت امور مالی           |
| AuditChiefRank             | audit_chief_rank,omitempty               | audit_chief_rank               | \*string | false    | omitempty,max=50,regex=epns | درجه رئیس ممیزی              |
| AuditChiefName             | audit_chief_name,omitempty               | audit_chief_name               | \*string | false    | omitempty,max=50,regex=epns | نام رئیس ممیزی               |
| FundChiefRank              | fund_chief_rank,omitempty                | fund_chief_rank                | \*string | false    | omitempty,max=50,regex=epns | درجه رئیس صندوق              |
| FundChiefName              | fund_chief_name,omitempty                | fund_chief_name                | \*string | false    | omitempty,max=50,regex=epns | نام رئیس صندوق               |
| AssetAccountingRank        | asset_accounting_rank,omitempty          | asset_accounting_rank          | \*string | false    | omitempty,max=50,regex=epns | درجه رئیس حسابداری دارایی    |
| AssetAccountingName        | asset_accounting_name,omitempty          | asset_accounting_name          | \*string | false    | omitempty,max=50,regex=epns | نام رئیس حسابداری دارایی     |
| AssetName                  | asset_name,omitempty                     | asset_name                     | \*string | false    | omitempty,max=50,regex=epns | نام دارایی                   |
| AssetChiefRank             | asset_chief_rank,omitempty               | asset_chief_rank               | \*string | false    | omitempty,max=50,regex=epns | درجه رئیس دارایی             |
| AssetChiefName             | asset_chief_name,omitempty               | asset_chief_name               | \*string | false    | omitempty,max=50,regex=epns | نام رئیس دارایی              |

## Relationships

| Field | Type | Relation Type | Related Table | Foreign Key |
| ----- | ---- | ------------- | ------------- | ----------- |

## Required Fields

-

## Example JSON

```json
{
  "unit_accounting_chief,omitempty": "...",
  "unit_accounting_rank,omitempty": "...",
  "unit_accounting_full_name,omitempty": "...",
  "unit_service_chief,omitempty": "...",
  "unit_service_rank,omitempty": "...",
  "unit_service_full_name,omitempty": "...",
  "major_unit_commander,omitempty": "...",
  "major_unit_commander_full_name,omitempty": "...",
  "finance_kont_chief,omitempty": "...",
  "audit_chief_rank,omitempty": "...",
  "audit_chief_name,omitempty": "...",
  "fund_chief_rank,omitempty": "...",
  "fund_chief_name,omitempty": "...",
  "asset_accounting_rank,omitempty": "...",
  "asset_accounting_name,omitempty": "...",
  "asset_name,omitempty": "...",
  "asset_chief_rank,omitempty": "...",
  "asset_chief_name,omitempty": "..."
}
```

## API Routes

| Method | Route                                | Description                                  |
| ------ | ------------------------------------ | -------------------------------------------- |
| POST   | `/api/emza_tankhahs/create`          | Create a new emza_tankhahs                   |
| POST   | `/api/emza_tankhahs/batchCreate`     | Create multiple emza_tankhahss               |
| GET    | `/api/emza_tankhahs/getOne/:id`      | Get a single emza_tankhahs by ID             |
| GET    | `/api/emza_tankhahs/getAll`          | Get all emza_tankhahss                       |
| GET    | `/api/emza_tankhahs/getPage`         | Get paginated emza_tankhahss                 |
| PUT    | `/api/emza_tankhahs/update/:id`      | Update a emza_tankhahs                       |
| GET    | `/api/emza_tankhahs/search`          | Search emza_tankhahss                        |
| GET    | `/api/emza_tankhahs/getDeleted`      | Get deleted emza_tankhahss                   |
| PATCH  | `/api/emza_tankhahs/softDelete/:id`  | Soft delete a emza_tankhahs                  |
| PATCH  | `/api/emza_tankhahs/batchSoftDelete` | Soft delete multiple emza_tankhahss          |
| DELETE | `/api/emza_tankhahs/delete/:id`      | Permanently delete a emza_tankhahs           |
| DELETE | `/api/emza_tankhahs/batchDelete`     | Permanently delete multiple emza_tankhahss   |
| PATCH  | `/api/emza_tankhahs/restore/:id`     | Restore a soft-deleted emza_tankhahs         |
| PATCH  | `/api/emza_tankhahs/batchRestore`    | Restore multiple soft-deleted emza_tankhahss |
