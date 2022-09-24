import React, { useState } from 'react';
import { Button } from '../../components/Button/Button';
import './ForgotPasswordModal.scss';
import { useForm, Controller } from 'react-hook-form';
import Loader from '../Loader/Loader';
import WebService from '../../utility/WebService';
import { toast } from 'react-toastify';

interface PropData {
    close: any,
}


const ForgotPasswordModal = (props: PropData) => {
    const [isLoading, setLoading] = useState(false);
    const { register, handleSubmit, watch, reset, control } = useForm();

    const onSubmit = (data: any) => {
        setLoading(true)
        WebService.postAPI({
            action: "Account/ForgotPassword",
            body: data,
        })
            .then((res: any) => {
                setLoading(false)
                onCancel()
                toast.success("Please follow instructions sent in the email to reset your password.")
            })
            .catch((e: any) => {
                console.log(e)
                setLoading(false)
            });
    }

    const onCancel = () => {
        props.close()
    }

    return (
        <>
            <Loader show={isLoading} />
            <div className='forgot-password'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='form-style'>
                        <div className='heading'>Please type in your e-mail address below and we'll e-mail you instructions to reset your password</div>
                        <input className='form-control' {...register("Email", { required: true })} />
                        <div className='col-12 d-flex row justify-content-end mt-5 mb-4'>
                            <div className='col-3'>
                                <Button size='large' label='Reset' b_type='SAVE' />
                            </div >
                            <div className='col-3'>
                                <Button size='large' label='Cancel' b_type='CANCEL' onClick={() => onCancel()} />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ForgotPasswordModal;