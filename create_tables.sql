CREATE TABLE "cars"
(
	"id"            serial  PRIMARY KEY,
	"brand"         character varying(300) NOT NULL,
	"model"         character varying(300) NOT NULL,
	"license_plate" character varying(300) NOT NULL,
	"vin"           character varying(300) NOT NULL
) WITH ( OIDS = FALSE );


CREATE TABLE "car_booking"
(
	"id"            serial PRIMARY KEY,
	"auto_id"       bigint NOT NULL,
	"rate_id"       bigint NOT NULL,
	"start_date"    date NOT NULL,
	"end_date"      date NOT NULL,
	FOREIGN KEY ("auto_id") REFERENCES "cars" ("id")
	FOREIGN KEY ("rate_id") REFERENCES "rate" ("id")
) WITH ( OIDS = FALSE );



CREATE TABLE "rate"
(
	"id"            serial PRIMARY KEY,
	"distance"      int NOT NULL,
	"price"         float NOT NULL
) WITH ( OIDS = FALSE );



CREATE TABLE "discount"
(
	"id"            serial PRIMARY KEY,
	"rate"          int   NOT NULL UNIQUE,
	"from_days"     int   NOT NULL,
	"to_days"       int   NOT NULL
) WITH ( OIDS = FALSE );



INSERT INTO rate(distance, price) VALUES
(200, 270),
(350, 330),
(500, 390);
INSERT INTO discount(rate, from_days, to_days) VALUES
(5, 3, 5),
(10, 6, 14),
(15, 15, 30);
INSERT INTO cars(brand, model, license_plate, vin) VALUES
('rollsRoyce', 'ghost', 'TRZ18K4', 'QWE456DFG234'),
('ford', 'mustang', '6MHG583', '1FDKF37G1VEB36767'),
('chevrolet', 'camaro', '8DVBN987', '1N4FGH2355133660'),
('plymouth', 'barracuda', 'AX25780', '2G1FP22G922147195'),
('nissan', 'skyline', 'DJY5518', 'WAUDF78E86A074839');
INSERT INTO car_booking(auto_id, rate_id, start_date, end_date) VALUES
(1, 1, '2021-06-14', '2021-06-21'),
(2, 2, '2021-06-07', '2021-06-28'),
(3, 3, '2021-08-09', '2021-08-13'),
(4, 1, '2021-09-06', '2021-09-13'),
(5, 2, '2021-06-14', '2021-06-27');