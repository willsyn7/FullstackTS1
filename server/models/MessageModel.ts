import {Pool} from "pg";



const myURI = 'postgresql://postgres.wlrwtsxgmbauvnmhaedn:Potatoe123!@aws-1-us-east-1.pooler.supabase.com:6543/postgres';


 const URI = process.env.PG_URI || myURI;
 
 const pool = new Pool({
    connectionString : URI

 })

 const checkDatabaseConnection = async () => {
    try{
        await pool.query(`SELECT NOW()`)
        console.log(`Sucessfully established DB`)
            
    }catch(error){
        console.log(`Error whiel Db conenction`,error);
    }

 }
 



export  {pool,checkDatabaseConnection}; 
