const express = require('express');
const router = express.Router();

let employeelist = [];

router.post('/',(req,res)=>{
    const {name, email,role} = req.body;
    if(!name || !email || !role){
        return res.status(400).json({error: 'Field is required'});
    }
    const newemployee = {id: Date.now(), name, email, role};
    employeelist.push(newemployee);
   res.status(201).json(newemployee);
});

router.get('/', (req,res)=>{
    res.json(employeelist);
})

router.put('/:id', (req,res)=>{
    const id = parseInt(req.params.id);
    const {role} = req.body;
    if(!role) return res.status(400).json({error: 'Role required'});
    const employee = employeelist.find(employee => employee.id === id);
    if(!employee) return res.status(404).json({error: 'Employee not found'});
    employee.role = role;
    res.json({message: 'role updated', employee});
})

router.delete('/:id', (req,res)=>{
    const id = parseInt(req.params.id);
    employeelist = employeelist.filter(employee => employee.id !== id);
    res.json({message: 'Deleted'});
});

module.exports = router;