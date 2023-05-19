const router = require('express').Router()
const uuid = require("uuid")
// transform from API to ejs template
const members = [
    { id: uuid.v4(), name: "Peach", email: "Peach@mail.com" },
    { id: uuid.v4(), name: "Mario", email: "mario@mail.com" },
    { id: uuid.v4(), name: "Luigi", email: "luigi@mail.com" },
    { id: uuid.v4(), name: "Yoshi", email: "yoshi@mail.com" },
]
let member = members;
router.get('/add-new', (req,res) => {
    res.render('addNewMember')
})

router.post('/add-new-member', (req,res) => {
    const newData = {
        id: uuid.v4(),
        name: req.body.name,         
        email: req.body.email     
    }
    members.push(newData)
    res.redirect('/api/members') 
})

router.get('/search', (req, res) => {
    const paramsID = req.query.id;
    const found = members.some(member => member.id === paramsID);
    
    if (found) {
        member = members.filter(member => member.id === paramsID);
    } else {
        member = members;
    }
    res.render('index', { member });
});

router.get('/', (req, res) => res.render('index', { member }))

module.exports = router