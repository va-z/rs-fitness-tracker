import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { 
  Row, 
  Col,   
  Radio,
  InputNumber, 
  Select,
  DatePicker,
  Modal
} from 'antd';
import style from './../GoalComponent.module.css';
import getWeightChangeParameters from './../../../../utils/getWeightChangeParameters';
import getGoalEndDate from './../../../../utils/getGoalEndDate';
import moment from 'moment';
import { updateUserSummaryAC } from './../../../../store/userReducer/userReducerActionCreators';

const { Option } = Select;

function UserGoalComponent({
  summary: { 
    weight,
    sex,
    height,
    age,
    goal,
  },
}) {
  const dispatch = useDispatch();
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [intensityLevel, setIntensityLevel] = useState('normal');
  const [weightPlan, setWeightPlan] = useState('maintain');

  return (
    <Col>
      <Row>
        Current goal calories: {goal} kcal
      </Row>
      <Row>
        <h3>I want to:</h3>
      </Row>
      <Row>
        <Radio.Group value={weightPlan} onChange={(event) => setWeightPlan(event.target.value)}>
          <Radio value='maintain'>Maintain weight</Radio>
          <Radio value='Loss'>Lose weight</Radio>
          <Radio value='Gain'>Gain weight</Radio>
        </Radio.Group>
      </Row>
      <Row>
        <Col span={12}>
          My activity level: 
        </Col>
        <Col span={12}>
          <Select 
            value={activityLevel} 
            onChange={setActivityLevel} 
            className={style.goalInputField}>
            <Option value='sedentary'>Sedentary</Option>
            <Option value='light'>Light</Option>
            <Option value='moderate'>Moderate</Option>
            <Option value='active'>Active</Option>
            <Option value='veryActive'>Very Active</Option>
            <Option value='extraActive'>Extra Active</Option>
          </Select>
        </Col>
      </Row>
      <Row>
        <Select 
          disabled={weightPlan === 'maintain'}
          value={intensityLevel} 
          onChange={setIntensityLevel} 
          className={style.goalInputField}>
          <Option value='mild'>Slowly</Option>
          <Option value='normal'>Normally</Option>
          <Option value='extreme'>Fast</Option>
        </Select>
      </Row>
      <Row>
        <Col span={12}>
          Required daily calories: 
        </Col>
        <Col>
          {(() => {
            const key = weightPlan === 'maintain' ? weightPlan : `${intensityLevel}${weightPlan}`;
            return getWeightChangeParameters({
              weight,
              sex,
              height,
              age
            }, activityLevel)[key]
          })()} kcal
        </Col>
      </Row>
    </Col>
  )
}

export default UserGoalComponent;