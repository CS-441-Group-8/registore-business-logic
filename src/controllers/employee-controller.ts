import { execGraphQLQuery, QueryResult } from "../database/query-runner";
import { Employee } from "../models/employee-model";

namespace Constants {
    export const allNodes = `
        id
        first_name: firstName
        last_name: lastName
        phone_number: phoneNumber
        email
        address
        city
        state
        zipcode
        password
        hire_date: hireDate
        starting_amount: startingAmount
        styling
    `
}

namespace EmployeeController {
    // CREATE FUNCTIONS
    export async function createNewEmployee(employee: Employee): Promise<QueryResult> {
        const graphQuery = `mutation {
            createEmployee (
              input: {
                employee:{
                    firstName: "${employee.first_name}" 
                    lastName: "${employee.last_name}" 
                    phoneNumber: "${employee.phone_number}" 
                    email: "${employee.email}" 
                    address: "${employee.address}" 
                    city: "${employee.city}" 
                    state: "${employee.state}" 
                    zipcode: "${employee.zipcode}" 
                    password: "${employee.password}" 
                    hireDate: "${employee.hire_date}" 
                    startingAmount: ${employee.starting_amount}
                    styling: ${employee.styling}
                }
              }) {
              employee {
                id
              }
            }
          }`;

        const queryResult = await execGraphQLQuery(graphQuery);
        
        if (queryResult.error !== null) {
            return {
                error: queryResult.error,
                data: null
            }
        }
        
        const id = queryResult.data.createEmployee.employee.id;
       
        return {
            error: null,
            data: id
        }
    }
        // READ FUNCTIONS
        export async function getEmployee(employeeId: number): Promise<QueryResult> {
            const graphQuery = `query {
                employeeById(
                    id: "${employeeId}" ) {
                    ${Constants.allNodes}
                }
            }`;

            const queryResult = await execGraphQLQuery(graphQuery);
            
            if (queryResult.error !== null) {
                return {
                    error: queryResult.error,
                    data: null
                }
            }
    
            const employee = queryResult.data.employeeById;
    
            return {
                error: null,
                data: employee
            }
        }

        export async function getAllEmployees(): Promise<QueryResult> {
            const graphQuery = `query {
                allEmployees {
                    edges {
                        node {
                            ${Constants.allNodes}
                        }
                    }
                }
            }`;

            const queryResult = await execGraphQLQuery(graphQuery);
            if (queryResult.error !== null) {
                return {
                    error: queryResult.error,
                    data: null
                }
            }

            let employees: Array<Employee> = [];
            queryResult.data.allEmployees.edges.forEach((edge: any) => {
                employees.push(edge.node);
            });

            return {
                error: null,
                data: employees
            }
        }
    
           // UPDATE FUNCTIONS
    export async function updateEmployee(employeeId: number, first_name: string, last_name: string, phone_number: string, email: string, address: string, city: string, state: string, zipcode: string, password: string, hire_date: string, starting_amount: number, styling : string): Promise<QueryResult> {
        const graphQuery = `mutation {
            updateEmployeeById( 
                input: {
                    id: "${employeeId}",
                        employeePatch: {
                            firstName: "${first_name}",
                            lastName: "${last_name}",
                            phoneNumber: "${phone_number}",
                            email: "${email}",
                            address: "${address}",
                            city: "${city}",
                            state: "${state}",
                            zipcode: "${zipcode}",
                            password: "${password}",
                            hireDate: "${hire_date}",
                            startingAmount: ${starting_amount}",
                            styling: ${styling}
                }
            }) {
                employee {
                    id
                    firstName
                    lastName
                    phoneNumber
                    email
                    address
                    city
                    state
                    zipcode
                    password
                    hireDate
                    startingAmount
                }
            }
        }`;
        
      const queryResult = await execGraphQLQuery(graphQuery);

if (queryResult.error !== null) {
    return {
        error: queryResult.error,
        data: null
    }
}

const id = queryResult.data.createEmployee.employee.id;

return {
    error: null,
    data: id
    }
}
    // DELETE FUNCTIONS
    export async function deleteEmployee(employeeId: number): Promise<QueryResult> {
        const graphQuery = `mutation {
            deleteEmployeeById(
                input: {
                    id: "${employeeId}"
            }) {
                employee {
                    id
                }
            }
        }`;

        const queryResult = await execGraphQLQuery(graphQuery);

        if (queryResult.error !== null) {
            return {
                error: queryResult.error,
                data: null
            }
        }

        return {
            error: null,
            data: employeeId // Return the ID of the deleted employee
        }
    }
}
export default EmployeeController;