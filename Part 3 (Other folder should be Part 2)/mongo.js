const mongoose=require('mongoose')

if (process.argv.length<3){
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}
const password=process.argv[2]

const url=`mongodb+srv://alinaerf:${password}@cluster0.yamxkwn.mongodb.net/phonebookApp?retryWrites=true&w=majority`
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person=mongoose.model("Person", personSchema)

const displayAll = ()=>{
    Person.find({}).then(result=>{
        result.forEach(person=>{
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}

const addPerson = (personName, personNumber)=>{
    const newPerson= new Person({
        name: personName, 
        number: personNumber
    })
    newPerson.save().then(result=>{
        console.log(`added ${personName} number ${personNumber} to phonebook`)
        mongoose.connection.close()
    })
}

if (process.argv.length===3){
    displayAll()
}
else if (process.argv.length===5){
    addPerson(process.argv[3], process.argv[4])
}
