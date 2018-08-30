import React, { Component } from 'react'
import { GeoChart } from 'react-chartkick'
var CL = require('country-list')();

class JobsPerCountry extends Component {

  renderJobsPerCountry() {
    const jobsPerCountry = this.props.jobs.reduce(
      (totals, job) => ({ ...totals, [job.country]: (totals[job.country] || 0) + 1 }),
      {}
    )
    const countries = []
    for (var key in jobsPerCountry) {
      if (jobsPerCountry.hasOwnProperty(key)) {
        countries.push([key, jobsPerCountry[key]])
      }
    }
    const countriesList=countries.map((country)=>{
      let flag=""
     if (country[0]==="Russia") {
        flag = `https://www.countryflags.io/RU/shiny/32.png`
      }else if (country[0]==="South Korea") {
        flag = `https://www.countryflags.io/KR/shiny/32.png`
      }
      else{
        flag = `https://www.countryflags.io/${CL.getCode(country[0])}/shiny/32.png`

      }
      if (country[0]!=="Other") {
        return (
          <div className="column is-2 has-text-centered" key={country[0]}>
            <div>
          <img src={flag} alt={country[0]}/>
          <p className="is-size-6"> {country[0]} : {country[1]}</p>
          </div>
          </div>
    
      )
      }
  
    })    
    return (
      <div className="container">
      <GeoChart data={countries} height="500px" />
      <div className="columns is-multiline">
      {countriesList}
      </div>
      </div>
    )
  }
  render() {
    return (
      
      <div >
        <h2 className="is-size-3">Jobs/Country</h2>
          {this.renderJobsPerCountry()}
      </div>
    )
  }
}


export default JobsPerCountry