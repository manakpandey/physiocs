import React from 'react';
import './index.css';

import A1 from '../../assets/emojis/1.png';
import A2 from '../../assets/emojis/2.png';
import A3 from '../../assets/emojis/3.png';
import A4 from '../../assets/emojis/4.png';
import A5 from '../../assets/emojis/5.png';
import A6 from '../../assets/emojis/6.png';

function handleClick(selectedPainCategory) {
    // Function passed as props to handle pain selection    
    //clickMe(selectedPainCategory);
}

function getColor(index) {
    switch(index) {
        case 0:
            return '#99ebff';
        case 1:
            return '#99ff99';
        case 2:
            return '#bbff33';
        case 3:
            return '#ffe066';
        case 4:
            return '#ff8533';
        case 5:
            return '#ff3333';
        default:
            break;
    }
}

var createButtons = () => {
    const imgArray = [A1,A2,A3,A4,A5,A6];
    const descArray = ["No Pain", "Very Minor Pain", "Hurts a Little Less", "Hurts a Little More", "Hurts a Lot", "I'm Dead"];
    return imgArray.map((img, index) => {
        return (
            <div className="emoji-card" onClick={handleClick(descArray[index])}>
                <img className="emoji" src={img} alt={descArray[index]} style={{backgroundColor: getColor(index)}}></img>
                <text className="emoji-desc">{descArray[index]}</text>
            </div>
        );
    });
}

export default function FeedBackScale(clickMe) {
    
    return (
        <div className="container">
            <h1>Self-Assessment Pain Scale</h1>
            <h2>Categorical SAPS</h2>
            <div className="emoji-container">
                {createButtons()}
            </div>
        </div>
    );
}