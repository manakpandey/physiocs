from django.db import models
from datetime import datetime

# Create your models here.
class User(models.Model):
    username= models.CharField(max_length=150)
    name= models.CharField(max_length=150)
    password= models.CharField(max_length=250)
    phno= models.CharField(max_length=50)
    email= models.CharField(max_length=50)
    address= models.CharField(max_length=150)
    userType=models.IntegerField()
    physioId= models.ForeignKey('self', max_length=150, null=True, blank=True, on_delete=models.PROTECT, related_name='+')
    docId= models.ForeignKey('self', max_length=150, null=True, blank=True, on_delete=models.PROTECT, related_name='+')


class TestDetails(models.Model):
    testName= models.CharField(max_length=100)
    jointName= models.CharField(max_length=100)
    minAngle= models.IntegerField(null=True)
    maxAngle= models.IntegerField(null=True)
    reps= models.IntegerField()
    timePerRep= models.IntegerField(null=True)


class TestHistory(models.Model):
    patientID= models.ForeignKey(User, on_delete=models.PROTECT)
    testID= models.ForeignKey(TestDetails, on_delete=models.PROTECT)
    range= models.DecimalField(decimal_places=2,max_digits=5)
    timeStamp= models.DateTimeField(datetime.now())


class Schedule(models.Model):
    patientID= models.ForeignKey(User, on_delete=models.PROTECT)
    testID= models.ForeignKey(TestDetails, on_delete=models.PROTECT)
    date= models.DateField()



















    