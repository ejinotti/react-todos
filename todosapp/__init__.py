from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm.exc import NoResultFound

from .routes import add_routes


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


@app.errorhandler(NoResultFound)
def no_result_handler(e):
    response = jsonify(message='Not Found')
    response.status_code = 404
    return response

add_routes(app)

# NOTE: models are initialized in routes, so must create_all after routes..
db.create_all()
