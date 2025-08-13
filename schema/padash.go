package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Padash holds the schema definition for the Padash entity.
type Padash struct {
	ent.Schema
}

func (Padash) Fields() []ent.Field {
	return []ent.Field{
		field.Int("id").Unique().Immutable(),
		field.Time("date_padash").Comment("تاریخ پاداش"),
		field.Int64("amount_padash").Comment("مبلغ پاداش"),
		field.String("description").Comment("توضیحات"),
		field.Time("deleted_at").Optional().Nillable().Comment("حذف نرم"),
	}
}

func (Padash) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("takhsis", TakhsisEtebar.Type).
			Ref("padashs").
			Required().
			Unique(),

		edge.From("person", Person.Type).
			Ref("padashs").
			Required().
			Unique(),
	}
}
