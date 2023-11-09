import React from 'react'
import './loading.css'
export default function Loading() {
    return (
        <div className="loader-parent">
            <div className="loader">
                <div className="ball"></div>
                <div className="ball"></div>
                <div className="ball"></div>
                <span style={{
                    fontSize: "22px"
                }}> Loading...</span>

            </div>
        </div>
    )
}
