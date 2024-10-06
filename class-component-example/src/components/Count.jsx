import { Component } from "react";

export class Count extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                <p>{this.props.count}</p>
            </>
        )
    }
}