from flask import request, Response
from flask.json import dumps

from ..models.todo import Todo


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


def json_response(data):
    return Response(dumps(data), status=200, mimetype='application/json')


def index():
    return json_response([t.serialize for t in Todo.query.all()])


def create():
    todo = Todo.create(**request.json)
    return json_response(todo.serialize)


def show(id):
    todo = Todo.get(id)
    return json_response(todo.serialize)


def update(id):
    todo = Todo.get(id)
    todo.update(**request.json)
    return json_response(todo.serialize)


def destroy(id):
    todo = Todo.get(id)
    todo.destroy()
    return json_response(todo.serialize)
