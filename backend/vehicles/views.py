from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from django.utils import timezone
from vehicles.models import Vehicle, VehicleLog
import json


#* GET ALL
def index(request):
  vehicles_json = serializers.serialize("json", Vehicle.objects.all())
  
  return HttpResponse(vehicles_json)


@csrf_exempt
def create(request):
  # TODO - TALVEZ TAMBÉM ADICIONAR VERIFICAÇÃO DE AUTENTICAÇÃO MAIS TARDE E ALGO QUE INCREMENTE QUANTIDADE QUANDO REGISTROS IGUAIS PARA EVITAR 40 VEICULOS IGUAIS TOMANDO LUGAR (OU NÃO)
  if request.method == 'POST':
    try:
      data = request.POST
      json_data = json.loads(request.body.decode('utf-8'))
      
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
      
      new_log = VehicleLog.objects.create(
        vehicle = new_tank,
        description = "New vehicle added to the fleet",
        old_status = None,
        new_status = json_data.get('status')
      )
      
      return HttpResponse(content="Created successfully!", status=200)
    except Exception as E:
      return HttpResponse(content=f"An error occurred when creating a new vehicle, {E}", status=404) 
  

#* UPDATE BY ID
@csrf_exempt
def update(request, id):
  
  if request.method == 'PATCH':
  
    try:
      json_data = json.loads(request.body.decode('utf-8'))
      
      if not id:
        return HttpResponse(content="Error, ID not found", status=404)
      
      try:
        vehicle = Vehicle.objects.get(pk=id)
      except Vehicle.DoesNotExist:
        return HttpResponse(content="Vehicle not found", status=404)
      
      old_status = vehicle.status
      for key, value in json_data['fields'].items():
        Vehicle.objects.filter(pk=id).update(**{key: value})
      Vehicle.objects.filter(pk=id).update(updated_at=timezone.now())
      
      #TODO - ADICIONAR EVENT_DESCRIPTION, QUE É DIFERENTE DE DESCRIPTION
      #TODO - DESCRIPTION É PARA EVENTOS DE MUDANÇA, COMO "STATUS MUDOU DE X PARA X"
      #TODO - ENQUANTO EVENT_DESCRIPTION É PARA EVENTOS QUE OCORRERAM COM O VEICULO
      # TODO - E CRIAR UMA FORMA PARA QUE TODOS SEMPRE TENHAM ALGO, TIPO O DESCRIPTION TENHA "CREATE OU ALGO ASSIM" SE NÃO DA ERRO NO DB
      
      description = f"Status changed from {old_status} to {json_data['status']}"
      
      updated_log = VehicleLog.objects.filter(vehicle=vehicle).create(
        vehicle = vehicle,
        description = description,
        event = json_data['event'],
        event_description = json_data['description'],
        old_status = old_status,
        new_status = json_data['fields'].get("status")
      )

      return HttpResponse(content="Updated!", status=200)
    except Exception as E:
      return HttpResponse(content=str(E), status=404)


#* GET BY ID
def get_by_id(request, id):
  
  if request.method == "GET":
    vehicle = Vehicle.objects.get(pk=id)
    
  return HttpResponse(content=vehicle, status=200)


#* DELETE ONE BY ID
@csrf_exempt
def delete_by_id(request, id):
  
  if request.method == "DELETE":
    
    try:
      vehicle = Vehicle.objects.get(pk=id)
      
      if vehicle:
        vehicle.delete()
        return HttpResponse(content="Done.", status=200)
    except:
      return HttpResponse(content="Not found", status=404)    
    
  return HttpResponse(content="Error", status=400)


#* DELETE ALL
def delete_all(request):
  # TODO - ADICIONAR VERIFICAÇÃO EXTRA NO FRONT SE FOR DISPONIVEL FAZER ISSO PARA NÃO HAVER ENGANOS
  if request.method == "DELETE":
    
    try:
      all_vehicles = Vehicle.objects.all()
      
      if all_vehicles:
        all_vehicles.delete()
      return HttpResponse(content="Done.", status=200)
    except:
      return HttpResponse(content="No vehicles were found", status=404)
  return HttpResponse(content="Error", status=400)


#* GET LOGS
def get_logs(request):
  vehicles_json = serializers.serialize("json", VehicleLog.objects.all())
  
  return HttpResponse(vehicles_json)