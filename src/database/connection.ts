import { Pool } from "pg";
import ConnectionConfig from "../configs/database-config.json";

class PGConnection {
    static pool = new Pool(ConnectionConfig);
}

export default PGConnection;
