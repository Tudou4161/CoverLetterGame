import React, {useState, useEffect} from "react";
import { useLocation } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import FeedBack from "./feedback";


const Detail = () => {

    const location = useLocation();
    const path = location.pathname.split("/");
    const [versions, setVersions] = useState([]);
    const [updateFlag, setUpdateFlag] = useState(true);
    
    let [BlankCnt, setBlankCnt] = useState(0);
    let [notBlankCnt, setNotBlankCnt] = useState(0);
    //form data
    let [title, setTitle] = useState("");
    let [content, setContent] = useState("");
    let [versionName, setVersionName] = useState("");

    let [feedback, setFeedback] = useState([]);
    let [fb_flag, setFbFlag] = useState(false);
    let [errMsg, setErrMsg] = useState(Object);


    useEffect(() => {
        console.log(updateFlag); 
        if (updateFlag === true) {
            axios.get(`/api/v1/file/history/${path[path.length-1]}`)
            .then((res) => {
                let result = res.data.data;
                setTitle(result[0].title);
                setContent(result[0].content);
                setVersionName(result[0].versionName);
                setVersions([...result]);

                setUpdateFlag(false);
            }).catch((err) => {
                alert(err);
            })
        }
    },[updateFlag]);

    const viewVersionHandler = (e) => {
        const id = e.target.getAttribute("data-id");
        const __title = document.getElementById(`title${id}`).innerHTML;
        setTitle(__title);
        const __content = document.getElementById(`content${id}`).innerHTML;
        setContent(__content);
        const __verName = document.getElementById(`verName${id}`).innerHTML;
        setVersionName(__verName);
    }

    const setTitleHandler = (e) => {
        setTitle(e.target.value);
    }

    const setVersionNameHandler = (e) => {
        setVersionName(e.target.value); 
    }

    const SentenceCntHandler = (e) => {
        setContent(e.target.value); 
        //공백포함
        setBlankCnt(e.target.value.length);
        //공백 미포함
        let redex = /\s/ig;
        const string = e.target.value.replace(redex, "");
        setNotBlankCnt(string.length);
    };

    const versionCreateHandler = (e) => {
        e.preventDefault();

        const form = {title: title, content: content, versionName: versionName};
        axios.post("/api/v1/version/create", form)
            .then((res) => {
                if (res.data.code === 201) {
                    console.log(res.data.detail);
                    const errMessages = res.data.detail;
                    return setErrMsg(errMessages);
                } 
                if (res.data.code === 200) {
                    return setUpdateFlag(true); 
                }
            }).catch(err => alert(err));
    }

    const grammarCheckHandler = (e) => {
        e.preventDefault();

        const form = {sentence: content};
        axios.post("/api/v1/version/check/grammar", form)
            .then((res) => {
                let result = res.data.data;
                console.log(result);
                setFeedback([...result]);
                setFbFlag(true);
            }).catch((err) => {
                alert(err); 
            })
    }


    return (
        <div className="detail-box">
            <div className="versions">
                {
                    versions.map((row, i) => (
                        <div class="card">
                            <h4 id={`title${i}`} style={{display:"none"}}>{row.title}</h4>
                            <h4 id={`content${i}`} style={{display:"none"}}>{row.content}</h4>
                            <h4 id={`verName${i}`} >version: {row.versionName}</h4>
                            <h6 id={`createAt${i}`} >Date: {row.createAt}</h6>
                            <button className="edit" data-id={i} onClick={viewVersionHandler}>View</button>
                        </div>
                    ))
                }
            </div>

            <div className="editor">
                <div>
                    <h4>📕Title</h4>
                    <input className="title-input" value={title} onChange={setTitleHandler} />
                    {errMsg.title !== null ? errMsg.title : null}
                </div>
                <div>
                    <h4>💽 Version Name</h4>
                    <input className="title-input" placeholder="versionName" value={versionName} onChange={setVersionNameHandler}/>
                    {errMsg.versionName !== null ? errMsg.versionName : null}
                </div>
                <div>
                    <h4>📜Text</h4>
                    <textarea placeholder="content" value={content} onChange={SentenceCntHandler}>
                    </textarea>
                    <p>{errMsg.content !== null ? errMsg.content : null}</p>
                </div>
                <div>
                    <span>
                        <p>공백 포함 {BlankCnt}자</p>
                        <p>공백 미포함 {notBlankCnt}자</p>
                    </span>
                </div>
                <div>   
                    <button onClick={versionCreateHandler}>version생성</button>
                    <button onClick={grammarCheckHandler}>문법검사</button>
                </div>
                <div>
                    {
                        fb_flag===true? <FeedBack feedback={feedback}/> : null
                    }
                </div>
            </div>
        </div>
    );
}

export default Detail;