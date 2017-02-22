import React from 'react';

import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import muiThemeable from 'material-ui/styles/muiThemeable';

const LogoutMenu = ({ visible, click, muiTheme, ...rest }) => {
  let palette = muiTheme.palette;
  if (!visible)
    return (<div></div>);
  return (
    <IconButton onClick={ click }>
      <FontIcon className="material-icons"
                color={ palette.alternateTextColor }>
        exit_to_app
      </FontIcon>
    </IconButton>
  );
}

export default muiThemeable()(LogoutMenu);
