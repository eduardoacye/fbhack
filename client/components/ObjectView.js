import React from 'react';

import JSONTree from 'react-json-tree';
import muiThemeable from 'material-ui/styles/muiThemeable';

const ObjectView = ({data, muiTheme, ...props}) => (
  <JSONTree data={ data }
            invertTheme={ false }
            hideRoot={ true }
            theme={ {
                /* Background color */
                base00: muiTheme.palette.canvasColor,
                /* Item string expanded color */
                base03: muiTheme.palette.accent3Color,
                /* Text color */
                base07: muiTheme.palette.textColor,
                /* Null, undefined, function, symbol color */
                base08: muiTheme.palette.accent3Color,
                /* Number, boolean color */
                base09: muiTheme.palette.accent1Color,
                /* String, date, item string color */
                base0B: muiTheme.palette.primary1Color,
                /* Label, arrow color */
                base0D: muiTheme.palette.textColor,
                /* Unused */
                base01: '#000000',
                base03: '#000000',
                base04: '#000000',
                base05: '#000000',
                base06: '#000000',
                base0A: '#000000',
                base0C: '#000000',
                base0E: '#000000',
                base0F: '#000000'
              } }
  />
);

export default muiThemeable()(ObjectView);
