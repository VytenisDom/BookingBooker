import {useState} from 'react'

export default function MainView({model, controller}) {

    const [
        bookings, validationError, editingMode, inputBooking, // static UI exports
        updateInputBooking, clearInputBooking, saveBooking, addNewBooking, editNewBooking, removeBooking // functional UI exports
    ] = controller(model);

    return (
        <>
        <h1>Meeting Room Booking</h1>
        <div className="card">
            <div className='addBookingRow'>
            <input type={"text"} value={inputBooking.topic} onInput={(e) => updateInputBooking("topic", e.target.value)} placeholder='Topic'/>
            <input type={"datetime-local"} value={inputBooking.startDate} onInput={(e) => updateInputBooking("startDate", e.target.value)} />
            <input type={"datetime-local"} value={inputBooking.endDate} onInput={(e) => updateInputBooking("endDate", e.target.value)} />
            <input type={"number"} value={inputBooking.numOfParticipants} onInput={(e) => updateInputBooking("numOfParticipants", e.target.value)} placeholder='Num of participants'/>
            {!editingMode && <button onClick={() => addNewBooking(inputBooking)}>Add</button>}
            {editingMode == true && <button onClick={() => saveBooking(inputBooking)}>Save</button>}
            <button onClick={clearInputBooking}>Clear</button>
            </div>
            
            {validationError != undefined && 
            <p>{validationError}</p>
            }

            {bookings.length > 0 && <div className='bookings'>
                {bookings.map((b, key) => (
                    <div key={key} className='bookingRow'>
                        <span>{b.topic}</span>
                        <span>{b.startDate.split("T").join(" ")}</span>
                        <span>{b.endDate.split("T").join(" ")}</span>
                        <span>{b.numOfParticipants}</span>
                        <span className='link' onClick={() => editNewBooking(b.id, b)}>Edit</span>
                        <span className='link' onClick={() => removeBooking(b.id)}>Delete</span>
                    </div>
                ))}
            </div>
            }
            {!bookings.length && 
                <p>There are currently no active bookings.</p>
            }
        </div>
        </>
    )
}
