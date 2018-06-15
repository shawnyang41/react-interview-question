def read():
    f = open('input.txt')
    line = f.readline()
    name = []
    while(line !=''):
        name.append(line.split('\"')[1])
        line = f.readline()
    print(name)
    
read()