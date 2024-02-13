import React from 'react';
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { IconContext } from 'react-icons';

function PromptsList({  }) {
  return (
    <div className="prompts-list">
      <div className="contact" >
        <div className="contact-body">
          <h4>How are you feeling today?</h4>
          <div className='convo-starter'>
            <RxCaretLeft /><input type="text" placeholder="Enter your text here" />
          </div>
        </div>
      </div>
      <div className="contact" >
        <div className="contact-body">
          <h4>Its raining today where Brian lives in </h4>
          <div className='convo-starter'>
            <RxCaretLeft /><input type="text" placeholder="Enter your text here" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PromptsList;
