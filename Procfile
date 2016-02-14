web: gunicorn temba.wsgi --log-file -
worker: python manage.py celeryd --beat
