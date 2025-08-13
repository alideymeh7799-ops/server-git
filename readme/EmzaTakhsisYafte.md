# EmzaTakhsisYafte Model

## Description


## Fields
| Field Name | JSON Key | DB Column | Type | Required | Validation | Description |
|------------|----------|-----------|------|----------|------------|-------------|
| ServiceForce | service_force,omitempty | service_force | *string | false | omitempty,max=50,regex=epns | انتخاب نیروی خدمتی |
| FromAllocation | from_allocation,omitempty | from_allocation | *string | false | omitempty,max=50,regex=epns | از تخصیص |
| MajorUnitName | major_unit_name,omitempty | major_unit_name | *string | false | omitempty,max=50,regex=epns | نام یگان عمده |
| MajorUnitRank | major_unit_rank,omitempty | major_unit_rank | *string | false | omitempty,max=50,regex=epns | درجه ف یگان عمده |
| MajorUnitCommanderName | major_unit_commander_name,omitempty | major_unit_commander_name | *string | false | omitempty,max=50,regex=epns | نام ف یگان عمده |
| KontName | kont_name,omitempty | kont_name | *string | false | omitempty,max=50,regex=epns | نام کنت |
| KontRank | kont_rank,omitempty | kont_rank | *string | false | omitempty,max=50,regex=epns | درجه رئیس کنت |
| KontCommanderName | kont_commander_name,omitempty | kont_commander_name | *string | false | omitempty,max=50,regex=epns | نام رئیس کنت |
| CreditName | credit_name,omitempty | credit_name | *string | false | omitempty,max=50,regex=epns | نام اعتبارات |
| CreditCommanderRank | credit_commander_rank,omitempty | credit_commander_rank | *string | false | omitempty,max=50,regex=epns | درجه رئیس اعتبارات |
| CreditReceiver1 | credit_receiver1,omitempty | credit_receiver1 | *string | false | omitempty,max=50,regex=epns | گیرنده اعتبار یک |
| CreditReceiver2 | credit_receiver2,omitempty | credit_receiver2 | *string | false | omitempty,max=50,regex=epns | گیرنده اعتبار دوم |
| CreditReceiver3 | credit_receiver3,omitempty | credit_receiver3 | *string | false | omitempty,max=50,regex=epns | گیرنده اعتبار سوم |
| CreditReceiver4 | credit_receiver4,omitempty | credit_receiver4 | *string | false | omitempty,max=50,regex=epns | گیرنده اعتبار چهارم |


## Relationships
| Field | Type | Relation Type | Related Table | Foreign Key |
|-------|------|---------------|---------------|-------------|


## Required Fields
- 

## Example JSON
```json
{
  "service_force,omitempty": "...",
  "from_allocation,omitempty": "...",
  "major_unit_name,omitempty": "...",
  "major_unit_rank,omitempty": "...",
  "major_unit_commander_name,omitempty": "...",
  "kont_name,omitempty": "...",
  "kont_rank,omitempty": "...",
  "kont_commander_name,omitempty": "...",
  "credit_name,omitempty": "...",
  "credit_commander_rank,omitempty": "...",
  "credit_receiver1,omitempty": "...",
  "credit_receiver2,omitempty": "...",
  "credit_receiver3,omitempty": "...",
  "credit_receiver4,omitempty": "..."
}
```

## API Routes
| Method | Route | Description |
|--------|-------|-------------|

