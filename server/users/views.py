from django.shortcuts import render

# Create your views here.
from rest_auth.views import (LoginView, LogoutView, PasswordChangeView)
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
# Create your views here.
class APILogoutView(LogoutView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
class APILoginView(LoginView):
    pass
class APIPasswordUpdateView(PasswordChangeView):
    authentication_classes = [TokenAuthentication]

#prediction
import joblib
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from math import ceil, floor
from django.http import HttpResponse
from django.shortcuts import render
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split


def results(request):
    result = ""
    test_var = int(request.POST["target"])
    

    df = pd.read_csv("E:\\acad\\sem 6\\TARP\\physiocs\\server\\users\\data.csv")
    print(df.head())
    X_train, X_test, y_train, y_test = train_test_split(df["X"].values.reshape(-1, 1), df["y"], test_size=0.1)
    regr = LinearRegression()
    regr.fit(X_train, y_train)
    y_pred = regr.predict(X_test)
    plt.scatter(X_test, y_test, color='b')
    plt.plot(X_test, y_pred, color='k')
    plt.savefig("E:\\acad\\sem 6\\TARP\\physiocs\\server\\users\\graph.png")
    plt.show()
    joblib.dump(regr, "model.sav")
    days = round(regr.predict(np.array([test_var]).reshape(-1, 1)).tolist()[0], 1)
    result += str(floor(days)) + " to " + str(ceil(days))
    return render(request, 'results.html', {"result": result})


def recovery(request):
    return render(request, "recovery.html")

#profile
def updateUserDetails(request):
    pass

def assignTest(request):
    pass

#dashboard
def getUserDetails(request):
    pass

def getTestSchedule(request):
    pass

def getTestHistory(request):
    pass

def getPrediction(request):
    pass

def getTests(request):
    pass


def saveTest(request):
    pass

def saveUserTest(request):
    pass




