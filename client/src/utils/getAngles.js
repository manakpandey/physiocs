import _ from "lodash";

function getAngles(jt1, jt2, jt3) {
  var v1 = [jt1.x - jt2.x, jt1.y - jt2.y];
  var v2 = [jt3.x - jt2.x, jt3.y - jt2.y];
  var len1 = Math.sqrt(v1[0] * v1[0] + v1[1] * v1[1]);
  var len2 = Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1]);
  var dotProd = v1[0] * v2[0] + v1[1] * v2[1];
  return ((Math.acos(dotProd / (len1 * len2)) * 180) / Math.PI).toFixed(4);
}

export function checkJoints(poseJoints) {
  var keys = _.map(poseJoints.keypoints, "part");
  var values = _.map(poseJoints.keypoints, "position");

  var jointCoords = {};
  keys.forEach((key, i) => (jointCoords[key] = values[i]));

  var jointAngles = {
    leftElbowAngle: -1,
    leftHipAngle: -1,
    leftKneeAngle: -1,
    leftShoulderAngle: -1,
    rightElbowAngle: -1,
    rightHipAngle: -1,
    rightKneeAngle: -1,
    rightShoulderAngle: -1,
  };

  //Checking for angle at left elbow. If present, then calculate the angle, else let it remain -1
  if (
    "leftElbow" in jointCoords &&
    "leftWrist" in jointCoords &&
    "leftShoulder" in jointCoords
  ) {
    jointAngles.leftElbowAngle = getAngles(
      jointCoords.leftWrist,
      jointCoords.leftElbow,
      jointCoords.leftShoulder
    );
  }

  //Checking for angle at right elbow. If present, then calculate the angle, else let it remain -1
  if (
    "rightElbow" in jointCoords &&
    "rightWrist" in jointCoords &&
    "rightShoulder" in jointCoords
  ) {
    jointAngles.rightElbowAngle = getAngles(
      jointCoords.rightWrist,
      jointCoords.rightElbow,
      jointCoords.rightShoulder
    );
  }

  //Checking for angle at left shoulder. If present, then calculate the angle, else let it remain -1
  if (
    "leftShoulder" in jointCoords &&
    "leftElbow" in jointCoords &&
    "leftHip" in jointCoords
  ) {
    jointAngles.leftShoulderAngle = getAngles(
      jointCoords.leftElbow,
      jointCoords.leftShoulder,
      jointCoords.leftHip
    );
  }

  //Checking for angle at right shoulder. If present, then calculate the angle, else let it remain -1
  if (
    "rightShoulder" in jointCoords &&
    "rightElbow" in jointCoords &&
    "rightHip" in jointCoords
  ) {
    jointAngles.rightShoulderAngle = getAngles(
      jointCoords.rightElbow,
      jointCoords.rightShoulder,
      jointCoords.rightHip
    );
  }

  //Checking for angle at left hip. If present, then calculate the angle, else let it remain -1
  if (
    "leftHip" in jointCoords &&
    "leftShoulder" in jointCoords &&
    "leftKnee" in jointCoords
  ) {
    jointAngles.leftHipAngle = getAngles(
      jointCoords.leftShoulder,
      jointCoords.leftHip,
      jointCoords.leftKnee
    );
  }

  //Checking for angle at right hip. If present, then calculate the angle, else let it remain -1
  if (
    "rightShoulder" in jointCoords &&
    "rightHip" in jointCoords &&
    "rightKnee" in jointCoords
  ) {
    jointAngles.rightHipAngle = getAngles(
      jointCoords.rightShoulder,
      jointCoords.rightHip,
      jointCoords.rightKnee
    );
  }

  //Checking for angle at left knee. If present, then calculate the angle, else let it remain -1
  if (
    "leftKnee" in jointCoords &&
    "leftHip" in jointCoords &&
    "leftAnkle" in jointCoords
  ) {
    jointAngles.leftKneeAngle = getAngles(
      jointCoords.leftHip,
      jointCoords.leftKnee,
      jointCoords.leftAnkle
    );
  }

  //Checking for angle at right knee. If present, then calculate the angle, else let it remain -1
  if (
    "rightKnee" in jointCoords &&
    "rightHip" in jointCoords &&
    "rigthAnkle" in jointCoords
  ) {
    jointAngles.rightKneeAngle = getAngles(
      jointCoords.rightHip,
      jointCoords.rightKnee,
      jointCoords.rightAnkle
    );
  }

  return jointAngles;
}