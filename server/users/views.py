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


# prediction
import joblib
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from math import ceil, floor
from django.http import HttpResponse
from django.shortcuts import render
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split


def results(df, target):
    # result = ""
    # test_var = int(request.POST["target"])

    # df = pd.read_csv("E:\\acad\\sem 6\\TARP\\physiocs\\server\\users\\data.csv")
    print(df)
    X_train, X_test, y_train, y_test = train_test_split(df["X"].values.reshape(-1, 1), df["y"], test_size=0.1)
    regr = LinearRegression()
    regr.fit(X_train, y_train)
    y_pred = regr.predict(X_test)
    # plt.scatter(X_test, y_test, color='b')
    # plt.plot(X_test, y_pred, color='k')
    # plt.savefig("E:\\acad\\sem 6\\TARP\\physiocs\\server\\users\\graph.png")
    # plt.show()
    # joblib.dump(regr, "model.sav")
    days = round(regr.predict(np.array([target]).reshape(-1, 1)).tolist()[0], 1)
    if days.is_integer():
        return str(int(days))
    else:
        return str(floor(days)) + " - " + str(ceil(days))




# profile
def updateUserDetails(request):
    pass


# def assignTest(request):
#     pass


# dashboard
def getUserDetails(request):
    idx=int(request.GET['id'])
    q='SELECT * FROM users_userDetails where id='+str(idx)+';'
    for p in UserDetails.objects.raw(q):
        return HttpResponse(p)


def getUserPerfromedTests(request):
    pid=int(request.GET['pid'])
    ans=TestHistory.objects.filter(patient_id=pid)
    s=set()
    for i in ans:
        s.add(i.test_id)
    print(s)
    return s   


def getTestSchedule(request):
    pid=int(request.GET['patient_id'])
    q='SELECT * FROM users_schedule where users_schedule.patient_id='+str(pid)+';'
    for p in Schedule.objects.raw(q):
        return HttpResponse(p)


    


def getTestHistory(request):
    pid=int(request.GET['patient_id'])
    q='SELECT *, testName FROM users_testHistory x inner join users_testDetails y on x.test_id=y.id where x.patient_id='+str(pid)+' ;'
    for i in TestHistory.objects.raw(q):
        print(i.testname)
    return HttpResponse(TestHistory.objects.raw(q))
       
def getUserType(request):
    id=int(request.GET['id'])
    q='SELECT userType FROM users_userDetails where id='+str(id)+';'
  
    return HttpResponse(UserDetails.objects.raw(q))


def getPrediction(request):
    pid=int(request.GET['pid'])
    tid=int(request.GET['tid'])
    ans=TestHistory.objects.filter(patient_id=pid, test_id=tid).order_by('-timestamp')
    for i in ans:
        print(i.range)
    #q="SELECT range FROM users_testHistory WHERE patient_id="+str(pid)+"AND test_id="+str(tid)+ " ORDER BY timestamp ASC;"
    range=[]
    days=[]
    i=1
    for testPerformed in ans:
        range.append(testPerformed.range)
        days.append(i)
        i+=1

    df = pd.DataFrame(list(zip(range, days)),
                      columns=['X', 'y'])
    target = TestDetails.objects.get(pk=tid).maxangle

    result = results(df, target)
    return HttpResponse(result)


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
    x=TestHistory.objects.create(patient=UserDetails.objects.get(id=pid), test=TestDetails.objects.get(id=tid), range=range, timeStamp=time)

    x.save()
    return HttpResponse(None)


@csrf_exempt
def scheduleTest(request):
    pid=(request.POST.get("pid"))
    tid=int(request.POST.get("tid"))
    x= Schedule.objects.create(patient=UserDetails.objects.get(id=pid), test=TestDetails.objects.get(id=tid))
    x.save()
    return HttpResponse(None)




