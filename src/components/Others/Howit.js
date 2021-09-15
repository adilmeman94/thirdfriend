import React from "react";
import "./styles.css";
import tf3 from "./TF3.jpg";

export default function Howit() {
  return (
    <div className="homepage">
      <div className="homepage2">
        <div className="howheader">
          <h2>How It Works </h2>
        </div>
        <div className="con-box">
          <div>
            <img src={tf3} className="img-fluid" alt="TFluggage" />
          </div>
          <div className="col second-box">
            <h3>How does It Work? </h3>
            <div className="para3">
              <strong>1. Post a journey detail </strong>
              <br></br>
              <p>
                Simply post a journey detail for earning money from User within
                minutes.
              </p>
            </div>
            <div className="para3">
              <strong>2. Choose the perfect traveller </strong>
              <br></br>
              <p>
                Search a journey for getting luggages or parcel at your
                convinience place in competitive price and choose the best
                traveller.
              </p>
            </div>
            <div className="para3">
              <strong>3. Pay when you got </strong>
              <br></br>
              <p>
                Pay to traveller when you got your lugguages or parcel at your
                place.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
