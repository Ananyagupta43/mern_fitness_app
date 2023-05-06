import React, {useEffect} from  'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import BMI from "./../components/bmi_calculator/BMI";
import BMR from "./../components/BMR";
import BodyFatCalculator from "./../components/BodyFatCalculator";
import CalorieCalculator from "./../components/CalorieCalculator";
import HealthyWeightCalculator from "./../components/HealthyWeightCalculator";


const Calculator = () => {
    const params= useParams();
    const {name} = params;
    const {state} = useLocation();
    const {person} = state;
    // const location = useLocation();
    // const searchParams = new URLSearchParams(location.search);
    // const person = JSON.parse(searchParams.get('person'));

    useEffect(()=>{
        window.scrollTo({top : 0, left: 0, behavior: "instant"});
    },[name])

    const calculatorPicker = (name) =>{
    switch(name){
        case "BMICalculator" : return <BMI person = {person}/>
        case "BodyFatCalculator" : return <BodyFatCalculator person = {person}/>
        case "BMRCalculator" : return <BMR person = {person}/>
        case "HealthyWeightCalculator" : return <HealthyWeightCalculator person = {person}/>
        default : return <CalorieCalculator person = {person}/>
    }
    }

    return <div>
    {
        calculatorPicker(name)
    }
    </div>
}

export default Calculator;