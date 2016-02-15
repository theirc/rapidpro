# -----------------------------------------------------------------------------------
# Sample RapidPro settings file, this should allow you to deploy RapidPro locally on
# a PostgreSQL database.
#
# The following are requirements:
#     - a postgreSQL database named 'temba', with a user name 'temba' and 
#       password 'temba' (with postgis extensions installed)
#     - a redis instance listening on localhost
#-----------------------------------------------------------------------------------

# import our default settings
from settings_common import *

#-----------------------------------------------------------------------------------
# Used when creating callbacks for Twilio, Nexmo etc..
#-----------------------------------------------------------------------------------
HOSTNAME = 'sms.ictlabserbia.org'
TEMBA_HOST = HOSTNAME

#-----------------------------------------------------------------------------------
# Redis & Cache Configuration (we expect a Redis instance on localhost)
#-----------------------------------------------------------------------------------
CACHES = {
    "default": {
        "BACKEND": "redis_cache.cache.RedisCache",
        "LOCATION": "%s:%s:%s" % (REDIS_HOST, REDIS_PORT, REDIS_DB),
        "OPTIONS": {
            "CLIENT_CLASS": "redis_cache.client.DefaultClient",
        }
    }
}

#-----------------------------------------------------------------------------------
# Need a PostgreSQL database on localhost with postgis extension installed.
#-----------------------------------------------------------------------------------
DATABASES = {
    'default': {
        'ENGINE': 'django.contrib.gis.db.backends.postgis',
        'NAME': 'temba',
        'USER': 'temba',
        'PASSWORD': 'temba',
        'HOST': 'localhost',
        'PORT': '',
        'ATOMIC_REQUESTS': True,
        'OPTIONS': {
        }
    }
}

# reuse our connections for up to 60 seconds
DATABASES['default']['CONN_MAX_AGE'] = 60
DATABASES['default']['ATOMIC_REQUESTS'] = True
DATABASES['default']['ENGINE'] = 'django.contrib.gis.db.backends.postgis'

INTERNAL_IPS = ('127.0.0.1',)

#-----------------------------------------------------------------------------------
# Load development apps
#-----------------------------------------------------------------------------------
INSTALLED_APPS = INSTALLED_APPS + ('storages', )

#-----------------------------------------------------------------------------------
# In development, add in extra logging for exceptions and the debug toolbar
#-----------------------------------------------------------------------------------
MIDDLEWARE_CLASSES = (
                         'temba.middleware.ExceptionMiddleware',
                     ) + MIDDLEWARE_CLASSES

#--------------------------------------------------------------------------------
# In development, perform background tasks in the web thread (synchronously)
#-----------------------------------------------------------------------------------
#CELERY_ALWAYS_EAGER = True
#CELERY_EAGER_PROPAGATES_EXCEPTIONS = True
#BROKER_BACKEND = 'memory'

SEND_MESSAGES = True
SEND_WEBHOOKS = True
SEND_EMAILS = True

#-----------------------------------------------------------------------------------
# This setting throws an exception if a naive datetime is used anywhere. (they should
# always contain a timezone)
#-----------------------------------------------------------------------------------
import warnings

warnings.filterwarnings(
    'error', r"DateTimeField .* received a naive datetime",
    RuntimeWarning, r'django\.db\.models\.fields')

#-----------------------------------------------------------------------------------
# Make our sitestatic URL be our static URL on development
#-----------------------------------------------------------------------------------
#STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'


import dj_database_url

if 'DATABASE_URL' in os.environ:
    DATABASES['default'] = dj_database_url.config()

AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = os.environ.get('AWS_STORAGE_BUCKET_NAME')
AWS_PRELOAD_METADATA = True  # necessary to fix manage.py collectstatic command to only upload changed files instead of all files
AWS_QUERYSTRING_AUTH = False

S3_BASE = '%s.s3.amazonaws.com' % AWS_STORAGE_BUCKET_NAME
S3_URL = 'https://%s' % S3_BASE
MEDIA_URL = S3_URL + '/media/'

ADMIN_MEDIA_PREFIX = STATIC_URL + '/'

MEDIAFILES_LOCATION = 'media'
DEFAULT_FILE_STORAGE = 'temba.storage.MediaStorage'


COMPRESS_URL = STATIC_URL = os.environ.get('CLOUDFRONT_URL', S3_URL + '/')
AWS_S3_CUSTOM_DOMAIN = os.environ.get('CLOUDFRONT_DOMAIN', S3_BASE)

DEBUG = True
ALLOWED_HOSTS = ['*']

TEMPLATE_CONTEXT_PROCESSORS += ('temba.tests.add_testing_flag_to_context', )


COMPRESS_ENABLED = True

COMPRESS_STORAGE = STATICFILES_STORAGE = "temba.storage.CachedS3BotoStorage"
# Hack to have the compressor run offline
# COMPRESS_URL = STATIC_URL = "/static/"
# uncomment the line above. Run collect static and recomment it

COMPRESS_REBUILD_TIMEOUT = 10
