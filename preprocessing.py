from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import MinMaxScaler


class PreProcessing():
    @staticmethod
    def standard_scaler(X_train, X_test):
        scaler = StandardScaler()
        for col in X_train.columns:
            X_train[[col]] = scaler.fit_transform(X_train[[col]])
            X_test[[col]] = scaler.transform(X_test[[col]])

        return X_train, X_test

    @staticmethod
    def min_max_scaler(X_train, X_test):
        scaler = MinMaxScaler()
        for col in X_train.columns:
            X_train[[col]] = scaler.fit_transform(X_train[[col]])
            X_test[[col]] = scaler.transform(X_test[[col]])

        return X_train, X_test
