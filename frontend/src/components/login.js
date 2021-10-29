import React, {useState} from "react";
import { useHistory, useLocation } from "react-router";
import axios from "axios";

const Login = (props) => {

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [fail, setFail] = useState(false);
    const [failMessage, setFailMessage] = useState('');
    let history = useHistory();
  
    const inputIdHandler = (e) => {
      setId(e.target.value)
    };
  
    const inputPwHandler = (e) => {
      setPw(e.target.value)
    };
  
    const loginSubmitHandler = (e) => {
      //이거 빼먹으면 안됨 !
      e.preventDefault();
  
      console.log(id, pw);
  
      let loginForm = {
        "id": id,
        "pw": pw
      };
  
      axios.post("/api/v1/user/login", loginForm)
        .then((res) => {
          const data = res.data;
          if(data.code == 201) {
            setFail(true);
            setFailMessage(data.message);
            return;
          } else {
            props.nameChange(id);
            history.push("/main");
          }
        })
        .catch((err) => {

            history.push("/error");
        });
    }; 

    return (
        <div className="container" style={{marginTop: "6%"}}>
            <div className="jumbo">
              <h1>
                여러분들에게 마지막으로 남은 게임, <br /> "합격" 입니다.
              </h1>
            </div>
            <form onSubmit={loginSubmitHandler} className="loginForm">
              <h3>로그인</h3>
              <div className="form-comp">
                <label>🆔</label>
                <input type="text" value={id} onChange={inputIdHandler}/>
              </div>
              <div className="form-comp">
                <label>🔑</label>
                <input type="text" value={pw} onChange={inputPwHandler}/>
              </div>
              <div className="form-comp">
                {
                    (fail === true)? 
                    <div className="alert alert-danger" role="alert">
                        {failMessage}
                    </div> : null
                }
              </div>
              <div className="form-comp">
                <button type="submit" className="btn-login">Login</button>
                <button type="submit" className="btn-signup">SignUp</button>
              </div>
            </form>
        </div>
    );
};


export default Login;