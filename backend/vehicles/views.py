from django.shortcuts import render, redirect
from django.http import HttpResponse
from vehicles.models import Vehicle
from django.views.decorators.csrf import csrf_exempt
import json
from django.core import serializers

# TODO - TECNICAMENTE OS DOIS ESTÃO FUNCIONANDO, MAS CONTINUAR PARA CRIAR OBJETOS E RECUPERAR ELES DIREITO

#* GET ALL
def index(request):
  vehicles_json = serializers.serialize("json", Vehicle.objects.all())
  
  return HttpResponse(vehicles_json)


# TODO - LEMBRAR NO FRONT TEMOS QUE LIMITAR AS OPÇÕES DISPONIVEIS NOS CAMPOS COM CHOICE
@csrf_exempt
def create(request):
  # TODO - TALVEZ TAMBÉM ADICIONAR VERIFICAÇÃO DE AUTENTICAÇÃO MAIS TARDE 
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
  
  redirect("/vehicles/")
  return HttpResponse(content="Created successfully!", status=200)

#* UPDATE BY ID
def update(request):
  
  if request.method == 'POST':
    json_data = json.loads(request.body)
    
    id = json_data.get("pk")
    
    if not id:
      return HttpResponse(content="Error, ID not found", status=400)
    
    vehicle = Vehicle.objects.get("id")
    print(vehicle)
  
  return HttpResponse(content="Done!")
    # TODO - PAREI AQUI, NÃO SEI SE A ROTA FUNCIONA
    
#* GET BY ID




#* DELETE ONE BY ID


#* DELETE ALL

