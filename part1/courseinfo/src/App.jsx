const Header = () => {
    const course = 'Half Stack application development'
    return (
        <h1>{course}</h1>
    )
}

const Content = (props) => {
    
    const contentsElements = [];

    props.contents.forEach(element => {
        contentsElements.push(
            <p key={element.part}>{element.part + element.exercises}</p>
        );
    });

    return (
        <>
            {contentsElements}
        </>
    ) 
}

const Total = (props) => {

    let total = 0;
    
    props.contents.forEach(element => {
        total = total + element.exercises 
    });

    return(
        <>
            <p>Number of exercises {total}</p>
        </>
    )
}
const App = () => {
    const contents = [{part: 'Fundamentals of React ', exercises: 10}, {part: 'Using props to pass data ', exercises: 7}, {part: 'State of a component ', exercises: 14}]

    return (
        <div>
            <Header/>
            <Content contents = {contents}/>
            <Total contents = {contents}/>,
        </div>
    )
}

export default App
