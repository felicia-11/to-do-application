import React, { Component } from 'react';
import moment from 'moment';
import { Grid } from '@mui/material';
import { getToDoLists } from '../logic/APIHandler';
import LoadingCom from '../components/Loading_Com';
import SnackbarCom from '../components/Snackbar_Com';
import ToDoModalCom from '../components/ToDoModal_Com';
import BoxContainerCom from '../components/BoxContainer_Com';
import '../styles/pages/ToDo_Styles.css';

export default class ToDo_Page extends Component {

    constructor(props) {
        super(props);
        this.state = {

            // Page State
            isLoading: false,
            isModalShow: false,
            modalKey: '0',

            // Snackbar State
            isSnackbarOpen: false,
            snackbarType: '',
            snackbarMessage: '',

            // Modal State
            modalType: '',
            modalTitle: '',

            // Data State
            lastId: 0,
            toDoLists: null,
            finishedTasks: null,
            selectedTask: { id: "0" },

        };
        this.initializeToDoListData = this.initializeToDoListData.bind(this);
        this.handleTaskAction = this.handleTaskAction.bind(this);
        this.handleModalSubmit = this.handleModalSubmit.bind(this);
    }

    /**
     * Get initial data from API
     */
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
                lastId: resp[0][resp[0].length - 1].id,
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

    /**
     * Open modal
     * @param id task's ID
     * @param action task action
     * @param status task status
     */
    handleTaskAction(id, action, status) {
        if ( !this.state.isModalShow ) {
            if ( action === 'delete' ) {
                const selectedItem = this.state.toDoLists.filter(res => res.id === id);
                this.setState({
                    modalTitle: 'Hapus data?',
                    modalType: 'delete-task',
                    selectedTask: selectedItem[0],
                    isModalShow: true,
                });
            }
            else if ( action === 'update' ) {
                let selectedItem = null;
                if ( status === 'to-do' ) {
                    selectedItem = this.state.toDoLists.filter(res => res.id === id);
                }
                else if ( status === 'done' ) {
                    selectedItem = this.state.finishedTasks.filter(res => res.id === id);
                }
                this.setState({
                    modalTitle: 'Update task?',
                    modalType: 'update-task',
                    selectedTask: selectedItem[0],
                    isModalShow: true,
                });
            }
        }
        else {
            this.setState({
                isModalShow: false,
            });
        }
        this.setState({
            modalKey: parseInt(this.state.modalKey) + 1 + "",
        });
    }

    /**
     * Handle submit button for To Do Modal
     * @param data new task data
     * @param type action type
     */
    handleModalSubmit(data, type, prevData) {
        if ( type === 'delete' ) {
            let result = this.state.toDoLists;
            result = result.filter(res => res.id !== this.state.selectedTask.id);
            this.setState({
                toDoLists: result,
                isModalShow: false,
            });
        }
        else if ( type === 'update' ) {
            if ( prevData.status === 0 && !data.status ) {
                let result = this.state.toDoLists;
                result.forEach(res => {
                    if ( res.id === prevData.id ) {
                        res.title = data.title;
                        res.description = data.description;
                        res.status = data.status;
                    }
                });
                this.setState({
                    toDoLists: result,
                    isModalShow: false,
                });
            }
            else if ( prevData.status === 0 && data.status ) {
                // Update finished tasks
                let updatedTask = this.state.toDoLists.filter(res => res.id === prevData.id)[0];
                updatedTask.title = data.title;
                updatedTask.description = data.description;
                updatedTask.status = data.status;
                let newFinishedTasks = this.state.finishedTasks;
                newFinishedTasks.push(updatedTask);
                // Update to do lists
                let newToDoLists = this.state.toDoLists;
                newToDoLists = newToDoLists.filter(res => res.id !== prevData.id);
                this.setState({
                    toDoLists: newToDoLists,
                    finishedTasks: newFinishedTasks,
                    isModalShow: false,
                });
            }
            else if ( prevData.status === 1 && data.status ) {
                let result = this.state.finishedTasks;
                result.forEach(res => {
                    if ( res.id === prevData.id ) {
                        res.title = data.title;
                        res.description = data.description;
                        res.status = data.status;
                    }
                });
                this.setState({
                    finishedTasks: result,
                    isModalShow: false,
                });
            }
            else if ( prevData.status === 1 && !data.status ) {
                // Update to do lists
                let updatedTask = this.state.finishedTasks.filter(res => res.id === prevData.id)[0];
                updatedTask.title = data.title;
                updatedTask.description = data.description;
                updatedTask.status = data.status;
                let newToDoLists = this.state.toDoLists;
                newToDoLists.push(updatedTask);
                // Update finished tasks
                let newFinishedTasks = this.state.finishedTasks;
                newFinishedTasks = newFinishedTasks.filter(res => res.id !== prevData.id);
                this.setState({
                    toDoLists: newToDoLists,
                    finishedTasks: newFinishedTasks,
                    isModalShow: false,
                });
            }
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
                    <ToDoModalCom
                        key={this.state.modalKey}
                        type={this.state.modalType}
                        title={this.state.modalTitle}
                        open={this.state.isModalShow}
                        data={this.state.selectedTask}
                        handleSubmit={this.handleModalSubmit}
                        onClose={this.handleTaskAction}
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
                            handleTaskAction={(id, act) => this.handleTaskAction(id, act, 'to-do')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} className='to-do-column'>
                        <BoxContainerCom
                            type='to-do-list-finished'
                            title='Finished Tasks'
                            data={this.state.finishedTasks}
                            handleTaskAction={(id, act) => this.handleTaskAction(id, act, 'done')}
                        />
                    </Grid>
                </Grid>
            </div>
        )
    }
}
