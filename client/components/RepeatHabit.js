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

  setIntervalOption = option => {
    let today = new Date();
    switch (option) {
      case 'daily':
        return {
          hour: today.getHours(),
          minute: today.getMinutes()
        };
      case 'weekly':
        return {
          dayOfWeek: today.getDay()
        };
      case 'monthly':
        return {
          month: today.getDate()
        };
      default:
        return null;
    }
  };

  handleChange = event => {
    schedule.scheduleJob(setIntervalOption(event.target.value), resetHabit);
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
