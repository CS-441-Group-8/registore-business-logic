/*
create table employee (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	phone_number VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	address VARCHAR(50) NOT NULL,
	city VARCHAR(50) NOT NULL,
	state VARCHAR(50) NOT NULL,
	zipcode VARCHAR(50) NOT NULL,
	password VARCHAR(64) NOT NULL,
	hire_date DATE NOT NULL,
	starting_amount FLOAT NOT NULL
    styling
);
*/


interface EmployeeSchema {
    id: number;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
    password: string;
    hire_date: string;
    starting_amount: number;
    styling: string;
}

export {EmployeeSchema};
