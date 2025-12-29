import { useState } from "react";
import "./Header.css"

export const Header = (props) => {
    const [IsOpen, setIsOpen] = useState(true);

    return (
        <section>
            <div className="section-header">
                <div className="sign">
                    {props.start && <div className="line"></div>}
                    <div className="circle"></div>
                    {props.end && <div className="line"></div>}
                </div>
                <div className="section-header-content">
                    <span className="header-text">{props.text}</span>
                    <div className="toggle-btn"onClick={() => setIsOpen(!IsOpen)}>
                        <div className={`chevron chevron-${IsOpen ? "bottom" : "right"}`}></div>
                    </div>
                </div>
                
            </div>
            <div className="section-body header-back" hidden={!IsOpen}>
                <div className={"section-content" + (props.end ? " with-border" : '')}>{props.children}</div>
            </div>
        </section>
    )
}