from sklearn.linear_model import LogisticRegression
from sklearn.metrics import roc_curve

class Model():
    @staticmethod
    def train_and_test(X_train, X_test, y_train, y_test, c):
        classifier = LogisticRegression(C=c)
        clf = classifier.fit(X_train, y_train)
        # y_pred = clf.predict(X_test)
        probas = clf.predict_proba(X_test)

        fpr, tpr, thresholds = roc_curve(y_test, probas[:, 0], pos_label=0)

        result = []
        for x, y, z in zip(fpr, tpr, thresholds):
            d = {"fpr": x, "tpr": y, "threshold": z}
            result.append(d)

        return result

