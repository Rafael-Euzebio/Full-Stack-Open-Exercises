const Header = ({ text }) => <h1>{text}</h1>

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


const App = () => {
    const courses = [
        { 
            id: 1,
            name: 'Half Stack application development',
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2
                },
                {
                    name: 'State of a component',
                    exercises: 14,
                    id: 3
                }
            ] 
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]


    return (
        <>
            <Header text='Web Development Curriculum' />
            <Course courses={courses} />
        </>
    )
}

export default App
