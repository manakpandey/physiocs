from django.db import models
from datetime import datetime
from django.contrib.auth.models import User


# Create your models here.
class UserDetails(models.Model):
    uid = models.OneToOneField(User, on_delete=models.PROTECT, related_name='related_uid', unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField()
    phone = models.CharField(max_length=50)
    address = models.CharField(max_length=150)
    usertype = models.IntegerField()
    physio_id = models.ForeignKey(User, on_delete=models.PROTECT, related_name='related_physio_id', null=True)
    doc_id = models.ForeignKey(User, on_delete=models.PROTECT, related_name='related_doc_id', null=True)


class TestDetails(models.Model):
    test_name = models.CharField(max_length=100)
    test_description = models.CharField(max_length=10000, default="Test")
    joint_name = models.CharField(max_length=100)
    min_angle = models.IntegerField(null=True)
    max_angle = models.IntegerField(null=True)
    reps = models.IntegerField()
    time_per_rep = models.IntegerField(null=True)
    img = models.ImageField(upload_to='uploads/', blank=True)


class TestHistory(models.Model):
    patient = models.ForeignKey(User, on_delete=models.PROTECT)
    test = models.ForeignKey(TestDetails, on_delete=models.PROTECT)
    range = models.DecimalField(decimal_places=2, max_digits=5)
    timestamp = models.DateTimeField(auto_now=True)
    feedback_state = models.IntegerField()


class Schedule(models.Model):
    patient = models.ForeignKey(User, on_delete=models.PROTECT)
    test = models.ForeignKey(TestDetails, on_delete=models.PROTECT)
