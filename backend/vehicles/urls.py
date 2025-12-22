from . import views
from django.urls import path

# * LEMBRE-SE A VIEW NÃO VAI "VER" NADA, ELA VAI SER SÓ UMA ROTA QUE DEVOLVE DADOS E NÃO PÁGINAS

urlpatterns = [
    path('', views.index, name="index"),
]



# TODO - PRIMEIROS PASSOS, CRIAR O CRUD DOS VEICULOS E URLS/ROTAS DO BACKEND EM SI (HOME...)