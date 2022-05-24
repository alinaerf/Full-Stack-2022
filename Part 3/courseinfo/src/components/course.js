import SubCourse from "./subcourse"
const Course = (courses)=>{
    //console.log("ALL INFO INPUT", courses)
    //console.log("2nd check",Array.isArray(courses.courses))
    const x=courses.courses;
    return(
      x.map((course)=> SubCourse(course))
    )
  }
export default Course