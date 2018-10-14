const express=require('express');
const port=process.env.PORT || 3000;
const fs =require('fs');
const app=express();

const hbs=require('hbs');



hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));
hbs.registerHelper('getCurrentYear',()=>{
return new Date().getFullYear();

});




hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
  
  });

 /* app.use((req,res,next)=>{
    res.render('maintenance.hbs',{
     
      
      });
  }); */

  app.use((req,res,next)=>{
    var now =new Date().toString();
const log=`${now}: ${req.method} ${req.url}`;
fs.appendFile('server.log',log+'\n');
  next();
  });

  

app.get('/',(req,res)=>{

  res.render('home.hbs',{
    pageTitle:'home page',
    welcomeMessage:'hi wecome to the website'
   // currentYear: new Date().getFullYear()
    
    });
//res.send('<h1>hello express</h1>');

//res.send({
//name:'fadel',
//hobbies:['swimming','soccer']
//});

});

app.get('/about',(req,res)=>{
  //res.send('<h1> about page</h1>');
res.render('about.hbs',{
pageTitle:'about page'
///currentYear: new Date().getFullYear()

});
});

app.get('/projects',(req,res)=>{
  //res.send('<h1> about page</h1>');
res.render('projects.hbs',{
pageTitle:'Projects'
///currentYear: new Date().getFullYear()

});
});



app.get('/bad',(req,res)=>{
  res.send({
    errorMessage:'unable to connect'
    
    });

});
app.listen(port,()=>{

  console.log(`serveer running on port ${port}`);
})