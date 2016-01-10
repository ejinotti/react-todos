from flask import request
from flask.json import dumps

from todosapp.models.todo import Todo


def add_routes(app):
    app.add_url_rule(
        '/api/todos', view_func=index, methods=['GET'])
    app.add_url_rule(
        '/api/todos', view_func=create, methods=['POST'])
    app.add_url_rule(
        '/api/todos/<int:id>', view_func=show, methods=['GET'])
    app.add_url_rule(
        '/api/todos/<int:id>', view_func=update, methods=['PATCH'])
    app.add_url_rule(
        '/api/todos/<int:id>', view_func=destroy, methods=['DELETE'])


def index():
    return dumps([t.serialize for t in Todo.query.all()])


def create():
    todo = Todo.create(**request.json)
    return dumps(todo.serialize)


def show(id):
    todo = Todo.get(id)
    return dumps(todo.serialize)


def update(id):
    todo = Todo.get(id)
    todo.update(**request.json)
    return dumps(todo.serialize)


def destroy(id):
    todo = Todo.get(id)
    todo.destroy()
    return dumps(todo.serialize)
