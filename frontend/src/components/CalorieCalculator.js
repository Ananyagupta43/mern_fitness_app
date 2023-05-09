import React, { useState, useEffect } from "react";
import "./bmi_calculator/BMI.css";
import { useNavigate } from "react-router-dom";

const CalorieCalculator = ({ person }) => {

    const navigate = useNavigate();

    const { age, gender, height, weight, activity } = person;

    useEffect(() => {
        callGetStartedCalorie();
    }, [])

    const callGetStartedCalorie = async () => {

        const calories = calorieValue(weight, age, height, gender, activity);
        const email = JSON.parse(localStorage.getItem("email"));

        if (!email) {
            email = "abc@gmail.com"
        }
        const res = await fetch("/calculatingCalorie", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({
                weight, age, height, gender, activity, calories, email
            })

        })

        if (res.status === 200) {
            window.alert("Your results has been forwarded to your email ID");
        } else {
            const err = new Error(res.error);
            throw err;
        }

    }

    const calorieValue = (weight, age, height, gender, activity) => {
        if (gender === "male") {
            const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
            const value = bmr * activity;
            return Math.ceil(value);
        }
        else {
            const bmr = 10 * weight + 6.25 * height - 5 * age - 161;
            const value = bmr * activity;
            return Math.ceil(value);
        }
    }

    const goOnCalculator = () => {
        navigate("/form")
    }


    return <div style={{ padding: " 30px 50px" }}>
        <div style={{ width: "225px" }}><button className="button go-back" style={{ marginBottom: "30px" }} onClick={(goOnCalculator)}>Go Back</button></div>
        <h1 className="main-heading" >Calorie Calculator</h1>
        <p>The Calorie Calculator can be used to estimate the number of calories a person needs to consume each day. This calculator can also provide some simple guidelines for gaining or losing weight.</p>
        <div className="result">Result :- {calorieValue(weight, age, height, gender, activity)} calories/day to maintain weight </div>
        <h3>How Many Calories Do You Need?</h3>
        <p>Many people seek to lose weight, and often the easiest way to do this is to consume fewer calories each day. But how many calories does the body actually need in order to be healthy? This largely depends on the amount of physical activity a person performs each day, and regardless of this, is different for all people – there are many different factors involved, not all of which are well-understood or known.</p>
        <p>Some factors that influence the number of calories a person needs to remain healthy include age, weight, height, sex, levels of physical activity, and overall general health. For example, a physically active 25-year-old male that is 6 feet in height requires considerably higher calorie intake than a 5-foot-tall, sedentary 70-year-old woman. Though it differs depending on age and activity level, adult males generally require 2,000-3000 calories per day to maintain weight while adult females need around 1,600-2,400 according to the U.S Department of Health.</p>
        <p>The body does not require many calories to simply survive. However, consuming too few calories results in the body functioning poorly, since it will only use calories for functions essential to survival, and ignore those necessary for general health and well-being. Harvard Health Publications suggests women get at least 1,200 calories and men get at least 1,500 calories a day unless supervised by doctors. As such, it is highly recommended that a person attempting to lose weight monitors their body's caloric necessities and adjusts them as necessary to maintain its nutritional needs.</p>
        <div>
            <h3>Calories Burned from Common Exercises:</h3>
            <table className="table" style={{ width: "650px" }}>
                <thead>
                    <tr className="table-head">
                        <th>Activity (1 hour)</th>
                        <th className="table-head">125 lb person</th>
                        <th className="table-head">155 lb person</th>
                        <th className="table-head">185 lb person</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="odd-table-row">
                        <td className="table-data">Golf (using cart)</td>
                        <td className="table-data">198</td>
                        <td className="table-data">246</td>
                        <td className="table-data">294</td>
                    </tr>
                    <tr className="even-table-row">
                        <td className="table-data">Walking (3.5 mph)</td>
                        <td className="table-data">215</td>
                        <td className="table-data">267</td>
                        <td className="table-data">319</td>
                    </tr>
                    <tr className="odd-table-row">
                        <td className="table-data">Kayaking</td>
                        <td className="table-data">283</td>
                        <td className="table-data">252</td>
                        <td className="table-data">420</td>
                    </tr>
                    <tr className="even-table-row">
                        <td className="table-data">Softball/Baseball</td>
                        <td className="table-data">289</td>
                        <td className="table-data">359</td>
                        <td className="table-data">428</td>
                    </tr>
                    <tr className="odd-table-row">
                        <td className="table-data">Swimming (free-style, moderate)</td>
                        <td className="table-data">397</td>
                        <td className="table-data">492</td>
                        <td className="table-data">587</td>
                    </tr>
                    <tr className="even-table-row">
                        <td className="table-data">Tennis (general)</td>
                        <td className="table-data">397</td>
                        <td className="table-data">492</td>
                        <td className="table-data">587</td>
                    </tr>
                    <tr className="odd-table-row">
                        <td className="table-data">Running (9 minute mile)</td>
                        <td className="table-data">624</td>
                        <td className="table-data">773</td>
                        <td className="table-data">923</td>
                    </tr>
                    <tr className="even-table-row">
                        <td className="table-data">Bicycling (12-14 mph, moderate)</td>
                        <td className="table-data">454</td>
                        <td className="table-data">562</td>
                        <td className="table-data">671</td>
                    </tr>
                    <tr className="odd-table-row">
                        <td className="table-data">Football (general)</td>
                        <td className="table-data">399</td>
                        <td className="table-data">494</td>
                        <td className="table-data">588</td>
                    </tr>
                    <tr className="even-table-row">
                        <td className="table-data">Basketball (general)</td>
                        <td className="table-data">340</td>
                        <td className="table-data">422</td>
                        <td className="table-data">503</td>
                    </tr>
                    <tr className="odd-table-row">
                        <td className="table-data">Soccer (general)</td>
                        <td className="table-data">397</td>
                        <td className="table-data">492</td>
                        <td className="table-data">587</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3>Calories: Different Kinds and Their Effects</h3>
        <p>The main sources of calories in a typical person's diet are carbohydrates, proteins, and fat, with alcohol also being a significant portion of calorie intake for many people (though ideally this should be limited since alcohol contains many empty calories). Some studies have shown that the calories displayed on nutrition labels and the calories actually consumed and retained can vary significantly. This hints at the complex nature of calories and nutrition and is why many conflicting points of view on the "best" methodology for losing weight exist. For example, how a person chews their food has been shown to affect weight loss to some degree; generally speaking, chewing food more increases the number of calories that the body burns during digestion. People that chew more also tend to eat less, since the longer period of time necessary to chew their food allows more time to reach a state of satiety, which results in eating less. However, the effects of how food is chewed and digestion of different foods are not completely understood and it is possible that other factors exist, and thus this information should be taken with a grain of salt (in moderation if weight loss is the goal).</p>
        <p>Generally, foods that take more effort to chew – fruit, vegetables, lean meats, whole grains, etc. – require the body to burn more calories since more calories are required to digest them. It also results in the feeling of satiety for longer periods of time. Furthermore, certain foods like coffee, tea, chilies, cinnamon, and ginger have been found to increase the rate of calories burned, due to the ingredients they contain.</p>
        <p>The "quality" of calories consumed is also important. There are different classifications of foods in terms of calories. This includes high-calorie foods, low-calorie foods, and empty calories. Consistent with their naming, high-calorie foods are foods that are calorically dense, meaning that there are a high number of calories relative to serving size, while low-calorie foods have fewer calories relative to serving size. Foods such as fat, oils, fried foods, and sugary foods are examples of high-calorie foods. Being a high-calorie food does not inherently mean that the food is unhealthy however – avocados, quinoa, nuts, and whole grains are all high-calorie foods that are considered healthful in moderation. Low-calorie foods include vegetables and certain fruits, among other things, while empty calories, such as those in added sugars and solid fats, are calories that contain few to no nutrients. Studies have shown that there is a measurable difference between consuming 500 calories of carrots compared to 500 calories of popcorn. As previously mentioned, this in part can be attributed to differences in how the foods are consumed and processed. Carrots require far more chewing and can result in more calories burned during digestion. Again, the mechanism for these differences is not fully defined, but simply note that for weight loss purposes, the general formula of calories in minus calories out determining weight gain or loss does hold, but that the number of calories on a nutrition label is not necessarily indicative of how many calories the body actually retains. While there is no clear-cut or ideal amount of macronutrient proportions a person should consume to maintain a healthy diet or lose weight, eating a "healthy" diet replete with a variety of unprocessed foods such as vegetables, fruits, and lean meats is correlated with being healthier, and is more likely to result in sustainable weight loss. Also, remember that calories from drinks comprise an estimated 21% of a typical person's diet. Many of these calories fall under the category of empty calories. While sodas are an obvious culprit, drinks such as juices and even milk have large amounts of sugar and should be consumed in moderation to avoid negating their nutritional benefits. Ideally, a person should drink water, tea, and coffee without adding sugar in order to reduce calories gained from drinks.</p>
        <p>Remember: All foods, including "healthful foods," should be consumed in moderation, and distinctions can often be misleading since even natural foods like fruits can have large amounts of sugar, and foods labeled as "health foods" such as low-calorie foods, reduced-fat foods, etc. can potentially replace one unhealthy component with another. Many reduced-fat foods have large amounts of added sugar to compensate for taste lost through fat reduction. It is important to pay attention to, and consider the different components in a food product in order to determine whether said food should have a place within your diet.</p>
    </div>
}

export default CalorieCalculator;