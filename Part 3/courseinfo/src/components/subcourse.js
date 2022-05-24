import Header from "./header"
import Content from "./content"
import Total from "./total"
const SubCourse = (course)=>{
    const id=course.id;
    return(
      <div key={id}>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )
  }
export default SubCourse