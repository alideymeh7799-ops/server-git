package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// Permission holds the schema definition for the Permission entity.
type Permission struct {
	ent.Schema
}

func (Permission) Fields() []ent.Field {
	return []ent.Field{
		field.Int("id").
			Unique().
			Immutable(),

		field.String("name").
			NotEmpty().
			Unique().
			Comment("نام سطح دسترسی"),

		field.Time("deleted_at").
			Optional().
			Nillable().
			Comment("حذف نرم"),
	}
}

func (Permission) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("role_permissions", RolePermission.Type),
	}
}

func (Permission) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("name"),
		index.Fields("deleted_at"),
	}
}
