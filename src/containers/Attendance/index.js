import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';

import { socket } from '../../utils/socket.js';
import { Button } from 'react-toolbox/lib/button';

/* material UI components */
import { Card } from 'react-toolbox/lib/card';

/* container styles */
import { styles } from '../Vote/styles/styles.scss';

const metaData = {
  title: 'DHAMUN',
  description: 'Get started here',
  canonical: 'http://example.com/path/to/page',
  meta: {
    charset: 'utf-8',
    name: {
      keywords: 'react,meta,document,html,tags',
    },
  },
};

@connect(
  (state) => ({
    token: state.auth.token,
    userLevel: state.auth.userLevel,
    country: state.auth.country
  }),
)
export class Attendance extends Component {

  constructor(props) {
    super(props);
    this.state = {
      countriesPresent: {}
    }
  }

  componentDidMount () {
    console.log("mounted af")
    
    socket.on("attendance update", function(data){
      console.log("updating attendance store");
      this.setState({countriesPresent: data});
    }.bind(this));

    socket.emit("attendance get", {token: this.props.token});
    
  }

  markPresent() {
    socket.emit("attendance present", {token: this.props.token});
  }

  render() {
    const isCountryPresent = this.state.countriesPresent[this.props.country];
    const filterPresence = (elem) => {return this.state.countriesPresent[elem]};
    const filterVerificationID = (elem) => {return elem !== "verificationID"};
    debugger
    return (
      <section className={styles}>
        <div className="container">


          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6
                            col-md-offset-3">
              <h1>
                Attendance
              </h1>
            </div>

            { this.props.userLevel == "Delegate" && 
              <Card className="card">
                <Button disabled={isCountryPresent} onClick={() => { this.markPresent() }} style={{"marginBottom": "4%"}} raised primary>
                  Present
                </Button>
                <Button disabled={isCountryPresent} onClick={() => { this.markPresent() }} raised primary>
                  Present and Voting
                </Button>
              </Card>
            }

            { this.props.userLevel !== "Delegate" && 
              <Card className="card">
                <table className="table table-hover">
                  <h3>Present</h3>
                  <tbody>

                    {
                      Object.keys(this.state.countriesPresent).filter(filterVerificationID).filter(filterPresence)
                        .map((item, index) => 
                        {
                          return <tr key={index}><td className="col-md-10">{item}</td></tr>
                        }

                      )
                    }

                  </tbody>
                </table>

                <table className="table table-hover">
                  <h3>Absent</h3>
                  <tbody>

                    {
                      Object.keys(this.state.countriesPresent).filter(filterVerificationID).filter((elem) => {return !filterPresence(elem)})
                        .map((item, index) => 
                        {
                          return <tr key={index}><td className="col-md-10">{item}</td></tr>
                        }

                      )
                    }

                  </tbody>
                </table>

              </Card>
            }

          </div>
        </div>
      </section>
    );
  }

  componentWillUnmount() {
    socket.removeAllListeners("attendance update");    
  }
}