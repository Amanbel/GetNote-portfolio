import React, { useEffect, useState } from "react";
import "./note-preview.styles.scss";
import axios from "axios";



const NotePreview = ({for_details}) => {
    const [preview, setPreview] = useState('');

    const forceDownload = (response, title) =>{
        console.log(response)
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', title)
        document.body.appendChild(link)
        link.click()
    }

    const downloadWithAxios = (url, title)=>{
        axios({
            method: 'get',
            url,
            responseType: 'arraybuffer'
        }).then((response)=>{
            forceDownload(response, title)
        }).catch((error)=> console.log(error))

    }

    const downloadFreeNote = () => {
        axios.get(`http://localhost:8000/api/file-upload/files/${for_details.id}`).then(res=>{
            const title = res.data.note_file.toString().split("/").slice(-1)
            downloadWithAxios(res.data.note_file, title)
        })
    }

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/file-upload/files/${for_details.id}`).then(res=>{
            setPreview(res.data.note_file.toString())
        })
    }, [])

    return (
        <div className="note-info-preview">
            <div className="note-preview">
                <div className="preview-cover"/>
                <iframe src={preview} key={preview} width="100%" height={630} frameBorder={0} scrolling="no" title="Note Preview" aria-hidden="true"></iframe>
            </div>
            <div className="note-info">
                <div>
                    <span className="info-title">Subject</span>
                    <span className="info-value">{for_details.subject}</span>
                </div>
                <div>
                    <span className="info-title">Type</span>
                    <span className="info-value">{for_details.type}</span>
                </div>
                <div>
                    <span className="info-title">Pages</span>
                    <span className="info-value">{for_details.note_page}</span>
                </div>
                <div>
                    <span className="info-title">Date written</span>
                    <span className="info-value">{for_details.written_date}</span>
                </div>
                <div>
                    <span className="info-title">Note written for</span>
                    <span className="info-value written_for">{for_details.written_for}</span>
                </div>
                <div>
                    <span className="info-title">Monitization status</span>
                    <span className="info-value">{for_details.monetization_status}</span>
                </div>
                {for_details.monetization_status == 'paid' ?
                <form method="post" action="https://test.yenepay.com/">
                    <input type="hidden" name="Process" value="Express"/>
                    <input type="hidden" name="MerchantOrderId" value=""/>
                    <input type="hidden" name="MerchantId" value="SB2533"/>
                    <input type="hidden" name="IPNUrl" value=""/>
                    <input type="hidden" name="SuccessUrl" value="https://sandbox.yenepay.com/Home/Details/62c0fca7-915b-4b77-8fd6-4f9c3421f07e?custId=298b8c18-f7ed-489d-87ed-2b2535bdc1ce"/>
                    <input type="hidden" name="CancelUrl" value="https://sandbox.yenepay.com/Home/Details/62c0fca7-915b-4b77-8fd6-4f9c3421f07e?custId=298b8c18-f7ed-489d-87ed-2b2535bdc1ce"/>
                    <input type="hidden" name="ItemId" value="e8202bfd-d6ac-44b3-b3c9-3ea35ff5a65b"/>
                    <input type="hidden" name="ItemName" value="Test Item 1"/>
                    <input type="hidden" name="UnitPrice" value={10.00}/>
                    <input type="hidden" name="Quantity" value="1"/>
                    <button>Buy</button>
                </form>
                :
                <button onClick={downloadFreeNote}>Get</button>}
            </div>
        </div>
    )
}

export default NotePreview;