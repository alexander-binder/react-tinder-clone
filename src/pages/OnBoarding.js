import { useState } from "react";
import Nav from "../components/Nav";

const OnBoarding = () => {


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted');
    }

    const handleChange = (e) => {
        console.log('input changed');
        
    }

    return (
        <>
            <Nav 
                minimal={true}
                authToken={true} 
                setShowModal={() => {}} 
                showModal={false}  
               
            />
            <div className="onboarding">
                <h2>CREATE ACCOUNT</h2>

                <form onSubmit={handleSubmit}>
                    <section>
                        
                            <label htmlFor="first_name">First Name</label>
                            <input 
                                id="first_name" 
                                name="first_name" 
                                type="text"
                                placeholder="First Name"
                                required={true}
                                value={""}
                                onChange={handleChange}
                            />

                            <label>Brithday</label>
                             <div className="multiple-input-container">
                            <input 
                                id="dob_day" 
                                name="dob_day" 
                                type="number"
                                placeholder="DD"
                                required={true}
                                value={""}
                                onChange={handleChange}
                            />
                            <input 
                                id="dob_month" 
                                name="dob_month" 
                                type="number"
                                placeholder="MM"
                                required={true}
                                value={""}
                                onChange={handleChange}
                            />
                            <input 
                                id="dob_year" 
                                name="dob_year" 
                                type="number"
                                placeholder="YYYY"
                                required={true}
                                value={""}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <label>Gender</label>
                        <div className="multiple-input-container">
                           
                            <input 
                                id="man-gender-identity" 
                                name="gender_identity" 
                                type="radio"
                                value="man"
                                onChange={handleChange}
                                checked={false}
                            />
                            <label htmlFor="man-gender-identity">Man</label>

                            <input 
                                id="woman-gender-identity" 
                                name="gender_identity" 
                                type="radio"
                                value="woman"
                                onChange={handleChange}
                                checked={false}
                            />
                            <label htmlFor="woman-gender-identity">Woman</label>
                            
                            <input 
                                id="more-gender-identity" 
                                name="gender_identity" 
                                type="radio"
                                value="more"
                                onChange={handleChange}
                                checked={false}
                            />
                            <label htmlFor="more-gender-identity">More</label>
                        </div>

                        <label htmlFor="show-gender">Show gender on my profile</label>
                        <input 
                                id="show-gender" 
                                name="show-gender" 
                                type="checkbox"
                                onChange={handleChange}
                                checked={false}
                        />

                        <label >Show Me</label>
                        <div className="multiple-input-container">
        
                            <input 
                                id="man-gender-interest" 
                                name="gender-interest" 
                                type="radio"
                                value="man"
                                onChange={handleChange}
                                checked={false}
                            />
                            <label htmlFor="man-gender-interest">Man</label>

                            <input 
                                id="woman-gender-interest" 
                                name="gender_interest" 
                                type="radio"
                                value="woman"
                                onChange={handleChange}
                                checked={false}
                            />
                            <label htmlFor="woman-gender-interest">Woman</label>
                            
                            <input 
                                id="everyone-gender-interest" 
                                name="gender_interest" 
                                type="radio"
                                value="everyone"
                                onChange={handleChange}
                                checked={false}
                            />
                            <label htmlFor="more-gender-interest">Everyone</label>
                        </div>

                        <label htmlFor="about">About me</label>
                        <input 
                                id="about" 
                                name="about" 
                                type="text"
                                placeholder="I like dancing... "
                                required={true}
                                value={""}
                                onChange={handleChange}
                        />

                        <input type="submit" />
                    </section>

                    {/* --- new section for the right side ---  */}
                   
                    <section>
                        <label htmlFor="url">Profile Pic</label>
                            <input 
                                    id="url" 
                                    name="url" 
                                    type="url"
                                    required={true}
                                    onChange={handleChange}
                            />
                            <div className="photo-container">
                                
                            </div>
                    </section>
                </form>

            </div>
        </>
        
    );
}

export default OnBoarding;