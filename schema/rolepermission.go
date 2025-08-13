package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// RolePermission holds the schema definition for the RolePermission entity.
type RolePermission struct {
	ent.Schema
}

func (RolePermission) Fields() []ent.Field {
	return []ent.Field{
		field.Int("id").
			Unique().
			Immutable(),

		field.Time("deleted_at").
			Optional().
			Nillable().
			Comment("حذف نرم"),
	}
}

func (RolePermission) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("role", Role.Type).
			Ref("role_permissions").
			Unique().
			Required(),

		edge.From("permission", Permission.Type).
			Ref("role_permissions").
			Unique().
			Required(),
	}
}

func (RolePermission) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("deleted_at"),
	}
}
