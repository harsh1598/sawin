import React, { useEffect, useState } from 'react'
import Loader from '../../Loader/Loader';
import { APIState } from '../../../reducer/CommonReducer';
import { useSelector } from 'react-redux';
import { RootState } from '../../../config/Store';

import './Notes.scss'
import DraggableModal from '../../DraggableModal/DraggableModal';

const Notes = () => {
    const [isLoading, setLoading] = useState(false)
    const [isShowEditModel, setShowEditModel] = useState(false)
    const [type, setShowtype] = useState()
    const data: any = useSelector<RootState, APIState>(state => state.sdMaster)
    const closeModal = (value: any) => {
        setShowEditModel(value)
    }
    const showModel = (value: any) => {
        setShowEditModel(!isShowEditModel)
        setShowtype(value)
    }

    const value = type === 'Internal Notes' ? data?.sd_master?.Notes : data?.sd_master?.InternalNotes;
    return (
        <>
            <Loader show={isLoading} />
            <DraggableModal isOpen={isShowEditModel} onClose={closeModal} title="Edit Note" type={type} previousData={value}/>
            <div className='notes info-card'>
                <div className='notes-title mt-0 pt-2'>Notes</div>
                <div className='d-flex flex-row justify-content-between mr-4'>
                    <div className='heading-view'>Internal Notes</div>
                    <div onClick={() => showModel('Internal Notes')}><img src={require('../../../assets/images/edit.svg').default} className='edit-icon' height={10} width={10} /></div>
                </div>
                <div className='notes-description'><div dangerouslySetInnerHTML={{ __html: (data?.sd_master?.Notes ? data?.sd_master?.Notes : "NO DATA FOUND") }}></div></div>
                <div className='d-flex flex-row justify-content-between mr-4'>
                    <div className='heading-view'>External Notes</div>
                    <div onClick={() => showModel('External Notes')}><img src={require('../../../assets/images/edit.svg').default} className='edit-icon' /></div>
                </div>
                <div className='notes-description'><div className='pb-3' dangerouslySetInnerHTML={{ __html: (data?.sd_master?.InternalNotes ? data?.sd_master?.InternalNotes : "NO DATA FOUND") }}></div></div>
            </div>
        </>
    )
}

export default Notes;