import './Message.css'

const Message = ({ message, setMessage }) => {

    const displayMessage = () => {
        setTimeout(() => {
            setMessage({ text: null, type: null })
        }, 5000)
    }
    const { text, type } = message

    if (type !== null) {
        displayMessage()

        return (
            <div className={`message ${type}`}>
                {text}
            </div>
        )
    }
}

export default Message
