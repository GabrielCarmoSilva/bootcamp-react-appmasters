import React, { useState } from "react";
// react plugin for creating charts
import ChartistGraph from 'react-chartist';
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import Table from "../../components/Table/Table";
import Tasks from "../../components/Tasks/Tasks";
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import Danger from "../../components/Typography/Danger";
import Card from "../../components/Card/Card";
import Button from "../../components/CustomButtons/Button";
import CardHeader from "../../components/Card/CardHeader";
import CardIcon from "../../components/Card/CardIcon";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import NumberCases from "../../components/NumberCases/NumberCases";
import RecoveredCases from "../../components/RecoveredCases/RecoveredCases";
import NumberDeaths from "../../components/NumberDeaths/NumberDeaths";
import ConfirmedCases from "../../components/ConfirmedCases/ConfirmedCases";
import CardDash from "../../components/CardDash/CardDash";

import { bugs, website, server } from "../../variables/general";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "../../variables/charts";

import dashboardStyle from "../../assets/jss/material-dashboard-react/views/dashboardStyle";

interface Props {
  classes: any;
}

interface State {
  value: number;
  data: DataResponse[];
  countries_data: DataCountries[];
  query: string;
  date_query: string;
  state_data: DataResponse;
  time_data: DataResponse[];
}

interface DataResponse {
  uid: number;
  uf: string;
  state: string;
  cases: number;
  deaths: number;
  suspects: number;
  refuses: number;
  datetime: string | Date;
}

interface DataCountries {
  country: string;
  cases: number;
  confirmed: number;
  deaths: number;
  recovered: number;
  updated_at: string | Date;
}

class Dashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: 0,
      data: [],
      countries_data: [],
      state_data: {
        uid: 0,
        uf: "",
        datetime: "",
        state: "",
        cases: 0,
        deaths: 0,
        suspects: 0,
        refuses: 0,
      },
      query: "",
      date_query: "",
      time_data: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
  }

  componentDidMount = async() => {
    const response = (await fetch(
      "https://covid19-brazil-api.now.sh/api/report/v1"
    ).then((res) => res.json())) as { data: DataResponse[] };
    const countriesResponse = (await fetch(
      "https://covid19-brazil-api.now.sh/api/report/v1/countries"
    ).then((res) => res.json())) as { data: DataCountries[] };
    const initialState = (await fetch(
      "https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/mg"
    ).then((res) => res.json())) as DataResponse;  
    this.setState({ data: response.data, countries_data: countriesResponse.data, 
      state_data: initialState });
  };

  handleChange = (event: any, value: number) => {
    this.setState({ value });
  };

  handleChangeIndex = (index: number) => {
    this.setState({ value: index });
  };

  handleSubmit = async () => {
    const response = (await fetch(
      `https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${
        this.state.query
      }`
    ).then((res) => res.json())) as DataResponse;
    this.setState({ state_data: response });
  }

  handleSubmitDate = async () => {
    const [day, month] = this.state.date_query.split('/'); 
    const response = (await fetch(
      `https://covid19-brazil-api.now.sh/api/report/v1/brazil/2020${
          month + day
      }`
    ).then((res) => res.json())) as { data: DataResponse[] };
    console.log(`https://covid19-brazil-api.now.sh/api/report/v1/brazil/2020${
      month + day
  }`);
    this.setState({ time_data: response.data })   
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <CardDash
              classes={classes}
              icon={<Store />}
              title="Confirmados"
              subtitle="Brasil"
              value={<ConfirmedCases />}
              type="warning"
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
          <CardDash
              classes={classes}
              icon={<Accessibility />}
              title="Curados"
              subtitle="Brasil"
              value={<RecoveredCases />}
              type="info"
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
          <CardDash
              classes={classes}
              icon={<Icon>info_outline</Icon>}
              title="Mortes"
              subtitle="Brasil"
              value={<NumberDeaths />}
              type="danger"
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
          <CardDash
              classes={classes}
              icon={<Icon>info_outline</Icon>}
              title="Casos"
              subtitle="Brasil"
              value={<NumberCases />}
              type="primary"
            />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card chart={true}>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={{ 
                    labels: this.state.data.map((item) => item.uf),
                    series: [this.state.data.map((item) => item.cases)],
                  }}
                  type="Line"
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Número de casos por estado</h4>
              </CardBody>
              <CardFooter chart={true}>
                <div className={classes.stats}>
                  <AccessTime /> Atualizado hoje
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Card chart={true}>
              <CardHeader color="warning">
                <ChartistGraph
                  className="ct-chart"
                  data={{
                    labels: this.state.countries_data.sort((a,b) => b.deaths - a.deaths).slice(0, 15).map((item) => item.country),
                    series: [this.state.countries_data.sort((a,b) => b.deaths - a.deaths).slice(0, 15).map((item) => item.deaths)],
                  }}
                  type="Line"
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Número de mortes por país</h4>

              </CardBody>
              <CardFooter chart={true}>
                <div className={classes.stats}>
                  <AccessTime /> Atualizado hoje
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <div style={{ padding: 30 }}> 
          <input
            value={this.state.date_query}
            onChange={(e) => this.setState({ date_query: e.target.value })}
            placeholder="Digite a data (dd/mm)"
          />
          <Button color="info" onClick={() => this.handleSubmitDate()}>
            Enviar  
          </Button>  
        </div>
          <GridItem xs={12} sm={12} md={12}>
            <Card chart={true}>
              <CardHeader color="danger">
                <ChartistGraph
                  className="ct-chart"
                  data={{
                    labels: this.state.time_data.map((item) => item.uf),
                    series: [this.state.time_data.map((item) => item.cases)]
                  }}
                  type="Bar"
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Número de casos por estado</h4>
                <p className={classes.cardCategory}>
                  {this.state.date_query}
                </p>
              </CardBody>
              <CardFooter chart={true}>
                <div className={classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
                <p className={classes.cardCategoryWhite}>
                  New employees on 15th September, 2016
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["UF", "Estado", "Casos", "Mortes", "Suspeitos"]}
                  tableData={this.state.data.slice(0, 5).map((item) => {
                    return [
                      item.uf,
                      item.state,
                      item.cases,
                      item.deaths,
                      item.suspects
                    ];
                  })}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <div style={{ padding: 30 }}> 
          <input
            value={this.state.query}
            onChange={(e) => this.setState({ query: e.target.value })}
            placeholder="Digite a UF"
          />
          <Button color="info" onClick={() => this.handleSubmit()}>
            Enviar  
          </Button>  
        </div>
        <GridContainer>
           <GridItem xs={12} sm={6} md={3}>
            <CardDash
              classes={classes}
              type="warning"
              icon={<Store />}
              title="Casos"
              subtitle={this.state.state_data.uf}
              value={this.state.state_data.cases}
            />
          </GridItem>
           <GridItem xs={12} sm={6} md={3}>
            <CardDash
              classes={classes}
              type="danger"
              icon={<Icon>info_outline</Icon>}
              title="Mortes"
              subtitle={this.state.state_data.uf}
              value={this.state.state_data.deaths}
            />
          </GridItem>
           <GridItem xs={12} sm={6} md={3}>
            <CardDash
              classes={classes}
              type="info"
              icon={<Accessibility />}
              title="Descartados"
              subtitle={this.state.state_data.uf}
              value={this.state.state_data.refuses}
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <CardDash
              classes={classes}
              type="primary"
              icon={<Icon>content_copy</Icon>}
              title="Suspeitos"
              subtitle={this.state.state_data.uf}
              value={this.state.state_data.suspects}
            />
          </GridItem>
        </GridContainer>  
      </div>
    );
  }
}

export default withStyles(dashboardStyle)(Dashboard);
