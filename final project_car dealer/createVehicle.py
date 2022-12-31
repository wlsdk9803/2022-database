import random
import numpy as np

license = '가나다라마바사아자거너더러머버서어저고노도로모보소오조구누두루무부수우주배하허호'
typeList=['car', 'suv', 'truck']
carModel=['K5', 'K8', 'K9', 'Morning', 'Coupe', 'Grandeur', 'Avante', 'Sonata']
suvModel=['Kona', 'Tucson', 'Santa Fe', 'Sorento', 'Sportage', 'Niro', 'XM3', 'Palisade']
truckModel=['Mighty', 'Pavise', 'Xcient', 'Bongo3']

baseVehicle = "INSERT INTO VEHICLE (Vin, Price, Model, License_plate, reservation_availability, type) VALUES "
baseCar = "INSERT INTO CAR (Engine_size, vehicle_Vin) VALUES "
baseSUV = "INSERT INTO SUV (No_seats, vehicle_Vin) VALUES "
baseTruck = "INSERT INTO TRUCK (Tonnage, vehicle_Vin) VALUES "

sql = []
for i in range(110000):
    if i % 10000 == 0: print(i)
    li_idx = random.randint(0, len(license)-1)
    vin = random.randint(111111111, 999999999)
    price=random.randint(5000, 9999999)
    
    Vin=vin
    Price='$'+str(price)
    License_plate=str(random.randint(11,99))+license[li_idx]+str(random.randint(1111,9999))
    reservation_availability='yes'
    type=typeList[random.randint(0,2)]
    if type == 'car':
        Model=carModel[random.randint(0, len(carModel)-1)]
    elif type == 'suv':
        Model=suvModel[random.randint(0, len(suvModel)-1)]
    else:
        Model=truckModel[random.randint(0, len(truckModel)-1)]

    queryVehicle = baseVehicle + '("' + str(Vin) + '", "' + Price + '", "' + Model + '", "' + License_plate + '", "' + reservation_availability + '", "' + type + '");\n'
    sql.append(queryVehicle)

    if type == 'car':
        Engine_size=str(random.randint(1000, 5000))+'cc'
        queryCar = baseCar + '("' + Engine_size + '", "' + str(Vin) + '");\n'
        sql.append(queryCar)
    elif type == 'suv':
        No_seats=random.randint(2, 8)
        querySUV = baseSUV + '("' + str(No_seats) + '", "' + str(Vin) + '");\n'
        sql.append(querySUV)
    else:
        Tonnage=random.randint(1, 5)
        queryTruck = baseTruck + '("' + str(Tonnage) + '", "' + str(Vin) + '");\n'
        sql.append(queryTruck)

f = open('createVehicle.sql', 'w')
for i, s in enumerate(sql):
    f.writelines(s)

f.close()