import React, {useState} from 'react';
import Event from '../../models/Event.ts';
import {FormLabel, MenuItem, OutlinedInput, Select, Snackbar, SnackbarOrigin} from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import * as eventService from '../../services/event-service.ts'
import AuthGuard from "../../components/Auth/AuthGuard.tsx";
import Roles from "../../models/Roles.ts";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import {ArrowBackRounded} from "@mui/icons-material";
import CardActions from "@mui/material/CardActions";
import {useNavigate} from "react-router-dom";

const initialEventState: Event = {
    type: '',
    title: '',
    organizer: '',
    description: '',
    date: new Date(),
    contactInfo: '',
    eventImage: '',
    location: {
        latitude: 0,
        longitude: 0,
        name: 'Location Name',
        address: '',
        city: '',
        state: '',
        country: 'USA',
        postalCode: ''
    }
};

const CreateEvent = () => {
    const [image, setImage] = useState();
    const [state, setState] = useState({open: false, message: ''});
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle form submission logic here
        const formData = new FormData(event.target);
        initialEventState.type = formData.get('type') !==null ? formData.get('type') : '';
        initialEventState.title = formData.get('title') !==null ? formData.get('title') : '';
        initialEventState.description = formData.get('description') !==null ? formData.get('description') : '';
        initialEventState.organizer = formData.get('organizer') !==null ? formData.get('organizer') : '';
        initialEventState.contactInfo = formData.get('contactInfo') !==null ? formData.get('contactInfo') : '';
        initialEventState.date = formData.get('date') !==null ? formData.get('date') : '';
        initialEventState.location.address = formData.get('address') !==null ? formData.get('address') : '';
        initialEventState.location.city = formData.get('city') !==null ? formData.get('city') : '';
        initialEventState.location.state = formData.get('state') !==null ? formData.get('state') : '';
        initialEventState.location.postalCode = formData.get('postalCode') !==null ? formData.get('postalCode') : '';
        initialEventState.eventImage = image != null ? image : '';

        eventService.createEvent(initialEventState).then((response) => {
            if (response.status == 200) {
                setState({open: true, message: "Event created"});
            } else {
                setState({open: true, message: "Event creation failed"});
            }
        });
    };

    const handleClose = () => {
        setState({open: false, message: ''});
    };

    const handleFileUpload = (e) => {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.onerror = error => {
            console.log("Error: ", error);
        };
    };

    return (
        <AuthGuard allowedRoles={[Roles.ADMIN]}>
            <Card variant="outlined">
                <Snackbar
                    anchorOrigin={{ vertical:'bottom', horizontal:'left' }}
                    open={state.open}
                    onClose={handleClose}
                    message={state.message}
                    key={'bottomleft'}
                />
                <CardActions>
                    <IconButton onClick={() => navigate('/events')}>
                        <ArrowBackRounded/>
                    </IconButton>
                </CardActions>
                <CardContent>
                    <div>
                        <form id="eventForm" onSubmit={handleSubmit}>
                            <Stack spacing={2}>
                                <div>
                                    <div>
                                        <FormLabel htmlFor="title" required>
                                            Title
                                        </FormLabel>
                                    </div>
                                    <div>
                                        <OutlinedInput
                                            id="title"
                                            name="title"
                                            type="text"
                                            placeholder="Title"
                                            sx={{width: 350}}
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <FormLabel htmlFor="description" required>
                                            Description
                                        </FormLabel>
                                    </div>
                                    <div>
                                        <OutlinedInput
                                            id="description"
                                            name="description"
                                            type="text"
                                            placeholder="Description"
                                            multiline={true}
                                            rows={6}
                                            sx={{width: 350}}
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <FormLabel htmlFor="organizer" required>
                                            Name of the Organizer
                                        </FormLabel>
                                    </div>
                                    <div>
                                        <OutlinedInput
                                            id="organizer"
                                            name="organizer"
                                            type="text"
                                            placeholder="Organizer"
                                            sx={{width: 350}}
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <FormLabel htmlFor="type" required>
                                            Event Type
                                        </FormLabel>
                                    </div>
                                    <div>
                                        <Select
                                            id="type"
                                            label="Event Type"
                                            name="type"
                                            sx={{width: 350}}
                                            required
                                        >
                                            <MenuItem value="General Health Checkup Camp">General Health Checkup Camp</MenuItem>
                                            <MenuItem value="Vaccination Camp">Vaccination Camp</MenuItem>
                                            <MenuItem value="Blood Donation Camp">Blood Donation Camp</MenuItem>
                                            <MenuItem value="Dental Camp">Dental Camp</MenuItem>
                                            <MenuItem value="Eye Care Camp">Eye Care Camp</MenuItem>
                                            <MenuItem value="Diabetes Screening Camp">Diabetes Screening Camp</MenuItem>
                                            <MenuItem value="Cancer Screening Camp">Cancer Screening Camp</MenuItem>
                                            <MenuItem value="Orthopedic Camp">Orthopedic Camp</MenuItem>
                                            <MenuItem value="Pediatric Camp">Pediatric Camp</MenuItem>
                                            <MenuItem value="Women's Health Camp">Women's Health Camp</MenuItem>
                                        </Select>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <FormLabel required>
                                            Date
                                        </FormLabel>
                                    </div>
                                    <div>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateTimePicker name="date" label="Event Date" sx={{width: 350}} disablePast/>
                                        </LocalizationProvider>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <FormLabel htmlFor="address" required>
                                            Address
                                        </FormLabel>
                                    </div>
                                    <div>
                                        <OutlinedInput
                                            id="address"
                                            name="address"
                                            type="text"
                                            placeholder="Address"
                                            sx={{width: 350}}
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <FormLabel htmlFor="city" required>
                                            City
                                        </FormLabel>
                                    </div>
                                    <div>
                                        <OutlinedInput
                                            id="city"
                                            name="city"
                                            type="text"
                                            placeholder="City"
                                            sx={{width: 350}}
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <FormLabel htmlFor="state" required>
                                            State
                                        </FormLabel>
                                    </div>
                                    <div>
                                        <OutlinedInput
                                            id="state"
                                            name="state"
                                            type="text"
                                            placeholder="State"
                                            sx={{width: 350}}
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <FormLabel htmlFor="postalCode" required>
                                            Postal Code
                                        </FormLabel>
                                    </div>
                                    <div>
                                        <OutlinedInput
                                            id="postalCode"
                                            name="postalCode"
                                            type="text"
                                            placeholder="Postal Code"
                                            sx={{width: 350}}
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <FormLabel htmlFor="contactInfo" required>
                                            Contact
                                        </FormLabel>
                                    </div>
                                    <div>
                                        <OutlinedInput
                                            id="contactInfo"
                                            name="contactInfo"
                                            type="text"
                                            placeholder="Contact"
                                            sx={{width: 350}}
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <FormLabel htmlFor="eventImage" required>
                                            Add Flyer
                                        </FormLabel>
                                    </div>
                                    <input type="file" accept="image/*" id="eventImage" name="eventImage" onChange={handleFileUpload}/>
                                </div>
                                <div>
                                    <Button type="submit" variant="contained" color="primary">Create Event</Button>
                                </div>
                            </Stack>
                        </form>
                    </div>
                </CardContent>
            </Card>
        </AuthGuard>
    );
};

export default CreateEvent;
