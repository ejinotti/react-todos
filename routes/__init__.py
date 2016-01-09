from importlib import import_module


def add_routes(app):
    for module in [
        'root',
    ]:
        mod = import_module('.' + module, __name__)
        mod.add_routes(app)
