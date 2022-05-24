const Total =(parts)=>{
    const z=parts.parts;
    return(
      <b> Total of {z.reduce((sum, part)=>{
        return sum+part.exercises
      },0)} exercises</b>
    )
  }
export default Total