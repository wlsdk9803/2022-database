import random
import numpy as np
import string


first = '김이박정윤최장한오우배변곽공류홍표조주도신은혜선명진수국종경'
second = '김이박정윤최장한오우배변곽공류홍표조주도신은혜선명진수국종경'
third = '김이박정윤최장한오우배변곽공류홍표조주도신은혜선명진수국종경'
email_set=string.ascii_lowercase
email_list=random.sample(email_set,5)
employee1=[1,2,5,11]
employee2=[4,6,10]
employee5=[3,8]
base = "INSERT INTO student (Name, Email, Phone_number, Major, Student_Id, Employee_Id) VALUES "

sql = []
for i in range(100000):
    if i % 100000 == 0: print(i)
    f_idx = random.randint(0, len(first)-1)
    s_idx = random.randint(0, len(first)-1);
    t_idx = random.randint(0, len(first)-1)
    e1_idx=random.randint(0, 3)
    e2_idx=random.randint(0, 2)
    e5_idx=random.randint(0, 1)
    Major = random.randint(1,5)
    Student_Id = random.randint(12111111,12999999)

    if(Major==1):
        Employee_Id=employee1[e1_idx]
    elif(Major==2):
        Employee_Id=employee2[e2_idx]
    elif(Major==3):
        Employee_Id=9
    elif(Major==4):
        Employee_Id=7
    elif(Major==5):
        Employee_Id=employee5[e5_idx]
    
    Name = first[f_idx]+second[s_idx] + third[t_idx]
    Email = ''.join(random.sample(email_set,5))+str(random.randint(11,99))+"@inha.edu"
    Phone_number = '010-'+str(random.randint(0000,9999))+'-'+str(random.randint(0000,9999))

    query = base + '("' + Name + '", "'+ Email + '", "' + Phone_number + '", "'  + str(Major) + '", "'+ str(Student_Id) +'", "' + str(Employee_Id) + '");\n'

    sql.append(query);

f = open('test_inhaStudent.sql', 'w')
for i, s in enumerate(sql):
    f.writelines(s)

f.close()