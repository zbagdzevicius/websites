import jwt
from settings import TOKEN_EXPIRATION_TIME, JWT_KEY
import time

def create_token(user_id, expiration_time=TOKEN_EXPIRATION_TIME):
    return jwt.encode(
        {
            'exp': time.time() + expiration_time,
            'user_id': user_id,
        },
        JWT_KEY,
        algorithm='HS256',
    ).decode()

def get_token(request):
    token = request.headers.get('token', '')

    if not is_token_valid(token):
        return False

    token = decode_token(token)
    token['new_token'] = create_token(token['user_id'])

    return token

def decode_token(token):
    """
        The function assumes that the token is valid.
    """
    return jwt.decode(token, JWT_KEY, algorithm='HS256')

def is_token_valid(token):
    try:
        decode_token(token)
        return True
    except (jwt.exceptions.DecodeError, jwt.ExpiredSignatureError):
        return False
