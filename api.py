from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

data = pd.read_csv('further_cleaned_merged_post.csv')

@app.route('/search', methods=['GET'])
def search():
    query_params = {
        'title': 'title',
        'companyName': 'name',
        'remoteAllowed': 'remote_allowed',
        'payPeriod': 'pay_period',
        'workType': 'work_type'
    }

    results = data.copy()

    for param, column in query_params.items():
        value = request.args.get(param)
        if value:
            results = results[results[column].str.contains(value, case=False, na=False)]

    return jsonify(results.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)
