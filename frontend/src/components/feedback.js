import React, {useState, useEffect} from "react";
import { useLocation } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";

const FeedBack = (props) => {
    return (
        props.feedback.map((row, i) => (
            <div class="feedback">
                <div className="some-err">
                    <h3>🥺틀린 곳 : {row.token}</h3>
                </div>
                <div className="suggest">
                    💡Suggestions: 
                    {
                        row.suggestions.map((_row, i) => (
                            <h5> &nbsp; { _row} &nbsp; </h5>
                        ))
                    }
                </div>
                <div className="err-info">
                    <p>📋 info: {row.info}</p>
                </div> 
            </div>
        ))
    );
}

export default FeedBack;