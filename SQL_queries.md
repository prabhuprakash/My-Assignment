# CarsmanagementDB
## Table: Cars
```
CREATE TABLE Cars (
CarID INT PRIMARY KEY AUTO_INCREMENT,
Brand VARCHAR(50) NOT NULL,
Model VARCHAR(50) NOT NULL,
Year INT NOT NULL,
Price DECIMAL(10, 2),
DealershipID INT,
ownerid int,
FOREIGN KEY (DealershipID) REFERENCES Dealerships(DealershipID),
FOREIGN KEY (Ownerid) REFERENCES Owners(ownerid)
);
```
## Table: Owners
```
CREATE TABLE Owners (
OwnerID INT PRIMARY KEY AUTO_INCREMENT,
FirstName VARCHAR(50) NOT NULL,
LastName VARCHAR(50) NOT NULL,
PhoneNumber VARCHAR(15),
Address TEXT
);
```
## Table: Dealerships
```
CREATE TABLE Dealerships (
DealershipID INT PRIMARY KEY AUTO_INCREMENT,
Name VARCHAR(100) NOT NULL,
Location TEXT NOT NULL,
Phone VARCHAR(15)
);
```
## Table: Services
```
CREATE TABLE Services (
ServiceID INT PRIMARY KEY AUTO_INCREMENT,
CarID INT NOT NULL,
ServiceDate DATE NOT NULL,
ServiceType VARCHAR(50) NOT NULL,
Cost DECIMAL(10, 2),
FOREIGN KEY (CarID) REFERENCES Cars(CarID)
);
```
## Table: CarFeatures
```
CREATE TABLE CarFeatures (
FeatureID INT PRIMARY KEY AUTO_INCREMENT,
FeatureName VARCHAR(50) NOT NULL UNIQUE
);
```
## Junction Table: CarFeaturesMapping
```
CREATE TABLE CarFeaturesMapping (
CarID INT NOT NULL,
FeatureID INT NOT NULL,
PRIMARY KEY (CarID, FeatureID),
FOREIGN KEY (CarID) REFERENCES Cars(CarID),
FOREIGN KEY (FeatureID) REFERENCES CarFeatures(FeatureID)
);
```
## Relations
|Table One| Table two | Relation |
|---------|-----------|----------|
|Owners|Cars|one to many|
|Dealerships | Cars|one to many|
|Cars|Services|one to many|
|Cars|Carfeaturesmapping|many to many|
|carfeatures|carfeaturesmapping|many to many|

## Queries
### dealers and their sale record
```
select  name,firstname,brand,model from dealerships inner join  cars inner join owners on dealerships.dealershipid=cars.dealershipid and cars.ownerid=owners.ownerid;
```
### owner and total service costs
```
select firstname,sum(cost) from owners inner join cars inner join services on owners.ownerid=cars.ownerid and cars.carid=services.carid group by firstname;
```
### owner and their individual car service cost
```
select firstname,brand,model,sum(cost) from owners inner join cars inner join services on owners.ownerid=cars.ownerid and cars.carid=services.carid group by services.carid;
```
### owners and no of cars they owned 
```
select owners.ownerid, count(cars.ownerid) as "number of cars" from owners left join cars on owners.ownerid=cars.ownerid  group by ownerid;
```
### ranking the owners based on number of cars 
```
with ownercars as (select owners.ownerid, count(cars.ownerid) as number_of_cars from owners left join cars on owners.ownerid=cars.ownerid  group by ownerid)
select ownerid,number_of_cars,rank() over (order by number_of_cars desc) as ranks from ownercars;

```
```
with ownercars as (select owners.ownerid, count(cars.ownerid) as number_of_cars from owners left join cars on owners.ownerid=cars.ownerid  group by ownerid)
select ownerid,number_of_cars,dense_rank() over (order by number_of_cars desc) as ranks from ownercars;

```
