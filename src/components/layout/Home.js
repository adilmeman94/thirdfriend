import React from "react";
import { Link } from "react-router-dom";

export default function Home(props) {
  return (
    <div className="homepage  ">
      <div className="homepage1 col-lg-5 col-md-6 col-sm-7 col-xs-12 custom-width">
        <p className="para1">
          Hire The Best Traveller For Getting Parcel At Your Destination Point.
        </p>
        <p className="para2 ">
          Millions of people use ThirdFriend.com for getting parcel at their
          destination point.
        </p>

        <div className="d-grid gap-2  col-6 mx-auto ">
          <Link to="/user">
            <button className="btn btn-primary" type="button">
              Hire A Traveller
            </button>
          </Link>
          <Link to="/traveller">
            <button className="btn btn-primary second-btn" type="button">
              Earn Money By Travelling
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
