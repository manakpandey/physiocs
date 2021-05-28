from django.contrib import admin

# Register your models here.
from .models import *

admin.site.register(UserDetails)
admin.site.register(TestDetails)
admin.site.register(TestHistory)
admin.site.register(Schedule)




