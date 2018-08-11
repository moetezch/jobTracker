import React, { Component } from 'react'
import { connect } from 'react-redux';
import { DateRangePicker} from 'react-dates';
import moment from 'moment'
import {setChartStartDate, setChartEndDate } from '../../actions/chartFilters';



class JobChartFilters extends Component {
state = {
    calendarFocused: null
  };
  onDatesChange = ({ startDate, endDate }) => {

      this.props.setChartStartDate(startDate)
      this.props.setChartEndDate(endDate)
  
    // if (startDate && endDate) {
    //   this.props.setStartDate(startDate);
    // this.props.setEndDate(endDate);
    // }else{
    //   this.props.setStartDate(moment().startOf('month'));
    //   this.props.setEndDate( moment().endOf('month'));
    // }
  };
  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }));
  }


	render(){
  
		return (
      <div className="container">
    <div className="control has-text-right">
    <DateRangePicker
    // startDate={moment()}
    // startDateId="start" //
    // endDate={moment()}
    // endDateId="end"
    startDate={moment(this.props.chartFilters.startDate)}
    startDateId="start"
    endDate={moment(this.props.chartFilters.endDate)}
    endDateId="end"
    // startDate={this.props.chartFilters.startDate}
    // startDateId="start"
    // endDate={this.props.chartFilters.endDate}
    // endDateId="end"
    onDatesChange={this.onDatesChange}
    focusedInput={this.state.calendarFocused}
    onFocusChange={this.onFocusChange}
    showClearDates={false}
    numberOfMonths={1}
    isOutsideRange={() => false}
    readOnly={true}
    withPortal
    minimumNights={0}
  />
  </div>
  </div>
		)
	}
}

const mapStateToProps = (state) => ({
  chartFilters: state.chartsFilter
});

const mapDispatchToProps = (dispatch) => ({
  setChartStartDate: (startDate) => dispatch(setChartStartDate(startDate)),
  setChartEndDate: (endDate) => dispatch(setChartEndDate(endDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(JobChartFilters);
