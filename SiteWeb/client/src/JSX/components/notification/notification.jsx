import { Snackbar } from '@material-ui/core';
import React from 'react'
import { Alert } from '@material-ui/lab';
import { useState } from "react";

export default function Notification(props) {
    const handleNotifyClose = props.handleNotifyClose
    const { notify, setNotify } = props;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotify({
            ...notify,
            isOpen: false
        })
    }


    return (

        <Snackbar
            open={notify.isOpen}
            autoHideDuration={3000}
            onClose={handleClose}

        >
            <Alert
                onClose={() => handleClose}
                severity={notify.type}>
                {notify.message}
            </Alert>

        </Snackbar>
    )
}
