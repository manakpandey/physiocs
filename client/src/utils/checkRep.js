function checkAngleWithinLimits(reqdAngle, obtdAngle) {
    // Absolute difference between the angles
    if(Math.abs(reqdAngle - obtdAngle) < 15)
        return true;
    else 
        return false;
}

export default function checkRep(obtdAngles, testDetails, angleAtPos) {
    // angleAtPos -> which position (flex or relax)
    // testDetails.jointName -> which joint we're looking for
    // obtdAngles[] -> the angle associated with the above joint
    
    return checkAngleWithinLimits(testDetails[angleAtPos],obtdAngles[testDetails.jointName]);
}