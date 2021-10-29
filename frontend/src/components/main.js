import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { useHistory } from "react-router";

const Main = () => {

    let [data, setData] = useState([]);
    let [getFlag, setGetFlag] = useState(true);
    let [_tmpTitle, set_tmpTitle] = useState("");
    let [_tmpTitleErr, set_tmpTitleErr] = useState("");
    let history = useHistory();

    const changeTmpTitle = (e) => {
        set_tmpTitle(e.target.value);
    }

    const goDetail = (e) => {
        const title = e.target.getAttribute("data-msg");
        console.log(title);
        history.push({
            pathname: `/detail/${title}`
        });    
    }

    const goNewDetail = (e) => {

        e.preventDefault();

        if (_tmpTitle === "" || _tmpTitle === " ") {
            return set_tmpTitleErr("타이틀을 작성해주세요.");
        } else {
            const form = {
                title: _tmpTitle,
                content: "첫 글",
                versionName: "v1"
            }
            axios.post("/api/v1/version/create", form)
                .then((res) => {
                    if (res.data.code === 200) {
                        setGetFlag(false);
                    }
                }).catch((err) => {
                    alert(err);
                })
        }
    }

    useEffect(() => {
        axios.get(`/api/v1/file/history`)
        .then((res) => {
            let result = res.data.data;
            console.log(result);
            setData([...result]);
            setGetFlag(true);
        }).catch((err) => {
            alert(err);
        })
    }, [getFlag]);

    return (
        <div className="container">
            <div className="new-create-bar">
                <label>📕Title</label>
                <input value={_tmpTitle} onChange={changeTmpTitle}/>
                {
                    (_tmpTitleErr !== "")? <h15>{_tmpTitleErr}</h15> : null 
                }
                <button onClick={goNewDetail}>새로운 자소설 생성</button>
            </div>
            <div className="row">
                {data.map((row, i) => (
                        <div class="card col-md-3">
                            <h5>{row.title}</h5>
                            <h5>{row.content}</h5>
                            <h5>{row.createAt}</h5>
                            <button className="edit" data-msg={row.title} onClick={goDetail}>수정</button>
                        </div>
                ))}
            </div>
        </div>
    );
}

export default Main;