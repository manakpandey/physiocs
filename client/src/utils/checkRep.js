export function checkAngleWithinLimits(reqdAngle, obtdAngle) {
    // Absolute difference between the angles
    if(Math.abs(reqdAngle - obtdAngle) < 15)
        return true;
    else 
        return false;
}

/*function checkRep1(obtdAngles, testDetails, angleAtPos) {
    // angleAtPos -> String -> which position (flex or relax) 
    // testDetails.jointName -> which joint we're looking for
    // obtdAngles[] -> the angle associated with the above joint
    
    return checkAngleWithinLimits(testDetails[angleAtPos],obtdAngles[testDetails.jointName]);
}*/