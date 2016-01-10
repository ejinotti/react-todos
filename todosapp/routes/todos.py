from flask import jsonify

from todosapp.models.todo import Todo


def add_routes(app):
    app.add_url_rule('/api/todos', view_func=index, methods=['GET'])


def index():
    return jsonify(Todo.all())
