package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// AmelKharid holds the schema definition for the AmelKharid entity.
type AmelKharid struct {
	ent.Schema
}

func (AmelKharid) Fields() []ent.Field {
	return []ent.Field{
		field.String("number_hesab").
			NotEmpty().
			Comment("شماره حساب"),

		field.String("onvan_hesab").
			NotEmpty().
			Comment("عنوان حساب"),

		field.Time("deleted_at").
			Nillable().
			Optional().
			Comment("حذف نرم"),
	}
}

func (AmelKharid) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("person", Person.Type).
			Ref("amel_kharids").
			Unique().
			Required().
			Comment("شخص"),

		edge.From("yegan", Yegan.Type).
			Ref("amel_kharids").
			Unique().
			Required().
			Comment("یگان"),

		edge.To("tankhah", Tankhah.Type),
	}
}
