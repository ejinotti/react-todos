from flask import render_template


def add_routes(app):
    app.add_url_rule('/', view_func=root, methods=['GET'])


def root():
    return render_template('./index.html')
