import os


class Settings:
    # Configuración general
    APP_NAME = "PetFinder API"
    APP_ROOT = "/api"
    SECRET_KEY = os.environ.get("SECRET_KEY")
    DEBUG = True

    # Configuración SQLAlchemy
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Config imgbb apikey
    APIKEY_IMGBB = "b8630093227cc0bf57935c135bbf6f9c"
