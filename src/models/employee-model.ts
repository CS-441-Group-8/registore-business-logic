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
);
*/
import { EmployeeSchema } from "./schemas/employee-schema";

class Employee implements EmployeeSchema {
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

	// Constructor will take a EmployeeSchema object and assign it to the class
	constructor(employee: EmployeeSchema) {
        this.id = employee.id;
        this.first_name = employee.first_name;
        this.last_name = employee.last_name;
        this.phone_number = employee.phone_number;
        this.email = employee.email;
        this.address = employee.address;
        this.city = employee.city;
        this.state = employee.state;
        this.zipcode = employee.zipcode;
        this.password = employee.password;
        this.hire_date = employee.hire_date;
        this.starting_amount = employee.starting_amount;
        this.styling = employee.styling;
	}
}

export {
    Employee,
    EmployeeSchema
}