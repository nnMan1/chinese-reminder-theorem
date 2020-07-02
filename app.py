import flask
from flask import request, jsonify
import algorithm.chinese_theorem as chinese_theorem
import algorithm.prime_number_generator as prime_number_generator
from flask import Markup
from flask import Response
#from gunicorn.http import message

#message.MAX_REQUEST_LINE = 0

app = flask.Flask(__name__)
app.config["DEBUG"] = True

@app.route('/', methods=['GET'])
def chinese():
    return flask.render_template('chinese.html')

@app.route('/prime-number-generator', methods=['GET'])
def primeNumberGenerator():
    return flask.render_template('milerRabin.html')

@app.route('/calculator', methods=['GET'])
def calculator():
    return flask.render_template('calcualtor.html')


@app.route('/v1/chinese-theorem', methods=['GET'])
def solveChinese():
    array_string = request.args['data'][1:-1]
    array_string = array_string.split(',')
    array = [int(i) for i in array_string]
    print(array)
    try:
        M, x = chinese_theorem.solve(array)
        return flask.jsonify( x = x, mod = M) 
    except:
        return Response({'message': 'Provjeritite da li su svi moduli izajamno prosti'}, status = 400) 

@app.route('/v1/prime-number-generator', methods=['GET'])
def generatePrimeNumber():
    print(request.args['data'])
    numberOfDigits = int(request.args['data'])
    print(numberOfDigits)
    return str(prime_number_generator.generate_prime_number(numberOfDigits))

if __name__=="__main__":
    app.run()