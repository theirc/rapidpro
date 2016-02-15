from __future__ import absolute_import, unicode_literals, division, print_function

__author__ = 'reyrodrigues'

from django.core.files.storage import get_storage_class
from storages.backends.s3boto import S3BotoStorage

from django.core.files.base import File
from django.conf import settings

class MediaStorage(S3BotoStorage):
        location = settings.MEDIAFILES_LOCATION