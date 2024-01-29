const CourseHeader = ({ name }) => <h2>{name}</h2>

    const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Content = ({ parts }) => {
    return (
        <>
            {
                parts.map((part) => {
                    return(
                        <Part key={part.id} part={part} /> 
                    )
                })
            }
        </>
    )
}

const Total = ({parts}) => {
    var total = parts.reduce((sum, part) => {
        return {exercises: sum.exercises + part.exercises}
    })

    return (
        <strong>total of {total.exercises} exercises</strong>
    )
}

const Course = ({courses}) => {

    return (
        <>
            { 
            courses.map(course => {
                return (
                    <div key={course.id}>
                        <CourseHeader name={course.name} />
                        <Content parts={course.parts} />
                        <Total parts={course.parts} />
                    </div>
                )
            }) 
            }
        </>
    )
}

export default Course

