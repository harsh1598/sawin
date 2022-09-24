import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from '../../components/Button/Button';
import WebService from '../../utility/WebService';
import './GoogleAddressModal.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../config/Store';
import { SearchState } from '../../reducer/CommonReducer';
import Loader from '../Loader/Loader';
import { Dispatch } from "redux";
import { AddAddress } from '../../action/CommonAction';

interface PropData {
    close: any,
    data: any,
    updateData: any,
}

const GoogleAddressModal = (props: PropData) => {
    const [isLoading, setLoading] = useState(false);
    const [googleResult, setGoogleResult] = useState(Object);
    const search: any = useSelector<RootState, SearchState>(state => state.search)
    const user_info = JSON.parse(localStorage.getItem('user_detail') || "{}");
    const [enteredAddress, setEnteredAddress] = useState(false);
    const [recommendedAddress, setRecommendedAddress] = useState(false);
    const addressData = props.data
    const dispatch: Dispatch<any> = useDispatch()

    useEffect(() => {
        getGoogleAddress()
    }, [])

    const getGoogleAddress = () => {
        axios.get(`https://maps.google.com/maps/api/geocode/json?key=AIzaSyC7dXZ5VVpf5ILgqLTacCyQwPzXLIghKfg&address=${props?.data?.ARCustomerMaster?.Address1} ${props?.data?.ARCustomerMaster?.Address2} ${props?.data?.ARCustomerMaster?.City} ${props?.data?.ARCustomerMaster?.State} ${props?.data?.ARCustomerMaster.ZipCode}`)
            .then((res) => {
                setGoogleResult(res.data && res.data.results[0])
            })
            .catch((e) => {
            })
    }

    const onSave = () => {
        if (window.location.pathname === '/new-service-master') {
            var value = localStorage.getItem('MODAL_TYPE')
            var requestedBody = addressData
            if (recommendedAddress) {
                requestedBody.ARCustomerMaster.Address1 = googleResult.formatted_address
                requestedBody.type = value
            }
            dispatch(AddAddress(requestedBody))
            props.close()
        } else {
            if (recommendedAddress || enteredAddress) {
                var requestedBody = addressData
                if (recommendedAddress) {
                    requestedBody.Address1 = googleResult.formatted_address
                    requestedBody.Address2 = ''
                    requestedBody.City = ''
                    requestedBody.State = ''
                    requestedBody.ZipCode = ''
                } else {
                    var requestedBody = addressData
                }
                setLoading(true)
                WebService.putAPI({
                    action: `SDServiceMaster/${search?.searchData.Id}_${user_info['AccountId']}_${user_info['CompanyId']}/PutStep1`,
                    body: requestedBody
                })
                    .then((res: any) => {
                        props.close()
                        setLoading(false)
                    })
                    .catch((e) => {
                        props.close()
                        setLoading(false)
                    })
            }
        }
    }

    const onCheck = (value: string) => {
        if (value === 'ENTERED') {
            setEnteredAddress(true)
            setRecommendedAddress(false)
        } else {
            setEnteredAddress(false)
            setRecommendedAddress(true)
        }

    }

    const onCancel = () => {
        props.close()
    }

    return (
        <>
            <Loader show={isLoading} />
            <div className='col-12 d-flex row google-address'>
                <div className='col-5 address-box d-flex row'>
                    <div className='col-1 mt-3'>
                        <input type="radio" className="checkbox" defaultChecked={enteredAddress} checked={enteredAddress} onChange={() => onCheck('ENTERED')} />
                    </div>
                    <div className='col-11'>
                        <div className='entered-title'>You entered</div>
                        <div className='address-text'>{props?.data?.ARCustomerMaster?.Address1} {props?.data?.ARCustomerMaster?.Address2}</div>
                        <div className='address-text'>{props?.data?.ARCustomerMaster?.City}, {props?.data?.ARCustomerMaster?.State}, {props?.data?.ARCustomerMaster.ZipCode}</div>
                    </div>
                </div>
                <div className='col-5 address-box d-flex row'>
                    <div className='col-1 mt-3'>
                        <input type="radio" className="checkbox" defaultChecked={recommendedAddress} checked={recommendedAddress} onChange={() => onCheck('RECOMMENDED')} />
                    </div>
                    <div className='col-11'>
                        <div className='entered-title'>Recommended</div>
                        <div className='address-text'>{googleResult && googleResult['formatted_address']}</div>
                    </div>
                </div>
            </div>
            <div className='col-12 d-flex row justify-content-center mb-4 buttons-view'>
                <div className='col-3'>
                    <Button size='large' label='Cancel' b_type='CANCEL' onClick={() => onCancel()} />
                </div>
                <div className='col-3'>
                    <Button size='large' label='Save' b_type='SAVE' onClick={() => onSave()} />
                </div>
            </div>
        </>
    )
}

export default GoogleAddressModal;