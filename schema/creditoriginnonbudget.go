package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// CreditOriginNonBudget holds the schema definition for the CreditOriginNonBudget entity.
type CreditOriginNonBudget struct {
	ent.Schema
}

func (CreditOriginNonBudget) Fields() []ent.Field {
	return []ent.Field{
		field.Int("id").
			Unique().
			Immutable(),

		field.String("sarfasl").
			NotEmpty().
			Comment("سرفصل"),

		field.String("payment_description").
			NotEmpty().
			Comment("شرح هزینه"),

		field.String("mojavez").
			NotEmpty().
			Comment("مجوز"),

		field.String("radif").
			NotEmpty().
			Comment("ردیف"),

		field.Time("deleted_at").
			Optional().
			Nillable().
			Comment("حذف نرم"),
	}
}

func (CreditOriginNonBudget) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("credit", Credits.Type),
	}
}

func (CreditOriginNonBudget) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("deleted_at"),
	}
}
