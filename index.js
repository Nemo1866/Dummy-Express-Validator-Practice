//Hello My Name is Naeem Khan
const express=require("express")
const {body,validationResult}=require("express-validator")
const app=express()

let posts=[]

app.use(express.json())

app.get("/",(req,res)=>{
    res.send(posts)
})

app.post("/",
    body('username').isEmail().normalizeEmail(),
    // password must be at least 5 chars long
    body("password").isLength({min:5}).withMessage("Password Must be atleast 5 characters").matches(/[0-9]/).withMessage("Provide a number").matches(/[a-z]/).withMessage("Provide a small case").matches(/[A-Z]/).withMessage("Provide a Upper case").matches(/[!@#$%^&*]/).withMessage("Provide a special Character"),
    (req, res) => {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      console.log(errors);
      if (!errors.isEmpty()) {
        

        return res.status(400).json({ errors: errors.array() });
        
      }
      let post={username:req.body.username,password:req.body.password}
      posts.push(post)
      res.send("Created")
    }
)


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})
