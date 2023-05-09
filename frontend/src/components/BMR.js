import React, { useState, useEffect } from "react";
import "./bmi_calculator/BMI.css";
import { useNavigate } from "react-router-dom";

const BMR = ({ person }) => {
    const { age, gender, height, weight, activity } = person;
    const navigate = useNavigate();
    useEffect(() => {
        callGetStartedBMR();
    }, [])

    const callGetStartedBMR = async () => {

        const bmr = bmrValue(weight, age, height, gender)
        const email = JSON.parse(localStorage.getItem("email"));

        if (!email) {
            email = "abc@gmail.com"
        }
        const res = await fetch("/calculatingBMR", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({
                weight, age, height, gender, bmr, email
            })

        })

        if (res.status === 200) {
            window.alert("Your results has been forwarded to your email ID");
        } else {
            const err = new Error(res.error);
            throw err;
        }

    }

    const goOnCalculator = () => {
        navigate("/form")
    }

    const bmrValue = (weight, age, height, gender) => {
        if (gender === "male") {
            const value = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
            return Math.ceil(value);
        }
        else {
            const value = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
            return Math.ceil(value);
        }
    }
    return <div style={{ padding: " 30px 50px" }} >
        <div style={{ width: "225px" }}><button className="button go-back" style={{ marginBottom: "30px" }} onClick={(goOnCalculator)}>Go Back</button></div>
        <h1 className="main-heading">BMR Calculator</h1>
        <p>The Basal Metabolic Rate (BMR) Calculator estimates your basal metabolic rate—the amount of energy expended while at rest in a neutrally temperate environment, and in a post-absorptive state (meaning that the digestive system is inactive, which requires about 12 hours of fasting).</p>
        <p>The basal metabolic rate (BMR) is the amount of energy needed while resting in a temperate environment when the digestive system is inactive. It is the equivalent of figuring out how much gas an idle car consumes while parked. In such a state, energy will be used only to maintain vital organs, which include the heart, brain, kidneys, nervous system, intestines, liver, lungs, sex organs, muscles, and skin. For most people, upwards of ~70% of total energy (calories) burned each day is due to upkeep. Physical activity makes up ~20% of expenditure and ~10% is used for the digestion of food, also known as thermogenesis.</p>
        <p>The BMR is measured under very restrictive circumstances while awake. An accurate BMR measurement requires that a person's sympathetic nervous system is inactive, which means the person must be completely rested. Basal metabolism is usually the largest component of a person's total caloric needs. The daily caloric need is the BMR value multiplied by a factor with a value between 1.2 and 1.9, depending on activity level.</p>
        <div className="result">
            <div>Result :- {bmrValue(weight, age, height, gender)} Calories/day</div>
            <div style={{ color: "green", fontSize: "20px" }}>On the basis of Activity factor, BMR = {bmrValue(weight, age, height, gender) * activity} Calories/day</div>
        </div>
        <h4>BMR Variables</h4>
        <p><h5>Muscle Mass –</h5>Aerobic exercises, such as running or cycling, have no effect on BMR. However, anaerobic exercises, such as weight-lifting, indirectly lead to a higher BMR because they build muscle mass, increasing resting energy consumption. The more muscle mass in the physical composition of an individual, the higher the BMR required to sustain their body at a certain level.</p>
        <p><h5>Age – </h5>The more elderly and limber an individual, the lower their BMR, or the lower the minimum caloric intake required to sustain the functioning of their organs at a certain level.</p>
        <p><h5>Genetics – </h5>Hereditary traits passed down from ancestors influence BMR.</p>
        <p><h5>Weather – </h5>Cold environments raise BMR because of the energy required to create a homeostatic body temperature. Likewise, too much external heat can raise BMR as the body expends energy to cool off internal organs. BMR increases approximately 7% for every increase of 1.36 degrees Fahrenheit in the body's internal temperature.</p>
        <p><h5>Diet –</h5>Small, routinely dispersed meals increase BMR. On the other hand, starvation can reduce BMR by as much as 30%. Similar to a phone that goes into power-saving mode during the last 5% of its battery, a human body will make sacrifices such as energy levels, moods, upkeep of bodily physique, and brain functions in order to more efficiently utilize what little caloric energy is being used to sustain it.</p>
        <p><h5>Pregnancy – </h5>Ensuring the livelihood of a separate fetus internally increases BMR. This is why pregnant women tend to eat more than usual. Also, menopause can increase or decrease BMR depending on hormonal changes.</p>
        <p><h5>Supplements – </h5>Certain supplements or drugs raise BMR, mostly to fuel weight loss. Caffeine is a common one.</p>
        <h4>BMR Tests</h4>
        <p>Online BMR tests with rigid formulas are not the most accurate method of determining an individual's BMR. It is better to consult a certified specialist or measure BMR through a calorimetry device. These handheld devices are available in many health and fitness clubs, doctor offices, and weight-loss clinics.</p>
        <h4>Resting Metabolic Rate</h4>
        <p>While the two are used interchangeably, there is a key difference in their definitions. Resting metabolic rate, or RMR for short, is the rate at which the body burns energy in a relaxed, but not fully inactive state. It is also sometimes defined as resting energy expenditure, or REE. BMR measurements must meet total physiological equilibrium while RMR conditions of measurement can be altered and defined by contextual limitations.</p>
        <h4>Modern Wisdom</h4>
        <p>A 2005 meta-analysis study on BMR* showed that when controlling all factors of metabolic rate, there is still a 26% unknown variance between people. Essentially, an average person eating an average diet will likely have expected BMR values, but there are factors that are still not understood that determines BMR precisely.</p>
        <p>Therefore, all BMR calculations, even using the most precise methods through specialists, will not be perfectly accurate in their measurements. Not all human bodily functions are well understood just yet, so calculating total daily energy expenditure (TDEE) derived from BMR estimates are just that, estimates. When working towards any sort of health or fitness goal, BMR can aid in laying down the foundations, but from there on, it has little else to offer. A calculated BMR and thus TDEE may result in unsatisfactory results because of their rough estimates, but maintaining a daily journal of exercise, food consumption, etc., can help track the factors that lead to any given results and help determine what works, as well as what needs to be improved upon. Tracking progress in said journal and making adjustments over time as needed is generally the best indication of progress towards reaching personal goals.</p>
    </div>
}

export default BMR;