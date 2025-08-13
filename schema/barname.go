package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// Barname holds the schema definition for the Barname entity.
type Barname struct {
	ent.Schema
}

func (Barname) Fields() []ent.Field {
	return []ent.Field{
		field.Int("id").
			Unique().
			Immutable(),

		field.Int("code").
			Comment("کد برنامه"),

		field.String("description").
			Optional().
			Comment("توضیحات"),

		field.Time("deleted_at").
			Optional().
			Nillable().
			Comment("حذف نرم"),
	}
}

func (Barname) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("credit_origin_budgets", CreditOriginBudget.Type),
	}
}

func (Barname) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("code"),
		index.Fields("deleted_at"),
	}
}
