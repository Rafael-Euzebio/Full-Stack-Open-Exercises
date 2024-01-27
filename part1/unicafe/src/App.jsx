import { useState } from 'react'

const Header = ({ text }) => {
    return (
        <h1>{text}</h1>
    )
}

const Button = ({ handleClick, text }) => {
    return(
        <button onClick = {handleClick}>{ text }</button>
    )
}

const Statistics = ({feedbacks}) => {

    const {good, bad, neutral, all} = feedbacks

    if (all == 0) {
        return (
            <p>No feedback given</p>
        )
    }
    else {
        const average = (good * 1 + bad * -1) / all
        const positive = (100 * good) / all

        return (
            <>
                <table>
                    <tbody>
                        <StatisticsLine text='good' value={good}/>
                        <StatisticsLine text='neutral' value={neutral}/>
                        <StatisticsLine text='bad' value={bad}/>
                        <StatisticsLine text='average' value={average}/>
                        <StatisticsLine text='positive' value={positive}/>
                    </tbody>
                </table>
            </>
        )
    }
}

const StatisticsLine = ({text, value}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}
const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [all, setAll] = useState(0)

    const setFeedback = (feedbackState, value) => () => {
        feedbackState(value + 1)
        setAll(all + 1)
    } 

    return (
        <div>
            <Header text='give feedback'/>

            <Button handleClick={setFeedback(setGood, good)} text='good' />
            <Button handleClick={setFeedback(setNeutral, neutral)} text='neutral' />
            <Button handleClick={setFeedback(setBad, bad)} text='bad' />

            <Header text='statistics' />
            
            <Statistics feedbacks = {{ 'good': good, 'neutral': neutral, 'bad': bad, 'all': all} }/>
        </div>
    )
}

export default App
