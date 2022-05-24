import Part from "./part"
const Content=(parts)=>{
    const y=parts.parts;
    return(
      y.map((part)=> Part(part.name, part.exercises, part.id))
  
    )
  }
export default Content