const express = require("express")

const { redirect } = require("express/lib/response")
const app = express()
const mongoose = require("mongoose")
app.set('view engine', 'ejs')
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))

const code = `Welcome to OriginPastes


Create a new paste using the menu at the top right corner.

 


 
OriginPastes developed by pixel and boredom



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
mongoose.connect("mongodb+srv://PixelatedWarrior:ViHbXgoaY3N6KlA4@cluster0.uz4ug.mongodb.net/OriginPastes?retryWrites=true&w=majority", {useUnifiedTopology: true})
app.get("/", (req, res) => {
  res.render("code-display", {code})  
})
app.get('/new', (req, res) => {
    res.render('new')
})
app.post("/save", async (req, res) => {
    
    const value = req.body.value;
    
    try {
        const document = await Document.create({ value })
        res.redirect(`/${document.id}`)
    } catch (e) {
        console.log(e)
    }
})
app.get("/:id", async (req, res) => {
    
    const id = req.params.id
    try {
        const document = await Document.findById(id)

        res.render("document-display", { code: document.value, id, documentId: id})
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