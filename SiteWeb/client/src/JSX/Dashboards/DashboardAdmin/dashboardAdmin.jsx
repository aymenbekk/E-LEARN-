import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from '../../../actions/loginActions';
import UploadAction from '../../../actions/uploadActions'
import DownloadAction from '../../../actions/downloadActions';

import { UploadStudents, UploadTeachers } from '../../upload'

function DashboardAdmin() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const auth = useSelector(state => state.auth)



    useEffect(() => {

        dispatch(isUserLoggedIn())

    }, []);

    if (!auth.authenticated) {
        navigate('/login')
    }

    return (
        <div>


            <div className="container">


                dashboardAdmin
                dashboardAdmin
                dashboardAdmin
                dashboardAdmin
                dashboardAdmin
                dashboardAdmin
                dashboardAdmin


                <br></br>
                <UploadStudents />

                <br></br>

                <UploadTeachers />

                <br></br>

                <DownloadAction />

            </div></div>
    )
}
export default DashboardAdmin;
