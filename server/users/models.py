from django.db import models
from datetime import datetime
from django.contrib.auth.models import User


# Create your models here.
class UserDetails(models.Model):
    id=models.ForeignKey(User, on_delete=models.PROTECT,primary_key=True)
    name= models.CharField(max_length=150)
    phno= models.CharField(max_length=50)
    email= models.CharField(max_length=50)
    address= models.CharField(max_length=150)
    usertype=models.IntegerField()
    physioid= models.ForeignKey('self', max_length=150, null=True, blank=True, on_delete=models.PROTECT, related_name='+')
    docid= models.ForeignKey('self', max_length=150, null=True, blank=True, on_delete=models.PROTECT, related_name='+')


class TestDetails(models.Model):
    testname= models.CharField(max_length=100)
    testdescription= models.CharField(max_length=10000, default="Test")
    jointname= models.CharField(max_length=100)
    minangle= models.IntegerField(null=True)
    maxangle= models.IntegerField(null=True)
    reps= models.IntegerField()
    timeperrep= models.IntegerField(null=True)
    img=models.ImageField(upload_to ='uploads/')


class TestHistory(models.Model):
    patient= models.ForeignKey(UserDetails, on_delete=models.PROTECT)
    test= models.ForeignKey(TestDetails, on_delete=models.PROTECT)
    range= models.DecimalField(decimal_places=2,max_digits=5)
    timestamp= models.DateTimeField(datetime.now(), null=True)
    feedbackstate=models.IntegerField(null=True)


class Schedule(models.Model):
    patient= models.ForeignKey(UserDetails, on_delete=models.PROTECT)
    test= models.ForeignKey(TestDetails, on_delete=models.PROTECT)
    



















    