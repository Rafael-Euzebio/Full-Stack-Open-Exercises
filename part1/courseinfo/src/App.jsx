const Header = (props) => {
    return (
        <h1>{props.name}</h1>
    )
}

const Part = (props) => {
    const part = props.part

    return (
        <>
            <p>{part.part + part.exercises}</p> 
        </>
    )
}

const Content = (props) => {
    
    return (
        <>
            <Part part={props.parts[0]}/>
            <Part part={props.parts[1]}/>
            <Part part={props.parts[2]}/>
        </>
    ) 
}

const Total = (props) => {

    const contents = props.parts
    const total = contents[0].exercises + contents[1].exercises + contents[2].exercises
    
    return(
        <>
            <p>Number of exercises {total}</p>
        </>
    )
}
const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {part: 'Fundamentals of React ', exercises: 10},
            {part: 'Using props to pass data ', exercises: 7},
            {part: 'State of a component ', exercises: 14}
        ]
    }

    return (
        <div>
            <Header name = {course.name}/>
            <Content parts = {course.parts}/>
            <Total parts = {course.parts}/>,
        </div>
    )
}

export default App
