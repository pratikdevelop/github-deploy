const express = require('express')
const app = express();
const PORT = 4000;
app.get("/",(req,res)=>{
    res.send("test data")
});
app.listen(PORT, ()=>{
    console.log(`port listening on http://localhost:${PORT}`);
})