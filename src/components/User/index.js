import React from "react";
//import { Redirect } from "react-router-dom";
import "./styles.css";
import "bootstrap-css-only";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import $ from "jquery";
import Spinner from "../Others/Spinner";

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      origin: "",
      destination: "",
      startJourneyDate: new Date(),
      journeyData: "",
      journeyData1: "",
      errors: [],
    };
    this.onChangeOrigin = this.onChangeOrigin.bind(this);
    this.onChangeDestination = this.onChangeDestination.bind(this);
    this.onChangeStartJourneyDate = this.onChangeStartJourneyDate.bind(this);
    this.onSearchData = this.onSearchData.bind(this);
  }

  componentDidMount() {
    $.getJSON(
      "https://raw.githubusercontent.com/russ666/all-countries-and-cities-json/6ee538beca8914133259b401ba47a550313e8984/countries.json",
      function (data) {
        for (var i = 0; i < data.India.length; i++) {
          $(".cities").append(
            '<option value="' +
              data.India[i] +
              '">' +
              data.India[i] +
              "</option"
          );
        }
      }
    );
    //   fetch(
    //     "http://localhost:9000/traveller"
    //     //?origin=" + origin
    //     // "&destination=" + destination,
    //     // "&startJourneyDate=" + startJourneyDate
    //   ).then((result) => {
    //     result.json().then((data) => {
    //       console.log("data", data);
    //       this.setState({ journeyData: data });
    //     });
    //   });
  }

  hasError(key) {
    return this.state.errors.indexOf(key) !== -1;
  }

  onChangeOrigin(event) {
    this.setState({
      origin: event.target.value,
    });
  }
  onChangeDestination(event) {
    this.setState({
      destination: event.target.value,
    });
  }
  onChangeStartJourneyDate(event) {
    this.setState({
      startJourneyDate: event.target.value,
    });
  }
  onSearchData(event) {
    event.preventDefault();

    const { origin, destination, startJourneyDate } = this.state;

    //VALIDATE
    var errors = [];

    //origin
    if (origin === "") {
      errors.push("origin");
    }

    //destination
    if (destination === "") {
      errors.push("destination");
    }

    //startJourneyDate
    if (startJourneyDate === "") {
      errors.push("startJourneyDate");
    }

    this.setState({
      errors: errors,
    });
    if (errors.length > 0) {
      return false;
    } else {
      //   console.log(journeyData);
      //   const origin1 = origin.trim().toLowerCase();
      //   const destination1 = destination.trim().toLowerCase();
      //   if (origin.length > 0 && destination.length > 0) {
      //     const journeyData2 = journeyData.filter(function (i) {
      //       return (
      //         i.origin.toLowerCase().match(origin1) &&
      //         i.destination.toLowerCase().match(destination1) &&
      //         i.startJourneyDate.match(startJourneyDate)
      //       );
      //     });
      //     console.log(journeyData2);
      //     if (journeyData2 === "") {
      //       toast.error("Data is not found!!!!");
      //     }
      //     this.setState({ journeyData1: journeyData2 });
      //   }
      // }

      fetch(
        `https://thirdfriend01.herokuapp.com/traveller?origin=${origin}&destination=${destination}&startJourneyDate=${startJourneyDate}`
      ).then((result) => {
        result.json().then((data) => {
          console.log("data", data);
          this.setState({ journeyData: data, loading: false });
        });
      });
    }
  }
  // if (origin.length > 0) {
  //   journeyData = journeyData.filter(function(i) {
  //     return i.origin.match( origin ) || i.destination.match( destination ) || i.startJourneyDate.match( startJourneyDate );
  //   });
  // }

  render() {
    return (
      <div className="homepage">
        <ToastContainer position={"top-center"} />
        <div className="insidepage3">
          <div className="form">
            <h3 className="postheader">Search Journey Detail</h3>
            <div className="form-row" align="center">
              <div className="col-md-4 mb-3">
                <label htmlFor="firstname">Origin</label>
                <select
                  // id="cities"
                  value={this.origin}
                  onChange={this.onChangeOrigin}
                  autoComplete="off"
                  className={
                    this.hasError("origin")
                      ? "form-control cities is-invalid "
                      : "form-control cities"
                  }
                >
                  <option value="--Select a City--">--Select a City--</option>
                </select>
                {/* <input
                  type="text"
                  value={this.origin}
                  onChange={this.onChangeOrigin}
                  // className="input-box3"
                  autoComplete="off"
                  className={
                    this.hasError("origin")
                      ? "form-control is-invalid "
                      : "form-control"
                  }
                  placeholder="Enter Origin"
                /> */}
                <div
                  className={
                    this.hasError("origin") ? "inline-errormsg" : "hidden"
                  }
                >
                  Please enter origin
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="firstname">Destination</label>
                <select
                  // id="cities"
                  value={this.destination}
                  onChange={this.onChangeDestination}
                  autoComplete="off"
                  className={
                    this.hasError("destination")
                      ? "form-control cities is-invalid "
                      : "form-control cities"
                  }
                >
                  <option value="--Select a City--">--Select a City--</option>
                </select>
                {/* <input
                  type="text"
                  value={this.destination}
                  onChange={this.onChangeDestination}
                  //className="input-box3"
                  autoComplete="off"
                  className={
                    this.hasError("destination")
                      ? "form-control is-invalid "
                      : "form-control"
                  }
                  placeholder="Enter Destination"
                /> */}
                <div
                  className={
                    this.hasError("destination") ? "inline-errormsg" : "hidden"
                  }
                >
                  Please enter destination
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="firstname">Start Journey Date</label>
                <input
                  type="date"
                  value={this.startJourneyDate}
                  onChange={this.onChangeStartJourneyDate}
                  //className="input-box3"
                  autoComplete="off"
                  className={
                    this.hasError("startJourneyDate")
                      ? "form-control is-invalid "
                      : "form-control"
                  }
                  placeholder="Enter startJourneyDate"
                />
                <div
                  className={
                    this.hasError("startJourneyDate")
                      ? "inline-errormsg"
                      : "hidden"
                  }
                >
                  Please select startJourneyDate
                </div>
              </div>
            </div>

            <div align="center">
              <button
                type="submit"
                className="btn btn-success userbtn "
                onClick={this.onSearchData}
              >
                <span> Search Journey </span>
              </button>
            </div>
          </div>
          <div>
            {this.state.journeyData ? (
              this.state.loading ? (
                <Spinner />
              ) : (
                this.state.journeyData.map((item, key) => (
                  <div>
                    {console.log(this.state.journeyData)}
                    <table className="table table-hover  table-dark">
                      <thead>
                        <tr>
                          <th scope="col">Id</th>
                          <th scope="col">Name Of Traveller</th>
                          <th scope="col">Origin</th>
                          <th scope="col">Destination</th>
                          <th scope="col">Max. Weight Capacity</th>
                          <th scope="col">Mode Of Transport</th>
                          <th scope="col">Expected Deal Price</th>
                          <th scope="col">Mobile No.</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row"> {key + 1}</th>
                          <td>
                            <span>{item.name}</span>
                          </td>
                          <td>
                            <span>{item.origin}</span>
                            <br></br>
                            {item.startJourneyDate}
                            <br></br>
                            {item.startJourneyTime}
                          </td>
                          <td>
                            <span>{item.destination}</span>
                            <br></br>
                            {item.endJourneyDate}
                            <br></br>
                            {item.endJourneyTime}
                          </td>
                          <td>
                            <span>{item.maxWeight} Kg</span>
                          </td>
                          <td>
                            <span>{item.modeOfTransport}</span>
                          </td>
                          <td>
                            <span>{item.dealPrice} INR</span>
                          </td>
                          <td>
                            <span>{item.mobile}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ))
              )
            ) : (
              <div className="insidepage4"></div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
