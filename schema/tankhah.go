package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Tankhah holds the schema definition for the Tankhah entity.
type Tankhah struct {
	ent.Schema
}

func (Tankhah) Fields() []ent.Field {
	return []ent.Field{
		field.Int("id").Unique().Immutable(),
		field.Int64("amount"),
		field.String("description"),
		field.Time("date_tankhah"),
		field.Time("deleted_at").
			Optional().
			Nillable(),
	}
}

func (Tankhah) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("amel_kharid", AmelKharid.Type).
			Ref("tankhah").
			Unique().
			Required(),

		edge.From("takhsis_etebar", TakhsisEtebar.Type).
			Ref("tankhah").
			Unique().
			Required(),
	}
}
