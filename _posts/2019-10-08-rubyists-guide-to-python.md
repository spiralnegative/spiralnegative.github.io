---
layout: slide
title: "Rubyist's guide to Python"
date: 2019-10-08 19:20:00
theme: solarized
transition: slide
categories: presentation
tags:
- programming
- presentation
---
<section>
  <h1>Rubyist's guide to Python</h1>
  <p>
    Monica Georgieva @spiralnegative
  </p>
</section>


<section data-background="/assets/images/it_crowd_1.gif">
  <h2 style="color:#fdf6e3;">Main differences</h2>
</section>

<section>
  <h2>Use cases</h2>
  <h3>Ruby</h3>
  quick development of web applications
  <br>fast prototyping
  <br>command line utilities, tooling and sysadmin work
  <br>
  <br>
  <h3>Python</h3>
  data-heavy sites and servers
  <br>usage by non-programmers
  <br>big data, math problems and scientific research
</section>

<section>
  <h2>Characteristics</h2>
  <h3>Ruby</h3>
  freedom and flexibility to do things in different ways
  <br>expressive, elegant and efficient
  <br>very web focused and innovates quicker
  <br>
  <br>
  <h3>Python</h3>
  explicit - simplicity over flexibility
  <br>quicker to learn, conservative and efficient
  <br>stable and diverse, but innovates slower
</section>

<section>
  <h2>Popular applications</h2>
  <h3>Ruby</h3>
  Basecamp, Twitter (originally), GitHub, Airbnb
  <br>
  <br>
  <h3>Python</h3>
  YouTube, Instagram, Spotify, Reddit
</section>

<section>
  <h2>Libraries</h2>
  <h3>Ruby</h3>
  <pre><code class="bash">gem install pry</code></pre>
  <br>
  <br>
  <h3>Python</h3>
  <pre><code class="bash">pip3 install numpy</code></pre>
</section>

<section>
  <h2>Testing and debugging</h2>
  <h3>Ruby</h3>
  RSpec and Cucumber
  <br>pry and byebug
  <br>
  <br>
  <h3>Python</h3>
  PyTest and unittest
  <br>pdb and PuDB
</section>

<section data-background="/assets/images/it_crowd_2.gif">
  <h2 style="color:#fdf6e3;">Ruby vs Python</h2>
</section>

<section>
  <h2>Closures</h2>
  <h3>Ruby</h3>
  <pre><code class="ruby">
[5,6,7].each { |n| puts "#{n}!!!" }
          </code></pre>
          <pre><code class="ruby">
def return_from_proc
  a = Proc.new { return 10 }.call
  puts "This will never be printed."
end
          </code></pre>
          <pre><code class="ruby">
def return_from_lambda
  a = lambda { return 10 }.call
  puts "The lambda returned #{a}, and this will be printed."
end
  </code></pre>
</section>

<section>
  <h2>Closures</h2>
  <h3>Python</h3>
  <pre><code class="python">
def outer_function(x):
  def inner_increment(x):
      return x + 2

  y = inner_increment(x)
  print(x, y)

outer_function(5)
# 5 7
  </code></pre>
</section>

<section>
  <h2>Functions as arguments</h2>
  <h3>Ruby</h3>
  <pre><code class="ruby">
def run_proc_with_random_number(proc)
  proc.call(rand)
end

proc = Proc.new { |number| puts "#{number}!!!" }
run_proc_with_random_number(proc)
  </code></pre>
</section>

<section>
  <h2>Functions as arguments</h2>
  <h3>Python</h3>
  <pre><code class="python">
from random import *

def run_with_random_number(func):
  func(random())

def exclaim(number):
  print(f"{number}!!!")

run_with_random_number(exclaim)
  </code></pre>
</section>

<section>
  <h2>Multiple inheritance</h2>
  <h3>Ruby</h3>
  <pre><code class="ruby">
module Cupcake
  def sprinkle; end
end

module Cookie
  def glaze; end
end

class Dessert
  include Cupcake
  include Cookie

  def bake; end
end
  </code></pre>
</section>

<section>
  <h2>Multiple inheritance</h2>
  <h3>Python</h3>
  <pre><code class="python">
class Cupcake:
  def sprinkle(self):
      pass

class Cookie:
  def glaze(self):
      pass

class Dessert(Cupcake, Cookie):
  def bake(self):
      pass
  </code></pre>
</section>

<section>
  <h2>To return or not to return?</h2>
  <h3>Ruby</h3>
  <pre><code class="ruby">
def valid_dna?(sequence)
  sequence.chars.all? { |char| 'ACGT'.include? char }
end
  </code></pre>
  <br>
  <h3>Python</h3>
  <pre><code class="python">
def valid_dna(sequence):
  return all(char in 'ACGT' for char in sequence)
  </code></pre>
</section>

<section>
  <h2>The missing case</h2>
  <h3>Ruby</h3>
  <pre><code class="ruby">
case x
when 0
  puts "That's a good start"
when 1..5
  puts 'Getting there...'
when 'Ruby'
  puts 'Banitsa!'
when 42
  puts 'The answer'
else
  puts "What should I do with #{x}?"
end
  </code></pre>
</section>

<section>
  <h2>The missing case</h2>
  <h3>Python</h3>
  <pre><code class="python">
def f(x):
  return {
      0: "That's a good start",
      5: 'Getting there...',
      'Ruby': 'Banitsa',
      42: 'The answer'
  }.get(x, f'What should I do with {x}')
  </code></pre>
</section>

<section>
  <h2>Ternary operators</h2>
  <h3>Ruby</h3>
  <pre><code class="ruby">
awake && ready ? 'go to work' : 'wake up and get ready'
if awake && ready then 'go to work' else 'wake up and get ready' end
  </code></pre>
  <br>
  <h3>Python</h3>
  <pre><code class="python">
'go to work' if awake and ready else 'wake up and get ready'
  </code></pre>
</section>

<section>
  <h2>Flatten and reduce</h2>
  <h3>Ruby</h3>
  <pre><code class="ruby">
numbers = [[1, 2], [3, 4, 5], [6]]
numbers.flatten
# => [1, 2, 3, 4, 5, 6]

numbers = _
numbers.reduce(100, :+)
# => 121
  </code></pre>
</section>

<section>
  <h2>Flatten and reduce</h2>
  <h3>Python</h3>
  <pre><code class="python">
numbers = [[1, 2], [3, 4, 5], [6]]
[y for x in numbers for y in x]
# [1, 2, 3, 4, 5, 6]

import itertools
list(itertools.chain(*numbers))
# [1, 2, 3, 4, 5, 6]

numbers = _
from functools import reduce
reduce((lambda x, y: x + y), [100] + numbers)
  </code></pre>
</section>

<section>
  <h2>Adding an element to a list</h2>
  <h3>Ruby</h3>
  <pre><code class="ruby">
animals = []
animals[5] = 'rabbit'
animals
# => [nil, nil, nil, nil, nil, 'rabbit']
  </code></pre>
  <h3>Python</h3>
  <pre><code class="python">
animals = []
animals[5] = 'rabbit'
# IndexError: list assignment index out of range
  </code></pre>
</section>
<section data-background="/assets/images/it_crowd_3.gif">
  <h2 style="color:#fdf6e3;">Thank you!</h2>
</section>
