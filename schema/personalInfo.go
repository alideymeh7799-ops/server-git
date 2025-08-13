package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// PersonalInfo holds the schema definition for the PersonalInfo entity.
type PersonalInfo struct {
	ent.Schema
}

func (PersonalInfo) Fields() []ent.Field {
	return []ent.Field{
		field.Int("id").
			Unique().
			Immutable(),

		field.String("number_hesab").
			NotEmpty().
			Comment("شماره حساب"),

		field.Int("mhsa").
			Comment("ماخذ اول"),

		field.Int("mfmo").
			Comment("ماخذ دوم"),

		field.Int("mhso").
			Comment("ماخذ سوم"),

		field.Time("deleted_at").
			Optional().
			Nillable().
			Comment("حذف نرم"),
	}
}

func (PersonalInfo) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("person", Person.Type).
			Ref("personal_infos").
			Required().
			Unique(),

		edge.From("yegan", Yegan.Type).
			Ref("personal_infos").
			Required().
			Unique(),

		edge.From("rank", Rank.Type).
			Ref("personal_infos").
			Required().
			Unique(),
	}
}

func (PersonalInfo) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("deleted_at"),
	}
}
