import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";

import axiosConfig from '../admin/axiosConfig';
import css from './Press.module.css';

const Index = () => {

    const navigate = useNavigate();
    const [data, setData] = useState('');
    const index = [ 0, 1, 2, 3];
    // const [error, setError] = useState(false);
    // const [isLoading, setIsLoading] = useState(true);
    const fetchData = () => {
      axiosConfig.get('user/dashboard')
      .then(response=>{
        // console.log(response.data.data.name[0]);
        setData(response.data);
        // setIsLoading(false);
        // setError(false);
      })
      .catch(error=>{
        //   setError(true);
        //   setIsLoading(false);
        console.log(error.message);
        navigate('/');
      })
    }
    useEffect(()=>{
        fetchData();
    },[])

    return (
        <div className="main">
            <div className="header">
                <h1>Medex</h1>
                    <div className="card">
                        <div className="containers">
                            <span style={{ "fontSize": '30px' }}>Doctor: {data && data['doctor']['doctordetail']['name']}</span><br/>
                            <span style={{ 'fontSize': '30px' }}>Contact: {data && data['doctor']['doctordetail']['phone1']}</span><hr/>
                            <span style={{ 'fontSize': '30px' }}>Patient: {data && data['user']['userdetail']['name']}</span>
                        </div>
                    </div>
                </div>
                <div className="body"><br/>
                
                <div className="row">
                    <div className="col-lg-6 mb-4">
                        <div className={css.card_2}>
                            <img src="https://www.pngall.com/wp-content/uploads/2/Medicine-PNG-Image-HD.png" />
                
                            <div className="cardBody">
                                <h5 className="cardTitle">Notes</h5><hr/>
                                <textarea className="ms-3" id="notes" name="notes" rows="4" cols="67" value={data && data['data']['notes']} disabled></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 mb-4">
                        <div className={css.card_2}>
                            <img src="https://www.pngall.com/wp-content/uploads/2/Medicine-Pills-Background-PNG-Image.png"/>
                            {/* <form>
                                <div className="cardBody">
                                    <h5 className="cardTitle">Medicines</h5><hr/>
                                    <h3><b>Prescribe</b></h3>
                                    <label >Medicine Name</label>
                                    <input type="text" id="mName" name="mName"/>
                                    <label >Schedule</label>
                                    <input type="text" id="sch" name="sch"/>
                                    <label >Take medicine for</label>
                                    <Form.Select id="cnt2" name="cnt2" aria-label="Default select example">
                                    <option value="none" selected disabled hidden> </option>
                                        <option value="none" selected disabled hidden> </option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">2</option>
                                    </Form.Select>
                                    <Form.Select id="timeDuration2" name="timeDuration2" aria-label="Default select example">
                                        <option value="none" selected disabled hidden> </option>
                                        <option value="day">day</option>
                                        <option value="week">week</option>
                                        <option value="month">month</option>
                                        <option value="continue">continue</option>
                                    </Form.Select>
                                    <input type="submit" value="Done"/>
                                </div>
                            </form>
                            */}
                            <table className="table mb-0">
                                <thead>
                                <tr>
                                    <th>Medicine Name</th>
                                    <th>Schedule</th>
                                    <th>Take Medicine For</th>
                                </tr>
                                </thead>
                                <tbody id="myTable">
                                {data['data'] && index.map((i)=>(
                                <tr className="fw-normal" key={i}>
                                    <td className="col-4">
                                        {data['data']['name'][i]}
                                    </td>
                                    <td className="col-4">
                                        {data['data']['desc'][i]}
                                    </td>
                                    <td className="col-4 text-center">
                                    {/* if (data['data']['days'][i] !== 0)  */}
                                    {data['data']['name'][i] ? (
                                        <p>
                                            {data['data']['days'][i] > 0 ? data['data']['days'][i] : null } {data['data']['daystype'][i]}
                                        </p>) : null }
                                        {/* <p>{data['data']['days'][i]} {data['data']['daystype'][i]}</p> */}
                                    
                                        {/* @if ($data->days[$keys] != 0) */}
                                        {/* {{ $data->days[$keys] }}
                                        {{ $data->daystype[$keys] }} */}
                                        {/* @elseif ($data->daystype[$keys] == 'continue' ) */}
                                            {/* {{ $data->daystype[$keys] }} */}
                                        {/* @endif                   */}
                                    </td>
                                </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
  )
}

export default Index