import React, { Component } from 'react';
import { Grid } from '@mui/material';
import { getToDoLists } from '../logic/APIHandler';
import LoadingCom from '../components/Loading_Com';
import SnackbarCom from '../components/Snackbar_Com';
import BoxContainerCom from '../components/BoxContainer_Com';
import '../styles/pages/ToDo_Styles.css';

export default class ToDo_Page extends Component {

    constructor(props) {
        super(props);
        this.state = {

            // Page State
            isLoading: false,

            // Snackbar State
            isSnackbarOpen: false,
            snackbarType: '',
            snackbarMessage: '',

            // Data State
            toDoLists: null,
            finishedTasks: null,

        };
        this.initializeToDoListData = this.initializeToDoListData.bind(this);
    }

    async initializeToDoListData() {
        this.setState({ isLoading: true });
        const resp = await getToDoLists();
        if ( resp[0] && resp[0].length > 0 ) {
            // Handle unfinished tasks
            let toDoData = resp[0].filter(res => res.status === 0);
            toDoData = toDoData.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt));
            // Handle finished tasks
            let finishedData = resp[0].filter(res => res.status === 1);
            finishedData = finishedData.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
            this.setState({
                toDoLists: toDoData,
                finishedTasks: finishedData,
                isLoading: false,
            });
        }
        else {
            this.setState({
                isSnackbarOpen: true,
                snackbarType: 'error',
                snackbarMessage: resp[1],
                isLoading: false,
            });
        }

    }

    componentDidMount() {
        this.initializeToDoListData();
    }

    render() {
        return (
            <div id='to-do-bg'>
                <Grid container>
                    { this.state.isLoading ?
                        <LoadingCom /> : <></>
                    }
                    <SnackbarCom
                        open={this.state.isSnackbarOpen}
                        severity={this.state.snackbarType}
                        message={this.state.snackbarMessage}
                        handleClose={() => this.setState({ isSnackbarOpen: false })}
                    />
                    <Grid item xs={12}>
                        <h1 id='to-do-title' className='white-text'>
                            TO DO LISTS
                        </h1>
                    </Grid>
                    <Grid item xs={12} sm={6} className='to-do-column'>
                        <BoxContainerCom
                            type='to-do-list'
                            title='To Do Lists'
                            data={this.state.toDoLists}
                            />
                    </Grid>
                    <Grid item xs={12} sm={6} className='to-do-column'>
                        <BoxContainerCom
                            type='to-do-list-finished'
                            title='Finished Tasks'
                            data={this.state.finishedTasks}
                        />
                    </Grid>
                </Grid>
            </div>
        )
    }
}
