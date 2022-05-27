import { useState, useEffect } from 'react';
import axios from 'axios';
import { useContext } from "react";
import SignUpContext from "../contexts/SignUpContext";
import { useNavigate } from "react-router-dom"
import styled from 'styled-components';

export default function SignUp() {

	const [alert, setAlert] = useState(false);

  const navigate = useNavigate();

	const { form, setForm , setSwap } = useContext(SignUpContext);

  const data=form
	
	useEffect(() => {
		const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up" , data);

		promise.then(() => {
			setForm({
				email: '',
				password: '',
				name:'',
				image:''
			})
			navigate("/")	
		});

		promise.catch(() => {
			setAlert(true) 
		})

	}, []);


	function Back(){
		setAlert(false);
		setSwap(false)
	}

	return (
		<>
			{ alert ?
				<>
					<DivOpacity/>
					<Alert>
						<DivAlert>
							<div>
								<p>Dados preenchidos incorretamente, 
									por favor, tente novamente</p>
								<Button onClick={()=> Back()}>ok</Button>
							</div>
						</DivAlert>
					</Alert> 
				</>
				:
				null
			}
		</>
	)
}

const DivOpacity = styled.div`
	width: 100%;
	height: 100vh;
	background-color: #f0f0f0;
	opacity: 0.4;
	position: fixed;
	z-index: 1;
`

const Alert = styled.div`
	width: 100%;
	height: 100vh;
	position: fixed;
	z-index: 1;
	display: flex;
	justify-content:center;
	align-items: center;
`

const DivAlert = styled.div`
	width: 200px;
	height: 150px;
	padding: 8px;
	background-color: #ffffff;
	border: 1px solid #ffffff;
	border-radius: 4.6px;
	display:flex;
	justify-content: center;
	align-items: center;

	div {
		width: 190px;
		height: 130px;
		padding: 13px;
		border: 1px solid #E75766;
  	border-radius: 4.6px;
		display:flex;
		flex-direction:column;
		justify-content: space-between;
		align-items: center;

		p{
			margin-top: 10px;
			text-align:center;
			color:#666666;
			font-size: 13px;
			line-height:18px;
		}
	}
`

const Button = styled.button`
  background-color:#ffffff;
  font-size: 18px;
  width: 50px;
  height: 20px;
  border: 1px solid #ffffff;
  border-radius: 4.6px;
  color: #E75766;

  :hover {
    filter: brightness(1.1);
  }
`