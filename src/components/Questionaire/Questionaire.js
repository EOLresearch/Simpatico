import './questionaire.css';

import { useState } from "react";

export default function Questionaire({}) {


    return (
        <div className="questionaire-wrapper">
            <div className='questionaire-header'>
                <h2>Welcome</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                </p>
            </div>
            <div className='question-container'>
                <div className='question'>
                    <div className='prompt'>
                        Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                    </div>
                    <div className='answers'>
                        <div className='answer-container'>
                            <input type="radio" id="a1"/>
                            <label htmlFor='a1'>This is answer 1</label>
                        </div>
                        <div className='answer-container'>
                            <input type="radio" id="a2"/>
                            <label htmlFor='a2'>This is answer 2</label>
                        </div>
                        <div className='answer-container'>
                            <input type="radio" id="a3"/>
                            <label htmlFor='a3'>This is answer 3</label>
                        </div>
                        <div className='answer-container'>
                            <input type="radio" id="a4"/>
                            <label htmlFor='a4'>This is answer 4</label>
                        </div>
                    </div>
                </div>
                <div className='question'>
                    <div className='prompt'>
                        Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                    </div>
                    <div className='answers'>
                        <div className='answer-container'>
                            <input type="radio" id="a1"/>
                            <label htmlFor='a1'>This is answer 1</label>
                        </div>
                        <div className='answer-container'>
                            <input type="radio" id="a2"/>
                            <label htmlFor='a2'>This is answer 2</label>
                        </div>
                        <div className='answer-container'>
                            <input type="radio" id="a3"/>
                            <label htmlFor='a3'>This is answer 3</label>
                        </div>
                        <div className='answer-container'>
                            <input type="radio" id="a4"/>
                            <label htmlFor='a4'>This is answer 4</label>
                        </div>
                    </div>
                </div>
                <div className='question'>
                    <div className='prompt'>
                        Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                    </div>
                    <div className='answers'>
                        <div className='answer-container'>
                            <input type="radio" id="a1"/>
                            <label htmlFor='a1'>This is answer 1</label>
                        </div>
                        <div className='answer-container'>
                            <input type="radio" id="a2"/>
                            <label htmlFor='a2'>This is answer 2</label>
                        </div>
                        <div className='answer-container'>
                            <input type="radio" id="a3"/>
                            <label htmlFor='a3'>This is answer 3</label>
                        </div>
                        <div className='answer-container'>
                            <input type="radio" id="a4"/>
                            <label htmlFor='a4'>This is answer 4</label>
                        </div>
                    </div>
                </div>
                
            </div>
            <button className="btn">Submit</button>
        </div>
    );
}
  