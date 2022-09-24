import React, { useState } from 'react';
import { Button } from '../../components/Button/Button';
import { Label } from '../../components/Label/Label';
import WebService from '../../utility/WebService';
import TextEditor from '../TextEditor/TextEditor';
import './NotesModal.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../config/Store';
import { APIState } from '../../reducer/CommonReducer';
import Loader from '../Loader/Loader';
import { getServiceMaster } from '../../utility/CommonApiCall';
import { Dispatch } from "redux";
import { SDMaster } from '../../action/CommonAction';
import { useNavigate, useOutletContext } from "react-router-dom";

interface PropData {
    close: any
    title: string,
    data: any
}

const NotesModal = (props: PropData) => {
    const [isLoading, setLoading] = useState(false)
    const value: any = useSelector<RootState, APIState>(state => state.sdMaster)
    const user_info = JSON.parse(localStorage.getItem('user_detail') || "{}");
    const dispatch: Dispatch<any> = useDispatch()
    let previousData = props.data
    const data: any = useOutletContext();


    console.log(previousData)
    const onCancel = () => {
        props.close()
    }

    const currentValue = (value: any) => {
        previousData = value;
    }

    const onSave = () => {
        setLoading(true)
        const url = props.title === 'Internal Notes' ? `SDServiceMaster/${value.sd_master.Id}_${user_info['AccountId']}_${user_info['CompanyId']}/UpdateNotes` : `SDServiceMaster/${value.sd_master.Id}_${user_info['AccountId']}_${user_info['CompanyId']}/UpdateInternalNotes`;
        WebService.putAPI({
            action: url,
            body: {
                Notes: previousData
            }
        })
            .then((res: any) => {
                getServiceMaster({ data, user_info })
                    .then((res) => {
                        dispatch(SDMaster({ SDserviceMaster: res, ARCustomerMaster: value.ar_master, Address: value.address}))
                    })
                    .catch((e) => {

                    })
                props.close()
                setLoading(false)
            })
            .catch((e) => {
                props.close()
                setLoading(false)
            })
    }

    return (
        <>
            <Loader show={isLoading} />
            <div className='notes-edit-view'>
                <Label title={props.title} />
                <TextEditor data={previousData} editedData={currentValue} />
                <div className='col-12 d-flex row justify-content-center mt-5 mb-4'>
                    <div className='col-3'>
                        <Button size='large' label='Cancel' b_type='CANCEL' onClick={() => onCancel()} />
                    </div>
                    <div className='col-3'>
                        <Button size='large' label='Save' b_type='SAVE' onClick={() => onSave()} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotesModal;