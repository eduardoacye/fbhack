import React from 'react';

import ColorMap from './color/ColorMap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { grey100, grey300, grey400, grey500,
         white, darkBlack, fullBlack } from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

const makeScheme = (primaryName, accentName) => {
  let { primary1, primary2 } = ColorMap[primaryName];
  let { accent } = ColorMap[accentName];
  return getMuiTheme({
    spacing: spacing,
    fontFamily: 'Roboto, sans-serif',
    palette: {
      primary1Color: primary1,
      primary2Color: primary2,
      primary3Color: grey400,
      accent1Color: accent,
      accent2Color: grey100,
      accent3Color: grey500,
      textColor: darkBlack,
      alternateTextColor: white,
      canvasColor: white,
      borderColor: grey300,
      disabledColor: fade(darkBlack, 0.3),
      pickerHeaderColor: primary1,
      clockCircleColor: fade(darkBlack, 0.07),
      shadowColor: fullBlack
    }
  });
}

const StyleConfig = (props) => {
  let { primaryName, accentName } = props;
  let scheme = makeScheme(primaryName, accentName);
  return (
    <MuiThemeProvider muiTheme={scheme}>
      { props.children }
    </MuiThemeProvider>
  );
};

export default StyleConfig;
