import sys
import blippar.test

# test = Test()
# print calc(3, 3)
# print test.helloprint()


class Prabu:
	name = "Hello"
	def sum(self, a, b):
		return a + b

	def doit(self):
		return 'TEST'

	def function(self):
		print "This is constructor"

 

 
def do_stuff_with_number(n):
    print n

the_list = (1, 2, 3, 4, 5)

for i in range(20):
    try:
        do_stuff_with_number(the_list[i])
    except IndexError: # Raised when accessing a non-existing index of a list
        do_stuff_with_number(0)