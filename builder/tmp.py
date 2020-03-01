class MyClass:
    def __init__(self, i):
        self.__i = i

    def get(self):
        func = getattr(MyClass, f'__function_{self.__i}')
        func(self, 12)   # This one will work
        # self.func(12)    # But this does NOT work.


    def __function_1(self, p1):
        print('function1: {}'.format(p1))
        # do other stuff

    def __function_2(self, p1):
        print('function2: {}'.format(p1))
        # do other stuff


if __name__ == "__main__":
    
    class1 = MyClass(1)
    print(dir(class1))
    class1.get()
    class2 = MyClass(2)
    class2.get()