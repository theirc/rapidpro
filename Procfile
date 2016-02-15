web: newrelic-admin run-program gunicorn temba.wsgi --log-file -
worker: newrelic-admin run-program python manage.py celeryd --beat
