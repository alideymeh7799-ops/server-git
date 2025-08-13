package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// AddCredit holds the schema definition for the AddCredit entity.
type AddCredit struct {
	ent.Schema
}

func (AddCredit) Fields() []ent.Field {
	return []ent.Field{
		field.Int("id").
			Unique(),

		field.String("number_etebar").
			NotEmpty().
			Comment("شماره اعتبار"),

		field.Time("date_etebar").
			Comment("تاریخ اعتبار"),

		field.Int64("amount_etebar").
			Comment("مبلغ اعتبار"),

		field.Time("deleted_at").
			Optional().
			Nillable().
			Comment("زمان حذف نرم"),
	}
}

func (AddCredit) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("yegan_vagozar", YeganVagozar.Type).
			Ref("add_credit").
			Unique().
			Comment("کد یگان واگذارنده").
			Required(),

		edge.From("credit", Credits.Type).
			Ref("add_credit").
			Unique().
			Comment("شناسه اعتبار").
			Required(),

		edge.To("takhsis_eteabars", TakhsisEtebar.Type),
	}
}

func (AddCredit) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("deleted_at"),
		index.Fields("number_etebar"),
		index.Fields("date_etebar"),
	}
}
