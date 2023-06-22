const express = require("express")
const requestIp = require("request-ip")
const { redirect } = require("express/lib/response")
const app = express()
const rateLimit = require('express-rate-limit')
const mongoose = require("mongoose")
app.set('view engine', 'ejs')
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
const apiLimiter = rateLimit({
	windowMs: 5 * 60 * 1000, 
	max: 10, 
	standardHeaders: true, 
	legacyHeaders: false,
  message: 'This resource is being rate limited.',
  handler: (request, response, next, options) =>
	  response.render('code-display', {code:   options.message}),
    
  
  
  
})
app.use('/save', apiLimiter)
app.set('trust proxy', 1)
const code = `Welcome to OriginPastes


Create a new paste using the menu at the top.

 


 
OriginPastes developed by pixel




@@@@@@@@@@@@@@@@@@((((((((((((@@@@@@@@@@@@@@@@@@@@@@@@#((((((((((((((((((@@@@@@@
@@@@@@@@@@@@@#((((((((((((((((((((@@@@@@@@@@@@@((((((((((((((((((((((((((((((@@@
@@@@@@@@@@#((((((((((((((((((((((((((@@@@@@@@@@@@((((((((((((((@@@@((((((((((((@
@@@@@@@%(((((((((((@@@@@@@@(((((((((((@@@@@@@@@@@@#((((((((((((@@@@@&(((((((((((
@@@@@&(((((((((((@@@@@@@@@@&(((((((((((&@@@@@@@@@@#((((((((((((@@@@@@(((((((((((
@@@@(((((((((((@@@@@@@@@@@@@#(((((((((((@@@@@@@@@@#(((((((((((@@@@@@@(((((((((((
@@@((((((((((((@@@@@@@@@@@@@#((((((((((((@@@@@@@@&(((((((((((@@@@@@@%(((((((((((
@@#(((((((((((@@@@@@@@@@@@@@#((((((((((((@@@@@@@@((((((((((((@@@@@@&((((((((((((
@#(((((((((((@@@@@@@@@@@@@@@#((((((((((((@@@@@@@@(((((((((((@@@@@@@((((((((((((@
@((((((((((((@@@@@@@@@@@@@@@#((((((((((((@@@@@@@(((((((((((@@@@@&((((((((((((@@@
((((((((((((@@@@@@@@@@@@@@@&(((((((((((((@@@@@@#((((((((((((((((((((((((((((@@@@
((((((((((((@@@@@@@@@@@@@@@&((((((((((((@@@@@@@(((((((((((((((((((((((((@@@@@@@@
((((((((((((@@@@@@@@@@@@@@@%(((((((((((@@@@@@@%(((((((((((@@@@@@@@@@@@@@@@@@@@@@
((((((((((((@@@@@@@@@@@@@@@(((((((((((@@@@@@@@#((((((((((@@@@@@@@@@@@@@@@@@@@@@@
((((((((((((@@@@@@@@@@@@@@(((((((((((@@@@@@@@&(((((((((((@@@@@@@@@@@@@@@@@@@@@@@
@(((((((((((@@@@@@@@@@@@@#(((((((((((@@@@@@@@(((((((((((@@@@@@@@@@@@@@@@@@@@@@@@
@&(((((((((((@@@@@@@@@@@%(((((((((@@@@@@@@@@(((((((((((@@@@@@@@@@@@@@@@@@@@@@@@@
@@&(((((((((((@@@@@@@&(((((((((((@@@@@@@@@@@(((((((((((@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@((((((((((((((((((((((((((@@@@@@@@@@@@@#(((((((((((@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@((((((((((((((((((((@@@@@@@@@@@@@@@@#(((((((((((@@@@@@@@@@@@@@@@@@@@@@@@@`
const Document = require('./models/Document')

mongoose.connect('mongodb+srv://PixelatedWarrior:ViHbXgoaY3N6KlA4@cluster0.uz4ug.mongodb.net/OriginPastes?retryWrites=true&w=majority', {useUnifiedTopology: true})
app.get("/", (req, res) => {
  res.render("code-display", {code})  
})

app.get('/new', (req, res) => {
    res.render('new')
})
app.post("/save", async (req, res) => {
    
    const value = req.body.value;
    var ip = requestIp.getClientIp(req);
    try {
        
        const document = await Document.create({ value, ip })
        res.redirect(`/${document.id}`)
        
    } catch (e) {
        res.redirect('/new')
    }
})
app.get("/:id", async (req, res) => {
    
    const id = req.params.id
    try {
        const document = await Document.findById(id)

        res.render("document-display", { code: document.value, id})
    } catch (e) {
        res.redirect("/")
    }
})
app.get("/:id/raw", async (req, res) => {
    
    const id = req.params.id
    try {
        const document = await Document.findById(id)

        res.type('text/plain').send(document.value);
    } catch (e) {
        res.redirect('/')
    }
})
app.get("/:id/raw/download", async (req, res) => {
    
    const id = req.params.id
    try {
        const document = await Document.findById(id)

        res.setHeader('Content-type', "application/octet-stream");

        res.setHeader('Content-disposition', 'attachment; filename=file.txt');

        res.send(document.value);
    } catch (e) {
        res.redirect('/')
    }
})
app.use(function(req, res, next){
    res.status(404);
  
    
  
    res.redirect('/')
});



app.listen(process.env.PORT || 3000)
