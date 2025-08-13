package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// PeymanKar holds the schema definition for the PeymanKar entity.
type PeymanKar struct {
	ent.Schema
}

func (PeymanKar) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").NotEmpty().Comment("نام پیمانکار"),
		field.String("number_hesab").NotEmpty().Comment("شماره حساب پیمانکار"),
		field.Time("deleted_at").Optional().Nillable().Comment("حذف نرم"),
	}
}

func (PeymanKar) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("naghd_pardakhts", Naghdpardakht.Type),
	}
}
