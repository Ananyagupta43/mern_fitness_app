import React, { useEffect, useState } from "react";
import "./bmi_calculator/BMI.css";
import { Gradient } from "@mui/icons-material";
import { orange, yellow } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const BodyFatCalculator = ({ person }) => {
    const { gender, height, neck, waist, hips } = person;
    const navigate = useNavigate();

    useEffect(() => {
        callGetStartedBodyFat();
    }, [])

    const callGetStartedBodyFat = async () => {

        const bodyFat = bodyFatValue(gender, height, neck, waist, hips)
        const email = JSON.parse(localStorage.getItem("email"));

        if (!email) {
            email = "abc@gmail.com"
        }
        const res = await fetch("/calculatingBodyFat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({
                gender, height, neck, waist, hips, bodyFat, email
            })

        })

        if (res.status === 200) {
            window.alert("Your results has been forwarded to your email ID");
        } else {
            const err = new Error(res.error);
            throw err;
        }

    }

    const bodyFatValue = (gender, height, neck, waist, hips) => {
        if (gender === "male") {
            const value = (495 / (1.0324 - (0.19077 * Math.log10(Number(waist) - Number(neck))) + (0.15456 * Math.log10(Number(height))))) - 450;
            return value.toFixed(1);
        }
        else {
            const value = (495 / (1.29579 - (0.35004 * (Math.log10(Number(waist) + Number(hips) - Number(neck)))) + (0.22100 * (Math.log10(Number(height)))))) - 450;
            return value.toFixed(1);
        }
    }

    const goOnCalculator = () => {
        navigate("/form")
    }

    return <div style={{ padding: " 30px 50px" }}>
        <div style={{ width: "225px" }}><button className="button go-back" style={{ marginBottom: "30px" }} onClick={(goOnCalculator)}>Go Back</button></div>
        <h1 className="main-heading">Body Fat Calculator</h1>
        <p>The Body Fat Calculator can be used to estimate your total body fat based on specific measurements. Use the "Metric Units" tab if you are more comfortable with the International System of Units (SI). To get the best results, measure to the nearest 1/4 inch (0.5 cm). This calculation is based on the U.S. Navy method, but also includes the calculation of body fat percentage using the BMI method (both of which are outlined below).</p>
        <div className="result">Result :-{bodyFatValue(gender, height, neck, waist, hips)} %</div>
        <h3 className="main-heading">Reference :</h3>
        <h4>The American Council on Exercise Body Fat Categorization</h4>
        <div>
            <table className="table">
                <thead>
                    <tr className="table-head">
                        <th>Description</th>
                        <th className="table-head">Women</th>
                        <th className="table-head">Men</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="odd-table-row">
                        <td className="table-data">Essential fat</td>
                        <td className="table-data">10-13%</td>
                        <td className="table-data">2-5%</td>
                    </tr>
                    <tr className="even-table-row">
                        <td className="table-data">Athletes</td>
                        <td className="table-data">14-20%</td>
                        <td className="table-data">6-13%</td>
                    </tr>
                    <tr className="odd-table-row">
                        <td className="table-data">Fitness</td>
                        <td className="table-data">21-24%</td>
                        <td className="table-data">14-17%</td>
                    </tr>
                    <tr className="even-table-row">
                        <td className="table-data">Average</td>
                        <td className="table-data">25-31%</td>
                        <td className="table-data">18-24%</td>
                    </tr>
                    <tr className="odd-table-row">
                        <td className="table-data">Obese</td>
                        <td className="table-data">32+%</td>
                        <td className="table-data">25+%</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h4>Jackson & Pollard Ideal Body Fat Percentages</h4>
        <div>
            <table className="table">
                <thead>
                    <tr className="table-head">
                        <th>Age</th>
                        <th className="table-head">Women</th>
                        <th className="table-head">Men</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="odd-table-row">
                        <td className="table-data">20</td>
                        <td className="table-data">17.7%</td>
                        <td className="table-data">8.5%</td>
                    </tr>
                    <tr className="even-table-row">
                        <td className="table-data">25</td>
                        <td className="table-data">18.4%</td>
                        <td className="table-data">10.5%</td>
                    </tr>
                    <tr className="odd-table-row">
                        <td className="table-data">30</td>
                        <td className="table-data">19.3%</td>
                        <td className="table-data">12.7%</td>
                    </tr>
                    <tr className="even-table-row">
                        <td className="table-data">35</td>
                        <td className="table-data">21.5%</td>
                        <td className="table-data">13.7%</td>
                    </tr>
                    <tr className="odd-table-row">
                        <td className="table-data">40</td>
                        <td className="table-data">22.2%</td>
                        <td className="table-data">15.3%</td>
                    </tr>
                    <tr className="even-table-row">
                        <td className="table-data">45</td>
                        <td className="table-data">22.9%</td>
                        <td className="table-data">16.4%</td>
                    </tr>
                    <tr className="odd-table-row">
                        <td className="table-data">50</td>
                        <td className="table-data">25.2%</td>
                        <td className="table-data">18.9%</td>
                    </tr>
                    <tr className="even-table-row">
                        <td className="table-data">55</td>
                        <td className="table-data">26.3%</td>
                        <td className="table-data">20.9%</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3>Body Fat, Overweight, and Obesity</h3>
        <p>The scientific term for body fat is "adipose tissue." Adipose tissue serves a number of important functions. Its primary purpose is to store lipids from which the body creates energy. In addition, it secretes a number of important hormones, and provides the body with some cushioning as well as insulation.</p>
        <p>Body fat includes essential body fat and storage body fat. Essential body fat is a base level of fat that is found in most parts of the body. It is necessary fat that maintains life and reproductive functions. The amount of essential fat differs between men and women, and is typically around 2-5% in men, and 10-13% in women. The healthy range of body fat for men is typically defined as 8-19%, while the healthy range for women is 21-33%. While having excess body fat can have many detrimental effects on a person's health, insufficient body fat can have negative health effects of its own, and maintaining a body fat percentage below, or even at the essential body fat percentage range is a topic that should be discussed with a medical professional.</p>
        <p>Storage fat is fat that accumulates in adipose tissue, be it subcutaneous fat (deep under the dermis and wrapped around vital organs) or visceral fat (fat located inside the abdominal cavity, between organs), and references to body fat typically refer to this type of fat. While some storage fat is ideal, excess amounts of storage fat can have serious negative health implications.</p>
        <p>Excess body fat leads to the condition of being overweight and eventually to obesity given that insufficient measures are taken to curb increasing body fat. Note that being overweight does not necessarily indicate an excess of body fat. A person's body weight is comprised of multiple factors including (but not limited to) body fat, muscle, bone density, and water content. Thus, highly muscular people are often classified as overweight.</p>
        <p>The rate at which body fat accumulates is different from person to person and is dependent on many factors including genetic factors as well as behavioral factors such as lack of exercise and excessive food intake. Due to varying factors, it can be more difficult for certain people to reduce body fat stored in the abdominal region. However, managing diet and exercise has been shown to reduce stored fat. Note that both women and men store body fat differently and that this can change over time. After the age of 40 (or after menopause in some cases for women), reduced sexual hormones can lead to excess body fat around the stomach in men, or around the buttocks and thighs of women.</p>
        <h3>Potential Complications of Excess Body Fat</h3>
        <p>The World Health Organization (WHO) classifies obesity as one of the leading preventable causes of death worldwide that is estimated to claim 111,909 to 365,000 deaths per year in the U.S. This has been a growing cause for concern because 36.5% of U.S. adults are defined as obese according to the Centers for Disease Control and Prevention.</p>
        <p>Obesity is associated with a reduction in quality of life, poorer mental health outcomes, obstructive sleep apnea, as well as multiple leading causes of death worldwide such as cardiovascular disease, stroke, certain cancers and diabetes. All of these potential complications have the ability to reduce a person's life expectancy, and as such, obesity is a medical condition that is studied by many researchers.</p>
        <p>As previously mentioned, fat produces a number of essential hormones that affect a person's body. An excess or a lack of critical hormones can have negative effects that preclude proper body function. On a related note, studies have found that excess body fat, particularly abdominal fat, disrupts the normal balance and function of some of these hormones. Furthermore, body fat, specifically visceral fat, has a role in the release of specific cytokines, which are a broad category of proteins involved in cell signaling, that can potentially increase the risk of cardiovascular disease. Visceral fat is also directly associated with higher levels of low-density lipoprotein (LDL) cholesterol, lower high-density lipoprotein (HDL) cholesterol, and insulin resistance. LDL cholesterol is commonly referred to as "bad cholesterol" while HDL is referred to as "good cholesterol." High levels of LDL cholesterol can clog arteries and lead to complications including heart attacks. Insulin resistance involves cells not properly responding to the hormone insulin, which can lead to high blood sugar levels, and eventually to type 2 diabetes. As can be seen, excess visceral fat can have measurable negative impacts to a person's health.</p>
    </div>
}

export default BodyFatCalculator;