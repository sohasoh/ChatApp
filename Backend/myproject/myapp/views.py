from django.shortcuts import render
from .firebase import database
from django.http import JsonResponse

# Create your views here.

def home(request):
    # Exemple : Aouter des données à Firebase
    if request.method == 'POST':
        name = request.POST.get('name')
        stack = request.POST.get('stack')
        data = {"name": name, "stack": stack}
        database.child("users").push(data) # Ajoute les données dans la collection "users"
    
    # Exemple : Lire des données depuis Firebase
    users = database.child("users").get().val() # Récupère tous les utilisateurs
    return render(request, 'myapp/index.html', {'users': users})
# Create your views here.