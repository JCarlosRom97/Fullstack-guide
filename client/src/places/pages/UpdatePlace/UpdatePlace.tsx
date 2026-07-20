import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "../../../shared/hooks/useForm";
import Input from "../../../shared/components/FormElements/Input/Input";
import Button from "../../../shared/components/FormElements/Button/Button";
import Card from "../../../shared/components/UIElements/Card/Card";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../../shared/utils/validators";
import './../PlaceForm.css';

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky crappers in the world',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Empire State Building',
        description: 'One of the most famous sky crappers in the world',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u2'
    }
]


const UpdatePlace = () => {
    const { placeId } = useParams();
    const place = DUMMY_PLACES.find((p) => p.id === placeId);
    const [isLoading, setIsLoading] = useState(true);

    const { formState, inputHandler, setFormData } = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        },
    }, false);


    useEffect(() => {
        if (place) {
            setFormData({
                title: {
                    value: place.title,
                    isValid: true
                },
                description: {
                    value: place.description,
                    isValid: true
                },
            }, true)

            setIsLoading(false);
        }
    }, [place, setFormData])

    const { description, title } = formState.inputs;

    console.log(description);


    const placeUpdateSubmit = (e) => {
        e.preventDefault();
        console.log(formState)
    }

    if (!place) {
        return <div className="center">
            <Card>
                <h2>Could not find place!</h2>
            </Card>
        </div>

    }

    if (isLoading) {
        return <Card>
            <div className="center">
                <h2>Loading...</h2>
            </div>
        </Card>

    }


    return <form action="" className="place-form" onSubmit={placeUpdateSubmit}>
        <Input
            id="title"
            element="input"
            type='text'
            label="Title"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            value={title.value}
            valid={true}
        />
        <Input
            id="description"
            element="textarea"
            type='text'
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (at least 5 characters)."
            onInput={inputHandler}
            value={description.value}
            valid={true}
        />
        <Button type='submit' disabled={!formState.isValid}>
            UPDATE PLACE
        </Button>
    </form>
}

export default UpdatePlace;