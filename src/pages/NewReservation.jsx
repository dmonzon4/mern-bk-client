import React from 'react'
import { Link } from 'react-router-dom'

export default function NewReservation() {
  return (
    <div>
      <h1>New Reservation</h1>

      <form>

        <div className="mb-3">
          <label htmlFor="area">Area:</label>
          <select id="area" value={"selectedArea"} onChange={"handleAreaChange"}>
            <option value="">Selecciona un área</option>
            {/* {areasList.map((area, index) => (
              <option key={index} value={area}>
                {area}
            </option>
            ))} */}
          </select>
        </div>
        <div className="mb-3">
          <label >Name:</label>
          <input type="text" id="name" value={""} readOnly />
        </div>
        <div className="mb-3">
          <label >Email:</label>
          <input type="text" id="email" value={""} readOnly />
        </div>
        <div className="mb-3">
          <label >Phone Number:</label>
          <input type="text" id="telNum" value={""} readOnly />
        </div>

        

      </form>
      <div>
        <button onClick={"handleButtonClick"}>Reservar</button>
      </div>
    </div>
  )
}
