import React from "react";

interface State {
    number_deaths: number
}

class NumberDeaths extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            number_deaths: 0
        };
    }

    componentDidMount() {
        fetch('https://covid19-brazil-api.now.sh/api/report/v1/brazil/')
            .then((response) => response.json())
            .then((json) => {
                this.setState({ number_deaths: json.data.deaths })
            })
            .catch((error) => console.error(error));
    }

    render() {
        const { number_deaths } = this.state;

        return (
            <p>{number_deaths}</p>
        );
    }
};

export default NumberDeaths;