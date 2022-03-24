import React, { Component } from 'react';
import { CircularProgress } from '@mui/material';
import '../styles/components/Loading_Styles.css';

export default class Loading_Com extends Component {
    render() {
        return (
            <div id='bg-loading'>
                <CircularProgress color='inherit' id='load-spinner' />
            </div>
        )
    }
}
