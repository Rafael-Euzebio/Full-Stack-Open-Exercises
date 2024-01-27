import { useState } from 'react'


const Header = ({text}) => {
    return (
        <>
            <h1>{text}</h1>
        </>
    )
}

const Anecdote = ({text, votes}) => {
    return (
        <>
            <p>{text}</p>
            <p>has {votes} votes</p>
        </>
    )
}
const Button = ({ text, handleClick }) => {
    return (
            <button onClick={handleClick}>{text}</button>
    )
}
const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]

    const [selected, setSelected] = useState(0)

    const zeroFilledArray = new Array(8).fill(0)
    const [votes, setVotes] = useState(zeroFilledArray)
    const [mostVoted, setMostVoted] = useState()

    const selectRandom = () => {
        const randomValue = Math.floor(Math.random() * (anecdotes.length)) 
        setSelected(randomValue)
    }

    const registerVote = () => {
        const updatedArray = [...votes]
        updatedArray[selected] += 1
        setVotes(updatedArray)
        findMostVoted(updatedArray)
    }

    const findMostVoted = (votesArray) => {
        let index = 0
        let largest = index
        for (index; index < votesArray.length; index++) {
            if (votesArray[largest] < votesArray[index]) {
                largest = index
            }
        }
        setMostVoted(largest)

    }

    return (
        <div>
            <Header text='Anecdote of the day'/>
            <Anecdote text={anecdotes[selected]} votes={votes[selected]}/>
            <Button text='vote' handleClick={registerVote}/>
            <Button text='next anecdote' handleClick={selectRandom}/>
            <Header text='Anecdote with most votes'/>
            <Anecdote text={anecdotes[mostVoted]} votes={votes[mostVoted]} />
        </div>
    )
}

export default App
