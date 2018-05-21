#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals
#import bulrush

AUTHOR = 'mykonakona'
SITENAME = "mykonakona's weblog"
SITEURL = ''

PATH = 'content'

TIMEZONE = 'Asia/Shanghai'

DEFAULT_LANG = 'zh'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (('Pelican', 'http://getpelican.com/'),
         ('Python.org', 'http://python.org/'),
         ('Jinja2', 'http://jinja.pocoo.org/'),)
         #('You can modify those links in your config file', '#'),)

# Social widget
#SOCIAL = (('You can add links in your config file', '#'),
#          ('Another social link', '#'),)

DEFAULT_PAGINATION = 5

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True

#THEME = "/home/mint64/virtualenvs/pelican/lib/python3.5/site-packages/pelican/themes/elegant"
THEME = "theme"
#THEME = bulrush.PATH
#JINJA_ENVIRONMENT = bulrush.ENVIRONMENT
#JINJA_FILTERS = bulrush.FILTERS
#PLUGIN_PATHS = ['/home/mint64/Playground/myweblog/pelican-plugins']
#PLUGINS = ['assets']
