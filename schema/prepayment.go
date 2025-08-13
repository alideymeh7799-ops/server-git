package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// PrePayment holds the schema definition for the PrePayment entity.
type PrePayment struct {
	ent.Schema
}

func (PrePayment) Fields() []ent.Field {
	return []ent.Field{
		field.Int("id").
			Unique().
			Immutable(),

		field.Int64("price_ezafe_kar").
			Comment("مبلغ اضافه کار"),

		field.Float("sum_makhaz").
			Comment("مجموع ماخذ یک تا سه"),

		field.Int64("duration").
			Comment("مدت زمان کارکرد"),

		field.Float("price_asli").
			Comment("مبلغ اصلی اضافه کار"),

		field.String("description").
			Optional().
			Nillable().
			Comment("توضیحات"),

		field.Time("deleted_at").
			Optional().
			Nillable().
			Comment("حذف نرم"),
	}
}

func (PrePayment) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("person", Person.Type).
			Ref("pre_payments").
			Required().
			Unique(),

		edge.From("takhsis_etebar", TakhsisEtebar.Type).
			Ref("pre_payments").
			Unique().
			Required(),

		edge.From("pardakht_tajmiee", PardakhtTajmiee.Type).
			Ref("pre_payments").
			Unique(),
	}
}

func (PrePayment) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("deleted_at"),
	}
}
