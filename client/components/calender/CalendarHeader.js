import React from 'react';


class CalendarHeader extends React.Component {

    render() {
        const {currentDate,nextDateClick,previousDateClick,todayClick,addEvent} = this.props;
        return (

                <div className="jumbotron headerContainer">
                    <div className="col-sm-3 col-md-4 col-lg-4 headerLeft">
                        <div className="todayBtn">
                            <button className="todayBtn" onClick={todayClick}>Today</button>
                        </div>
                        <div className="arrowBtnGrp">
                            <a className="moveLeftSec">
                                <button className="leftBtn"  onClick={previousDateClick}>
                                    <span className="fa-icon fa-icon-left-single-arrow" ></span>
                                </button>
                            </a>
                            <a className="moveRightSec">
                                <button className="rightBtn" onClick={nextDateClick}>
                                    <span className="fa-icon fa-icon-right-single-arrow"></span>
                                </button>
                            </a>

                        </div>
                    </div>
                    <div className="col-sm-2 col-md-4 col-lg-6 headerMid">{currentDate}</div>
                    <div className="col-sm-7 col-md-4 col-lg-2 headerRight">
                        <button className="addBtn" onClick={addEvent}>Add</button>
                    </div>
                </div>
        );
    }

}

export default CalendarHeader;
