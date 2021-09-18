from flask import Flask, request
from lxml import etree
import urllib.request
import urllib.parse
import re
import random
import json

app = Flask(__name__)

base_url = 'http://bluo.cn/'

colorList = [{
    'title': '嫣红',
    'name': 'red',
    'color': '#e54d42'
}, {
    'title': '桔橙',
    'name': 'orange',
    'color': '#f37b1d'
}, {
    'title': '明黄',
    'name': 'yellow',
    'color': '#fbbd08'
}, {
    'title': '橄榄',
    'name': 'olive',
    'color': '#8dc63f'
}, {
    'title': '森绿',
    'name': 'green',
    'color': '#39b54a'
}, {
    'title': '天青',
    'name': 'cyan',
    'color': '#1cbbb4'
}, {
    'title': '海蓝',
    'name': 'blue',
    'color': '#0081ff'
}, {
    'title': '姹紫',
    'name': 'purple',
    'color': '#6739b6'
}, {
    'title': '木槿',
    'name': 'mauve',
    'color': '#9c26b0'
}, {
    'title': '桃粉',
    'name': 'pink',
    'color': '#e03997'
}, {
    'title': '棕褐',
    'name': 'brown',
    'color': '#a5673f'
}, {
    'title': '墨黑',
    'name': 'black',
    'color': '#333333'
}]


@app.route('/index/<page>')
def index(page='1'):
    index_url = base_url + ('' if page == '1' else 'page/%s' % page)
    print(index_url)
    page_content = urllib.request.urlopen(index_url).read().decode("utf-8")
    page_html = etree.HTML(page_content)
    return {'data': [{
        'title': eve_attr.xpath('div/div[1]/h1/a/text()')[0].strip(),
        'url': eve_attr.xpath('div/div[1]/h1/a/@href')[0],
        'time': eve_attr.xpath('div/div[1]/div/time/text()')[0].strip(),
        'category': '/'.join(eve_attr.xpath('div/div[1]/div/a/text()')),
        'picture': eve_attr.xpath('a/div/img/@src')[0],
        'description': eve_attr.xpath('div/div[2]/p/text()')[0].strip(),
    } for eve_attr in page_html.xpath('//*[@id="main"]/section/article')],
        'page': re.findall('第 (.*?) 页 共 (.*?) 页', page_content)[0]}


@app.route('/content', methods=["POST"])
def content():
    url = json.loads(request.data.decode("utf-8"))['url']
    content_url = base_url + url[1:]
    page_content = urllib.request.urlopen(content_url).read().decode("utf-8")
    page_html = etree.HTML(page_content)
    print('md_url: ', 'http://bluo.cn/_posts/%s.md'%url[1:-1])
    mardwoncontent = urllib.request.urlopen('http://bluo.cn/_posts/%s.md'%url[1:-1]).read().decode("utf-8").split('<!-- excerpt -->')[1]
    try:
        pre = {
            "title": page_html.xpath('//*[@id="post-footer"]/div[2]/nav/ul/li[1]/a/@data-tooltip')[0],
            "url": page_html.xpath('//*[@id="post-footer"]/div[2]/nav/ul/li[1]/a/@href')[0]
        }
    except:
        pre = {}
    try:
        next = {
            "title": page_html.xpath('//*[@id="post-footer"]/div[2]/nav/ul/li[2]/a/@data-tooltip')[0],
            "url": page_html.xpath('//*[@id="post-footer"]/div[2]/nav/ul/li[2]/a/@href')[0]
        }
    except:
        next = {}

    return {
        "md_content": mardwoncontent,
        "real_title": page_html.xpath('//*[@id="main"]/article/div[1]/h1/text()')[0],
        "title": '<h1>' + page_html.xpath('//*[@id="main"]/article/div[1]/h1/text()')[0] + '</h1>',
        "category": '/'.join(page_html.xpath('//*[@id="main"]/article/div[1]/div/a/text()')),
        "content": etree.tostring(page_html.xpath('//*[@id="main"]/article/div[2]')[0], encoding='utf-8').decode(
            'utf-8').replace("<img ", "<img style='max-width:100%;height:auto;display:block;'").replace("<pre ", "<pre style='white-space: pre-wrap;word-wrap: break-word;' "),
        "time": page_html.xpath('//*[@id="main"]/article/div[1]/div/time/text()')[0],
        "tags": page_html.xpath('//*[@id="post-footer"]/div[1]/a/text()'),
        "pre": pre,
        "next": next
    }


@app.route('/tags')
def tags():
    tags_url = base_url + 'all-tags'
    page_content = urllib.request.urlopen(tags_url).read().decode("utf-8")
    page_html = etree.HTML(page_content)
    return {'data': [{
        'title': eve_attr.xpath('text()')[0].strip(),
        'color': random.choice(colorList)
    } for eve_attr in page_html.xpath('//*[@id="tags-archives"]/section[1]/a')]}


@app.route('/blog/list/<type>', methods=["POST"])
def blogList(type):
    name = json.loads(request.data.decode("utf-8"))['name']
    content_url = base_url + type + "/" + urllib.parse.quote(name.replace('/', '').replace(' ', '-'))
    page_content = urllib.request.urlopen(content_url).read().decode("utf-8")
    page_html = etree.HTML(page_content)
    return {'data': [{
        'title': eve_attr.xpath('div/div[1]/h1/a/text()')[0].strip(),
        'url': eve_attr.xpath('div/div[1]/h1/a/@href')[0],
        'time': eve_attr.xpath('div/div[1]/div/time/text()')[0].strip(),
        'category': '/'.join(eve_attr.xpath('div/div[1]/div/a/text()')),
        'picture': eve_attr.xpath('a/div/img/@src')[0],
        'description': eve_attr.xpath('div/div[2]/p/text()')[0].strip(),
    } for eve_attr in page_html.xpath('//*[@id="main"]/section/article')]}


if __name__ == '__main__':
    app.run()
