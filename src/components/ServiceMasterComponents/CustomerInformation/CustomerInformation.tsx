import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Defaults from '../Defaults/Defaults';
import MapScreen from '../Map/Map';
import Notes from '../Notes/Notes';
import ServiceMaster from '../ServiceMaster/ServiceMaster';
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { CustomerView } from "../../../action/CommonAction";
import { RootState } from '../../../config/Store';
import './CustomerInformation.scss'
import { CustomerModalState } from '../../../reducer/CommonReducer';


const CustomerInformation = () => {
    const [currentTab, setCurrentTab] = useState('serviceMaster');
    const dispatch: Dispatch<any> = useDispatch();
    const data: any = useSelector<RootState, CustomerModalState>(state => state.customerModal)

    console.log("redux cus info", data.isShow)

    const onCloseModal = () => {
        dispatch(CustomerView(!data.isShow))
    }

    const getCurrentKey = (value: any) => {
        setCurrentTab(value)
    }

    return (
        <>
            {data?.isShow === true ?
                <div className='customer-info-main' onClick={() => onCloseModal()}>
                    <img src={require('../../../assets/images/right-arrow.svg').default} alt='right-arrow' className='right-icon' />
                    <span className='customer-title'>Customer Information</span>
                </div>
                :
                <div className='d-flex flex-row'>
                    <div className='customer-information-tab'>
                        <Tabs defaultActiveKey="serviceMaster" onSelect={getCurrentKey}>
                            <Tab eventKey="serviceMaster" title={<div className='d-flex flex-column justify-content-center align-items-center'><img src={require(currentTab === 'serviceMaster' ? '../../../assets/images/user-icon.svg' : '../../../assets/images/user-black-icon.svg').default} height={21} width={21} /> Service Master</div>}>
                                <ServiceMaster />
                            </Tab>
                            <Tab eventKey="defaults" title={<div className='d-flex flex-column justify-content-center align-items-center'><img src={require(currentTab === 'defaults' ? '../../../assets/images/noun-default-icon.svg' : '../../../assets/images/noun-default-black-icon.svg').default} height={21} width={21} /> Defaults</div>}>
                                <Defaults />
                            </Tab>
                            <Tab eventKey="notes" title={<div className='d-flex flex-column justify-content-center align-items-center'><img src={require(currentTab === 'notes' ? '../../../assets/images/notes-icon.svg' : '../../../assets/images/notes-black-icon.svg').default} height={21} width={21} /> Notes</div>}>
                                <Notes />
                            </Tab>
                            <Tab eventKey="map" title={<div className='d-flex flex-column justify-content-center align-items-center'><img src={require(currentTab === 'map' ? '../../../assets/images/map-icon.svg' : '../../../assets/images/map-black-icon.svg').default} height={21} width={21} /> Map</div>}>
                                <MapScreen />
                            </Tab>
                        </Tabs>
                    </div>
                    <div className='col-4 closing-view' onClick={() => onCloseModal()}>
                        <img src={require('../../../assets/images/left-arrow.svg').default} alt='left-arrow' className='left-arrow-icon' />
                    </div>
                </div>
            }
        </>
    )
}

export default CustomerInformation;