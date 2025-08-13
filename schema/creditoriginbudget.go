package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

type CreditOriginBudget struct {
	ent.Schema
}

func (CreditOriginBudget) Fields() []ent.Field {
	return []ent.Field{
		field.Int("id").
			Unique().
			Immutable(),

		field.String("radif").
			NotEmpty().
			Comment("ردیف بودجه\u200cای"),

		field.String("madeh").
			NotEmpty().
			Comment("ماده بودجه\u200cای"),

		field.String("payment_description").
			NotEmpty().
			Comment("شرح هزینه"),

		field.Time("deleted_at").
			Optional().
			Nillable().
			Comment("حذف نرم"),
	}
}

func (CreditOriginBudget) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("credit", Credits.Type),

		edge.From("barname", Barname.Type).
			Ref("credit_origin_budgets").
			Unique().
			Required(),

		edge.From("faaliat", Faaliat.Type).
			Ref("credit_origin_budgets").
			Unique().
			Required(),
	}
}

func (CreditOriginBudget) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("deleted_at"),
	}
}
