const express = require('express');
const shortid = require('shortid');
const { restart } = require('nodemon');
const { generate } = require('shortid');
const server = express();
server.use(express.json());



const PORT = 5000;

server.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});

const users = [
{
    id: shortid.generate(), // hint: use the shortid npm package to generate it
    name: "Jane Doe", // String, required
    bio: "Not Tarzan's Wife, another Jane",  // String, required
  }
];

// create

server.post('/api/users', (req, res) => {
        const {name,bio}=res.body;
        if(!name||!bio){
            res.status(400).json({
                errorMessage: "Please provide name and bio for the user."
            })
        }else{
            const newUser = {id: shortid.generate(), name ,bio};
            users.push(newUser);
        }
    })

// get

server.get('/api/users',(req,res)=>{
    res.status(200).json(users)
})

server.get('/api/users/:id', (req,res)=>{
    const {id} = req.params;
    const user = users.find((user)=> user.id === id);
    if(!user){
        res.status(404).json({
            message:`no user with id ${id}`,
        })
    }else{
        restart.status(200).json(user);
    }
})

// put(update)

server.put('/api/users/:id',(req, res)=>{
    const {id} = req.params;
    const {name, bio}= req.body;

    const index = users.findIndex((user)=> user.id === id);
    if(index !== -1){
        users[index]={id, name, bio};
        res.status(200).json({id,name,bio});
    }else{
        res.status(404).json({
            message: `no user with id ${id}`
        })
    }

})

// delete

server.delete('/api/users/:id', (req, res)=>{
    const {id} = req.params;
    const  deleted = users.find(user => user.id === id);

    if (deleted) {
        users = userss.filter(user => user.id  !== id);
        res.status(200).json(deleted);
    } else{
        res.status(404).json({message: 'id not found'});
    }
});

