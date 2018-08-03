import React, { Component } from 'react'
import { connect } from 'react-redux';
import { DateRangePicker} from 'react-dates';
import moment from 'moment'
import { setTextFilter, sortByDate, sortByTitle,sortByCountry, setStartDate, setEndDate } from '../../actions/filters';



class JobListFilters extends Component {
  componentDidMount() {
    //console.log(this.props.filters);
    
  }

  state = {
    calendarFocused: null
  };
  onDatesChange = ({ startDate, endDate }) => {

      this.props.setStartDate(startDate)
      this.props.setEndDate(endDate)
  
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

  onTextChange = (e) => {
    this.props.setTextFilter(e.target.value);
  };
  onSortChange = (e) => {
    if (e.target.value === 'date') {
      this.props.sortByDate();
    } else if (e.target.value === 'title') {
      this.props.sortByTitle();
    }
    else if (e.target.value === 'country') {
      this.props.sortByCountry();
    }
  };
  
	render(){
   
    
  

		return (
      <div className="container">
      <div className="field is-horizontal is-grouped">
        <div className="control is-expanded">
          <input
            type="text"
            className="input is-primary"
            placeholder="Search job title"
            value={this.props.filters.text}
            onChange={this.onTextChange}
          />
        </div>
        <div className="select">
          <select
            
            value={this.props.filters.sortBy}
            onChange={this.onSortChange}
          >
            <option value="date">Date</option>
            <option value="title">Job Title</option>
            <option value="country">Country</option>
          </select>
        </div>
    </div>
    <div className="control">
    <DateRangePicker
    // startDate={moment()}
    // startDateId="start" //
    // endDate={moment()}
    // endDateId="end"
    startDate={moment(this.props.filters.startDate)}
    startDateId="start"
    endDate={moment(this.props.filters.endDate)}
    endDateId="end"
    // startDate={this.props.filters.startDate}
    // startDateId="start"
    // endDate={this.props.filters.endDate}
    // endDateId="end"
    onDatesChange={this.onDatesChange}
    focusedInput={this.state.calendarFocused}
    onFocusChange={this.onFocusChange}
    showClearDates={false}
    numberOfMonths={1}
    isOutsideRange={() => false}
  />
  </div>
  </div>
		)
	}
}

const mapStateToProps = (state) => ({
  filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByTitle: () => dispatch(sortByTitle()),
  sortByCountry: () => dispatch(sortByCountry()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(JobListFilters);
