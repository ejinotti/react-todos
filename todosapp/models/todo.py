from todosapp import db


class Todo(db.Model):
    __tablename__ = 'todos'

    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(255))
    body = db.Column(db.String(255))

    done = db.Column(db.Boolean)

    @classmethod
    def create(cls, **kwargs):
        todo = cls(**kwargs)
        db.session.add(todo)
        db.session.commit()
        return todo

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
            'title': self.title,
            'body': self.body,
            'done': self.done,
        }
