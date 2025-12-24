from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from django.utils import timezone
from vehicles.models import Vehicle
import json

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
@csrf_exempt
def update(request, id):
  
  if request.method == 'POST':
  
    json_data = json.loads(request.body)
    
    if not id:
      return HttpResponse(content="Error, ID not found", status=400)
    
  # TODO - FUNCIONA, SÓ NÃO SEI SE FUNCIONA COMO DEVERIA, REVER ISSO
    if Vehicle.objects.get(pk=id):
      Vehicle.objects.filter(pk=json_data["pk"]).update(updated_at=timezone.now())
      for key, value in json_data["fields"].items():
        Vehicle.objects.filter(pk=json_data["pk"]).update(**{key: value})

  return HttpResponse(content="Done!", status=200)
    
#* GET BY ID
def get_by_id(request, id):
  
  if request.method == "GET":
    vehicle = Vehicle.objects.get(pk=id)
    
  return HttpResponse(content=vehicle, status=200)



#* DELETE ONE BY ID
def delete_by_id(request, id):
  
  if request.method == "DELETE":
    vehicle = Vehicle.objects.get(pk=id)
    
    if vehicle:
      vehicle = Vehicle.objects.delete(pk=id)
      return HttpResponse(content="Done.", status=200)
    
    return HttpResponse(content="Not found", status=404)
    
  return HttpResponse(content="Error", status=400)

# TODO - TESTAR AS DUAS ROTAS
    

#* DELETE ALL

