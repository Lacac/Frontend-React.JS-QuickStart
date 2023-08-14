import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ProductManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleChangeInput = (event, id) => {
        // C1: not good
        // this.state[id] = event.target.value;
        // this.setState({
        //     ...this.state
        // })

        // c2: ....
        // console.log(id, event.target.value);
        // this.setState({
        //     id: event.target.value
        // })

        // c3: good

        let copyState = { ...this.state };
        // console.log('check copyState_1', copyState);
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        }, () => {
            // console.log('check good state: ', this.state)
        })
        // console.log('check copyState_2', copyState)
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i<arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }
    
    
    
    handleAddNewUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            this.props.createNewUser(this.state);
            console.log('data modal ', this.state);
        }
        
    }


    render() {
        // console.log('check child props: ', this.props);
        // console.log('check child open modal: ', this.props.isOpen)
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                centered
            >
                <ModalHeader toggle={() => { this.toggle() }}>Create a new user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='text'
                                onChange={(event) => { this.handleChangeInput(event, "email") }}
                                value={this.state.email}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type='password'
                                onChange={(event) => { this.handleChangeInput(event, "password") }}
                                value={this.state.password}
                            />
                        </div>
                        <div className='input-container'>
                            <label>First name</label>
                            <input type='text'
                                onChange={(event) => { this.handleChangeInput(event, "firstName") }}
                                value={this.state.firstName}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Last name</label>
                            <input type='text'
                                onChange={(event) => { this.handleChangeInput(event, "lastName") }}
                                value={this.state.lastName}
                            />
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <input type='text'
                                onChange={(event) => { this.handleChangeInput(event, "address") }}
                                value={this.state.address}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className="px-3" color="primary" onClick={() => { this.handleAddNewUser() }}>Save changes</Button>{' '}
                    <Button className="px-3" color="secondary" onClick={() => { this.toggle() }}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);
