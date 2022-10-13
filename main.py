import argparse
import time
from flask import Flask, request, render_template
from flask_cors import CORS, cross_origin

app = Flask(__name__, static_folder="view/static", template_folder="view/templates")
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/", methods=["GET"])
def home():
    return render_template("index.html")


@app.route('/upload_file', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        with open(f"uploads/video_{time.time()}.webm", "wb") as f:
            f.write(request.data)
        return 'file uploaded successfully'
    return 'not found'


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='JSRecording')
    parser.add_argument('--host', type=str, default='0.0.0.0', help='host')
    parser.add_argument('--port', type=str, default=9090, help='listen port')
    args = parser.parse_args()
    app.run(debug=True, host=args.host, port=args.port)
