package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
	"github.com/google/uuid"
)

// User holds the schema definition for the User entity.
type User struct {
	ent.Schema
}

func (User) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).
			Default(uuid.New).
			Immutable().
			Unique(),

		field.String("username").
			NotEmpty().
			Unique(),

		field.String("password_hash").
			NotEmpty(),

		field.Time("expired_at").
			Optional(),

		field.Time("deleted_at").
			Optional().
			Nillable().
			Comment("حذف نرم"),
	}
}

func (User) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("person", Person.Type).
			Ref("users").
			Unique().
			Required(),

		edge.From("role", Role.Type).
			Ref("users").
			Unique().
			Required(),

		edge.To("actions", Action.Type),

		edge.To("auths", Auth.Type).Unique(),
	}
}

func (User) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("username"),
		index.Fields("expired_at"),
		index.Fields("deleted_at"),
	}
}
