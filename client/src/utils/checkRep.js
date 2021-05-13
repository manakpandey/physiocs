function checkAngleWithinLimits(reqdAngle, obtdAngle) {
    if(Math.abs(reqdAngle - obtdAngle) < 15)
        return true;
    else 
        return false;
}

export default function checkRep(obtdAngles, testDetails, angleAtPos) {
    return checkAngleWithinLimits(testDetails[angleAtPos],obtdAngles[testDetails.jointName]);
}