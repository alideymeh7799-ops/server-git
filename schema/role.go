package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// Role holds the schema definition for the Role entity.
type Role struct {
	ent.Schema
}

func (Role) Fields() []ent.Field {
	return []ent.Field{
		field.Int("id").
			Unique().
			Immutable(),

		field.String("name").
			NotEmpty().
			Unique().
			Comment("نام نقش"),

		field.Time("deleted_at").
			Optional().
			Nillable().
			Comment("حذف نرم"),
	}
}

func (Role) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("users", User.Type),
		edge.To("role_permissions", RolePermission.Type),
	}
}

func (Role) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("name"),
		index.Fields("deleted_at"),
	}
}
