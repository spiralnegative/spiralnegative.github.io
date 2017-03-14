---
layout: page
title: Tags
---

{% for tag in site.tags %}
  <a href="/tag/{{ tag[0] }}">{{ tag[0] }}</a>
{% endfor %}
