import React, { useEffect, useState } from 'react';

import { Button } from '../../../components/Button/Button';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';

import './Signup.scss';
import { Label } from '../../../components/Label/Label';
import Loader from '../../../components/Loader/Loader';
import WebService from '../../../utility/WebService';
import tick from '../../../assets/images/tick.png';
import AuthHeader from '../../../components/AuthHeader/AuthHeader';

const SignUp = () => {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const watchAllFields = watch();
    let history = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [countryData, setCountryData] = useState([]);
    const [stateData, setStateData] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        getCountryList() // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getCountryList = () => {
        setLoading(true)
        WebService.getAPI({
            action: 'SaiSetupCountry/GetAll/en-US',
            body: null
        })
            .then((res: any) => {
                setCountryData(res)
                getStateList()
                setLoading(false)
            })
            .catch((e) => {
                setLoading(false)
            })
    }

    const getStateList = () => {
        setLoading(true)
        WebService.getAPI({
            action: 'SaiSetupState/GetAll/en-US',
            body: null
        })
            .then((res: any) => {
                setStateData(res)
                setLoading(false)
            })
            .catch((e) => {
                setLoading(false)
            })
    }

    const onSubmit = (data: any) => {
        setLoading(true)
        WebService.postAPI({
            action: 'Prospects',
            body: data
        })
            .then((res: any) => {
                console.log("res", res)
                reset()
                setLoading(false)
                setShow(!show)
            })
            .catch((e) => {
                setLoading(false)
            })
    }

    return (
        <>
            <Loader show={isLoading} />
            <AuthHeader />
            <div className='col-12 d-flex justify-content-center h-100'>
                <div className='signup-main'>
                    <span className='signup-heading'>Create Account</span>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='signupContainer form-style col-12 row'>
                            <div className='col-6'>
                                <Label title='First Name' showStar={true} />
                                <input className='form-control input' type="text" {...register("FirstName", { required: true })} placeholder='Enter first name' />
                                {errors.FirstName && <Label title={'Please enter first name.'} modeError={true} />}
                            </div>
                            <div className='col-6'>
                                <Label title='Last Name' showStar={true} />
                                <input className='form-control input' type="text" {...register("LastName", { required: true })} placeholder='Enter last name' />
                                {errors.LastName && <Label title={'Please enter last name.'} modeError={true} />}
                            </div>
                            <div className='col-6'>
                                <Label title='Job Title' showStar={true} />
                                <input className='form-control input' type="text" {...register("JobTitle", { required: true })} placeholder='Enter job title' />
                                {errors.JobTitle && <Label title={'Please enter job title.'} modeError={true} />}
                            </div>
                            <div className='col-6'>
                                <Label title='Company Name' showStar={true} />
                                <input className='form-control input' type="text" {...register("CompanyName", { required: true })} placeholder='Enter company name' />
                                {errors.CompanyName && <Label title={'Please enter company name.'} modeError={true} />}
                            </div>
                            <div className='col-12'>
                                <Label title='Email' showStar={true} />
                                <input className='form-control input' type="text" {...register("Email", { required: true, pattern: /^\S+@\S+$/i })} placeholder='Enter email' />
                                <span className='emailMsg'>You will not be able to change your email as this will be your username</span>
                                {errors.Email && <Label title={'Please enter valid email.'} modeError={true} />}
                            </div>
                            <div className='col-6'>
                                <Label title='Country' showStar={true} />
                                <div>
                                    <select className='form-control custom-select' {...register("Country", { required: true })} placeholder='Select'>
                                        {countryData.map((res) => {
                                            return (
                                                <option value={res['Code']}>{res['Name']}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                {errors.Country && <Label title={'Please select country.'} modeError={true} />}
                            </div>
                            <div className='col-6'>
                                <Label title='State' showStar={true} />
                                <select className='form-control custom-select' {...register("State", { required: true })} placeholder='Select'>
                                    <option value="" disabled selected>Select</option>
                                    {watchAllFields.Country === 'US' ?
                                        stateData.map((res) => {
                                            return (
                                                <option value={res['Code']}>{res['Name']}</option>
                                            )
                                        })
                                        : null}
                                </select>
                                {errors.State && <Label title={'Please select state.'} modeError={true} />}
                            </div>
                            <div className='col-6'>
                                <Label title='Phone' showStar={true} />
                                <input className='form-control input' type="text" {...register("PhoneNumber", { required: true })} placeholder='Enter phone number' />
                                {errors.PhoneNumber && <Label title={'Please enter phone.'} modeError={true} />}
                            </div>
                            <div className='col-6'>
                                <Label title='Establishment Type' showStar={true} />
                                <select className='form-control custom-select' {...register("BusinessType", { required: true })} placeholder='Select'>
                                    <option value="" disabled selected>Select</option>
                                    <option value="Mr">Residential</option>
                                    <option value="Mrs">Commercial</option>
                                    <option value="Mrs">Both</option>
                                </select>
                                {errors.BusinessType && <Label title={'Please select establishment type.'} modeError={true} />}
                            </div>
                            <div className='col-6'>
                                <Label title='# of Office Users' showStar={true} />
                                <input className='form-control input' type="text" {...register("OfficeUsersCount", { required: true })} placeholder='Enter no. of office users' />
                                {errors.OfficeUsersCount && <Label title={'Please enter office users.'} modeError={true} />}
                            </div>
                            <div className='col-6'>
                                <Label title='# of Remote Users' showStar={true} />
                                <input className='form-control input' type="text" {...register("RemoteUsersCount", { required: true })} placeholder='Enter no. of remote users' />
                                {errors.RemoteUsersCount && <Label title={'Please enter remote users.'} modeError={true} />}
                            </div>
                            <div className='col-12 mb-4'>
                                <Label title='Comments' />
                                <input className='form-control input h-100 w-100' type="text" {...register("Comments", { required: true })} placeholder='Enter comment' />
                            </div>
                            <div className='bottom-buttons col-12 mb-4 row text-center'>
                                <div className='col-12 d-flex align-item-center justify-content-center'>
                                    <div className='w-25'>
                                        <Button size={'large'} label='Create Account' b_type='SIGNUP' />
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <button className='b1-signup' onClick={() => history(`/login`)}><span className='login'>{'Log In'}</span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div >


            <Modal show={show} onHide={() => setShow(false)}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton className='border-0'>
                </Modal.Header>
                <Modal.Body className='align-self-center'>
                    <img src={tick} className='tick-image' alt='tick' />
                    <p className='thankyou'>Thank you!</p>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default SignUp;