---
layout: slide
title: "Django for Rubyists (on Rails)"
date: 2019-11-22 18:47:00
theme: solarized
transition: slide
categories: presentation
tags:
- programming
- presentation
---
<section data-markdown data-separator="^\n---\n$">
  <script type="text/template">
    # Django for Rubyists (on Rails)
    Monica Georgieva @spiralnegative

    ---

    <!-- .slide: data-background="/assets/images/parks_and_recreation_1.gif" -->
    ## <span style="color:#fdf6e3">Basics</span>

    ---

    ## Project setup
    ### Rails
    ```shell
    gem install rails
    rails new rails_project
    ```
    ### Django
    ```shell
    pip3 install Django
    django-admin.py startproject django_project
    ```

    ---

    ## Initial file structure
    ### Rails
    ```shell
    $ tree -L 2
    .
    ├── app
    │   ├── assets
    │   ├── channels
    │   ├── controllers
    │   ├── helpers
    │   ├── javascript
    │   ├── jobs
    │   ├── mailers
    │   ├── models
    │   └── views
    ├── bin
    │   ├── bundle
    │   ├── rails
    │   ├── rake
    │   ├── setup
    │   ├── spring
    │   └── yarn
    ├── config
    │   ├── application.rb
    │   ├── boot.rb
    │   ├── cable.yml
    │   ├── credentials.yml.enc
    │   ├── database.yml
    │   ├── environment.rb
    │   ├── environments
    │   ├── initializers
    │   ├── locales
    │   ├── master.key
    │   ├── puma.rb
    │   ├── routes.rb
    │   ├── spring.rb
    │   └── storage.yml
    ├── config.ru
    ├── db
    │   └── seeds.rb
    ├── Gemfile
    ├── Gemfile.lock
    ├── lib
    │   ├── assets
    │   └── tasks
    ├── log
    ├── package.json
    ├── public
    │   ├── 404.html
    │   ├── 422.html
    │   ├── 500.html
    │   ├── apple-touch-icon.png
    │   ├── apple-touch-icon-precomposed.png
    │   ├── favicon.ico
    │   └── robots.txt
    ├── Rakefile
    ├── README.md
    ├── storage
    ├── test
    │   ├── application_system_test_case.rb
    │   ├── channels
    │   ├── controllers
    │   ├── fixtures
    │   ├── helpers
    │   ├── integration
    │   ├── mailers
    │   ├── models
    │   ├── system
    │   └── test_helper.rb
    ├── tmp
    │   ├── cache
    │   ├── pids
    │   └── storage
    └── vendor
    ```

    ---

    ## Initial file structure
    ### Django
    ```shell
    $ tree -L 2
    .
    ├── django_project
    │   ├── __init__.py
    │   ├── settings.py
    │   ├── urls.py
    │   └── wsgi.py
    └── manage.py
    ```

    ---

    ## Initial file structure
    ### Django
    ```shell
    $ django-admin.py startapp app
    $ tree app
    app
    ├── admin.py
    ├── apps.py
    ├── __init__.py
    ├── migrations
    │   └── __init__.py
    ├── models.py
    ├── tests.py
    └── views.py
    ```

    ---

    ## Configuration
    |Rails|Django|
    |-----|------|
    |config/database.yml|settings.py or settings/*.py|
    |config/environments/*.rb|settings.py or settings/*.py|
    |config/routes.rb|urls.py|

    ---

    ## Management
    |Rails|Django|
    |-----|------|
    |rails s|python3 ./manage.py runserver|
    |rails c|python3 ./manage.py shell|
    |rails db|python3 ./manage.py dbshell|
    |rake db:migrate|python3 ./manage.py migrate|

    ---

    ## MVC
    |Rails|Django|
    |-----|------|
    |db/schema.rb||
    |app/models/*.rb|app/models.py or app/models/*.py|
    |app/views/*|app/templates/*|
    |app/controllers/*.rb|app/views.py|
  </script>
</section>

<section data-background="/assets/images/parks_and_recreation_2.gif">
  <h2 style="color:#fdf6e3;">ORM</h2>
  <aside class="notes">
  Rails: ActiveRecord does not hold all the truth about the model; tables are defined using migrations

  Django: things are all about the models; schema is defined in the class and Django takes care of database migrations
  </aside>
</section>

<section data-markdown data-separator="^\n---\n$">
  <script type="text/template">
    ## Creating
    ### Rails
    ```ruby
      User.create(name: 'Molly Millions', email: 'molly@sprawl.net')
    ```

    ### Django
    ```python
      User.objects.create(name='Molly Millions', email='molly@sprawl.net')
    ```

    ---

    ## Selecting
    ### Rails
    ```ruby
    User.find(505)
    # => #<User:0x00007fb98b737d18>
    # id: 505,
    # name: 'Johnny Mnemonic',
    # email: 'johnny@sprawl.net'
    # ...

    User.find_by(name: 'Johnny Mnemonic')
    User.where(name: 'Johnny Mnemonic')

    User.where("email LIKE 'Johnny%'")
    User.where("email LIKE '%Johnny%'")
    ```

    ---

    ## Selecting
    ### Django
    ```python
    User.objects.get(id=505)
    # <User: User object (505)>
    User.objects.get(id=505).__dict__
    # {'name': 'Johnny Mnemonic', 'email': 'johnny@sprawl.net', id: 505 ...}

    User.objects.get(name='Johnny Mnemonic')
    # get() returned more than one User -- it returned 2!
    User.objects.filter(name='Johnny Mnemonic')

    User.objects.filter(email__startswith='Johnny')
    User.objects.filter(email__contains='Johnny')
    ```

    ---

    ## Selecting last
    ### Rails
    ```ruby
    User.last()

    User.last(2)
    ```
    ### Django
    ```python
    User.objects.all().last()

    User.objects.all()[:-2] # AssertionError: Negative indexing is not supported.
    User.objects.all().order_by('-id')[0:2]
    ```

    ---

    ## Plucking
    ### Rails
    ```ruby
    User.pluck(:email)

    User.pluck(:id, :email)
    ```

    ### Django
    ```python
    User.objects.values_list('email', flat=True)

    User.objects.values('id', 'email')
    ```

    ---

    ## Updating
    ### Rails
    ```ruby
      User.find(5).update(email: 'razorgirl@sprawl.net')

      User.where(email: 'unknown').update_all(email: nil)
    ```

    ### Django
    ```python
      User.objects.get(id=5).update(email='razorgirl@sprawl.net')

      User.objects.filter(email='unknown').update(email=None)
    ```

    ---

    ## Destroying
    ### Rails
    ```ruby
    User.find(404).destroy

    User.all.destroy
    ```

    ### Django
    ```python
    User.objects.get(id=404).delete()

    User.objects.all().delete()
    ```

    ---

    ## Joining
    ### Rails
    ```ruby
      User.joins(:articles).where(articles: { category: 'cyberpunk' })
    ```

    ### Django
    ```python
      User.objects.filter(article__category='cyberpunk')
    ```

    ---

    <!-- .slide: data-background="/assets/images/parks_and_recreation_3.gif" -->
    ## <span style="color:#fdf6e3">Even more...</span>
  </script>
</section>

<section>
  <h2>Overriding</h2>
  <h3>Rails</h3>
  <pre><code class="ruby">
class User < ActiveRecord::Base
  def birthdate=(value)
    # do something with value
    super(value)
  end
end
  </code></pre>
</section>

<section>
  <h2>Overriding</h2>
  <h3>Django</h3>
  <pre><code class="python">
class User(models.Model):
    _birthdate = models.DateField(db_column="birthdate")

    @property
    def birthdate(self):
        return self._birthdate

    @birthdate.setter
    def birthdate(self, value):
        # do something with value
        self._birthdate = value
  </code></pre>
</section>

<section>
  <h2>self(less)</h2>
  <pre><code class="python">
class User:
    def __init__(name, email): # self is missing
        self.name = name
        self.email = email

>>> User(name='Rose Kolodny', email='rose-k@sprawl.net')
    Traceback (most recent call last):
    # ...
    TypeError: __init__() got multiple values for argument 'name'
  </code></pre>
</section>

<section data-background="/assets/images/parks_and_recreation_4.gif">
  <h2 style="color:#fdf6e3;">Thank you!</h2>
</section>
