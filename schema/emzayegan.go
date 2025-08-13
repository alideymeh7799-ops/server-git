package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// EmzaYegan holds the schema definition for the EmzaYegan entity.
type EmzaYegan struct {
	ent.Schema
}

func (EmzaYegan) Fields() []ent.Field {
	return []ent.Field{
		field.String("r_hesab_dari").Comment("رئیس حسابداری"),
		field.String("r_service").Comment("رئیس سرویس"),
		field.String("f_yegan").Comment("فرمانده ی یگان"),
		field.String("az_name").Comment("از نامه"),
		field.String("be_name").Comment("به نامه"),
		field.String("mozo_name").Comment("موضوع نامه"),
		field.String("tel").Comment("تلفن"),
		field.Time("deleted_at").Optional().Nillable().Comment("حذف نرم"),
	}
}

func (EmzaYegan) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("yegan", Yegan.Type).
			Ref("emza_yegan").
			Unique().
			Required(),
	}
}

func (EmzaYegan) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("deleted_at"),
	}
}
