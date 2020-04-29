from django.contrib import admin
from django.contrib.admin.models import LogEntry
LogEntry.objects.all().delete()
# Register your models here.
list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff',
                'is_active')
