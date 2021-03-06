# Create your views here.
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_auth.views import (LoginView, LogoutView, PasswordChangeView)
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
import numpy as np
import pandas as pd
from math import ceil, floor
from django.http import HttpResponse
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from .models import *


# Create your views here.
class APILogoutView(LogoutView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class APILoginView(LoginView):
    pass


class APIPasswordUpdateView(PasswordChangeView):
    authentication_classes = [TokenAuthentication]


# prediction


def results(df, target):
    X_train, X_test, y_train, y_test = train_test_split(df["X"].values.reshape(-1, 1), df["y"], test_size=0.1)
    regr = LinearRegression()
    regr.fit(X_train, y_train)
    days = round(regr.predict(np.array([target]).reshape(-1, 1)).tolist()[0], 1)
    return int(days)


# profile
def updateUserDetails(request):
    pass


# dashboard
def getUserDetails(request):
    idx = int(request.GET['id'])
    q = UserDetails.objects.filter(uid=User.objects.get(pk=idx))
    return JsonResponse(list(q.values()), safe=False)


def getUserPerformedTests(request):
    pid = int(request.GET['pid'])
    ans = TestHistory.objects.filter(patient_id=pid)
    s = set()
    for i in ans:
        s.add(i.test_id)
    print(s)
    return s


def getTestSchedule(request):
    if request.user.is_authenticated:
        q = Schedule.objects.filter(patient=request.user)
        return JsonResponse(list(q.values()), safe=False)
    else:
        return JsonResponse(status=401, safe=False, data={})


def getTestHistory(request):
    if request.user.is_authenticated:
        q = TestHistory.objects.filter(patient=request.user)
        return JsonResponse(list(q.values()), safe=False)
    return HttpResponse(status=401)


def getUser(request):
    if request.user.is_authenticated:
        q = UserDetails.objects.filter(uid=request.user)
        return JsonResponse(list(q.values()), safe=False)
    else:
        return JsonResponse(status=401, safe=False, data={})


def getPhysioUsers(request):
    if request.user.is_authenticated:
        q = UserDetails.objects.filter(physio_id=request.user)
        return JsonResponse(list(q.values()), safe=False)
    else:
        return JsonResponse(status=401, safe=False, data={})


def getPrediction(request):
    if request.user.is_authenticated:
        pid = UserDetails.objects.filter(uid=request.user)
    l = pid.values()

    d = l.first()
    a = set()
    arr = []
    x = TestHistory.objects.filter(patient_id=d["id"])
    for i in x:
        a.add(i.test_id)

    for tid in a:
        ans = TestHistory.objects.filter(patient_id=d["id"], test_id=tid).order_by('-timestamp')[::-1]

        r = []
        days = []
        i = 1
        for testPerformed in ans:
            r.append(testPerformed.range)
            days.append(i)
            i += 1

        df = pd.DataFrame(list(zip(r, days)),
                          columns=['X', 'y'])
        target = TestDetails.objects.get(pk=tid).max_angle

        result = results(df, target)
        arr.append(result)

    if len(arr) == 0:
        return HttpResponse(status=204)

    ans = sum(arr) / len(arr)
    return JsonResponse(ceil(ans), safe=False)


def getTests(request):
    tid = int(request.GET['tid'])
    q = TestDetails.objects.filter(pk=tid)
    return JsonResponse(list(q.values()), safe=False)


def getAllTests(request):
    q = TestDetails.objects.all()
    return JsonResponse(list(q.values()), safe=False)


@csrf_exempt
def saveTest(request):
    test_name = str(request.POST.get("testName"))
    test_description = str(request.POST.get("testDescription"))
    joint_name = str(request.POST.get("jointName"))
    min_angle = int(request.POST.get("minAngle"))
    max_angle = int(request.POST.get("maxAngle"))
    reps = int(request.POST.get("reps"))
    time = int(request.POST.get("time", 10))
    # img = request.POST.get("string", False)
    # print(img)

    x = TestDetails.objects.create(test_name=test_name, test_description=test_description, joint_name=joint_name,
                                   min_angle=min_angle, max_angle=max_angle, reps=reps, time_per_rep=time)
    x.save()
    return HttpResponse(status=201)


@csrf_exempt
def saveUserTest(request):
    if request.user.is_authenticated:
        tid = int(request.POST.get("tid"))
        r = float(request.POST.get("range"))
        fs = int(request.POST.get("feedback"))
        x = TestHistory.objects.create(patient=request.user, test=TestDetails.objects.get(id=tid),
                                       range=r, feedback_state=fs)
        x.save()
        print(x)
        return HttpResponse(status=201)
    return HttpResponse(status=401)


@csrf_exempt
def scheduleTest(request):
    pid = int(request.POST.get("pid"))
    tid = int(request.POST.get("tid"))
    x = Schedule.objects.create(patient=User.objects.get(pk=pid), test=TestDetails.objects.get(pk=tid))
    x.save()
    return HttpResponse(status=201)
