from todosapp import db


class Todo(db.Model):
    __tablename__ = 'todos'

    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(255))
    body = db.Column(db.String(255))

    done = db.Column(db.Boolean)

    @classmethod
    def all(cls):
        return db.session.query(cls).all()
