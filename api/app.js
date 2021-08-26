const express = require('express');
const app = express();

const {mongoose} = require('./db/mongoose');

app.listen(3000, () => {
    console.log('Server is listening')
})

//load in the mongoose models
const { List, Task } = require ('./db/models');

//LOAD MIDDLEWARE
app.use(express.urlencoded({extended: false})); 
app.use(express.json());

// CORS HEADER MIDDLEWARE
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/*ROUTE HANDLERS */

/*LIST ROUTES */

/**
 * GET /lists
 * Purpose: Get all lists
 */
// We want to return an array of all the lkists in the database
app.get('/lists', (req, res) => {
    List.find({}).then((lists) => {
        res.send(lists) 
    }
).
catch((e) => {
    console.log('Error in getting request');
    console.log(e)
})});

/**
 * POST /lists
 * Purpose: Create a list
 */
app.post('/lists', (req, res) => {
    // We want to create a new list and return the new list document back to  the user which includes the id
    //The list information (fields) will be passed in via the JSON request body

    let newList = new List ({
        title: req.body.title
    });

    newList.save().then((listDoc) => {
        //the full list document is returned (incl. id)
        res.send(listDoc)
    }).
    catch((error) => {
        console.log('Error in request put')
        console.log(error)
    })
})

/**
 * PATH /lists/id
 * Purpose: is to update a specified list
 */
app.patch('/lists/:id', (req, res) => {
    //We want to update the specified list(list document with id in the URL) with the new values specified in the JSON body of the request

    //->  it will update lists that it finds using ($set: req.body) condition and getting results from user request
    List.findOneAndUpdate({ _id: req.params.id}, {
        //mongodb keyword 
        $set: req.body
    }).then(() => {
        res.sendStatus(200)
    })
})

/**
 * DELETE 
 */
app.delete('/lists/:id', (req, res) => {
    //We want to delete the specified list
    List.findOneAndRemove({ _id: req.params.id})
    .then((removeListDocument) => {
        res.send(removeListDocument)
    })
})


//create route for the tasks

/**
 * GET /lists/:listId/task
 * Purpose: Get all tasks in a specific list
 */
app.get('/lists/:listId/tasks', (req, res) => {
    //we want to return all the tasks that belong to a specific lists (specified by listsId)
    Task.find({ 
        _listId: req.params.listId
    }).then((tasks) => {
        res.send(tasks)
    }).catch((e) => {
        console.log('Error in getting tasks');
        console.log(e)
    })
})

// /**
//  * GET a specific list with ID
//  */
// app.get('/lists/:listId/tasks/:taskId', (req, res) => {
//     Task.findOne({
//         _id: req.params.taskId,
//         _listId: req.params.listId
//     }).then((task) =>{
//         res.send(task)
//     })
// })

/**
 * POST /lists/:listsId/tasks
 * Purpose: 
 */
app.post('/lists/:listId/tasks', (req, res) => {
    //We want to create a new task in a list specified by listId
    //js lambda
    let newTask = new Task ({
        title: req.body.title,
        _listId: req.params.listId
    })

    newTask.save().then((newTaskDoc) => {
        res.send(newTaskDoc)
    })
    .catch((e) => {
        console.log('Error in put request');
        console.log(e);
    })

});

/**
 * PATCH /lists/:listsId/:taskId
 * Purpose: update an existing task
 */
app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
    //We want to update an existing task (specified by taskId)
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId
    }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200)
    })
})

/**
 * DELETE 
 */
app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndRemove({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((removedTaskDocument) => {
        res.send(removedTaskDocument)
    })
})