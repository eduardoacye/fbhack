import React, { Component } from 'react';

import ColorMap from './color/ColorMap';

import Menu from 'material-ui/Menu';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';


const ColorSelectionIcon = (props) => {
  const { colorname, type, ...rest } = props;
  return (
    <FontIcon {...rest}
              className="material-icons"
              color={ ColorMap[colorname][type] }>
      lens
    </FontIcon>
  );
};

class ColorMenuItem extends Component {
  static muiName = 'MenuItem';
  static defaultProps = { className: 'menu-item' };
  render() {
    const {type, ...props} = this.props;
    return (
      <MenuItem {...props}
                leftIcon={ (
                    <ColorSelectionIcon colorname={ props.value } type={ type } />
                  ) }
      />
    );
  }
}

class ColorMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      primarySelection: props.primaryName,
      accentSelection: props.accentName
    };
    this.handlePrimaryChange = this.handlePrimaryChange.bind(this);
    this.handleAccentChange = this.handleAccentChange.bind(this);
  }

  handlePrimaryChange(event, value) {
    this.setState({ primarySelection: value }, () => {
      this.props.updateColorScheme(this.state.primarySelection,
                                   this.state.accentSelection);
    });
  }

  handleAccentChange(event, value) {
    this.setState({ accentSelection: value }, () => {
      this.props.updateColorScheme(this.state.primarySelection,
                                   this.state.accentSelection);
    });
  }

  render() {
    const primaryIcon = (<ColorSelectionIcon
                             colorname={ this.state.primarySelection }
                             type="primary2"
                         />);
    const accentIcon = (<ColorSelectionIcon
                            colorname={ this.state.accentSelection }
                            type="accent"
                        />);
      return (
        <div style={ { display: 'inline-block' } }>
          <IconMenu
              iconButtonElement={ <IconButton>{ primaryIcon }</IconButton> }
              onChange={ this.handlePrimaryChange }
              value={ this.state.primarySelection }
              maxHeight={ 350 }
              anchorOrigin={ { horizontal: 'right', vertical: 'bottom' } }
              targetOrigin={ { horizontal: 'right', vertical: 'top' } }
          >
            {
              Object.keys(ColorMap).map((colorname, index) => (
                <ColorMenuItem key={ index }
                               value={ colorname }
                               primaryText={ colorname }
                               type="primary1" />
              ))
            }
          </IconMenu>
          <IconMenu
              iconButtonElement={ <IconButton>{ accentIcon }</IconButton> }
              onChange={ this.handleAccentChange }
              value={ this.state.accentSelection }
              maxHeight={ 350 }
              anchorOrigin={ { horizontal: 'right', vertical: 'bottom' } }
              targetOrigin={ { horizontal: 'right', vertical: 'top' } }
          >
            {
              Object.keys(ColorMap).map((colorname, index) => (
                <ColorMenuItem key={ index }
                               value={ colorname }
                               primaryText={ colorname }
                               type="accent" />
              ))
            }
          </IconMenu>
        </div>
      );
  }
}

export default ColorMenu;
