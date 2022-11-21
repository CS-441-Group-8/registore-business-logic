import { Employee } from "../employee-model";
interface EmployeeBuilder {
    build(): Employee;

    setId(id: number): EmployeeBuilder;
    setFirstName(first_name: string): EmployeeBuilder;
    setLastName(last_name: string): EmployeeBuilder;
    setPhoneNumber(phone_number: string): EmployeeBuilder;
    setEmail(email: string): EmployeeBuilder;
    setAddress(address: string): EmployeeBuilder;
    setState(state: string): EmployeeBuilder;
    setZipcode(zipcode: string): EmployeeBuilder;
    setPassword(password: string): EmployeeBuilder;
    setHireDate(hire_date: string): EmployeeBuilder;
    setStartingAmount(starting_amount: number): EmployeeBuilder;
}
class EmployeeBuilder implements EmployeeBuilder {
    private employee: Employee;
    constructor() {
        this.employee = {
            id: 0,
            first_name: "",
            last_name: "",
            phone_number: "",
            email: "",
            address: "",
            city: "",
            state: "",
            zipcode: "",
            password: "",
            hire_date: "",
            starting_amount: 0
        };
    }

    build(): Employee {
        return this.employee;
    }

    setId(id: number) {
        this.employee.id = id;
        return this;
    }
    setFirstName(first_name: string) {
        this.employee.first_name = first_name;
        return this;
    }
    setLastName(last_name: string) {
        this.employee.last_name = last_name;
        return this;
    }
    setCity(city: string) {
        this.employee.city = city;
        return this;
    }
    setPhoneNumber(phone_number: string) {
        this.employee.phone_number = phone_number;
        return this;
    }
    setEmail(email: string) {
        this.employee.email = email;
        return this;
    }
    setAddress(address: string) {
        this.employee.address = address;
        return this;
    }
    setState(state: string) {
        this.employee.state = state;
        return this;
    }
    setZipcode(zipcode: string) {
        this.employee.zipcode = zipcode;
        return this;
    }
    setPassword(password: string) {
        this.employee.password = password;
        return this;
    }
    setHireDate(hire_date: string) {
        this.employee.hire_date = hire_date;
        return this;
    }
    setStartingAmount(starting_amount: number) {
        this.employee.starting_amount = starting_amount;
        return this;
    }
}
export {
    EmployeeBuilder
};
