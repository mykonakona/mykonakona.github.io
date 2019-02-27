#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals
#import bulrush

AUTHOR = 'mykonakona'
SITENAME = "mykonakona's weblog"
SITEURL = 'https://mykonakona.github.io/'

PATH = 'content'

DISQUS_SITENAME = "mykonakona's weblog"

TIMEZONE = 'Asia/Shanghai'

DEFAULT_LANG = u'en'

# @see http://docs.getpelican.com/en/3.5.0/settings.html#url-settings
ARTICLE_URL = '{date:%Y}/{date:%m}/{date:%d}/{slug}/'
ARTICLE_SAVE_AS = '{date:%Y}/{date:%m}/{date:%d}/{slug}/index.html'

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

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = False

#THEME = "/home/mint64/virtualenvs/pelican/lib/python3.5/site-packages/pelican/themes/elegant"
THEME = "theme"
#THEME = bulrush.PATH
#JINJA_ENVIRONMENT = bulrush.ENVIRONMENT
#JINJA_FILTERS = bulrush.FILTERS
#PLUGIN_PATHS = ['/home/mint64/Playground/myweblog/pelican-plugins']
#PLUGINS = ['assets']
