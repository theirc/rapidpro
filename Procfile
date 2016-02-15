web: NEW_RELIC_CONFIG_FILE=newrelic.ini newrelic-admin run-program gunicorn temba.wsgi --log-file -
worker:  NEW_RELIC_CONFIG_FILE=newrelic.ini newrelic-admin run-program python manage.py celeryd --beat
