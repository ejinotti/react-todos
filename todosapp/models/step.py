from .. import db
from .todo import Todo


class Step(db.Model):
    __tablename__ = 'steps'

    id = db.Column(db.Integer, primary_key=True)

    body = db.Column(db.String(255))

    done = db.Column(db.Boolean)

    todo_id = db.Column(db.Integer, db.ForeignKey('todos.id'))
    todo = db.relationship('Todo', backref=db.backref('steps', lazy='dynamic'))

    @classmethod
    def create(cls, todo_id, **kwargs):
        step = cls(**kwargs)
        todo = Todo.get(todo_id)
        step.todo = todo
        db.session.add(step)
        db.session.commit()
        return step

    @classmethod
    def get(cls, id):
        return cls.query.filter_by(id=id).one()

    def update(self, **kwargs):
        for (k, v) in kwargs.iteritems():
            setattr(self, k, v)
        db.session.commit()
        return self

    def destroy(self):
        db.session.delete(self)
        db.session.commit()
        return self

    @property
    def serialize(self):
        return {
            'id': self.id,
            'body': self.body,
            'done': self.done,
            'todo_id': self.todo_id,
        }
