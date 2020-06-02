import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import 'date-fns';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

import TabPanel from '../TabPanel';
import { jobsService } from '../../services/jobsService';
var moment = require('moment');

const JobTableSection = () => {
  const [jobTab, setJobTab] = useState(0);
  const [tableData, setTableData] = useState([]);
  const paymentType = [
    'Cash',
    'Card',
    'Voucher',
    'EHail Mobile',
    'Karhoo',
    'Stored Card',
    'Webapp Credit',
  ];

  useEffect(() => {
    jobsService.get_jobs().then(({ data }) => {
      if (data.status === 'SUCCESS') {
        setTableData(data.data.data.map(item => jobTableRowFormat(item)));
      }
    });
  });

  const jobTableRowFormat = row => {
    let call_date = moment(row.call_time).isValid()
      ? moment(row.call_time).format('MM/DD/YYYY')
      : '';
    let call_time = moment(row.call_time).isValid() ? moment(row.call_time).format('HH:mm') : '';
    let pick_up = row.scheduled_start_addr || row.start_addr;
    let drop_off = row.scheduled_end_addr || row.end_addr;
    let dispatch_time = row.dispatch_time;
    let status = '';
    let status_attr = '';
    row.status = parseInt(row.status);
    row.job_type = parseInt(row.job_type);

    switch (row.status) {
      case 1:
        status = row.job_type === 2 ? 'Reservation/Dispatched' : 'Dispatched';
        status_attr = 'dispatched';
        break;
      case 2:
        status = 'Accepted';
        status_attr = 'accepted';
        break;
      case 3:
        status = 'Declined';
        status_attr = 'declined';
        break;
      case 4:
        status = '@Pickup';
        status_attr = 'accepted';
        break;
      case 5:
        status = 'Picked Up';
        status_attr = 'pickup';
        break;
      case 6:
        status = 'Drop-Off';
        status_attr = 'dropoff';
        break;
      case 7:
        status = 'Pay';
        status_attr = 'pay';
        break;
      case 8:
        status = 'Complete';
        status_attr = 'complete';
        break;
      case 9:
        status = 'No Show';
        status_attr = 'cancel';
        break;
      case 10:
        status = 'Cancelled';
        status_attr = 'cancel';
        break;
      case 11:
        status = 'Backlog';
        status_attr = 'backlog';
        break;
      default:
        status = 'CFS';
        status_attr = 'cfs';
        break;
    }

    if (row.status === 0) {
      switch (row.job_type) {
        case 2:
          dispatch_time = row.reservation_time;
          if (row.reservation_confirmed === 0) {
            status = `Confirm\nReservation?`;
          } else {
            status = 'Reservation';
          }
          break;
        case 3:
          status = 'E-Hail';
          break;
        case 4:
          status += ' (E-Hail)';
          break;
        default:
          break;
      }
    }

    dispatch_time = moment(dispatch_time).isValid() ? moment(dispatch_time).format('HH:mm') : '';
    let distance = parseFloat(row.distance).toFixed(2);
    let payment_type = paymentType[row.tender_type];
    let pickup_time = moment(row.pickup_time).isValid()
      ? moment(row.pickup_time).format('HH:mm')
      : '';
    let dropoff_time = moment(row.dropoff_time).isValid()
      ? moment(row.dropoff_time).format('HH:mm')
      : '';

    return {
      ...row,
      call_date: call_date,
      call_time,
      pick_up: pick_up,
      drop_off: drop_off,
      dispatch_time,
      distance,
      payment_type: payment_type,
      pickup_time,
      dropoff_time,
      status,
      status_attr: status_attr,
    };
  };

  return (
    <JobTableSectionWrapper>
      <Paper className="main--job-table-paper" elevation={3} square>
        <Tabs
          value={jobTab}
          onChange={(event, newValue) => {
            setJobTab(newValue);
          }}
        >
          <Tab label="Jobs" />
          <Tab label="Reservation" />
        </Tabs>
        <TabPanel value={jobTab} index={0}>
          <TableContainer>
            <Table aria-label="job table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Job #</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Call Time</TableCell>
                  <TableCell align="center">Ext #</TableCell>
                  <TableCell align="center">Passenger</TableCell>
                  <TableCell align="center">Pickup</TableCell>
                  <TableCell align="center">Drop Off</TableCell>
                  <TableCell align="center">Dispatch Time</TableCell>
                  <TableCell align="center">Driver</TableCell>
                  <TableCell align="center">Car #</TableCell>
                  <TableCell align="center">Distance</TableCell>
                  <TableCell align="center">Payment Type</TableCell>
                  <TableCell align="center">Fare</TableCell>
                  <TableCell align="center">Pickup Time</TableCell>
                  <TableCell align="center">Drop Off Time</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Cancel</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map(item => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell align="center">{item.id}</TableCell>
                      <TableCell align="center">{item.call_date}</TableCell>
                      <TableCell align="center">{item.call_time}</TableCell>
                      <TableCell align="center">{item.extension}</TableCell>
                      <TableCell align="center">{item.passenger_name}</TableCell>
                      <TableCell align="center">{item.pick_up}</TableCell>
                      <TableCell align="center">{item.drop_off}</TableCell>
                      <TableCell align="center">{item.dispatch_time}</TableCell>
                      <TableCell align="center">{item.driver_name}</TableCell>
                      <TableCell align="center">{item.vehicle_no}</TableCell>
                      <TableCell align="center">{item.distance}</TableCell>
                      <TableCell align="center">{item.payment_type}</TableCell>
                      <TableCell align="center">{item.fare}</TableCell>
                      <TableCell align="center">{item.pickup_time}</TableCell>
                      <TableCell align="center">{item.dropoff_time}</TableCell>
                      <TableCell align="center">{item.status}</TableCell>
                      <TableCell align="center">
                        <CancelOutlinedIcon color="error" fontSize="small" />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        <TabPanel value={jobTab} index={1}>
          Reservation Table
        </TabPanel>
      </Paper>
    </JobTableSectionWrapper>
  );
};

export default JobTableSection;

const JobTableSectionWrapper = styled.div`
  margin-top: 10px;

  .main--job-table-paper {
    border: 2px solid var(--tertiary-main-color);
    background: #efefef;
    min-height: 1000px;

    .MuiTabs-root {
      background: var(--tertiary-main-color);
    }

    .MuiTab-textColorInherit {
      .MuiTab-wrapper {
        color: white;
      }
    }

    .MuiTab-textColorInherit.Mui-selected {
      background: #efefef;

      .MuiTab-wrapper {
        color: var(--tertiary-main-color);
      }
    }

    .MuiTabs-indicator {
      background: transparent;
    }

    .MuiBox-root {
      padding: 10px;
    }

    .MuiTable-root {
      border-left: 1px solid #aaa;
      border-top: 1px solid #aaa;

      .MuiTableHead-root {
      }

      .MuiTableCell-root {
        padding: 5px 10px;
        font-size: 13px;
        border-right: 1px solid #aaa;
        border-bottom: 1px solid #aaa;
      }

      .MuiTableCell-head {
        font-size: 14px;
        line-height: 18px;
        padding: 11px 5px;
        background: #ccc;
      }
    }
  }
`;
