import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Attendance extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        this.addMemberRow = this.addMemberRow.bind(this);
    }

    addMemberRow(member, i) {
        return (
            <tr key={i}>
                <td>{member.name}</td>
                <td>{member.id}</td>
            </tr>
        )
    }

    render() { 
        return (
            <div>
                <h2>Total Attendance - {this.props.audience.length}</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Audience Members</th>
                            <th>Socket IDs</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.audience.map(this.addMemberRow) }
                    </tbody>
                </table>
            </div>
        );
    }
}

Attendance.propTypes = {
    audience: PropTypes.array,
}
 

export default Attendance;