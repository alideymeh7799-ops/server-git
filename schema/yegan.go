package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// Yegan holds the schema definition for the Yegan entity.
type Yegan struct {
	ent.Schema
}

func (Yegan) Fields() []ent.Field {
	return []ent.Field{
		field.Int("id").
			Unique().
			Immutable(),

		field.Int("code").
			Unique().
			Comment("کد یگان"),

		field.String("name").
			NotEmpty().
			Comment("نام یگان"),

		field.Time("deleted_at").
			Optional().
			Nillable().
			Comment("حذف نرم"),
	}
}

func (Yegan) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("personal_infos", PersonalInfo.Type),
		edge.To("amel_kharids", AmelKharid.Type),
		edge.To("emza_yegan", EmzaYegan.Type),
		edge.To("jabejae_eteabars", JabejaeEtebar.Type),
		edge.To("takhsis_eteabars", TakhsisEtebar.Type),
	}
}

func (Yegan) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("code"),
		index.Fields("deleted_at"),
	}
}
