import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FunnelIO from '../Pages/Funnel';
import MITTechReview from '../Pages/MIT';
import MinTIC from '../Pages/MinTIC'
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
}));

const SimpleSidebar = () => {
  const classes = useStyles();

  return (
    <Router>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>
          <ListItem button key="FunnelIO" component="a" href="/funnelio">
            <ListItemText primary="Funnel IO" />
          </ListItem>
          <ListItem button key="MITTechReview" component="a" href="/mittechreview">
            <ListItemText primary="MIT Tech Review" />
          </ListItem>
          <ListItem button key="MinTIC" component="a" href="/mintic">
            <ListItemText primary="Convocatorias MinTIC" />
          </ListItem>
        </List>
      </Drawer>

      <Routes>
        <Route path="/funnelio" element={<FunnelIO />} />
        <Route path="/mittechreview" element={<MITTechReview />} />
        <Route path="/mintic" element={<MinTIC />} />
      </Routes>
    </Router>
  );
};

export default SimpleSidebar;
