import React from 'react';
import { Envelope,CalendarBlank,Package } from 'phosphor-react';

const Footer = () => {
    return (
       <div className='footer'>
       <div className = 'wrapper footerWrapper'> 
            <div className="footerHeading">
                <h2>Want More Help?</h2>
                
            </div>
                    <div className="footerCta">
                         <div className="chat">
                            <Envelope id="envelope"size={50} />
                            <div className="flex">
                                <h3>Chat With <span>an Expert</span></h3>
                            </div>
                        </div>
                    
                        <div className="schedule">
                            <CalendarBlank id="calendar"size={50} />
                            <div className="flex">
                                <h3>Schedule An <span>Appointment</span></h3>
                            </div>
                        </div>
                        <div className="shipping">
                            <Package id="shipping"size={50} />
                            <div className="flex">
                                <h3>Free <span>Shipping</span></h3>
                            </div>
                        </div>
                    </div>
             <div className="copyright">
                {/* <p>Developed & Designed by <a href="https://www.renata-reinartz.com">Renata Reinartz </a>
                  | Prepared for Juno College <a href="https://www.junocollege.com">Juno College</a></p> */}
            </div>
        </div>
        </div>
    
    )
}

export default Footer