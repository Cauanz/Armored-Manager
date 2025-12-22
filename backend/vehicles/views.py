from django.shortcuts import render
from django.http import HttpResponse
from vehicles.models import Vehicle
from django.views.decorators.csrf import csrf_exempt
import json

# TODO - TECNICAMENTE OS DOIS ESTÃO FUNCIONANDO, MAS CONTINUAR PARA CRIAR OBJETOS E RECUPERAR ELES DIREITO

# Create your views here.
def index(request):
  
  vehicles = Vehicle.objects.all()
  
  return HttpResponse(vehicles)


# TODO - LEMBRAR NO FRONT TEMOS QUE LIMITAR AS OPÇÕES DISPONIVEIS NOS CAMPOS COM CHOICE
@csrf_exempt
def create(request):
  
  if request.method == 'POST':
    data = request.POST
    json_data = json.loads(request.body)
    
    new_tank = Vehicle.objects.create(
      name = json_data.get('name'),
      model = json_data.get('model'),
      vehicle_type = json_data.get('vehicleType'),
      status = json_data.get('status'),
      max_speed = json_data.get('maxSpeed'),
      armor = json_data.get('armor'),
      armor_level = json_data.get('armorLevel'),
    )
    new_tank.save()
  
  return HttpResponse('something')