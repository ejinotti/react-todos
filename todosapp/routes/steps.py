from flask import request

from . import json_response
from ..models.step import Step


def add_routes(app):
    app.add_url_rule('/api/todos/<int:todo_id>/steps', endpoint='steps_index',
                     view_func=index, methods=['GET'])

    app.add_url_rule('/api/todos/<int:todo_id>/steps', endpoint='steps_create',
                     view_func=create, methods=['POST'])

    app.add_url_rule('/api/todos/steps/<int:id>', endpoint='steps_update',
                     view_func=update, methods=['PATCH'])

    app.add_url_rule('/api/todos/steps/<int:id>', endpoint='steps_destroy',
                     view_func=destroy, methods=['DELETE'])


def index(todo_id):
    steps = Step.query.filter_by(todo_id=todo_id)
    return json_response([s.serialize for s in steps.all()])


def create(todo_id):
    step = Step.create(todo_id, **request.json)
    return json_response(step.serialize)


def update(id):
    step = Step.get(id)
    step.update(**request.json)
    return json_response(step.serialize)


def destroy(id):
    step = Step.get(id)
    step.destroy()
    return json_response(step.serialize)
