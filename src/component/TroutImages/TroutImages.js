import React from "react";
import "./Trout.css";

const TroutImages = props => (
    <div onClick={() => props.setClicked(props.id)} className="myTrout">
        <div className="img-responsive">
            <img alt={props.name} src={props.image} />
        </div>
  </div>
);

export default TroutImages;