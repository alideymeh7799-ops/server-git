package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

type Person struct {
	ent.Schema
}

func (Person) Fields() []ent.Field {
	return []ent.Field{
		field.Int("id").
			Unique().
			Immutable(),

		field.String("name").
			NotEmpty().
			Comment("نام"),

		field.String("family").
			NotEmpty().
			Comment("نام خانوادگی"),

		field.String("personnel_number").
			NotEmpty().
			Comment("شماره پرسنلی"),

		field.String("id_number").
			NotEmpty().
			Comment("کد ملی"),

		field.Time("deleted_at").
			Optional().
			Nillable().
			Comment("حذف نرم"),
	}
}

func (Person) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("users", User.Type),
		edge.To("personal_infos", PersonalInfo.Type),
		edge.To("pre_payments", PrePayment.Type),
		edge.To("amel_kharids", AmelKharid.Type),
		edge.To("padashs", Padash.Type),
	}
}

func (Person) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("name"),
		index.Fields("family"),
		index.Fields("personnel_number"),
		index.Fields("id_number"),
		index.Fields("deleted_at"),
	}
}
