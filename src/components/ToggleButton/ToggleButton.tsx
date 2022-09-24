import React, { useState } from "react";
import './ToggleButton.scss';

interface PropData {
    label_id: any,
    title: any,
    onChange: any,
}
const defaultSwitchValue = false;

const ToggleButton = (props: PropData) => {
    const [toogleValue, setToggleValue] = useState(false);
    const ToggleSwitch = (e: any) => {
        if (props.onChange) {
            props.onChange(e);
        }
    }
    return (
        <div className="container">
            <div className="togglecontent">
            <label className="font-14" >  {props.title}{" "}</label>
            <div className="toggle-button-cover">
                <div className="button-cover">
                    <div className="button r" id="button-1" onClick={() => ToggleSwitch(toogleValue)}>
                        <input type="checkbox" className="checkbox"  name={props.title + props.label_id} id={props.title + props.label_id} 
                         onChange={(e) => setToggleValue(!toogleValue)}
                        />
                        <div className="knobs"></div>
                        <div className="layer"></div>
                    <label className="label" htmlFor={props.title + props.label_id}/>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default ToggleButton;