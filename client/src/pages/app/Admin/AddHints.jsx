import React from 'react'

class AddHints extends React.Component {
    constructor(){
        super()
        this.state = {
            'region': 0,
            'level': 0,
            'hint': ''
        }
        this.addHint = this.addHint.bind(this)
        this.addHiddenHint = this.addHiddenHint.bind(this)
    }

    addHint(){
        fetch('/api/admin/addhint', {
            method: 'post',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                region: this.state.region,
                level: this.state.level,
                hint: this.state.hint
            })
        }).then(resp => resp.json)
        .then(data => console.log(data))
    }

    addHiddenHint(){
        fetch('/api/admin/hiddenhint', {
            method: 'post',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                region: this.state.region,
                level: this.state.level,
                hint: this.state.hint
            })
        }).then(resp => resp.json)
        .then(data => console.log(data))
    }

    render(){
        return (
            <div>
                <div className="">
                    <input type="text" placeholder="Enter Hint" onChange={(event) => this.setState({hint:event.target.value})} />
                </div>
                <div className="">
                    <input type="text" placeholder="Enter Region, between [0, 4]" onChange={(event) => this.setState({region: parseInt(event.target.value)})} />
                </div>
                <div>
                    <input type="text" placeholder="Enter Level, between [1,15]" onChange={(event) => this.setState({level: parseInt(event.target.value)})} />
                </div>

                <button onClick={()=>this.addHint()}>Add Hint</button>
                <button onClick={()=>this.addHiddenHint()}>Add Hidden Hint</button>

            </div>
        )
    }
}

export default AddHints