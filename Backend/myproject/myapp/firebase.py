import pyrebase
import firebase_admin
from firebase_admin import credentials, db


firebaseConfig = {
    "apiKey": "AIzaSyCvsj_U_LeEhohTFqkNGxCNrvoFmkWo8cg",
    "authDomain": "focus-b056c.firebaseapp.com",
    "databaseURL": "https://focus-b056c-default-rtdb.firebaseio.com",
    "projectId": "focus-b056c",
    "storageBucket": "focus-b056c.firebasestorage.app",
    "messagingSenderId": "360368908536",
    "appId": "1:360368908536:web:c39869af5644e5c5d4730d"
}


firebase = pyrebase.initialize_app(firebaseConfig)
database = firebase.database()

