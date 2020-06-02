import React, { useState } from 'react';
import styled from 'styled-components';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';

import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import BorderHorizontalOutlinedIcon from '@material-ui/icons/BorderHorizontalOutlined';
import BorderVerticalOutlinedIcon from '@material-ui/icons/BorderVerticalOutlined';

import SEO from '../seo';
import JobSection from '../JobSection/JobSection';
import MapSection from '../MapSection/MapSection';
import JobTableSection from '../JobTableSection/JobTableSection';

import { PergoTitle, PergoDescription } from '../PergoTitle';

const IndexPage = () => {
  const [state, setState] = React.useState({
    checkedA: true,
  });

  const [driverSectionLayout, setDriverSectionLayout] = React.useState(0);
  const [mapType, setMapType] = useState('MapBox'); //MapBox, GoogleAPI

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };
  const rows = [
    {
      name: 'Jack',
      vehicle: 'T4634',
      status: 'Idle',
      jobs: '4436',
      actions: '',
    },
    {
      name: 'David',
      vehicle: 'G1544',
      status: 'Working',
      jobs: '5542',
      actions: '',
    },
    {
      name: 'Tim',
      vehicle: 'A7745',
      status: 'Idle',
      jobs: '7432',
      actions: '',
    },
  ];

  return (
    <>
      <SEO title="Home" />

      <MainWrapper className="main-wrapper">
        <div className="main-container">
          <Paper
            className="main--call-queue-section"
            elevation={3}
            square
            style={{ background: state.checkedA ? '#FF8424' : '#9FADB4' }}
          >
            <PergoDescription className="main--call-queue-title">Call Queue: 0</PergoDescription>
            <div className="main--call-queue-status">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>
                  <FormControlLabel
                    control={
                      <PurpleSwitch
                        size="small"
                        checked={state.checkedA}
                        onChange={handleChange('checkedA')}
                        value="checkedA"
                      />
                    }
                    label={state.checkedA ? 'Online' : 'Offline'}
                  />
                </Grid>
              </Grid>
            </div>
          </Paper>

          <div className="main--job-map-section">
            <JobSection mapType={mapType} />

            <div
              className={
                'main--map-section-wrapper' +
                (driverSectionLayout === 0 ? ' horizontal-layout' : ' vertical-layout')
              }
            >
              <MapSection mapType={mapType} />

              <Paper className="main--driver-section" elevation={3} square>
                <div className="main--driver-body">
                  <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Driver</TableCell>
                          <TableCell align="center">Vehicle</TableCell>
                          <TableCell align="center">Status</TableCell>
                          <TableCell align="center">Jobs</TableCell>
                          <TableCell align="center">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map(row => (
                          <TableRow key={row.name}>
                            <TableCell align="center" component="th" scope="row">
                              {row.name}
                            </TableCell>
                            <TableCell align="center">{row.vehicle}</TableCell>
                            <TableCell align="center">
                              {' '}
                              <Chip className={'chip-' + row.status} label={row.status} />
                            </TableCell>
                            <TableCell align="center">{row.jobs}</TableCell>
                            <TableCell align="center">
                              <ExitToAppOutlinedIcon fontSize="small" />
                              <RoomOutlinedIcon fontSize="small" />{' '}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <div className="main--driver-layout-button">
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        setDriverSectionLayout(driverSectionLayout === 0 ? 1 : 0);
                      }}
                    >
                      {driverSectionLayout === 0 ? (
                        <BorderHorizontalOutlinedIcon />
                      ) : (
                        <BorderVerticalOutlinedIcon />
                      )}
                    </IconButton>
                  </div>
                </div>
              </Paper>
            </div>
          </div>

          {false && <JobTableSection />}
        </div>
      </MainWrapper>
    </>
  );
};

export default IndexPage;

const MainWrapper = styled.div`
  .main-container {
    padding: 10px;

    .main--call-queue-section {
      padding: 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .main--call-queue-description {
        text-align: center;
      }

      .main--call-queue-status {
        font-family: var(--font-family);
        color: white;
      }

      .MuiFormControlLabel-root {
        margin-right: 0;
      }
    }

    .main--job-map-section {
      margin-top: 10px;
      display: flex;

      .main--map-section-wrapper {
        flex: auto;
        display: flex;

        .main--driver-section {
          flex: 1;
          max-width: 400px;

          border: 2px solid var(--blue-dark-color);
          height: 100%;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;

          .main--driver-title {
            background: var(--blue-dark-color);
            font-size: 16px;
            padding: 15px 10px;
          }

          .main--driver-body {
            height: 100%;
            position: relative;

            .MuiTableContainer-root {
              height: 100%;
              border-radius: 0;
              background: #0b1a2111;
            }

            .MuiTable-root {
              .MuiTableHead-root {
                background: var(--blue-dark-color);
              }

              .MuiTableCell-root {
                padding: 5px 10px;
                font-size: 13px;
                border-bottom: 1px solid #aaa;
              }

              .MuiTableCell-head {
                font-size: 14px;
                line-height: 25px;
                padding: 11px 5px;
                color: white;
              }
            }

            .MuiChip-root {
              height: 20px;
              color: white;

              &.chip-Idle {
                background: var(--orange-main-color);
              }

              &.chip-Working {
                background: var(--green-main-color);
              }
            }

            .MuiSvgIcon-root {
              color: var(--blue-dark-color);
            }

            .main--driver-layout-button {
              position: absolute;
              right: 5px;
              bottom: 5px;
              opacity: 0.5;

              .MuiIconButton-root {
                background: #ddd;

                &:hover {
                  background: #ddf;
                }
              }

              &:hover {
                opacity: 1;
              }
            }
          }
        }

        &.vertical-layout {
          flex-direction: column;

          .main--map-section {
            margin-right: 0;
            margin-bottom: 10px;
          }

          .main--driver-section {
            max-width: 100%;
            max-height: 160px;
          }
        }
      }
    }
  }

  @media (max-width: 1299px) {
    .main-container {
      .main--job-map-section {
        .main--map-section-wrapper {
          flex-direction: column;
        }
      }
    }
  }

  @media (max-width: 830px) {
    .main-container {
      .main--job-map-section {
        flex-direction: column;
      }
    }
  }
`;

const PurpleSwitch = withStyles({
  switchBase: {
    color: '#fff',
    '&$checked': {
      color: '#fff',
    },
    '&$checked + $track': {
      backgroundColor: '#fff',
    },
  },
  checked: {},
  track: {},
})(Switch);
