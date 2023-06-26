const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app=express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});


app.post("/",function(req,res){
    const firstName=req.body.fname;
    const LastName=req.body.lname;
    const email=req.body.email;
    const data={
        members : [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: LastName
                }
            }
        ]

    };

    const jsonData= JSON.stringify(data);  
    const url = "https://us17.api.mailchimp.com/3.0/lists/b1bf255803"
    const options = {
        method: "POST",
        auth: "charanjose:5b52e32cf4b3d9ecffdcd8ba461d2504-us17"
    }
    const request = https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname + "/success.html");
        }
        else
        {
            res.sendFile(__dirname + "/failure.html");
        }
      response.on("data",function(data){
        console.log(JSON.parse(data));
      })
    })
     
    request.write(jsonData);
    request.end();

});

app.post("/failure",function(req,res){
    res.redirect("/");
})
app.listen(process.env.PORT || 3000,function(){
    console.log(" 123 started in port 3000");
});


// Api key : edb803621f3d53f068d15a42299e0beb-us17

// audience id : b1bf255803

// url : "https://us17



// .api.mailchimp.com/3.0/lists/"
