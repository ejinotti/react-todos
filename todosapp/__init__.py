from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from .routes import add_routes

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

add_routes(app)

# NOTE: models are initialized in routes, so must create_all after routes..
db.create_all()
