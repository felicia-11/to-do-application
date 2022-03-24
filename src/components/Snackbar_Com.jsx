import React from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackbarCom(props) {
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={props.open}
            autoHideDuration={3000}
            onClose={props.handleClose}
        >
            <Alert onClose={props.handleClose} severity={props.severity}>
                {props.message}
            </Alert>
        </Snackbar>
    );
}
