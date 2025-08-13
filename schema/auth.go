package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/mixin"
)

// mixin adds timestamps
type TimeMixin struct {
	mixin.Schema
}

func (TimeMixin) Fields() []ent.Field {
	return []ent.Field{
		field.Time("created_at").Default(func() time.Time { return time.Now() }),
	}
}

type Auth struct{ ent.Schema }

func (Auth) Mixin() []ent.Mixin { return []ent.Mixin{TimeMixin{}} }
func (Auth) Fields() []ent.Field {
	return []ent.Field{
		field.Int("id").Unique().Immutable(),
		field.String("refresh_token").Sensitive(),
		field.Time("expires_at"),
		field.String("ip_address"),
		field.Bool("revoked").Default(false),
	}
}
func (Auth) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("user", User.Type).
			Ref("auths").Required().Unique(),
	}
}
