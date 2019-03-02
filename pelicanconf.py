#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals
from os import getenv
#import bulrush

AUTHOR = 'mykonakona'
SITENAME = "mykonakona's weblog"
SITEURL = '//' + getenv("SITEURL", default='localhost:8000')

PATH = 'content'

DISQUS_SITENAME = "mykonakonas-weblog"

TIMEZONE = 'Asia/Shanghai'

DEFAULT_LANG = 'en'

DIRECT_TEMPLATES = (('index', 'tags', 'categories','archives', 'search', '404'))  
PLUGIN_PATHS = ['plugins']
PLUGINS = ['tipue_search']
# @see http://docs.getpelican.com/en/3.5.0/settings.html#url-settings
ARTICLE_URL = '{date:%Y}/{date:%m}/{date:%d}/{slug}/'
ARTICLE_SAVE_AS = '{date:%Y}/{date:%m}/{date:%d}/{slug}/index.html'
PAGE_URL = '{slug}'
PAGE_SAVE_AS = '{slug}/index.html'

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

#THEME = "/home/mint64/Playground/myweblog/blue-penguin"
#THEME = "/home/mint64/Playground/myweblog/elegant"
#THEME = "/home/mint64/virtualenvs/pelican/lib/python3.5/site-packages/pelican/themes/penguin-blue:"
THEME = "theme"
#THEME = bulrush.PATH
#JINJA_ENVIRONMENT = bulrush.ENVIRONMENT
#JINJA_FILTERS = bulrush.FILTERS
#PLUGIN_PATHS = ['/home/mint64/Playground/myweblog/pelican-plugins']
#PLUGINS = ['assets']

## all the following settings are *optional*
#
## HTML metadata
#SITEDESCRIPTION = ''
#
## all defaults to True.
#DISPLAY_HEADER = True
#DISPLAY_FOOTER = True
#DISPLAY_HOME   = True
#DISPLAY_MENU   = True
#
## provided as examples, they make ‘clean’ urls. used by MENU_INTERNAL_PAGES.
##ABOUT_URL           = 'about'
##ABOUT_SAVE_AS       = 'about/index.html'
##TAGS_URL           = 'tags'
##TAGS_SAVE_AS       = 'tags/index.html'
##AUTHORS_URL        = 'authors'
##AUTHORS_SAVE_AS    = 'authors/index.html'
#CATEGORIES_URL     = 'categories'
#CATEGORIES_SAVE_AS = 'categories/index.html'
#ARCHIVES_URL       = 'archives'
#ARCHIVES_SAVE_AS   = 'archives/index.html'
#
## use those if you want pelican standard pages to appear in your menu
#MENU_INTERNAL_PAGES = (
##    ('About', ABOUT_URL, ABOUT_SAVE_AS),
##    #('Tags', TAGS_URL, TAGS_SAVE_AS),
##    #('Authors', AUTHORS_URL, AUTHORS_SAVE_AS),
#    ('Categories', CATEGORIES_URL, CATEGORIES_SAVE_AS),
#    ('Archives', ARCHIVES_URL, ARCHIVES_SAVE_AS),
#)
