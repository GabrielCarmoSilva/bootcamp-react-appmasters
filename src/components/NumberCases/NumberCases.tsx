import React from "react";

interface State {
    cases: number
}

class NumberCases extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            cases: 0
        };
    }

    componentDidMount() {
        fetch('https://covid19-brazil-api.now.sh/api/report/v1/brazil/')
            .then((response) => response.json())
            .then((json) => {
                this.setState({ cases: json.data.cases });
            })
            .catch((error) => console.error(error));
    }

    render() {
        const { cases } = this.state;

        return (
            <p>{cases}</p>
        )
    }
};

export default NumberCases;