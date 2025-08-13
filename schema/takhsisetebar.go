package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// TakhsisEtebar holds the schema definition for the TakhsisEtebar entity.
type TakhsisEtebar struct {
	ent.Schema
}

func (TakhsisEtebar) Fields() []ent.Field {
	return []ent.Field{
		field.Int64("amount_takhsis").Comment("مبلغ تخصیص داده شده"),
		field.String("sharh_takhsis").Comment("شرح تخصیص"),
		field.Time("date_takhsis").Comment("تاریخ تخصیص"),
		field.Time("deleted_at").Optional().Nillable().Comment("حذف نرم"),
	}
}

func (TakhsisEtebar) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("add_credit", AddCredit.Type).
			Ref("takhsis_eteabars").
			Required().
			Unique().
			Comment("ارجاع به اعتبار افزوده شده"),

		edge.From("yegan", Yegan.Type).
			Ref("takhsis_eteabars").
			Required().
			Unique().
			Comment("ارجاع به یگان دریافت کننده تخصیص"),

		edge.To("ghermez_eteabars", GhermezEtebar.Type).
			Comment("مقدارهای قرمز شده از این تخصیص"),

		edge.To("jabejae_eteabars", JabejaeEtebar.Type).
			Comment("مقدارهای جابجایی شده از این تخصیص"),

		edge.To("padashs", Padash.Type).
			Comment("مقدارهای پاداش شده از این تخصیص"),

		edge.To("pre_payments", PrePayment.Type).
			Comment("ارجاع به پرداخت"),

		edge.To("naghd_pardakhts", Naghdpardakht.Type),

		edge.To("tankhah", Tankhah.Type),
	}
}
