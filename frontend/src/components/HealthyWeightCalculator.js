import React, { useState, useEffect } from "react";
import "./bmi_calculator/BMI.css";
import { useNavigate } from "react-router-dom";


const HealthyWeightCalculator = ({ person }) => {
    const navigate = useNavigate()
    const { height } = person;

    useEffect(() => {
        callGetStartedHealthyWeight();
    }, [])

    const callGetStartedHealthyWeight = async () => {

        const healthyWeight = healthyWeightValue(height);
        const email = JSON.parse(localStorage.getItem("email"));

        if (!email) {
            email = "abc@gmail.com"
        }
        const res = await fetch("/calculatingHealthyWeight", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({
                height, healthyWeight, email
            })

        })

        if (res.status === 200) {
            window.alert("Your results has been forwarded to your email ID");
        } else {
            const err = new Error(res.error);
            throw err;
        }

    }




    const healthyWeightValue = (height) => {
        height = height / 100;
        const lowerLimit = 18.5 * (height * height);
        const upperLimit = 24.9 * (height * height);
        const result = `${lowerLimit.toFixed(1)} kg to ${upperLimit.toFixed(1)} kg`;
        return result;
    }

    const goOnCalculator = () => {
        navigate("/form")
    }

    return <div style={{ padding: " 30px 50px" }}>
        <div style={{ width: "225px" }}><button className="button go-back" style={{ marginBottom: "30px" }} onClick={(goOnCalculator)}>Go Back</button></div>
        <h1 className="main-heading" >Healthy Weight Calculator</h1>
        <p>This calculator computes a healthy body weight range based on a person's height and is most accurate for adults aged 18 or older.</p>
        <div className="result">Result :- {healthyWeightValue(height)} </div>
        <h4>What is a Healthy Weight?</h4>
        <p>The range of healthy body weights is calculated based on BMI. Given a specific height, the calculator uses standard algorithms to calculate the range of possible body weights that fall within different categories of weight determined by BMI. An adult aged 18 or older with a BMI between 18.5 and 25 kg/m2 is typically defined as having a healthy or normal weight. Refer to the BMI Calculator for more information, but note that a "healthy body weight" is based on estimations that do not account for certain factors such as body composition. While accurate for an "average" person, this means that it is possible to be categorized as overweight or underweight and still be "healthy," but this requires more than a generalized calculation to determine – likely with the help of a medical professional.</p>
        <h4>Effects of Being Underweight, Overweight, and Obese</h4><br />
        <h5>Underweight (BMI &lt; 18.5):</h5>
        <p>A person can be underweight as a result of genetics, lack of food, metabolic issues, use of drugs, or illness. Being underweight is associated with a host of medical conditions that include hyperthyroidism, cancer, or tuberculosis, and can be indicative of some underlying disease or disorder. Studies have also shown that being underweight results in an increase in mortality rates comparable to that of the morbidly obese. It is possible however that these rates are affected by disease-related weight loss, and being underweight in the absence of some underlying disease may not have significantly higher mortality rates as compared to rates for a healthy weight.</p>
        <p>Being underweight can also cause other issues, including low energy levels or stamina, osteoporosis, and a weak immune system that can make a person more susceptible to infection. Also, people that are underweight due to lack of high-quality food (rather than excessive exercise or other possible reasons) can become malnourished, which can cause both physical and mental development issues. In extreme cases, severe forms of malnutrition such as kwashiorkor and marasmus can result.</p>
        <p>Specifically for women, being underweight due to an eating disorder can result in the absence of menstruation, infertility, and possible complications during pregnancy.</p>
        <h5>Overweight (BMI 25-30):</h5>
        <p>Being overweight is typically a result of consuming more calories than the body expends through metabolic processes and exercise. Being overweight is also affected by many other factors, including alcoholism, a genetic predisposition, eating disorders, limited physical exercise and a sedentary lifestyle, poor nutrition, and stress.</p>
        <p>The negative effects of being overweight are somewhat more controversial than those of being obese. It is generally accepted that being overweight causes similar issues as obesity (as will be discussed below), but to a lesser extent. However, there have been studies that show a lower mortality rate for overweight people compared to those categorized as having a healthy weight.1 In response to these findings, some argued that a BMI range of 25-30, which is currently categorized as overweight, may be optimal, while others argued that mortality is far from the sole indicator of health – the increased risk of diabetes, heart disease, and several forms of cancer are significant factors influenced by being overweight</p>
        <h5>Obese (BMI &gt; 30):</h5>
        <p>Obesity is typically caused by a lack of exercise, excessive food intake, and genetic susceptibility. There are rarer cases where obesity is caused primarily by genes, hormonal imbalances due to endocrine disorders, medications, or mental disorders. It is mostly preventable however, through lifestyle and diet changes, though there is still insufficient understanding of all the factors affecting obesity. While it can be broken down to the simple, personal case of controlling energy intake and output, there is often more involved and managing obesity on a societal level has far from an algorithmic solution.</p>
        <p>Obesity greatly increases the risk of cardiovascular diseases such as heart disease and stroke as well as hypertension, type 2 diabetes, musculoskeletal disorders including osteoarthritis, and some cancers. It can also cause obstructive sleep apnea and depression (or sometimes be caused by depression). Because of all the potential complications of obesity, it has been found to reduce life expectancy, and is classified as one of the leading preventable causes of death worldwide.</p>
        <h4>Maintaining a Healthy Weight</h4>
        <p>Being underweight, overweight, or obese are conditions that lead to significantly different health complications. Managing these conditions however, involves addressing many similar underlying issues, including diet, exercise, and possible mental health disorders.</p>
        <p>In the case of being underweight, increasing calorie intake through eating nutrient-rich foods such as whole-grains, vegetables, lean protein sources, and nuts and seeds more frequently can help underweight individuals to gain weight in a healthy manner. In addition, exercise such as weight lifting to increase muscle mass can also increase a person's weight. When the underlying cause of a person being underweight is a mental health disorder such as anorexia or bulimia nervosa, treatment involves addressing the psychological problems in conjunction with physical approaches to increase weight.</p>
        <p>Overweight and obesity, similarly to being underweight, can largely be reduced through changes in diet and exercise. The WHO recommends limiting intake of calorie-dense foods, total fats, and sugars, while increasing the consumption of fruits, vegetables, legumes, whole grains, and nuts. It further recommends engaging in regular physical activity, defining this as 60 minutes a day for children, and 150 minutes total per week for adults. However, individual responsibility can only be fully effective if people have access to a healthy lifestyle in terms of education, affordable and healthier dietary choices, and changes such as a tax on sugar-sweetened beverages, reduction of the sugar and salt contents of processed foods, and decreased marketing of such foods, particularly to children and teenagers.</p>
    </div>

}

export default HealthyWeightCalculator;