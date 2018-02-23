import React from "react";
import "./Puppy.css";

const PuppyImages = props => (
    <div onClick={() => props.setClicked(props.id)} className="myTrout">
        <div className="img-responsive">
            <img alt={props.name} src={props.image} />
        </div>
  </div>
);

export default PuppyImages;