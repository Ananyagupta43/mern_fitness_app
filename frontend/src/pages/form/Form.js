import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";
import "./../login/Login&Signup.css";
import Navbar from '../../components/New_navbar'

const Form = () => {

    const [person, setPerson] = useState({ age: "", gender: "", height: "", weight: "", neck: "", waist: "", activity: "1.465", goal: "m", hips: "" });

    useEffect(() => {
        const savedUserData = JSON.parse(localStorage.getItem('userData'));
        if (savedUserData) {
            setPerson(savedUserData);
        }
    }, [])

    const handleDivInfo = (e) => {
        const name = e.target.getAttribute('id');
        const value = e.target.value;
        setPerson({ ...person, [name]: value });
    }

    const handleInfo = (e) => {
        // const {name,value} = e.target;
        const name = e.target.name;
        const value = e.target.value;
        setPerson({ ...person, [name]: value });
    }

    const handleSave = () => {
        const savedUserData = JSON.parse(localStorage.getItem('userData'))
        if (savedUserData) {
            const updatedUserData = { ...savedUserData, ...person };
            localStorage.setItem('userData', JSON.stringify(updatedUserData));
            setPerson(updatedUserData);
        }
        else {
            localStorage.setItem('userData', JSON.stringify(person));
            setPerson(person);
        }
    }

    const navigate = useNavigate();
    const goToCalculatorPage = (name) => {
        // navigate(`/calculator/${name}?person=${JSON.stringify(person)}`);
        if ((!person.height || !person.weight) && name == "BMICalculator") {
            window.alert("Please enter height and weight");
            navigate("/form")
        } else if ((!person.gender || !person.height || !person.neck || !person.waist || !person.hips) && name == "BodyFatCalculator") {
            window.alert("Please enter height, gender,neck,waist and hips for calculating body fat");
            navigate("/form")
        }
        else if ((!person.age || !person.gender || !person.height || !person.weight || !person.activity) && name == "CalorieCalculator") {
            window.alert("Please enter height, weight,age,gender and activity for calculating calorie");
            navigate("/form")
        }
        else if ((!person.height) && name == "HealthyWeightCalculator") {
            window.alert("Please enter height for calculating healthy weight");
            navigate("/form")
        } else if ((!person.age || !person.gender || !person.height || !person.weight || !person.activity) && name == "BMRCalculator") {
            window.alert("Please enter height, weight,age,gender and activity for calculating BMR");
            navigate("/form")
        }


        else {
            navigate(`/calculator/${name}`, { state: { person } });
        }
    }


    return <div className="calculator-container">
        <Navbar />
        <div className="form-bg" >

            <form className="form cal-form" style={{ padding: "50 50px", width: "700px" }}>

                <h1 style={{ textAlign: "center" }}>CALCULATORS</h1>

                <label for="age" className="inputs-label"> Age</label>
                <div className="inputs" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} >
                    <input type="number" style={{ color: "black" }} id="age" onChange={handleDivInfo} value={person.age} required></input>
                    <div style={{ fontWeight: "600", color: "black" }}>yrs</div>
                </div>

                <div className="w-100 col-12" style={{ display: "flex", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "0px" }}>
                    <label className="inputs-label gender col-3" style={{ padding: "0px" }}>Gender:</label>

                    <div className="col-5">
                        <label for="Male" className="inputs-label"> Male
                            <input type="radio" id="Male" name="gender" value="male" onChange={handleInfo} checked={person.gender === 'male'} required></input></label>
                    </div>
                    <div className=" col-4">
                        <label for="Female" className="inputs-label"> Female
                            <input type="radio" id="Female" name="gender" value="female" onChange={handleInfo} checked={person.gender === 'female'} required></input></label>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", flexWrap: "wrap" }}>

                    <div className="measurement-outer-div" >
                        <label for="height" className="inputs-label " > Height</label>
                        <div className="inputs measurement-inner-div"  >
                            <input type="number" id="height" style={{ color: "black" }} onChange={handleDivInfo} value={person.height} required></input>
                            <div style={{ fontWeight: "600", color: "black" }}>cm</div>
                        </div>
                    </div>

                    <div className="measurement-outer-div" >
                        <label for="weight" className="inputs-label " > Weight</label>
                        <div className="inputs measurement-inner-div"  >
                            <input type="number" id="weight" style={{ color: "black" }} onChange={handleDivInfo} value={person.weight} required></input>
                            <div style={{ fontWeight: "600", color: "black" }}>kg</div>
                        </div>
                    </div>

                    <div className="measurement-outer-div" >
                        <label for="neck" className="inputs-label " > Neck</label>
                        <div className="inputs measurement-inner-div"  >
                            <input type="number" id="neck" style={{ color: "black" }} onChange={handleDivInfo} value={person.neck} required></input>
                            <div style={{ fontWeight: "600", color: "black" }}>cm</div>
                        </div>
                    </div>

                    <div className="measurement-outer-div" >
                        <label for="waist" className="inputs-label "> Waist</label>
                        <div className="inputs measurement-inner-div"  >
                            <input type="number" id="waist" style={{ color: "black" }} onChange={handleDivInfo} value={person.waist} required></input>
                            <div style={{ fontWeight: "600", color: "black" }}>cm</div>
                        </div>
                    </div>

                    <div className="measurement-outer-div" >
                        <label for="hips" className="inputs-label "> Hips</label>
                        <div className="inputs measurement-inner-div"  >
                            <input type="number" id="hips" style={{ color: "black" }} onChange={handleDivInfo} value={person.hips} required></input>
                            <div style={{ fontWeight: "600", color: "black" }}>cm</div>
                        </div>
                    </div>
                </div>

                <label className="inputs-label">How active are you ?</label>
                <select for="activity" name="activity" className="inputs" style={{ fontWeight: "600" }} onChange={handleInfo} value={person.activity} required >
                    <option value="1.2">Sedentary: little or no exercise</option>
                    <option value="1.375">Light: exercise 1-3 times/week</option>
                    <option value="1.465">Moderate: exercise 4-5 times/week</option>
                    <option value="1.55">Active: daily exercise or intense exercise 3-4 times/week</option>
                    <option value="1.725">Very Active: intense exercise 6-7 times/week</option>
                    <option value="1.9">Extra Active: very intense exercise daily, or physical job</option>
                </select>

                {/*            <label className="inputs-label">Goal weight</label>
            <select for="goal" name="goal" className="inputs" style={{ fontWeight: "600" }} onChange={handleInfo} required>
                <option value="m" selected>Maintain weight</option>
                <option value="l">Mild weight loss of 0.5 lb (0.25 kg) per week</option>
                <option value="l1">Weight loss of 1 lb (0.5 kg) per week</option>
                <option value="l2">Extreme weight loss of 2 lb (1 kg) per week</option>
                <option value="g">Mild weight gain of 0.5 lb (0.25 kg) per week</option>
                <option value="g1">Weight gain of 1 lb (0.5 kg) per week</option>
                <option value="g2">Weight gain of 1 lb (0.5 kg) per week</option>
</select> */}

                <div style={{ display: "flex", justifyContent: 'flex-start', alignItems: "center", flexWrap: "wrap" }}>
                    <button className="button" type="button" onClick={() => handleSave()}>Save</button>
                    <button className="button" onClick={() => goToCalculatorPage("BMICalculator")}>BMI Calculator</button>
                    <button className="button" onClick={() => goToCalculatorPage("BodyFatCalculator")}>Body Fat Calculator</button>
                    <button className="button" onClick={() => goToCalculatorPage("BMRCalculator")}>BMR Calculator</button>
                    <button className="button" onClick={() => goToCalculatorPage("HealthyWeightCalculator")}>Healthy Weight Calculator</button>
                    <button className="button" onClick={() => goToCalculatorPage("CalorieCalculator")}>Calorie Calculator</button>
                </div>

            </form>
        </div>
    </div>
}

export default Form;