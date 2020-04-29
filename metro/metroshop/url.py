from django.urls import path
from django.urls import path, include
from . import views
from core.views import SignUpView, ActivateAccount
urlpatterns = [
    path('', views.index, name='index'),
    path('master_config', views.master_config, name='master_config'),
    path('master_config_update2', views.master_config_update2, name='master_config_update2'),
    path('add_product', views.add_product, name='add_product'),
    path('signup', views.signup, name='signup'),
    path('activate/<uidb64>/<token>/', ActivateAccount.as_view(), name='activate'),
]