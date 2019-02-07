import os

DATABASE_URI = ''
TOKEN_EXPIRATION_TIME = 1800 # 30mins, _must_ be in seconds

JWT_KEY = os.urandom(64)

# Imports settings created in development mode
try:
    from dev_settings import *
except:
    pass
