import React, {useState} from 'react'
import './style.css'

function submitForm(state){
    fetch('/api/admin/addquestion', {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            question: state.question,
            answer: state.answer,
            region: state.region,
            level: state.level,
            keywords: state.keywords
        })
    }).then(resp => resp.json())
    .then(data => {
        console.log(data)
    })
}

const AddQuestion = () => {
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [level, setLevel] = useState(0)
    const [region, setRegion] = useState(0)
    const [keywords, setKeyword] = useState([])
    const [tempkeyword, setTempKeyword] = useState('')
    const [alert, setAlert] = useState('')

    return (
        <div>
            
            <div >
                <input type="text" placeholder="Enter Question" onChange={(event) => setQuestion(event.target.value)} />
            </div>
            <div >
                <input type="text" placeholder="Enter Answer" onChange={(event) => setAnswer(event.target.value)} />
            </div>
            <div >
                <input type="text" placeholder="Enter Region, between [0, 4]" onChange={(event) => setRegion(parseInt(event.target.value))} />
            </div>
            <div>
                <input type="text" placeholder="Enter Level, between [1,15]" onChange={(event) => setLevel(parseInt(event.target.value))} />
            </div>
            Current Keywords are: <br/>
            {
                keywords.map((value) => {
                    return (
                        <div key={value}>
                            {value}
                        </div>
                    )
                })
            }

            <input type="text" placeholder="Enter new keyword, restrict to maximum 3" onChange={(event) => setTempKeyword(event.target.value)} />
            <button key={"addkeyword"} onClick={() => {
                console.log("I got Clicked!")
                setKeyword([...keywords, tempkeyword])
                setTempKeyword('')
            }}>Add Keyword</button>
            
            <br />
            <button onClick={() => {submitForm({question:question, answer:answer, level:level, region:region, keywords: keywords}); setKeyword([])}}>Add Question</button>

        </div>
    )
}

export default AddQuestion