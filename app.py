from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS
import numpy as np
import pandas as pd

from model import Model
from preprocessing import PreProcessing


X_train = None
y_train = None
X_test = None
y_test = None

app = Flask(__name__)
api = Api(app)
CORS(app)


class ROC(Resource):
    def get(self, preprocessing, c):
        global X_train
        global y_train
        global X_test
        global y_test

        if preprocessing == 'StandardScaler':
            X_train, X_test = PreProcessing.standard_scaler(X_train, X_test)
        if preprocessing == 'MinMaxScaler':
            X_train, X_test = PreProcessing.min_max_scaler(X_train, X_test)

        return Model.train_and_test(X_train=X_train, X_test=X_test, y_train=y_train, y_test=y_test, c=c)


# for examples see
# https://flask-restful.readthedocs.io/en/latest/quickstart.html#a-minimal-api

api.add_resource(ROC, '/roc/<preprocessing>/<float:c>')

if __name__ == '__main__':
    # load data
    df = pd.read_csv('./data/transfusion.data')
    xDf = df.loc[:, df.columns != 'whether he/she donated blood in March 2007']
    y = df['whether he/she donated blood in March 2007']

    # get random numbers to split into train and test
    np.random.seed(1)
    r = np.random.rand(len(df))

    # split into train test
    X_train = xDf[r < 0.8]
    X_test = xDf[r >= 0.8]
    y_train = y[r < 0.8]
    y_test = y[r >= 0.8]

    app.run(debug=True)
