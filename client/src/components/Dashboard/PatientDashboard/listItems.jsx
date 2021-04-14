import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import DashboardIcon from '@material-ui/icons/Dashboard';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import PersonIcon from '@material-ui/icons/Person';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LocalHospitalIcon />
      </ListItemIcon>
      <ListItemText primary="Doctor" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <FitnessCenterIcon />
      </ListItemIcon>
      <ListItemText primary="Physiotherapist" />
    </ListItem>
    
  </div>
);

export const secondaryListItems = (
  <div>
    
    <ListItem button>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
    
  </div>
);