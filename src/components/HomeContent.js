import React from 'react'

export default function HomeContent() {
  return (
    <section className="container">
        <div className="columns features">
            <div className="column is-3">
                <div className="card is-shady">
                    <div className="card-content">
                        <div className="content">
                            <img src="insurance.svg"></img>
                        </div>
                    </div>
                </div>
            </div>
            <div className="column is-3">
                <div className="card is-shady">
                    <div className="card-content">
                        <div className="content">
                        <img src="road_tax.svg"></img>
                        </div>
                    </div>
                </div>
            </div>
            <div className="column is-3">
                <div className="card is-shady">
                     <div className="card-content">
                        <div className="content">
                        <img src="pti.svg"></img>
                        </div>
                    </div>
                </div>
            </div>
            <div className="column is-3">
                <div className="card is-shady">
                     <div className="card-content">
                        <div className="content">
                        <img src="check.svg"></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
