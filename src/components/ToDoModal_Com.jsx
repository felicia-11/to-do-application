import React, { Component } from 'react';
import { Modal, Grid, Button } from '@mui/material';
import '../styles/components/Modal_Styles.css';

export default class ToDoModal_Com extends Component {

    // HTML for Modal
    modalBody = (
        <div className='modal-body'>
            <h2 className='modal-title'>{this.props.title}</h2>
            { this.props.type === 'delete-task' ?
                <p>Judul: {this.props.data.title}</p>
              :
                <></>
            }
            <Grid container>
                { this.props.type.includes('delete') ?
                    <Grid item xs={6}>
                        <Button
                            variant='contained'
                            color='error'
                            onClick={this.props.handleSubmit}
                        >
                            Hapus
                        </Button>
                    </Grid>
                  :
                    <Grid item xs={6}>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={this.props.handleSubmit}
                        >
                            Ya
                        </Button>
                    </Grid> 
                }
                <Grid item xs={6}>
                    <Button
                        variant='contained'
                        className='cancel-btn'
                        onClick={this.props.onClose}
                    >
                        Tidak
                    </Button>
                </Grid>
            </Grid>
        </div>
    );

    render() {
        return (
            <Modal
                open={this.props.open}
                onClose={this.props.onClose}
                className="custom-modal"
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {this.modalBody}
            </Modal>
        )
    }
}
