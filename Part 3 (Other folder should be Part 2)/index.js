require('dotenv').config()
const { response, request } = require('express')
const express=require('express')
var morgan=require('morgan')
const cors=require('cors')
const app=express()
const Person=require('./models/person')
morgan.token('body', request=>{
    return JSON.stringify(request.body)    
})

app.use(express.json())
app.use(morgan(':method :url :status :response-time ms :body'))
app.use(cors())
app.use(express.static('build'))

app.get('/api/persons', (request, response)=>{
    Person.find({}).then(persons=>{
        response.json(persons)
    })
})

app.get('/info', (request, response)=>{
    var query=Person.find()
    query.count(function(err, count){
        if (err){
            console.log(err)
        }
        else{
            response.send(
                `<div> Phonebook has information about ${count} people. </div>
                <div>${new Date()}</div>` )
        }
    })
})

app.get('/api/persons/:id',(request, response)=>{
    Person.findById(request.params.id).then(person=>{
        if (person){
            response.json(person)
        } else{
            response.status(404).end()
        }
    }).catch(error=>{
        console.log(error)
        response.status(400).send({error:'malformatted id'})
    })
})

app.delete('/api/persons/:id', (request, response,next)=>{
    Person.findByIdAndRemove(request.params.id)
    .then(result=>{
        response.status(204).end()
    })
    .catch(error=>{
        next(error)
    })
})



app.post('/api/persons', (request,response, next)=>{
    const body=request.body
    if (!body.name || !body.number){
        console.log(body)
        return response.status(400).json({
            error:'name or number are missing'
    })}
    if (Person.exists({name: body.name})){
        console.log("Found!")
    }
    const person= new Person({
        name:body.name,
        number: body.number
    })
    person.save().then(savedPerson=>{
        response.json(savedPerson)
    })
    .catch(error=>{
        next(error)
    })
    
})

app.put('/api/persons/:id', (request,response, next)=>{
    const body=request.body
    const person= {
        number:body.number
    }
    Person.findByIdAndUpdate(request.params.id, person, {new:true, runValidators: true, context: 'query'})
    .then(updatedPerson=>{
        response.json(updatedPerson)
    })
    .catch(error=>{
        next(error)
    })

})

const errorHandler=(error,request, response,next)=>{
    console.log(error.message)
    if (error.name==='CastError'){
        return response.status(400).send({error:'malformatted id'})
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })}
    next(error)
}
app.use(errorHandler)
const PORT=process.env.PORT || 3001
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
