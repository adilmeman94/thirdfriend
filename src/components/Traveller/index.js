import React from "react";
import "./styles.css";
import "bootstrap-css-only";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import $ from "jquery";

export default class Traveller extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postError: "",
      name: "",
      origin: "",
      destination: "",
      startJourneyDate: "",
      startJourneyTime: "",
      endJourneyDate: "",
      endJourneyTime: "",
      mobile: "",
      maxWeight: "",
      modeOfTransport: "",
      dealPrice: "",
      errors: [],
      loading: false,
    };
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeOrigin = this.onChangeOrigin.bind(this);
    this.onChangeDestination = this.onChangeDestination.bind(this);
    this.onChangeStartJourneyDate = this.onChangeStartJourneyDate.bind(this);
    this.onChangeStartJourneyTime = this.onChangeStartJourneyTime.bind(this);
    this.onChangeEndJourneyDate = this.onChangeEndJourneyDate.bind(this);
    this.onChangeEndJourneyTime = this.onChangeEndJourneyTime.bind(this);
    this.onChangeMobile = this.onChangeMobile.bind(this);
    this.onChangeModeOfTransport = this.onChangeModeOfTransport.bind(this);
    this.onChangeMaxWeight = this.onChangeMaxWeight.bind(this);
    this.onChangeDealPrice = this.onChangeDealPrice.bind(this);
    this.onPostData = this.onPostData.bind(this);
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
  }

  hasError(key) {
    return this.state.errors.indexOf(key) !== -1;
  }

  onChangeName(event) {
    this.setState({
      name: event.target.value,
    });
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
  onChangeStartJourneyTime(event) {
    this.setState({
      startJourneyTime: event.target.value,
    });
  }
  onChangeEndJourneyDate(event) {
    this.setState({
      endJourneyDate: event.target.value,
    });
  }
  onChangeEndJourneyTime(event) {
    this.setState({
      endJourneyTime: event.target.value,
    });
  }
  onChangeMobile(event) {
    this.setState({
      mobile: event.target.value,
    });
  }
  onChangeMaxWeight(event) {
    this.setState({
      maxWeight: event.target.value,
    });
  }
  onChangeModeOfTransport(event) {
    this.setState({
      modeOfTransport: event.target.value,
    });
  }
  onChangeDealPrice(event) {
    this.setState({
      dealPrice: event.target.value,
    });
  }

  onPostData(event) {
    event.preventDefault();
    //grab state
    const {
      name,
      origin,
      destination,
      startJourneyDate,
      startJourneyTime,
      endJourneyDate,
      endJourneyTime,
      mobile,
      maxWeight,
      modeOfTransport,
      dealPrice,
    } = this.state;

    var errors = [];

    if (name === "") {
      errors.push("name");
    }

    if (origin === "") {
      errors.push("origin");
    }

    if (destination === "") {
      errors.push("destination");
    }

    if (startJourneyDate === "") {
      errors.push("startJourneyDate");
    }

    if (startJourneyTime === "") {
      errors.push("startJourneyTime");
    }

    if (endJourneyDate === "") {
      errors.push("endJourneyDate");
    }

    if (endJourneyTime === "") {
      errors.push("endJourneyTime");
    }

    if (mobile === "") {
      errors.push("mobile");
    }

    if (maxWeight === "") {
      errors.push("maxWeight");
    }

    if (modeOfTransport === "") {
      errors.push("modeOfTransport");
    }

    if (dealPrice === "") {
      errors.push("dealPrice");
    }

    this.setState({
      errors: errors,
    });
    if (errors.length > 0) {
      return false;
    } else {
      this.setState({
        loading: true,
      });
      //post request to backend
      fetch("https://thirdfriend01.herokuapp.com/traveller/postdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          origin: origin,
          destination: destination,
          startJourneyDate: startJourneyDate,
          startJourneyTime: startJourneyTime,
          endJourneyDate: endJourneyDate,
          endJourneyTime: endJourneyTime,
          mobile: mobile,
          maxWeight: maxWeight,
          modeOfTransport: modeOfTransport,
          dealPrice: dealPrice,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.success) {
            toast.success(json.message);
            this.setState({
              loading: false,
              postError: json.message,
              name: "",
              origin: "",
              destination: "",
              startJourneyDate: "",
              startJourneyTime: "",
              endJourneyDate: "",
              endJourneyTime: "",
              mobile: "",
              maxWeight: "",
              modeOfTransport: "",
              dealPrice: "",
            });
            window.scrollTo(0, 0);
            setTimeout(
              () =>
                this.props.history.push({
                  pathname: "/",
                }),
              3000
            );
          } else {
            toast.error(json.message);
            this.setState({
              postError: json.message,
            });
          }
        });
    }
  }

  render() {
    // const { postError } = this.state;
    return (
      <div className="homepage">
        <ToastContainer position={"top-center"} />
        <div className="insidepage col-lg-6 col-md-6 col-sm-8 col-xs-12 custom-width">
          <div className="form">
            <h3 className="signupheader">Post Journey Detail</h3>
            <div className="box">
              <label htmlFor="name">Name</label>
              <input
                type="name"
                autoComplete="off"
                className={
                  this.hasError("name")
                    ? "form-control is-invalid "
                    : "form-control"
                }
                value={this.name}
                onChange={this.onChangeName}
                placeholder="Enter FirstName &amp; LastName "
              ></input>
              <div
                className={this.hasError("name") ? "inline-errormsg" : "hidden"}
              >
                Please enter firstname &amp; lastname
              </div>
            </div>
            <div className="box">
              <label htmlFor="name">Origin</label>

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

              <div
                className={
                  this.hasError("origin") ? "inline-errormsg" : "hidden"
                }
              >
                Please enter origin
              </div>
            </div>
            <div className="box">
              <label htmlFor="name">Destination</label>
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

              <div
                className={
                  this.hasError("destination") ? "inline-errormsg" : "hidden"
                }
              >
                Please enter destination
              </div>
            </div>
            <div className="form-row">
              <div className="box col-md-6 mb-2">
                <label htmlFor="name">Start Journey Date</label>
                <input
                  type="date"
                  autoComplete="off"
                  className={
                    this.hasError("startJourneyDate")
                      ? "form-control is-invalid "
                      : "form-control"
                  }
                  value={this.startJourneyDate}
                  onChange={this.onChangeStartJourneyDate}
                  placeholder="Start Journey Date(dd/mm/yyyy)"
                ></input>
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
              <div className="box col-md-6 mb-2">
                <label htmlFor="name">Start Journey Time</label>
                <input
                  type="time"
                  autoComplete="off"
                  className={
                    this.hasError("startJourneyTime")
                      ? "form-control is-invalid "
                      : "form-control"
                  }
                  value={this.startJourneyTime}
                  onChange={this.onChangeStartJourneyTime}
                  placeholder="Time(HH:MM)"
                ></input>
                <div
                  className={
                    this.hasError("startJourneyTime")
                      ? "inline-errormsg"
                      : "hidden"
                  }
                >
                  Please set startJourneyTime
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="box col-md-6 mb-2">
                <label htmlFor="name">End Journey Date</label>
                <input
                  type="date"
                  autoComplete="off"
                  className={
                    this.hasError("endJourneyDate")
                      ? "form-control is-invalid "
                      : "form-control"
                  }
                  value={this.endJourneyDate}
                  onChange={this.onChangeEndJourneyDate}
                  placeholder="End Journey Date(dd/mm/yyyy)"
                ></input>
                <div
                  className={
                    this.hasError("endJourneyDate")
                      ? "inline-errormsg"
                      : "hidden"
                  }
                >
                  Please select endJourneyDate
                </div>
              </div>
              <div className="box col-md-6 mb-2">
                <label htmlFor="name">End Journey Time</label>
                <input
                  type="time"
                  autoComplete="off"
                  className={
                    this.hasError("endJourneyTime")
                      ? "form-control is-invalid "
                      : "form-control"
                  }
                  value={this.endJourneyTime}
                  onChange={this.onChangeEndJourneyTime}
                  placeholder="Time(HH:MM)"
                ></input>
                <div
                  className={
                    this.hasError("endJourneyTime")
                      ? "inline-errormsg"
                      : "hidden"
                  }
                >
                  Please set endJourneyTime
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="box col-md-6 mb-2">
                <label htmlFor="name">Mobile No.</label>
                <input
                  type="number"
                  autoComplete="off"
                  className={
                    this.hasError("mobile")
                      ? "form-control is-invalid "
                      : "form-control"
                  }
                  value={this.mobile}
                  onChange={this.onChangeMobile}
                  placeholder="Mobile"
                ></input>
                <div
                  className={
                    this.hasError("mobile") ? "inline-errormsg" : "hidden"
                  }
                >
                  Please enter mobile number.
                </div>
              </div>
              <div className="box col-md-6 mb-2">
                <label htmlFor="name">Max. Capacity Of Weight </label>
                <input
                  type="number"
                  autoComplete="off"
                  className={
                    this.hasError("maxWeight")
                      ? "form-control is-invalid "
                      : "form-control"
                  }
                  value={this.maxWeight}
                  onChange={this.onChangeMaxWeight}
                  placeholder="Weight Capacity(in Kg)"
                ></input>
                <div
                  className={
                    this.hasError("maxWeight") ? "inline-errormsg" : "hidden"
                  }
                >
                  Please enter Max. Capacity Of Weight
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="box col-md-6 mb-2">
                <label htmlFor="name">Mode Of Transport</label>
                <select
                  autoComplete="off"
                  className={
                    this.hasError("modeOfTransport")
                      ? "form-control is-invalid "
                      : "form-control"
                  }
                  value={this.modeOfTransport}
                  onChange={this.onChangeModeOfTransport}
                >
                  <option defaultValue>Mode Of Transport</option>
                  <option value="Bus">Bus</option>
                  <option value="Flight">Flight</option>
                  <option value="Train">Train</option>
                  <option value="Individual Vehicle">Individual Vehicle</option>
                </select>
                <div
                  className={
                    this.hasError("modeOfTransport")
                      ? "inline-errormsg"
                      : "hidden"
                  }
                >
                  Please select modeOfTransport
                </div>
              </div>
              <div className="box col-md-6 mb-2">
                <label htmlFor="name">Expected DealPrice</label>
                <input
                  type="number"
                  autoComplete="off"
                  className={
                    this.hasError("dealPrice")
                      ? "form-control is-invalid "
                      : "form-control"
                  }
                  value={this.dealPrice}
                  onChange={this.onChangeDealPrice}
                  placeholder="Deal Price (in INR) "
                ></input>
                <div
                  className={
                    this.hasError("dealPrice") ? "inline-errormsg" : "hidden"
                  }
                >
                  Please enter dealPrice
                </div>
              </div>
            </div>
            <br></br>
            <div className="box1">
              <button className="btn btn-success" onClick={this.onPostData}>
                {this.state.loading ? "Loading..." : "Post JourneyData"}
              </button>
            </div>
            <br></br>
          </div>
        </div>
      </div>
    );
  }
}
