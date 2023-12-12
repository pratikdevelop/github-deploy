import express from 'express'
import { createClient } from '@supabase/supabase-js'
const app = express();
const PORT = 4000;
const supabaseUrl = 'https://jimgjhrxwaihcnqltwer.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppbWdqaHJ4d2FpaGNucWx0d2VyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA2MTkzMTIsImV4cCI6MjAwNjE5NTMxMn0.rXg-6bRy4s3NVzmMmepQKjXUKOprI4GvuuPVwGff0Hk"
const supabase = createClient(supabaseUrl, supabaseKey, {
    client: {
        auth: {
            persistSession: false //or true
        }
    }
})
app.get("/",async(req,res)=>{
    try {
        const user = await supabase.auth.admin();
        res.send(user)
    } catch (error) {
        console.error('auth api failed error: ', error);
    }
});
app.listen(PORT, ()=>{
    console.log(`port listening on http://localhost:${PORT}`);
})