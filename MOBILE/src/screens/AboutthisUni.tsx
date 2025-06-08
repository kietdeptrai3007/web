import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native';
import {
    useNavigation,
    useRoute
} from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';


const AboutThisUni = () => {

    //  const navigation = useNavigation();
    return (
        <>
            <View style={styles.container}>
                <Text style={{
                    color: 'white',
                    fontSize: 20,
                    textAlign: 'left',
                    margin: 10,
                    marginRight: 10,

                }}>
                    Hanoi University of Science and Technology (HUST) is one of Vietnam's leading technical universities, renowned for its excellence in engineering,
                    science, and technology education. Established in 1956, HUST has a
                    strong tradition of innovation, research, and
                    collaboration with industry partners. The university offers
                    a wide range of undergraduate and postgraduate programs, fostering a
                    dynamic learning environment for students to develop their skills and contribute to
                    technological advancements both nationally and internationally.
                </Text>
            </View>

            <ImageBackground>
                
            </ImageBackground>
        </>
    );
}
export default AboutThisUni;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'darkred',
        alignContent: 'center',
        justifyContent: 'center',

    }
})