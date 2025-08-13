package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// GhermezEtebar holds the schema definition for the GhermezEtebar entity.
type GhermezEtebar struct {
	ent.Schema
}

func (GhermezEtebar) Fields() []ent.Field {
	return []ent.Field{
		field.Time("date_ghermez").Comment("تاریخ قرمز شدن"),
		field.Int64("amount_ghermez").Comment("مبلغ قرمز شده"),
		field.String("description").Comment("توضیحات"),
		field.Time("deleted_at").Optional().Nillable().Comment("حذف نرم"),
	}
}

func (GhermezEtebar) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("takhsis", TakhsisEtebar.Type).
			Ref("ghermez_eteabars").
			Unique().
			Required().
			Comment("ارجاع به تخصیص اعتبار"),
	}
}
