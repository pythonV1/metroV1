from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect
from .models import  Master_config

from django.urls import reverse
from django.utils import timezone
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
import json


##########
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect

# Create your views here.
#@login_required
def index(request):


    #return render(request, 'metroshop/test.html')



    return render(request, 'metroshop/home.html')

def master_config(request):


    m_config =  Master_config.objects.filter()

    return render(request, 'metroshop/master_config.html', {'m_config': m_config})



def master_config_update2(request):
    company_name = request.POST['company_name']
    company_mobile = request.POST['company_mobile']
    company_address = request.POST['company_address']
    company_code = 1
    a = Master_config(company_code=company_code,company_name=company_name,company_mobile=company_mobile,company_address=company_address)
    s= a.save()
    m_config = Master_config.objects.filter()

    return render(request, 'metroshop/home.html', {'m_config': m_config})

def add_product(request):

    return render(request, 'metroshop/add_product.html')

def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return render(request, 'metroshop/home.html')
    else:
        form = UserCreationForm()
    return render(request, 'metroshop/signup.html', {'form': form})