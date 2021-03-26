import React from "react";
import { Link } from "react-router-dom";
// import { connect } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home(props) {
  // console.log(props);
  // toast.success(props.name);
  return (
    <div className="homepage">
      {/* <ToastContainer position={"top-center"} /> */}
      <div className="homepage1">
        <p className="para1">
          Hire The Best Traveller For Getting Parcel At Your Destination Point.
        </p>
        <p className="para2 ">
          Millions of people use ThirdFriend.com for getting parcel at their
          destination point.
        </p>

        <div className="d-grid gap-2  col-6 mx-auto ">
          <Link to="/user">
            <button className="btn btn-primary " type="button">
              Hire A Traveller
            </button>
          </Link>
          <Link to="/traveller">
            <button className="btn btn-primary " type="button">
              Earn Money By Travelling
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// function mapStateToProps(state) {
//   return {
//     name: state.user,
//   };
// }

// export default connect(mapStateToProps)(Home);
