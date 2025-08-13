package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// EmzaCont holds the schema definition for the EmzaCont entity.
type EmzaCont struct {
	ent.Schema
}

func (EmzaCont) Fields() []ent.Field {
	return []ent.Field{
		field.String("r_hesab_dari_daraei").Comment("رئیس حساب داری دارایی"),
		field.String("r_momayezi").Comment("رئیس ممیزی"),
		field.String("r_sandogh").Comment("رئیس صندوق"),
		field.String("r_daraei").Comment("رئیس درایی"),
		field.String("m_tanzim_padash").Comment("متصدی تنظیم پاداش"),
		field.String("m_tanzim_ezafekar").Comment("متصدی تنظیم اضافه کار"),
		field.String("m_tanzim_etebar_budget").Comment("متصدی تنظیم اعتبارات بودجه ای"),
		field.String("m_tanzim_etebar_non_budget").Comment("متصدی تنظیم اعتبارات غیر بودجه ای"),
		field.String("r_hesab_dari_cont").Comment("رئیس حساب داری کنترل"),
		field.String("r_cont").Comment("رئیس کنترل"),
		field.String("az_name").Comment("از نامه"),
		field.String("be_name").Comment("به نامه"),
		field.String("mozo_name").Comment("موضوع نامه"),
		field.String("tel").Comment("تلفن"),
		field.String("niro_khedmati").Comment("نیرو خدمتی"),
		field.String("yegan_omdeh").Comment("یگان عمده"),
		field.String("f_yegan_omdeh").Comment("فرماندهی یگان عمده"),
		field.Time("deleted_at").Optional().Nillable().Comment("حذف نرم"),
	}
}

func (EmzaCont) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("deleted_at"),
	}
}
