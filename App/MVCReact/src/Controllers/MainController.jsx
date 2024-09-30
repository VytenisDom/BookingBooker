import { useState, useEffect } from 'react'

function MainController(model) {
    const [bookings, updateBookings] = useState([]);
    const [validationError, setValidationError] = useState(undefined);
    const [inputBooking, setInputBooking] = useState(model);
    const [editingMode, setEditingMode] = useState(false);
    const [editingBookingKey, setEditingBookingKey] = useState(null);


    useEffect(() => {
        fetch("https://bookingbooker.onrender.com/getBookings", {
            method: "GET"
        })
        .then(req => req.json())
        .then(req => updateBookings(req));
    }, []);

    const validateBooking = (booking) => {
        // General
        if (
            !booking.topic ||
            !booking.startDate ||
            !booking.endDate ||
            !booking.numOfParticipants
            ) {
            setValidationError("Fields can not be empty.");
            return false;
        }

        // NumOfParticipants > 0
        if (booking.numOfParticipants < 1) {
            setValidationError("Number of participants in a meeting must be a positive number.");
            return false;
        }

        // Start/end dates can not be in the past
        if (
            new Date(booking.startDate).getTime() < new Date().getTime() ||
            new Date(booking.endDate).getTime() < new Date().getTime()
            ) {
            setValidationError("Meeting start and end times can not be in the past.");
            return false;
        }

        // Meeting end date can not be earlier than the start date
        if (new Date(booking.startDate).getTime() >new Date(booking.endDate).getTime()) {
            setValidationError("Meeting end time can not be earlier than start time.");
            return false;
        }

        setValidationError(undefined);
        return true;
    };

    const addBooking = (booking) => {
        // updateBookings((prev) => {
        //     if (prev) {
        //         return [...prev, booking];
        //     } else {
        //         return [booking];
        //     }
        // });

        fetch("https://bookingbooker.onrender.com/addBooking", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"booking": booking})
        })
        .then(req => req.json())
        .then(req => updateBookings(req));
    };

    const removeBooking = (key) => {
        fetch("https://bookingbooker.onrender.com/removeBooking/" + key, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(req => req.json())
        .then(req => updateBookings(req));
    };

    const editBooking = (key, booking) => {
        fetch("https://bookingbooker.onrender.com/editBooking/" + key, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"booking": booking})
        })
        .then(req => req.json())
        .then(req => updateBookings(req));
    };

    const saveBooking = (savableBooking) => {
        if (validateBooking(savableBooking)) {
            editBooking(editingBookingKey, savableBooking);
            setEditingMode(false);
            setEditingBookingKey(null);
            clearInputBooking();
        }
    };

    const updateInputBooking = (name, value) => {
        setInputBooking((prev) => {
            return {
                ...prev,
                [name] : value
            }
        });
    };

    const clearInputBooking = () => {
        setInputBooking({
        topic : "",
        startDate: "",
        endDate: "",
        numOfParticipants: ""
        });
    };

    const addNewBooking = (newBooking) => {
        if (validateBooking(newBooking)) {
            addBooking(newBooking);
            clearInputBooking();
        }
    };

    const editNewBooking = (key, editableBooking) => {
        setEditingMode(true);
        setEditingBookingKey(key);
        setInputBooking(editableBooking);
    };

    return [
        bookings, validationError, editingMode, inputBooking,
        updateInputBooking, clearInputBooking, saveBooking, addNewBooking, editNewBooking, removeBooking
    ]
}

export default MainController;