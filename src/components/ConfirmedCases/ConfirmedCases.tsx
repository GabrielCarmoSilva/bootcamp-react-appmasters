import React from "react";

interface State {
    confirmed_cases: number
}

class ConfirmedCases extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            confirmed_cases: 0
        };
    }

    componentDidMount() {
        fetch('https://covid19-brazil-api.now.sh/api/report/v1/brazil/')
            .then((response) => response.json())
            .then((json) => {
                this.setState({ confirmed_cases: json.data.confirmed });
            })
            .catch((error) => console.error(error));
    }

    render() {
        const { confirmed_cases } = this.state;
        
        return (
            <p>{confirmed_cases}</p>
        );
    }
};

export default ConfirmedCases;