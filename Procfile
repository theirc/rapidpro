web: python manage.py compress --force; gunicorn temba.wsgi --log-file -
worker: python manage.py celeryd --beat
