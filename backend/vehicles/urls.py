from . import views
from django.urls import path

# * LEMBRE-SE A VIEW NÃO VAI "VER" NADA, ELA VAI SER SÓ UMA ROTA QUE DEVOLVE DADOS E NÃO PÁGINAS

urlpatterns = [
    path('', views.index, name="index"),
    path('create/', views.create, name="create"),
    path('update/<int:id>/', views.update, name="update"),
    path('<int:id>/', views.get_by_id, name="get_by_id"),
    path('delete/<int:id>/', views.delete_by_id, name="delete_by_id"),
    path('delete/', views.delete_all, name="delete_all"),
    path('logs/', views.get_logs, name="get_logs"),
]



# TODO - PRIMEIROS PASSOS, CRIAR O CRUD DOS VEICULOS E URLS/ROTAS DO BACKEND EM SI (HOME...)