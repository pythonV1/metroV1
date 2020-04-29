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
#from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect
from metroshop.forms import SignUpForm
#from metroshop.core.forms import SignUpForm
#################
from django.contrib.sites.shortcuts import get_current_site

from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.template.loader import render_to_string

from metroshop.tokens import account_activation_token


from django.contrib.auth.models import User

from django.utils.encoding import force_text
from django.utils.http import urlsafe_base64_decode
from metroshop.tokens import account_activation_token
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

def account_activation_sent(request):

    return render(request, 'metroshop/add_product.html')
def add_product(request):

    return render(request, 'metroshop/add_product.html')
def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = False
            user.save()
            current_site = '127.0.0.1:8000'
            subject = 'Activate Your Metro shop Account'
            message = render_to_string('metroshop/account_activation_email.html', {
                'user': user,
                'domain': '127.0.0.1:8000',
                'uid': urlsafe_base64_encode(force_bytes(user.pk)).decode(),
                'token': account_activation_token.make_token(user),
            })


            user.email_user(subject, message)
            return render(request, 'metroshop/home2.html', {'subject': message})
    else:
        form = SignUpForm()
    return render(request, 'metroshop/signup.html', {'form': form})

def activate4(request):

    return render(request, 'metroshop/add_product.html')

def activate(request, uidb64, token):

    uid = force_bytes(urlsafe_base64_decode(uidb64)).decode()
    user = User.objects.get(pk=uid)
    #user = User.objects.get(pk=uid)
    try:

        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.profile.email_confirmed = True
        user.save()
        login(request, user)

        return render(request, 'metroshop/homeacttive.html',{'subject': user})
    else:
        return render(request, 'metroshop/home2.html',{'subject': user})