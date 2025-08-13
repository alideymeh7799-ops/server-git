package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Credits holds the schema definition for the Credits entity.
type Credits struct {
	ent.Schema
}

func (Credits) Fields() []ent.Field {
	return []ent.Field{
		field.Int("id").Unique().Immutable(),
		field.String("credit_type").Comment("نوع حساب"),
		field.String("credit_orgin").Comment("نوع اعتبار"),
		field.Int("credit_budget_id").Comment("شماره برگه اعتبار بودجه ای/غیر بودجه ای"),
		field.Time("deleted_at").Optional().Nillable().Comment("حذف نرم"),
	}
}

func (Credits) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("add_credit", AddCredit.Type),
	}
}
