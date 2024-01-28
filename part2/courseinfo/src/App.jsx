const Header = ({ course }) => <h1>{course}</h1>

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

const Course = ({course}) => {
    const {name, parts} = course
    return (
        <>
            <Header course={name} />
            <Content parts={parts} />
            <Total parts={parts} />
        </>
    )
}


const App = () => {
    const course = {
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
    }


    return <Course course={course} />
}

export default App
