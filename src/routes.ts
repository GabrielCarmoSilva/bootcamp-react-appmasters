// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";

// Componente principal do dashboard
import DashboardPage from "./views/Dashboard/Dashboard";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Painel COVID-19 Brasil",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
];

export default dashboardRoutes;
