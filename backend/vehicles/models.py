from django.db import models

# Create your models here
class Vehicle(models.Model):
	id = models.BigAutoField(primary_key=True)
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
	ARMOR_CHOICES = [
		("light", "Light"),
		("medium", "Medium"),
		("heavy", "Heavy"),
	]
	armor = models.CharField(
			max_length=20,
			choices=ARMOR_CHOICES,
			help_text="armor classification"
	)
	armor_level = models.PositiveIntegerField(
				null=True,
				help_text="Abstract armor rating"
		)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return f"[{self.id}] {self.name} ({self.status})"

class VehicleLog(models.Model):
  vehicle = models.ForeignKey(
		Vehicle,
		on_delete=models.CASCADE,
  	related_name="logs"
	)
  old_status = models.CharField(max_length=20, null=True, default="New")
  new_status = models.CharField(max_length=20)
  event = models.CharField(max_length=20)
  description = models.TextField(blank=True)
  event_description = models.TextField(blank=True)
  created_at = models.DateTimeField(auto_now_add=True)