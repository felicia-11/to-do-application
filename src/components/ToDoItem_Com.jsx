import React, { Component } from 'react';
import { Checkbox, FormControlLabel, Grid, Tooltip } from '@mui/material';
import PageviewIcon from '@mui/icons-material/Pageview';
import DeleteIcon from '@mui/icons-material/Delete';
import '../styles/components/ToDoItem_Styles.css';

export default class ToDoItem_Com extends Component {
    render() {
        return (
            <Grid container className='to-do-item-container'>
                <Grid item xs={10}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name={this.props.data.id + ""}
                                onChange={(e) => console.log(e.target.name)}
                            />
                        }
                        label={this.props.data.title}
                        className='checkbox-label'
                    />
                </Grid>
                <Grid item xs={2} className='icon-container'>
                    <Tooltip title='Lihat Detail'>
                        <PageviewIcon />
                    </Tooltip>
                    { this.props.type === 'to-do-list' ?
                        <Tooltip title='Hapus Task'>
                            <button
                                className='icon-btn'
                                onClick={() => this.props.deleteTask(this.props.data.id, 'delete')}
                            >
                                <DeleteIcon />
                            </button>
                        </Tooltip> : <></>
                    }
                </Grid>
            </Grid>
        )
    }
}
