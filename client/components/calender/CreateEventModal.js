import React from 'react';
import Modal from 'react-modal';
import {isEmpty} from '../../utils/common';

class CreateEventModal extends React.Component {
    constructor(props) {
        super(props);
        this.init();

    }
    init=()=>{
        this.state = {
            eventStartTime: 2,
            isError: false,
            error:{}
        }
    }

    getPmEventTime = (amStart) => {
        var pmEventTime = [];
        var start = 1;
        var key = 10;
        while (start <= 9) {
            ++amStart;
            pmEventTime.push(<EventTimeDropDown value={amStart} time={start} meridian={" pm"} key={key++}/>);
            ++amStart;
            if(amStart<=23){
                pmEventTime.push(<EventTimeDropDown value={amStart} time={start + ":30"} meridian={" pm"} key={key++}/>);

            }

            start++;
        }
        return pmEventTime;
    }

    changeEventTime = (event) => {
        this.setState({eventStartTime: event.target.value});

    }
    validateForm  = () => {
        var error = {};
        if (this.eventName.value.trim() == '') {
            error.eventName = "Required Field!";
        }
        if (this.numberOfSlots.value.trim() == '') {
            error.numberOfSlots = "Required Field!";
        }

        return {
            isError:!isEmpty(error),
            error
        }

    }


    createEvent = () => {
        this.setState({error:{}});
        const {error,isError}= this.validateForm();
        if(!isError) {
            var isValid = this.props.createEvent(
                {
                    eventStartTime: parseInt(this.state.eventStartTime),
                    eventName: this.eventName.value,
                    numberOfSlots: parseInt(this.numberOfSlots.value)
                });
            if(!isValid) {
                this.setState({error: {numberOfSlots:"Oops! Event time is overlapping!"}});
            }
        }else{
            this.setState({error:error});
        }
    }

    componentWillUnmount(){
        this.init();
    }

    render() {

        const {eventStartTime, error} = this.state;
        const {hideAddModal} = this.props;
        var isError = !isEmpty(error);
        const customStyles = {
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',

            }
        };
        var amStart = 0;
        return (
            <Modal
                isOpen={this.props.show}
                style={customStyles}
            >

                <div className="modalHeading">
                    <span>Create A New Event</span>
                    <span className="close" onClick={hideAddModal}>&times;</span>
                </div>
                <div className="form-group" style={{"marginLeft": "10px"}}>
                    <div className="eventNameDiv divSpacing">
                        <label htmlFor="eventName" style={{"marginBottom": "11px"}}>Enter Event </label>
                        <input required type="text" id="eventName" ref={input => {
                            this.eventName = input;
                        }}/>
                        {isError&&!isEmpty(error.eventName)?<a className="errorDisplay">{error.eventName}</a>:""}
                    </div>
                    <div className="eventNameDiv divSpacing">
                        <label htmlFor="eventName" style={{"marginBottom": "11px"}}>Number Of Event Slots </label>
                        <input required type="text" id="eventName" ref={input => {
                            this.numberOfSlots = input;
                        }}/>
                        {isError&&!isEmpty(error.numberOfSlots)?<a className="errorDisplay">{error.numberOfSlots}</a>:""}
                    </div>

                    <div className="timeDropdown divSpacing">
                        <label htmlFor="selectTime" style={{"marginBottom": "11px"}}>Start Time:</label>
                        <select required className="selectSlot" id="selectTime" value={eventStartTime}
                                onChange={this.changeEventTime} style={{"padding": "6px 0"}}>
                            {[9, "9:30", 10, "10:30", 11, "11:30"].map(time => {
                                ++amStart;
                                return <EventTimeDropDown value={amStart} time={time} meridian={" am"}
                                                          key={time + "am"}/>
                            })}
                            {[12, "12:30"].map(time => {
                                ++amStart;
                                return <EventTimeDropDown value={amStart} time={time} meridian={" n"}
                                                          key={time + "noon"}/>
                            })}
                            {this.getPmEventTime(amStart)}
                        </select>
                    </div>
                    <div className="submitEvent divSpacing" style={{"marginTop": "10px", "paddingTop": "13px"}}>
                        <button className="addEventBtn" onClick={this.createEvent}>Add Event</button>
                    </div>
                </div>


            </Modal>

        );
    }
}

class EventTimeDropDown extends React.Component {


    render() {
        const {time, meridian, value} = this.props;
        return (


            <option value={value}>{time} {meridian}</option>


        );
    }

}

export default CreateEventModal;

