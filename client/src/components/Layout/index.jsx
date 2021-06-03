import React from "react";
import TopBar from "../TopBar";
import CssBaseline from "@material-ui/core/CssBaseline";

function Layout(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <TopBar {...props} />
      {props.children}
    </React.Fragment>
  );
}
export default Layout;
