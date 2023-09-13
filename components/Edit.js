import React from 'react';
import { StyleSheet, Text, View, TextInput, ImageBackground, Alert, TouchableOpacity, Dimensions } from 'react-native';
import bgImage from '../Image/background.jpg'
import Icon from 'react-native-vector-icons/Ionicons'
import * as SQLite from "expo-sqlite";
const {width: WIDTH} = Dimensions.get('window')

var db = SQLite.openDatabase("db.product");

export class Edit extends React.Component {
  constructor(props) {
    super(props);
    const {keyProperty,keyBedrooms,keyDate_time,keyPrice,keyFurniture,keyNote,keyReporter}= this.props.route.params;
    this.state = {
      property:keyProperty,
      bedrooms:keyBedrooms,
      date_time:keyDate_time,
      price:keyPrice,
      furniture:keyFurniture,
      notes:keyNote,
      reporter:keyReporter,
      data: null,
    };
    this.fetchData();
  };


fetchData = () => {
  const {keyID} = this.props.route.params; 
  db.transaction((tx) => {
      tx.executeSql(
      "SELECT * FROM product where id = ?",[keyID],
      (txObj, { rows: { _array } }) => this.setState({data: _array}), console.log("Get", keyID),
      (txObj, error) => console.log("Error ", error)
      );
  });
};

edit = (id) => {
  const {keyID} = this.props.route.params;
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE product set property = ?, bedrooms = ?, date_time = ?, price = ?, furniture = ?, notes = ?, reporter = ? where id = ?",
        [
          this.state.property,
          this.state.bedrooms,
          this.state.date_time,
          this.state.price,
          this.state.furniture,
          this.state.notes,
          this.state.reporter,
          keyID,
        ],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            console.log("edit passed");
          }
        },
        this.props.navigation.navigate("ViewAll")
      )
    });
    Alert.alert("Message", "Edit successfully!");
    
};

render(){
  const {keyProperty,keyID} = this.props.route.params;
  return(
    
    <ImageBackground source={bgImage} style={styles.backgroundContainer}>
    <Text style={styles.logo}>RentalZ</Text>
    {this.state.data && this.state.data.map((data)=>(
      <View key={data.id}>
      <View style={styles.inputContainer}>
        <TextInput
        defaultValue={data.property}
        style={styles.input}
        placeholder={'Property type'}
        placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
        underlineColorAndroid='transparent'
        onChangeText={value =>this.setState({property:value})}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
        defaultValue={data.bedrooms}
        style={styles.input}
        placeholder={'Bedrooms'}
        placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
        underlineColorAndroid='transparent'
        onChangeText={value => this.setState({bedrooms:value})}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
        defaultValue={data.date_time}
        style={styles.input}
        placeholder={'Date and time'}
        placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
        underlineColorAndroid='transparent'
        onChangeText={value => this.setState({date_time:value})}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
        defaultValue={data.price}
        style={styles.input}
        placeholder={'Monthly rent price'}
        placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
        underlineColorAndroid='transparent'
        onChangeText={value => this.setState({price:value})}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
        defaultValue={data.furniture}
        style={styles.input}
        placeholder={'Furniture types'}
        placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
        underlineColorAndroid='transparent'
        onChangeText={value => this.setState({furniture:value})}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
        defaultValue={data.notes}
        style={styles.input}
        placeholder={'Notes'}
        placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
        underlineColorAndroid='transparent'
        onChangeText={value => this.setState({notes:value})}

        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
        defaultValue={data.reporter}
        style={styles.input}
        placeholder={'Name of the reporter'}
        placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
        underlineColorAndroid='transparent'
        onChangeText={value => this.setState({reporter:value})}
        />
      </View> 
      <TouchableOpacity style={styles.btnLogin} onPress={()=>this.edit()}>
          <Text style={styles.text}>Save</Text>
      </TouchableOpacity>
      </View>
    ))}
   </ImageBackground>
      );
 }
}
export default Edit;
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
    position: 'relative',
    left: 120,
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