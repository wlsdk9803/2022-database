import random
import numpy as np
import random

base = "INSERT INTO student_has_class (Student_Id, Class_Id, Class_Department_Id) VALUES "

sql = []
for i in range(100000):
    if i % 100000 == 0: print(i)
    Student_Id = random.randint(1,100006)
    Class_Id= random.randint(1,5)
    if(Class_Id==1 or Class_Id==3 or Class_Id==5):
        Class_Department_Id=1
    elif(Class_Id==2):
        Class_Department_Id=2
    elif(Class_Id==4):
        Class_Department_Id=3

    query = base + '("' + str(Student_Id) + '", "'+ str(Class_Id) + '", "' + str(Class_Department_Id) + '");\n'

    sql.append(query);

f = open('test_inhaStudentHasClass.sql', 'w')
for i, s in enumerate(sql):
    f.writelines(s)

f.close()