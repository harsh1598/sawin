import React from 'react';
import { Button } from '../../../components/Button/Button';
import './AddDocument.scss';
import deleteicon from "../../../assets/images/delete-icon.svg";
import viewIcon from '../../../assets/images/Preview.svg';

const AddDocument = () => {
    const [dragActive, setDragActive] = React.useState(false);

    const goBack = () => {
        window.history.back();
    };

    const handleDrag = function (e: any) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    // triggers when file is dropped
    const handleDrop = function (e: any) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            // handleFiles(e.dataTransfer.files);
        }
    };

    // triggers when file is selected with click
    const handleChange = function (e: any) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            // handleFiles(e.target.files);
        }
    };

    return (
        <>
            <div className='add-document'>
                <div className='main-add-document'>
                    <div onClick={goBack} className="back-arrow mt-2 ms-2">
                        <img
                            src={
                                require("../../../assets/images/left-arrow-black.svg").default
                            }
                            className='ms-3'
                        /> <span className='title'>Add Document</span>
                    </div>
                    <div className='col-12 main-view d-flex row'>

                        {/* Left Side View */}
                        <div className='col-6'>
                            <div className='upload-document'>Upload Document</div>
                            <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()} className='col-12 d-flex'>
                                <input type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
                                <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : ""}>
                                    <div className='d-flex'><img src={require('../../../assets/images/upload-icon.svg').default} className='me-1' /> Upload Document</div>
                                </label>
                                {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
                            </form>
                            <div className='upload-document'>Description</div>
                            <textarea className='form-control' />
                            <div className='customer-technician-view d-flex row col-12'>
                                <div className='col-6 customer'><input type="checkbox" className="checkbox me-2" /> Show to customer</div>
                                <div className='col-6 text-end'><input type="checkbox" className="checkbox me-2" /> Show to technician</div>
                            </div>
                            <div className='add-document-buuton'>
                                <Button label='Add Document' size='large' />
                            </div>
                            <div className='document-list'>Document List</div>
                            <div className='list-view'>
                                <div className='col-12 d-flex row'>
                                    <div className='col-6'>
                                        <div className='document-heading'>sjaiaaa_june.xlsx</div>
                                        <div className='document-subheading'>KFG</div>
                                    </div>
                                    <div className='col-6 text-end mt-1'>
                                        <img
                                            src={viewIcon}
                                            id="img_downarrow"
                                            height={25}
                                            className="deleteicon me-2"
                                            alt="downarrow"
                                        />
                                        <img
                                            src={deleteicon}
                                            id="img_downarrow"
                                            height={25}
                                            className="deleteicon"
                                            alt="downarrow"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side View */}
                        <div className='col-6'>
                            <div className='col-12 d-flex row'>
                                <div className='col-5 pt-3 preview'>Preview</div>
                                <div className='col-7 d-flex row'>
                                    <div className='col-5'><Button label='Print' size='large' b_type='CANCEL' /></div>
                                    <div className='col-6'><Button label='Download' size='large' /> </div>
                                    <div className='col-1'><img
                                        src={
                                            require("../../../assets/images/Zoom.svg").default
                                        }
                                        className='mt-2'
                                    /></div>
                                </div>
                            </div>
                            <div className='frame-view'>
                                <iframe src="https://www.orimi.com/pdf-test.pdf" height={550} width={820}></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddDocument;