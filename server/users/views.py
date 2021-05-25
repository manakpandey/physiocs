from django.shortcuts import render
from datetime import datetime

# Create your views here.
from rest_auth.views import (LoginView, LogoutView, PasswordChangeView)
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import *
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
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
    idx=int(request.GET['id'])
    q='SELECT * FROM users_user where id='+str(idx)+';'
    for p in User.objects.raw(q):
        return HttpResponse(p)


    

def getTestSchedule(request):
    pid=int(request.GET['patient_id'])
    q='SELECT * FROM users_schedule where users_schedule.patient_id='+str(pid)+';'
    for p in Schedule.objects.raw(q):
        return HttpResponse(p)


    

def getTestHistory(request):
    pid=int(request.GET['patient_id'])
    q='SELECT * FROM users_testHistory where patient_id='+str(pid)+';'
    return HttpResponse(TestHistory.objects.raw(q))
       


def getPrediction(request):
    pass

def getTests(request):
    tid=int(request.GET['tid'])
    q='SELECT * FROM users_testDetails where id='+str(tid)+';'
    for p in TestDetails.objects.raw(q):
        return HttpResponse(p)    

@csrf_exempt
def saveTest(request):
    testName=str(request.POST.get("testName"))
    testDescription=str(request.POST.get("testDescription",False))
    jointName= str(request.POST.get("jointName",False))
    minAngle=int(request.POST.get("minangle",False))
    maxAngle=int(request.POST.get("maxAngle", False))
    reps=int(request.POST.get("reps",False))
    time=int(request.POST.get("time",False))
    img=str(request.POST.get("string",False))
    
#    q= 'insert into Users_testDetails values ("'+str(testName)+'","'+str(testDescription)+'","'+str(jointName)+'",'+str(minAngle)+','+str(maxAngle)+','+str(reps)+','+str(time)+',"'+str(img)+  '");'
    x=TestDetails.objects.create(testName=testName, testDescription=testDescription,jointName=jointName, minAngle=minAngle, maxAngle=maxAngle, reps=reps, timePerRep=time, img=img)
    x.save()
    return HttpResponse(None)

@csrf_exempt
def saveUserTest(request):
    pid=(request.POST.get("pid"))
    tid=int(request.POST.get("tid"))
    range=float(request.POST.get("range"))
    time=str(request.POST.get("time"))
    x=TestHistory.objects.create(patient=User.objects.get(id=pid), test=TestDetails.objects.get(id=tid), range=range, timeStamp=time)

    x.save()
    return HttpResponse(None)





