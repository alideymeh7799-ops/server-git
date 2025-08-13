package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// PardakhtTajmiee holds the schema definition for the PardakhtTajmiee entity.
type PardakhtTajmiee struct {
	ent.Schema
}

func (PardakhtTajmiee) Fields() []ent.Field {
	return []ent.Field{
		field.Int("id").Unique().Immutable(),
		field.String("description").Comment("توضیحات"),
		field.Time("date_pardakht").Comment("تاریخ پرداخت"),
		field.Int64("amount_pardakht").Comment("مبلغ پرداخت"),
		field.Time("deleted_at").Optional().Nillable().Comment("حذف نرم"),
	}
}

func (PardakhtTajmiee) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("pre_payments", PrePayment.Type),
	}
}
