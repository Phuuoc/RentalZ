import React  from "react";
import { StyleSheet, Text, View, TextInput, ImageBackground, Alert, ScrollView, Dimensions, TouchableOpacity,} from 'react-native';
import * as SQLite from "expo-sqlite";
import bgImage from '../Image/background.jpg'
import Icon from 'react-native-vector-icons/Ionicons'
import { Value } from "react-native-reanimated";

var db = SQLite.openDatabase("db.product");
const {width: WIDTH} = Dimensions.get('window')

export default class ViewAll extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      search:"",
  
    };
    this.fetchData();
  };

  
  fetchData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM product",
        null,
        (txObj, { rows: { _array } }) => this.setState({ data: _array }),
        (txObj, error) => console.log("Error ", error)
      );
    });
  };
  handleDelete = (id) => {
    console.log("handleDelete");
    Alert.alert(
    "Alert",
    "Are you sure to delete this property " + id + "?",
    [
        {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
        },
        {
            text: "OK",
            onPress: () => {
                console.log("OK Pressed");
                this.delete_pro(id);
            },
        },
    ],
    { cancelable: false }
    );
};
delete_pro = (id) => {
    db.transaction((tx) => {
        tx.executeSql("DELETE FROM product WHERE id = ? ", [id],
            (txObj, resultSet) => {
                if (resultSet.rowsAffected > 0) {
                    let newList = this.state.data.filter((data) => {
                    if (data.id === id) return false;
                    else return true;
                    });
                    this.setState({ data: newList });
                }
            }
        );
    });
};

    render(){
      
        return(
          <ImageBackground source={bgImage} style={styles.backgroundContainer}>
          <View style={styles.inputContainer}>
          <Icon name={'ios-search'} size={28} color={'rgba(255, 255, 255, 0.7)'} 
            style={styles.inputIcon}/>
            <TextInput 
            placeholder="Search"
            onChangeText={value => this.setState({search:value})}
            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
            style={styles.input}
            />
            </View>
          <ScrollView style={styles.scroll}>
          {this.state.data && this.state.data.filter((data)=>{
                  if(data.property.toLowerCase().includes(this.state.search.toLowerCase()))  {
                        return data
                    } 
                }).map((data) => (
              <View key={data.id} style={styles.frame}>
              <View style={{paddingLeft: 10,   flex:1,}}>
                 <Text style={styles.text}>({data.id})</Text>       
                  <Text style={styles.text}>Property Type: {data.property}</Text>
                  <Text style={styles.text}>Bedrooms: {data.bedrooms}</Text>
                  <Text style={styles.text}>Date and Time: {data.date_time}</Text>
                  <Text style={styles.text}>Monthly rent Price: {data.price}</Text>
                  <Text style={styles.text}>Furniture Type: {data.furniture}</Text>
                  <Text style={styles.text}>Notes: {data.notes}</Text>
                  <Text style={styles.text}>Name of the Reporter: {data.reporter}</Text>
                  <TouchableOpacity style={styles.btnDel} onPress={() => this.handleDelete(data.id)}>
                  <Icon name={'ios-trash'} size={28} color={'rgba(255, 255, 255, 0.7)'} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnEdit} onPress={()=>this.props.navigation.replace('Edit', {keyID:data.id, keyProperty:data.property, 
                  keyBedrooms:data.bedrooms, keyDate_time:data.date_time, keyPrice:data.price, keyFurniture:data.furniture, 
                  keyNote:data.notes, keyReporter:data.notes})} >
                  <Icon name={'ios-create'} size={28} color={'rgba(255, 255, 255, 0.7)'}  />
                  </TouchableOpacity>
                    
                  
              </View>
              </View>
            ))}
          </ScrollView>
          </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
      text: {
        color:"#FFFFFF",
        fontSize: 18,
        fontWeight: "bold",
      },
      scroll:{
        //borderWidth: 0,
        //borderColor: "#3269ad",
        width: "90%",
        paddingTop: 10
      }, 
      frame:{
        //borderWidth: 10,
        //borderRadius: 15,
        marginBottom: 10,
        //borderColor: "#3269ad",
        padding: 10,
        width: "100%",
        flexDirection: 'row'
      },
      backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center',
      },
      btnDel: {
        position: 'absolute',
        top: 8,
        right: 40, 
      },
      btnEdit: {
        position: 'absolute',
        top: 8,
        left: 300, 
      },
      input: {
        top:8,
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
        top: 15,
        left: 37,
      },
      inputContainer: {
        marginTop: 10
      },
}
);