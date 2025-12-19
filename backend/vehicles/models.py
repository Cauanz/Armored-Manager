from django.db import models

# Create your models here
class Vehicle(models.Model):
  id = models.CompositePrimaryKey
  name = models.CharField(max_length=100)
  model = models.CharField(max_length=100)
  VEHICLE_TYPE_CHOICES = [
      ("tank", "Tank"),
      ("car", "Car"),
      ("apc", "APC"),
      ("ifv", "IFV"),
      ("other", "Other"),
  ]
  vehicle_type = models.CharField(
      max_length=20,
      choices=VEHICLE_TYPE_CHOICES
  )
  STATUS_CHOICES = [
      ("active", "Active"),
      ("damaged", "Damaged"),
      ("destroyed", "Destroyed"),
      ("maintenance", "Under Maintenance"),
  ]
  status = models.CharField(
      max_length=20,
      choices=STATUS_CHOICES,
      default="active"
  )
  max_speed = models.PositiveIntegerField(
      help_text="Max speed in km/h",
      null=True,
      blank=True
  )
  armor_level = models.PositiveIntegerField(
      null=True,
      blank=True,
      help_text="Abstract armor rating"
  )
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

