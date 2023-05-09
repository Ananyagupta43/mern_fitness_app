import React, { useState, useEffect } from "react";
import "./BMI.css";
import BmiChart from "./../../assets/images/bmi-chart.gif";
import { useNavigate } from "react-router-dom";


const BMI = ({ person }) => {
    const { height, weight } = person;
    const navigate = useNavigate();

    useEffect(() => {
        callGetStartedBMI();
    }, [])

    const callGetStartedBMI = async () => {

        const bmi = bmiValue(weight, height);
        const email = JSON.parse(localStorage.getItem("email"));
        try {
            if (!email) {
                email = "abc@gmail.com"
            }
            const res = await fetch("/calculatingBmi", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify({
                    height, weight, bmi, email
                })

            })

            if (res.status === 200) {
                window.alert("Your results has been forwarded to your email ID");
            } else {
                const err = new Error(res.error);
                throw err;
            }
        }
        catch (err) {
            console.log(err);
            navigate("/login");
        }

    }

    const bmiValue = (weight, height) => {
        height = height / 100;
        const value = weight / (height * height);
        return value.toFixed(1);
    }

    const goOnCalculator = () => {
        navigate("/form")
    }

    return <div style={{ padding: " 30px 50px" }}  >
        <div style={{ width: "225px" }}><button className="button go-back" style={{ marginBottom: "30px" }} onClick={(goOnCalculator)}>Go Back</button></div>
        <h1 className="main-heading" >BMI Calculator</h1>
        <p>The Body Mass Index (BMI) Calculator can be used to calculate BMI value and corresponding weight status while taking age into consideration. Use the "Metric Units" tab for the International System of Units or the "Other Units" tab to convert units into either US or metric units. Note that the calculator also computes the Ponderal Index in addition to BMI, both of which are discussed below in detail.</p>
        <div className="result">Result :- {bmiValue(weight, height)} kg/m²</div>
        <h3>BMI introduction</h3>
        <p>BMI is a measurement of a person's leanness or corpulence based on their height and weight, and is intended to quantify tissue mass. It is widely used as a general indicator of whether a person has a healthy body weight for their height. Specifically, the value obtained from the calculation of BMI is used to categorize whether a person is underweight, normal weight, overweight, or obese depending on what range the value falls between. These ranges of BMI vary based on factors such as region and age, and are sometimes further divided into subcategories such as severely underweight or very severely obese. Being overweight or underweight can have significant health effects, so while BMI is an imperfect measure of healthy body weight, it is a useful indicator of whether any additional testing or action is required. Refer to the table below to see the different categories based on BMI that are used by the calculator.</p>
        <h3>BMI table for adults</h3>
        <p>This is the World Health Organization's (WHO) recommended body weight based on BMI values for adults. It is used for both men and women, age 20 or older.</p>
        <div>
            <table className="table">
                <thead>
                    <tr className="table-head">
                        <th >Classification</th>
                        <th className="table-head">BMI range - kg/m²</th>
                    </tr>
                </thead>
                <tbody >
                    <tr className="odd-table-row">
                        <td className="table-data">Severe Thinness</td>
                        <td className="table-data"> &lt; 16</td>
                    </tr>
                    <tr className="even-table-row">
                        <td className="table-data">Moderate Thinness</td>
                        <td className="table-data"> 16 - 17</td>
                    </tr>
                    <tr className="odd-table-row">
                        <td className="table-data">Mild Thinness</td>
                        <td className="table-data"> 17 - 18.5</td>
                    </tr>
                    <tr className="even-table-row">
                        <td className="table-data">Normal</td>
                        <td className="table-data">18.5 - 25</td>
                    </tr>
                    <tr className="odd-table-row">
                        <td className="table-data">Overweight</td>
                        <td className="table-data"> 25 - 30</td>
                    </tr>
                    <tr className="even-table-row">
                        <td className="table-data">Obese Class I</td>
                        <td className="table-data"> 30 - 35</td>
                    </tr>
                    <tr className="odd-table-row">
                        <td className="table-data">Obese Class II</td>
                        <td className="table-data"> 35 - 40</td>
                    </tr>
                    <tr className="even-table-row">
                        <td className="table-data">Obese Class III</td>
                        <td className="table-data"> &gt; 40</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3>BMI chart for adults</h3>
        <p>This is a graph of BMI categories based on the World Health Organization data. The dashed lines represent subdivisions within a major categorization.</p>
        <img src={BmiChart} alt="graph" className="chart-image"></img>
    </div>
}

export default BMI;