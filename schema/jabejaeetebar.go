package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// JabejaeEtebar holds the schema definition for the JabejaeEtebar entity.
type JabejaeEtebar struct {
	ent.Schema
}

func (JabejaeEtebar) Fields() []ent.Field {
	return []ent.Field{
		field.Time("date_jabejae").Comment("تاریخ جابجایی"),
		field.Int64("amount_jabejae").Comment("مبلغ جابجایی"),
		field.String("description").Comment("توضیحات"),
		field.Time("deleted_at").Optional().Nillable().Comment("حذف نرم"),
	}
}

func (JabejaeEtebar) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("takhsis", TakhsisEtebar.Type).
			Ref("jabejae_eteabars").
			Required().
			Unique().
			Comment("ارجاع به تخصیص"),

		edge.From("yegan", Yegan.Type).
			Ref("jabejae_eteabars").
			Required().
			Unique().
			Comment("ارجاع به یگان مقصد جابجایی"),
	}
}
