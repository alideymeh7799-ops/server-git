package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Naghdpardakht holds the schema definition for the Naghdpardakht entity.
type Naghdpardakht struct {
	ent.Schema
}

func (Naghdpardakht) Fields() []ent.Field {
	return []ent.Field{
		field.Int("id").Unique().Immutable(),
		field.Int64("amount").Comment("مبلغ پرداخت نقدی"),
		field.String("description").Comment("توضیحات"),
		field.Time("date_pardakht").Comment("تاریخ پرداخت"),
		field.Time("deleted_at").Optional().Nillable().Comment("حذف نرم"),
	}
}

func (Naghdpardakht) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("takhsis_etebar", TakhsisEtebar.Type).
			Ref("naghd_pardakhts").
			Unique().
			Required(),

		edge.From("peymankar", PeymanKar.Type).
			Ref("naghd_pardakhts").
			Unique().
			Required(),
	}
}
