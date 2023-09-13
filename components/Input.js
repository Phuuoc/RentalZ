import React from 'react';
import { StyleSheet, Text, View, TextInput, ImageBackground, Alert, TouchableOpacity, Dimensions } from 'react-native';
import bgImage from '../Image/background.jpg'
import Icon from 'react-native-vector-icons/Ionicons'
import * as SQLite from "expo-sqlite";

const {width: WIDTH} = Dimensions.get('window')
var db = SQLite.openDatabase("db.product");

export default class Input extends React.Component {
  constructor(props) {
    super(props)
  this.state={ 
    property:"",
    bedrooms:"",
    date_time:"",
    price:"",
    furniture:"",
    notes:"",
    reporter:"",
    
    };
   this.dbCheck();
  }
  
  dbCheck() {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS product(id INTEGER PRIMARY KEY AUTOINCREMENT, property TEXT, bedrooms TEXT, date_time TEXT, price TEXT, furniture TEXT, notes TEXT, reporter TEXT)"
      );
    });
  }

  create_product = () => {
    if(this.state.property == ""){
      Alert.alert("Error Message", "Please fill in property field!")
    }else if(this.state.bedrooms == ""){
      Alert.alert("Error Message", "Please fill in bedrooms field!")
    }else if(this.state.date_time == ""){
      Alert.alert("Error Message", "Please fill in datr and time field!")
    }else if(this.state.price == ""){
      Alert.alert("Error Message", "Please fill in price field!")
    }else if(this.state.reporter == ""){
      Alert.alert("Error Message", "Please fill in name of reporter field!")
    }
    else {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT property FROM product WHERE property = ?",
          [this.state.property],
          (txObj, res) => {
            var check = res.rows.length
            if(check <= 0)
            {
              db.transaction((tx) => {
                tx.executeSql(
                  "INSERT INTO product(property, bedrooms, date_time, price, furniture, notes, reporter ) values (?, ?, ?, ?, ?, ?, ?)",
                  [this.state.property, this.state.bedrooms, this.state.date_time, this.state.price, this.state.furniture, this.state.notes, this.state.reporter ],
                );
              });
             Alert.alert("Message", "Successfully!");
            }
          },
          (txObj, error) => console.log("Error ", error)
        );
      });
    }
  };


  render(){
    return(
     <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        <Text style={styles.logo}>RentalZ</Text>

        <View style={styles.inputContainer}>
          <TextInput
          style={styles.input}
          placeholder={'Property type (e.g.flat,house, etc)'}
          placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
          underlineColorAndroid='transparent'
          onChangeText={value => this.setState({property:value})}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
          style={styles.input}
          placeholder={'Bedrooms (e.g. studio, one, etc)'}
          placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
          underlineColorAndroid='transparent'
          onChangeText={value => this.setState({bedrooms:value})}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
          style={styles.input}
          placeholder={'Date and time'}
          placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
          underlineColorAndroid='transparent'
          onChangeText={value => this.setState({date_time:value})}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
          style={styles.input}
          placeholder={'Monthly rent price'}
          placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
          underlineColorAndroid='transparent'
          onChangeText={value => this.setState({price:value})}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
          style={styles.input}
          placeholder={'Furniture types(e.g. Furnished, etc)'}
          placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
          underlineColorAndroid='transparent'
          onChangeText={value => this.setState({furniture:value})}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
          style={styles.input}
          placeholder={'Notes'}
          placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
          underlineColorAndroid='transparent'
          onChangeText={value => this.setState({notes:value})}

          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
          style={styles.input}
          placeholder={'Name of the reporter'}
          placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
          underlineColorAndroid='transparent'
          onChangeText={value => this.setState({reporter:value})}
          />
        </View>
        <TouchableOpacity style={styles.btnLogin} onPress={()=>this.create_product()}>
            <Text style={styles.text}>Save</Text>
          </TouchableOpacity>

     </ImageBackground>
     );
 }
}

const styles = StyleSheet.create({
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
  inputContainer: {
    marginTop: 10
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    color: 'rgba(255, 255, 255, 0.7)',
    marginHorizontal: 25
  },
  inputIcon: {
    position: 'absolute',
    top: 8,
    left: 37,
  },
  btnEye: {
    position: 'absolute',
    top: 8,
    right: 37
  },
  btnLogin: {
    width: WIDTH - 250,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#282835',
    justifyContent: 'center',
    marginTop: 20
  },
  forgot:{
    color:"white",
    fontSize: 16,
    marginTop: 20

  },
  create: {
    color:"white",
    fontSize: 16,
 
  },
  sign: {
    color:'#FFFFFF',
    fontSize: 20,
    marginTop: 20,
    marginHorizontal:5,
    fontWeight: 'bold',
    
  },
  text: {
    color:"#FCFCFC",
    fontSize: 22,
    textAlign: 'center'
  }
}
);