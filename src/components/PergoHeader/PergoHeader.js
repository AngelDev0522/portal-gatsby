import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';

import MenuIcon from '@material-ui/icons/Menu';
import ContactSupportOutlinedIcon from '@material-ui/icons/ContactSupportOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import BuildOutlinedIcon from '@material-ui/icons/BuildOutlined';
import MapOutlinedIcon from '@material-ui/icons/MapOutlined';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';

import useMediaQuery from '@material-ui/core/useMediaQuery';

import { PergoTitle } from '../PergoTitle';
import { navigate } from 'gatsby';
import { isLoggedIn, logout } from '../../services/loginService';

import './PergoHeader.less';

const Header = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const media_768 = useMediaQuery('(max-width: 768px)');

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleLogout = event => {
    handleClose(event);
    logout();
    navigate('/app/login');
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && anchorRef.current && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const menu = (
    <>
      {media_768 && <PergoTitle className="menu-header--title">PERGO</PergoTitle>}
      <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
        <MenuItem onClick={handleClose}>
          <BuildOutlinedIcon fontSize="small" /> Management Panel
        </MenuItem>
        <Divider light />
        <MenuItem onClick={handleClose}>
          <MapOutlinedIcon fontSize="small" /> Vehicle Map
        </MenuItem>
        <Divider light />
        <MenuItem onClick={handleClose}>
          <ExploreOutlinedIcon fontSize="small" /> Vehicle Map V2
        </MenuItem>
        <Divider light />
        {media_768 && (
          <>
            <MenuItem onClick={handleClose}>
              <SettingsOutlinedIcon fontSize="small" /> Settings
            </MenuItem>
            <Divider light />
            <MenuItem onClick={handleClose}>
              <ContactSupportOutlinedIcon fontSize="small" /> Support
            </MenuItem>
            <Divider light />
          </>
        )}
        <MenuItem onClick={handleLogout}>
          <ExitToAppOutlinedIcon fontSize="small" /> Log Out
        </MenuItem>
      </MenuList>
    </>
  );

  return (
    <HeaderContainer>
      <div className="header-wrapper">
        <PergoTitle className="header--title">PERGO</PergoTitle>

        {isLoggedIn() && (
          <div className="header--button-container">
            {!media_768 && (
              <>
                <Button className="header--menu-button">
                  <SettingsOutlinedIcon />
                </Button>

                <Button className="header--menu-button">
                  <ContactSupportOutlinedIcon />
                </Button>
              </>
            )}

            <Button
              className="header--menu-button"
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <MenuIcon />
            </Button>
            {!media_768 ? (
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                style={{ zIndex: 1 }}
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transform: 'translate3d(-15px, 15px, 0px)',
                      transformOrigin: placement === 'bottom' ? 'left top' : 'center bottom',
                    }}
                  >
                    <Paper className="header--dropdown" square elevation={3}>
                      <ClickAwayListener onClickAway={handleClose}>{menu}</ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            ) : (
              <Drawer anchor={'right'} open={open} onClose={handleClose}>
                {menu}
              </Drawer>
            )}
          </div>
        )}
      </div>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  font-family: 'Roboto';

  .header-wrapper {
    background-color: var(--header-color);
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;

    .header--title {
      font-size: 30px;
      color: white;
    }

    .header--menu-button {
      color: white;
    }
  }

  @media (max-width: 768px) {
    .header-wrapper {
      padding: 15px;

      .header--button-container {
        .header--menu-button {
          padding: 6px 0;

          .MuiButton-label {
            justify-content: flex-end;
          }
        }
      }
    }
  }
`;
