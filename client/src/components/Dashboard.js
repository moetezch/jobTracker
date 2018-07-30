import React, { Component } from 'react'
import { connect } from 'react-redux'
import has from 'lodash/has';
import { Line, Doughnut,Bar } from 'react-chartjs-2'
import * as actions from '../actions/jobs'




class Dashboard extends Component {
  componentDidMount() {

  }

  renderJobsPerWebsite() {
    const jobsPerWebsite = this.props.jobs.reduce(
      (totals, job) => ({ ...totals, [job.foundOn]: (totals[job.foundOn] || 0) + 1 }),
      {}
    )
    console.log(jobsPerWebsite);
    var website = [], number = []
    for (var key in jobsPerWebsite) {
      if (jobsPerWebsite.hasOwnProperty(key)) {
        website.push(key)
        number.push(jobsPerWebsite[key])
        //   console.log(key + " -> " + jobsPerWebsite[key]);
      }
    }
    console.log(website);
    console.log(number);

    const datamixed = {
      //labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
          label: 'Replies',
          type:'line',
          data: [1,1,0],
          fill: false,
          borderColor: '#EC932F',
          backgroundColor: '#EC932F',
          pointBorderColor: '#EC932F',
          pointBackgroundColor: '#EC932F',
          pointHoverBackgroundColor: '#EC932F',
          pointHoverBorderColor: '#EC932F',
          yAxisID: 'y-axis-1'
        },
        {
          label: 'Interviews',
          type:'line',
          data: [2,0,1],
          fill: false,
          borderColor: '#2e94ba',
          backgroundColor: '#2e94ba',
          pointBorderColor: '#2e94ba',
          pointBackgroundColor: '#2e94ba',
          pointHoverBackgroundColor: '#2e94ba',
          pointHoverBorderColor: '#2e94ba',
          yAxisID: 'y-axis-1'
        },
    
        {
          type: 'bar',
          label: 'Jobs',
          data: number,
          fill: false,
          backgroundColor: '#71B37C',
          borderColor: '#71B37C',
          hoverBackgroundColor: '#71B37C',
          hoverBorderColor: '#71B37C',
          yAxisID: 'y-axis-1'
        }
      ]
    };
    
    const options = {
      responsive: true,
      tooltips: {
        mode: 'label'
      },
      elements: {
        line: {
          fill: false
        }
      },
      scales: {
        xAxes: [
          {
            display: true,
            gridLines: {
              display: false
            },
            labels: website,
          }
        ],
        yAxes: [
          {
            type: 'linear',
            display: true,
            position: 'left',
            id: 'y-axis-1',
            gridLines: {
              display: false
            },
            labels: {
              show: true
            }
          },
          {
            type: 'linear',
            display: true,
            position: 'right',
            id: 'y-axis-2',
            gridLines: {
              display: false
            },
            labels: {
              show: true
            }
          },
          {
            type: 'linear',
            display: false,
            position: 'right',
            id: 'y-axis-3',
            gridLines: {
              display: false
            },
            labels: {
              show: true
            }
          }
        ]
      }
    };
    
    const plugins = [{
        afterDraw: (chartInstance, easing) => {
            const ctx = chartInstance.chart.ctx;
            ctx.fillText("", 100, 100);
        }
    }];
    
    
  
    return (
      <div>
        <h2 className="is-size-2">Number of jobs/replies/interviews per Website</h2>
        <Bar
        data={datamixed}
        options={options}
        plugins={plugins}
/>

      </div>
    )

    console.log(jobsPerWebsite);
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          Dashboard
          
          {this.renderJobsPerWebsite()}

        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    jobs: state.jobs
  }
}

export default connect(mapStateToProps, actions)(Dashboard)