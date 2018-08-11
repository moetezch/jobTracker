import React, { Component } from 'react'
import {Bar} from 'react-chartjs-2'

class JobsPerWebsite extends Component {

  renderJobsPerWebsite() {
    const jobsPerWebsite = this.props.jobs.reduce(
      (totals, job) => ({ ...totals, [job.foundOn]: (totals[job.foundOn] || 0) + 1 }),
      {}
    )
    
    const repliesPerWebsite = this.props.jobs.reduce(
      (totals, job) => ({ ...totals, [job.foundOn]:job.reply!=='Hopefully soon' ?((totals[job.foundOn] || 0) + 1):totals[job.foundOn]||0}),
      {}
    )
    
    const interviewsPerWebsite = this.props.jobs.reduce(
      (totals, job) => ({ ...totals, [job.foundOn]:job.interview!=='Not Yet' ?((totals[job.foundOn] || 0) + 1):totals[job.foundOn]||0}),
      {}
    )

    var websites = [], jobsNumber = [], repliesNumber=[], interviewsNumber=[]
    for (var key in jobsPerWebsite) {
      if (jobsPerWebsite.hasOwnProperty(key)) {
        jobsNumber.push(jobsPerWebsite[key])
       const websitename= this.props.websites.filter(website=>website.id===key)
       websitename[0] ?key=websitename[0].name :key='Other'
        websites.push(key)

      }
    }
    for (var key in repliesPerWebsite) {
      if (repliesPerWebsite.hasOwnProperty(key)) {
        repliesNumber.push(repliesPerWebsite[key])
      }
    }
    for (var key in interviewsPerWebsite) {
      if (interviewsPerWebsite.hasOwnProperty(key)) {
        interviewsNumber.push(interviewsPerWebsite[key])
      }
    }


    const datamixed = {
      datasets: [{
          label: 'Replies',
          type:'line',
          data: repliesNumber,
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
          data: interviewsNumber,
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
          data: jobsNumber,
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
            labels: websites,
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
      <div className="">
        <h2 className="is-size-3">Jobs/Replies/Interviews per Website</h2>
        <Bar
        data={datamixed}
        options={options}
        plugins={plugins}
/>

      </div>
    )

   // console.log(jobsPerWebsite);
  }
  render() {
    return (
      <div>
        {this.renderJobsPerWebsite()}
      </div>
    )
  }
}



export default JobsPerWebsite