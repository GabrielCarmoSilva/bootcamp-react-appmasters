import React from "react";

interface State {
    recovered_cases: number
}

class RecoveredCases extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            recovered_cases: 0
        };
    }

    componentDidMount() {
        fetch('https://covid19-brazil-api.now.sh/api/report/v1/brazil/')
            .then((response) => response.json())
            .then((json) => {
                this.setState({ recovered_cases: json.data.recovered });
            })
            .catch((error) => console.error(error));
    }

    render() {
        const { recovered_cases } = this.state;
        
        return (
            <p>{recovered_cases}</p>
        )
    }
};

export default RecoveredCases;