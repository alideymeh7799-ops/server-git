package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// Faaliat holds the schema definition for the Faaliat entity.
type Faaliat struct {
	ent.Schema
}

func (Faaliat) Fields() []ent.Field {
	return []ent.Field{
		field.Int("id").
			Unique().
			Immutable(),

		field.Int("code").
			Comment("کد فعالیت"),

		field.String("description").
			Optional().
			Comment("توضیحات"),

		field.Time("deleted_at").
			Optional().
			Nillable().
			Comment("حذف نرم"),
	}
}

func (Faaliat) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("credit_origin_budgets", CreditOriginBudget.Type),
	}
}

func (Faaliat) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("code"),
		index.Fields("deleted_at"),
	}
}
