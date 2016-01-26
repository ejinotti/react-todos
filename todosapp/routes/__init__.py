from importlib import import_module

from flask import Response
from flask.json import dumps


def add_routes(app):
    for module in [
        'root',
        'todos',
        'steps',
    ]:
        mod = import_module('.' + module, __name__)
        mod.add_routes(app)


def json_response(data):
    return Response(dumps(data), status=200, mimetype='application/json')
