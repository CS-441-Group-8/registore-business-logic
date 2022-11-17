import { withPostGraphileContext, createPostGraphileSchema } from "postgraphile";
import PGConnection from "./connection";
import { ExecutionResult, graphql } from "graphql";
import type { GraphQLSchema } from "graphql";

interface QueryResult {
    error: string | null;
    data: any;
}

// Internal function to create a GraphQL schema
async function createGraphQLSchema(): Promise<GraphQLSchema> {
    return await createPostGraphileSchema(PGConnection.pool, ["public"]);
}

async function execGraphQLQuery(queryText: string): Promise<QueryResult> {
    const schema: GraphQLSchema = await createGraphQLSchema();
    const result: ExecutionResult = await withPostGraphileContext({ pgPool: PGConnection.pool }, async context => {
        return await graphql(schema, queryText, null, context);
    });

    if (result.errors !== undefined) {
        console.log("An error occured while executing a GraphQL query");
        console.log(result.errors);
        return {
            error: result.errors[0].message,
            data: null
        }
    }
    
    return {
        error: null,
        data: result.data
    }
}

// For complex queries!!! DO NOT USE FOR SIMPLE QUERIES
// Make sure to also clean queryText before passing it to this function, this is a SECURITY RISK!!!
async function execSQLQuery(queryText: string, placeholders: Array<any>): Promise<any> {
    // Make a PG query
    const { rows } = await PGConnection.pool.query(queryText, placeholders);
    return rows;
}

export {
    execGraphQLQuery,
    execSQLQuery,
    QueryResult
};
