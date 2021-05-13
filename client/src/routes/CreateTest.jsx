import './index.css';
import React from 'react';

class CreateTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          patientName:'',
          testName:'',
          jointName:'',
          relaxAngle:0.0,
          flexAngle:0.0,
          numReps:0
        };
    }

    setPatientName = (event) => {
        this.setState({patientLName: event.target.value});
    }

    setPtLName = (event) => {
      this.setState({patientLName: event.target.value});
    }

    setJointName = (event) => {
      this.setState({jointName: event.target.value});
    }

    setRelaxAngle = (event) => {
      this.setState({relaxAngle: event.target.value});
    }

    setFlexAngle = (event) => {
      this.setState({flexAngle: event.target.value});
    }

    setReps = (event) => {
      this.setState({numReps: event.target.value});
  }

    handleSubmit = () => {
      console.log(JSON.stringify(this.state));
    }
    
    render() {
        return (
            <div className="CreateTest">
                <h1>Create a Test</h1>
                <div className="Form">
                  <form>
                  <div className="form-group">
                      <label htmlFor="formtestNameInput">Name of the Patient</label>
                      <select value={this.state.patientName} onChange={this.setPatientName} className="custom-select">
                        <option defaultValue>Select a Patient</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="formtestNameInput">Name of the Test</label>
                      
                      <input type="text"
                        className="form-control"
                        id="testNameInput"
                        placeholder="eg. John's Elbow Recovery"
                        value={this.state.testName}
                        onChange={this.setTestName} />
                    </div>

                    <br></br><hr></hr>

                    <div className="form-group">
                      <label htmlFor="formtestNameInput">Choose the Joint</label>
                      <select value={this.state.jointName} onChange={this.setJointName} className="custom-select">
                        <option defaultValue>Select an Option</option>
                        <option value="leftShoulder">Left Shoulder</option>
                        <option value="rightShoulder">Right Shoulder</option>
                        <option value="leftElbow">Left Elbow</option>
                        <option value="rightElbow">Right Elbow</option>
                        <option value="leftHip">Left Hip</option>
                        <option value="rightHip">Right Hip</option>
                        <option value="leftKnee">Left Knee</option>
                        <option value="rightKnee">Right Knee</option>
                        <option value="leftAnkle">Left Ankle</option>
                        <option value="rightAnkle">Right Ankle</option>
                      </select>

                      <small id="testNameHelp" 
                        className="form-text text-muted">Joint about which you want to measure the ROM</small>
                    </div>
                    <div className="form-group">
                      <div className="form-row">
                        <div className="col">
                          <input type="text" className="form-control" placeholder="Relaxed Angle" />
                        </div>
                        <div className="col">
                          <input type="text" className="form-control" placeholder="Flexed Angle" />
                        </div>
                      </div>
                    </div>

                    <div className="form-row align-items-center">
                      <div className="col-auto">
                        <label htmlFor="inlineFormInput">Number of Repititions</label>
                        <input type="text" className="form-control mb-2" placeholder="Reps"
                          value={this.state.numReps} onChange={this.setReps} />
                      </div>
                    </div>
                    <br></br>
                  </form>
                  <button onClick={this.handleSubmit} className="btn btn-primary">Submit</button>
                </div>
            </div>
        );
    }
}

export default CreateTest;