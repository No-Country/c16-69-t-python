from flask import Blueprint, jsonify
from flask.views import MethodView

bp = Blueprint('example', __name__)

class ExampleAPI(MethodView):
    def get(self, example_id):
        return jsonify(id=example_id)

example_view = ExampleAPI.as_view('example_api')
bp.add_url_rule('/<string:example_id>', view_func=example_view, methods=['GET',])