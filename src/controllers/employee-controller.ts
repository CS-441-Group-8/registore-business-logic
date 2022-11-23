import { execGraphQLQuery, QueryResult } from "../database/query-runner";
import { Employee } from "../models/employee-model";

namespace EmployeeController {
    // CREATE FUNCTIONS
    export async function createNewEmployee(employee: Employee): Promise<QueryResult> {
        const graphQuery = `mutation {
            createNewEmployee (
              input: {
                employee:{
                    id: "${employee.id}" 
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
                    startingAmount: ${employee.starting_amount}}
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
                EmployeeById(id: "${employeeId}") {
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
            `;
            const queryResult = await execGraphQLQuery(graphQuery);
            if (queryResult.error !== null) {
                return {
                    error: queryResult.error,
                    data: null
                }
            }
    
    
            const transaction = queryResult.data.transactionById;
    
            return {
                error: null,
                data: transaction
            }
        }
    
           // UPDATE FUNCTIONS
    export async function updateEmployee(employeeId: number, first_name: string, last_name: string, phone_number: string, email: string, address: string, city: string, state: string, zipcode: string, password: string, hire_date: string, starting_amount: number): Promise<QueryResult> {
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
                            startingAmount: "${starting_amount}"
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

const sku = queryResult.data.createProduct.product.sku;
return {
    error: null,
    data: sku
    }
}
    // DELETE FUNCTIONS
    export async function deleteEmployee(employeeId: number): Promise<QueryResult> {
        const graphQuery = `mutation {
            deleteEmployeeById(input: {
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