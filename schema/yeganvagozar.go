package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// YeganVagozar holds the schema definition for the YeganVagozar entity.
type YeganVagozar struct {
	ent.Schema
}

func (YeganVagozar) Fields() []ent.Field {
	return []ent.Field{
		field.Int("id").
			Unique().
			Immutable(),

		field.String("name").
			NotEmpty().
			Comment("نام یگان واگذارنده"),

		field.Time("deleted_at").
			Optional().
			Nillable().
			Comment("حذف نرم"),
	}
}

func (YeganVagozar) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("add_credit", AddCredit.Type),
	}
}

func (YeganVagozar) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("deleted_at"),
	}
}
