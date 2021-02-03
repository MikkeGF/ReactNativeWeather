import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import styled from 'styled-components/native'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


const Container = styled.View`
    flex: 1;
    background-color: #fff;
    align-items: center;
    justify-content: center;
`;

const Label = styled.Text`
    font-weight: bold;
    margin-top: 10px;
`;

export default function Position() {

    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitute] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getLocation().then(() => {
            setLoading(false)
        })
    }, [])

    const getLocation = async () => {
        const reply = await Permissions.askAsync(Permissions.LOCATION);
        if (reply.granted) {
            const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
            setLatitude(location.coords.latitude);
            setLongitute(location.coords.longitude);
        }
    }


    return (
        <>
            { !loading ?
                <Container>
                    <Label>Your location</Label>
                    <Text>{latitude.toFixed(4)}</Text>
                    <Text>{longitude.toFixed(4)}</Text>
                </Container>
                :
                <Container>
                    <Text>Retviering weather data...</Text>
                </Container>
            }
        </>

    )
}
