package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

type Action struct {
	ent.Schema
}

func (Action) Fields() []ent.Field {
	return []ent.Field{
		field.Int("id").
			Unique().
			Immutable(),

		field.Time("action_time").
			Default(time.Now).
			Comment("زمان انجام عملیات"),

		field.Int("action_type").
			Comment("نوع عملیات"),

		field.String("table_name").
			NotEmpty().
			Comment("نام جدول هدف"),

		field.Bool("is_success").
			Default(true).
			Comment("آیا عملیات موفق بود؟"),
	}
}

func (Action) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("action_by", User.Type).
			Ref("actions").
			Unique().
			Comment("کاربر انجام دهنده عملیات").
			Required(),
	}
}

func (Action) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("action_time"),
		index.Fields("table_name"),
		index.Fields("action_type"),
	}
}
