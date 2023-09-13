import React from 'react';
import { StyleSheet, Text, View, TextInput, ImageBackground, Alert, Image, TouchableOpacity, Dimensions } from 'react-native';
import bgImage from '../Image/background.jpg'
const {width: WIDTH} = Dimensions.get('window')

export default class Home extends React.Component {
    render() {
        return ( 
            <ImageBackground source={bgImage} style={styles.backgroundContainer}>
                <Text style={styles.logo}>RentalZ</Text>
            <View>
            <TouchableOpacity style={styles.btnLogin}>
            <Text style={styles.text} onPress={()=>this.props.navigation.navigate('Input')}>Input</Text>
            </TouchableOpacity> 
            <TouchableOpacity style={styles.btnLogin}>
            <Text style={styles.text} onPress={()=>this.props.navigation.navigate('ViewAll')}>View All</Text>
            </TouchableOpacity>
            </View>
            </ImageBackground>
   
        );

    }
}

const styles = StyleSheet.create({
    btnLogin: {
        width: WIDTH - 250,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#767C77',
        justifyContent: 'center',
        marginTop: 20,
       
      },
      text: {
        color:"#FCFCFC",
        fontSize: 22,
        textAlign: 'center',
      },
      backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center',
      },
      logo: {
        fontWeight:"bold",
        fontSize:50,
        color:"#FCFCFC",
        marginBottom:40,
        
      },
}
);
