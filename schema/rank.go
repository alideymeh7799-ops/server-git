package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// Rank holds the schema definition for the Rank entity.
type Rank struct {
	ent.Schema
}

func (Rank) Fields() []ent.Field {
	return []ent.Field{
		field.Int("id").
			Unique().
			Immutable(),

		field.Int("code").
			Unique().
			Comment("کد درجه").
			Positive(),

		field.String("name").
			NotEmpty().
			Comment("نام درجه"),

		field.Time("deleted_at").
			Optional().
			Nillable().
			Comment("حذف نرم"),
	}
}

func (Rank) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("personal_infos", PersonalInfo.Type),
	}
}

func (Rank) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("code"),
		index.Fields("deleted_at"),
	}
}
