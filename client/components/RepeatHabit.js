'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { UserHabit } from './db/models';
import schedule from 'node-schedule';

/* *** RESETTING HABITS BASED ON DESIRED INTERVALS *** */

export class RepeatHabit extends React.Component {
  resetHabit = habitId => {
    UserHabit.findById(habitId).then(habit => {
      habit.complete = false;
      habit.save();
    });
  };

  handleChange = () => {
    // schedule.scheduleJob(
    //   {
    //     hour: 14, // need func to generate these nums from selection form?
    //     minute: 30,
    //     dayOfWeek: 0
    //   },
    //   resetHabit
    // );
  };

  render() {
    const intervals = ['daily', 'weekly', 'monthly'];

    return (
      <select
        onChange={this.props.handleChange.bind(this)}
        name="selectedInterval"
      >
        <option>Repeat . . .</option>
        {intervals.map((interval, idx) => (
          <option key={`interval-option-${idx + 1}`} value={interval}>
            {interval}
          </option>
        ))}
      </select>
    );
  }
}
