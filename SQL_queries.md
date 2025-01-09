### CarsmanagementDB
## Table: Cars
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
## Table: Owners
  CREATE TABLE Owners (
    OwnerID INT PRIMARY KEY AUTO_INCREMENT,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    PhoneNumber VARCHAR(15),
    Address TEXT
);
## Table: Dealerships
CREATE TABLE Dealerships (
    DealershipID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100) NOT NULL,
    Location TEXT NOT NULL,
    Phone VARCHAR(15)
);
## Table: Services
CREATE TABLE Services (
    ServiceID INT PRIMARY KEY AUTO_INCREMENT,
    CarID INT NOT NULL,
    ServiceDate DATE NOT NULL,
    ServiceType VARCHAR(50) NOT NULL,
    Cost DECIMAL(10, 2),
    FOREIGN KEY (CarID) REFERENCES Cars(CarID)
);
## Table: CarFeatures
CREATE TABLE CarFeatures (
    FeatureID INT PRIMARY KEY AUTO_INCREMENT,
    FeatureName VARCHAR(50) NOT NULL UNIQUE
);
## Junction Table: CarFeaturesMapping
CREATE TABLE CarFeaturesMapping (
    CarID INT NOT NULL,
    FeatureID INT NOT NULL,
    PRIMARY KEY (CarID, FeatureID),
    FOREIGN KEY (CarID) REFERENCES Cars(CarID),
    FOREIGN KEY (FeatureID) REFERENCES CarFeatures(FeatureID)
);
