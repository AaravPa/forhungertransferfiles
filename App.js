import React, { useEffect } from 'react';
import { ScrollView, FlatList, Button, Text, View, StyleSheet, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, Image, TextInput } from 'react-native';
import { ListItem } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { firebase } from './config';
import axios from 'axios';

const HomeStack = createStackNavigator();
var count = false
var showText = false
var users = [];


function loadUserData() {
  firebase.firestore()
  .collection('user_info')
  .onSnapshot(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        users.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        })
      })
    })  
}

function loadDonationData() {
  firebase.firestore()
  .collection('donate')
  .onSnapshot(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        users.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        })
      })
    })  
}

function loadRequestData() {
  firebase.firestore()
  .collection('request')
  .onSnapshot(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        users.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        })
      })
    })  
}

export default class App extends React.Component {
  
  constructor() {
    super()
    this.state = {
      donation:'',
      donation_quantity:'',
      address:'',
      name:'',
      emailnumber:'',
      password:'',
      req_name:'',
      req_emailnumber:'',
      req_password:'',
      org_name:'',
      custom_req:'',
      DonationList:'',
      searchKeyword: '',
      time:'',
      searchResults: [],
      isShowingResults: false,
    }

    this.requestRef= null
    this.DonationScreen1 = this.DonationScreen1.bind(this);
    this.DonationScreen2 = this.DonationScreen2.bind(this);
    this.DonationScreen3 = this.DonationScreen3.bind(this);
    this.DonationScreen4 = this.DonationScreen4.bind(this);
    this.DonationScreen5 = this.DonationScreen5.bind(this);
    this.RequestScreen1 = this.RequestScreen1.bind(this);
    this.RequestScreen2 = this.RequestScreen2.bind(this);
    this.RequestScreen3 = this.RequestScreen3.bind(this);
    this.CustomRequestScreen = this.CustomRequestScreen.bind(this);
    this.CustomDonationScreen = this.CustomDonationScreen.bind(this);
    loadUserData()
    loadDonationData()
    loadRequestData()
  }

   HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center', backgroundColor:"#4F7942"}}>
        <Text style={styles.title}>For Hunger</Text>
        <Text style={styles.subtitle}>Food is a gift. Pass it on.</Text>
        <TouchableOpacity style={styles.button} onPress={() => {if (count==false) { navigation.navigate('DonationScreen3') } else { navigation.navigate('CustomDonationScreen') }}}>
          <Text style={{fontWeight:"400", fontSize:28, marginTop:4, marginLeft:-5, color:"white"}}>Donate</Text> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {
          if (count==false) { navigation.navigate('RequestScreen1') } else { navigation.navigate('RequestScreen2') }}}>
          <Text style={{fontWeight:"400", fontSize:28, marginTop:4, marginLeft:-5, color:"white"}}>Request</Text>
        </TouchableOpacity>
        <Image
        style={styles.image}
        source={require('./food.png')}
        />

        {false &&
          <Image
          style={styles.tinyLogo}
          source={require('./userimage.png')}
          />          
        }
      
      </View>
    );
  }
  CustomDonationScreen({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center',backgroundColor:"#4F7942" }}>
        <Text style={styles.title11}>Choose Request or Donate?</Text>
        <View style={{borderRadius: 20,borderColor:"white",borderWidth:1, width:300,  backgroundColor:"white", alignContent:"center", alignItems:"center", marginLeft:-50, marginBottom:160,}}>
            <FlatList style={{width:280, height:300, marginLeft:-50, alignContent:"center"}}
            data={users}
            renderItem={({ item }) => (
                <TouchableOpacity onPress ={() => {this.setState({req_name:item.req_name,custom_req:item.custom_req, req_emailnumber:item.req_emailnumber, org_name:item.org_name}); navigation.navigate("DonationScreen2")}}>
                {/* <Text style={{color:"#4F7942", fontWeight:"bold"}}>{item.req_name}</Text>
                <Text style={{color:"#4F7942", fontWeight:"400"}}>{item.req_emailnumber}</Text>
                <Text style={{color:"#4F7942", fontWeight:"400", marginBottom:20}}>{item.org_name}</Text> */}
                <Text style={{color:"#4F7942", fontWeight:"400", fontSize:20, marginLeft:0}}>{item.custom_req}</Text>
                </TouchableOpacity>
              )}
            />
    </View>
      {showText &&
        <Text style={{marginTop:10, marginBottom:30, marginLeft:-75}}>no results found.</Text>
      }
      <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center',  alignItems: 'center', backgroundColor:"#4F7942", marginRight:-180, marginTop:-320 }}>
        <TouchableOpacity style={styles.nextbutton} onPress={() => navigation.navigate('DonationScreen1')}>
          <Text style={{fontWeight:"400", fontSize:20, textAlign:"center", marginTop:-2, marginLeft:-5, color:"white"}}>Donate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextbutton} onPress={() => navigation.navigate('DonationScreen3')}>
          <Text style={{fontWeight:"400", fontSize:20, textAlign:"center", marginTop:-2, marginLeft:-5, color:"white"}}>Back</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
   DonationScreen1({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center', backgroundColor:"#4F7942" }}>
        <Text style={styles.title2}>Custom Donation</Text>
        <Text style={styles.subtitle2}>What Would You Like to Donate?</Text>
        <TextInput style={styles.inputBox} placeholder={"ex. flour"} placeholderTextColor="white" onChangeText= {(text) => {
          this.setState({donation:text});
        }}></TextInput>
        <Text style={styles.subtitle3}>How Much Would You Like to Donate?</Text>
        <TextInput style={styles.inputBox} placeholder={"ex. 10 lbs"} placeholderTextColor="white" onChangeText= {(text) => {
          this.setState({donation_quantity:text});
        }}
        ></TextInput>
        <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center',  alignItems: 'center', backgroundColor:"#4F7942", marginRight:-180, marginTop:-100 }}>
        <TouchableOpacity style={styles.nextbutton} onPress={
          () => firebase.firestore()
            .collection('donate')
            .add({
              donation: this.state.donation,
              quantity: this.state.donation_quantity,
            })
            .then(()=> {
            navigation.navigate('DonationScreen2')
             })
             }>
          <Text style={{fontWeight:"400", fontSize:30, textAlign:"center", marginTop:-7, marginLeft:-5, color:"white"}}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextbutton} onPress={() => navigation.navigate('CustomDonationScreen')}>
          <Text style={{fontWeight:"400", fontSize:30, textAlign:"center", marginTop:-7, marginLeft:-5, color:"white"}}>Back</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
   DonationScreen2({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center', backgroundColor:"#4F7942" }}>
        <Text style={styles.title3}>Pickup</Text>
        <Text style={styles.subtitle4}>Enter Method of Pickup</Text>
        <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center',  alignItems: 'center', backgroundColor:"#4F7942", marginRight:-180, marginTop:-290, marginBottom:-130 }}>
        <TouchableOpacity style={styles.nextbutton7} onPress={() => {this.setState({address:"Car/SUV", });}}>
          <Text style={{fontWeight:"400", fontSize:20, textAlign:"center", marginTop:-2, marginLeft:-5, color:"white"}}>Car/SUV</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextbutton7} onPress={() => {this.setState({address:"Van/Truck"});}}>
          <Text style={{fontWeight:"400", fontSize:20, textAlign:"center", marginTop:-2, marginLeft:-5, color:"white"}}>Van/Truck</Text>
        </TouchableOpacity>
      </View>
        <Text style={styles.subtitle4}>Enter Date of Pickup</Text>
        <TextInput style={styles.inputBox4} placeholder={"ex. 2:30 PM, April 7th"} placeholderTextColor={"white"} onChangeText= {(text) => {
          this.setState({time:text});
        }}></TextInput>
        <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center',  alignItems: 'center', backgroundColor:"#4F7942", marginRight:-180, marginTop:-220 }}>
        <TouchableOpacity style={styles.nextbutton} onPress={() => 
          firebase.firestore()
            .collection('donate')
            .add({
              address: this.state.address,
              time:this.state.time
            })
            .then(()=> {
              navigation.navigate('DonationScreen4')
             })}>
               <Text style={{fontWeight:"400", fontSize:20, textAlign:"center", marginTop:0, marginLeft:-5, color:"white"}}>Next</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.nextbutton} onPress={() => navigation.navigate('DonationScreen1')}>
               <Text style={{fontWeight:"400", fontSize:20, textAlign:"center", marginTop:0, marginLeft:-5, color:"white"}}>Back</Text>
             </TouchableOpacity>
        </View>
      </View>
    );
  }
  
   DonationScreen3({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center', backgroundColor:"#4F7942" }}>
        <Text style={styles.title4}>Create An Account</Text>
        <Text style={styles.subtitle5}>Please Create an Account to Continue</Text>
        <TextInput style={styles.inputBox2} placeholder={"Full Name"} onChangeText= {(text) => {
          this.setState({ name: text});
        }}
        multiline={true}
        placeholderTextColor="white"
       ></TextInput>
        <TextInput style={styles.inputBox2} placeholder={"Email Address/Phone Number"} onChangeText= {(text) => {
          this.setState({ emailnumber: text});
        }}
        multiline={true}
        placeholderTextColor="white"
        ></TextInput>
        <TextInput style={styles.inputBox2} placeholder={"Password"} secureTextEntry = {true} onChangeText= {(text) => {
          this.setState({ password: text});
        }}
        placeholderTextColor="white"
        ></TextInput>
        <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center',  alignItems: 'center', backgroundColor:"#4F7942", marginRight:-180, marginTop:-190 }}>
        <TouchableOpacity style={styles.nextbutton} onPress={() => 
          firebase.firestore()
            .collection('user_info')
            .add({
              name:this.state.name,
              emailnumber:this.state.emailnumber,
              password:this.state.password
            })
            .then(()=> {
            navigation.navigate('CustomDonationScreen')
             })}>
          <Text style={{fontWeight:"400", fontSize:30, textAlign:"center", marginTop:-7, marginLeft:-5, color:"white"}}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextbutton} onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={{fontWeight:"400", fontSize:30, textAlign:"center", marginTop:-7, marginLeft:-5, color:"white"}}>Back</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
  
   DonationScreen4({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center', backgroundColor:"#4F7942" }}>
        <Text style={styles.title5}>Confirmation</Text>
        <Text style={styles.subtitle6}>Are You Sure You Want to Donate?</Text>
        <View style={{borderRadius: 20,borderColor:"white",borderWidth:1, width:300, height:140, backgroundColor:"white", alignContent:"center", alignItems:"center", marginLeft:-55, marginBottom:20,}}>
        <ListItem style={styles.listbutton}>
          <ListItem.Content style={{marginBottom:-50}}>
            <ListItem.Title style={{color:"#4F7942", fontWeight:"bold"}}>{this.state.name}</ListItem.Title>
            <ListItem.Subtitle style={{color:"#4F7942", fontWeight:"400"}}>{this.state.donation}</ListItem.Subtitle>
            <ListItem.Subtitle style={{color:"#4F7942", fontWeight:"400"}}>{this.state.donation_quantity}</ListItem.Subtitle>
            <ListItem.Subtitle style={{color:"#4F7942", fontWeight:"400"}}>{this.state.emailnumber}</ListItem.Subtitle>
            <ListItem.Subtitle style={{color:"#4F7942", fontWeight:"400"}}>{this.state.address}</ListItem.Subtitle>
            <ListItem.Subtitle style={{color:"#4F7942", fontWeight:"400"}}>{this.state.time}</ListItem.Subtitle>
            <ListItem.Subtitle style={{color:"#4F7942", fontWeight:"400"}}>{this.state.custom_req}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        </View>
        <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center',  alignItems: 'center', backgroundColor:"#4F7942", marginRight:-190, marginTop:-300 }}>
        <TouchableOpacity style={styles.nextbutton} onPress={() => navigation.navigate('DonationScreen5')}>
          <Text style={{fontWeight:"400", fontSize:28, textAlign:"center", marginTop:-7, marginLeft:-5, color:"white"}}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextbutton} onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={{fontWeight:"400", fontSize:28, textAlign:"center", marginTop:-7, marginLeft:-7.7, color:"white"}}>Cancel</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
  
   DonationScreen5({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center', backgroundColor:"#4F7942" }}>
        <Text style={styles.title6}>Your Donation Has Been Submitted!</Text>
        <Text style={styles.subtitle7}>Thank you for being a part of ending hunger!</Text>
        <TouchableOpacity style={styles.nextbutton6} onPress={() => {count=true;showText=false; console.log(count); navigation.navigate('HomeScreen')}}>
          <Text style={{fontWeight:"400", fontSize:28, textAlign:"center", marginTop:-7, marginLeft:-5, color:"white"}}>Done</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
   RequestScreen1({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center', backgroundColor:"#4F7942" }}>
        <Text style={styles.title7}>Create An Account</Text>
        <Text style={styles.subtitle5}>Please Create an Account to Continue</Text>
        <TextInput style={styles.inputBox2} placeholder={"Full Name"} placeholderTextColor="white" onChangeText= {(text) => {
          this.setState({ req_name: text});
        }}
        multiline={true}
        ></TextInput>
        <TextInput style={styles.inputBox2} placeholder={"Email Address/Phone Number"} placeholderTextColor="white" onChangeText= {(text) => {
          this.setState({ req_emailnumber: text});
        }}
        multiline={true}
        ></TextInput>
        <TextInput style={styles.inputBox2} placeholder={"Password"} placeholderTextColor="white" secureTextEntry={true} onChangeText= {(text) => {
          this.setState({ req_password: text});
        }}
        ></TextInput>
        <TextInput style={styles.inputBox2} placeholder={"Organization Name"} placeholderTextColor="white" onChangeText= {(text) => {
          this.setState({ org_name: text});
        }}
        multiline={true}
        ></TextInput>
        <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center',  alignItems: 'center', backgroundColor:"#4F7942", marginRight:-190, marginTop:-150, }}>
        <TouchableOpacity style={styles.nextbutton} onPress={() => 
          firebase.firestore()
            .collection('user_info')
            .add({
              req_name:this.state.req_name,
              req_emailnumber:this.state.req_emailnumber,
              req_password:this.state.req_password,
              org:this.state.org_name
            })
            .then(()=> {
            navigation.navigate('RequestScreen2')
             })}>
          <Text style={{fontWeight:"400", fontSize:30, textAlign:"center", marginTop:-7, marginLeft:-5, color:"white"}}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextbutton} onPress={()=> navigation.navigate('HomeScreen')}>
          <Text style={{fontWeight:"400", fontSize:30, textAlign:"center", marginTop:-7, marginLeft:-5, color:"white"}}>Back</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
  
   RequestScreen2({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center', backgroundColor:"#4F7942" }}>
        <Text style={styles.title10}>Select A Donation or Request</Text>
        <View style={{borderRadius: 20,borderColor:"white",borderWidth:1, width:300, height:140, backgroundColor:"white", alignContent:"center", marginLeft:-55, marginBottom:20,}}>
        <ScrollView>
        <FlatList
        data={users}
        renderItem={({ item }) => (
          <View style={styles.ContentContainer1}>
            <TouchableOpacity onPress = {() => {this.setState({name:item.name, donation:item.donation, donation_quantity:item.donation_quantity, emailnumber:item.emailnumber, address:item.address, time:item.time }); navigation.navigate("RequestScreen3")}}>

            <Text style={{color:"#4F7942", fontWeight:"400", fontSize:20}}>{item.donation}{item.donation_quantity}</Text>
            {/* <Text style={{color:"#4F7942", fontWeight:"400"}}></Text>
            <Text style={{color:"#4F7942", fontWeight:"400"}}>{item.emailnumber}</Text>
            <Text style={{color:"#4F7942", fontWeight:"400"}}>{item.address}</Text>
            <Text style={{color:"#4F7942", fontWeight:"400", marginBottom:20}}>{item.time}</Text>
            <Text style={{color:"#4F7942", fontWeight:"bold"}}>{item.name}</Text> */}
            </TouchableOpacity>
          </View>
          )}
        />
      </ScrollView>
      </View>
        {showText &&
            <Text style={{marginTop:10, marginBottom:30, marginLeft:-75}}>no results found.</Text>
        }
        <View style={styles.ContentContainer2}>
            <TouchableOpacity style={styles.nextbutton5} onPress={() => navigation.navigate("CustomRequestScreen")}>
          <Text style={{fontWeight:"400", fontSize:20, textAlign:"center", color:"white"}}>Request</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextbutton5} onPress={() => navigation.navigate("RequestScreen1")}>
          <Text style={{fontWeight:"400", fontSize:20, textAlign:"center", color:"white"}}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
   RequestScreen3({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center', backgroundColor:"#4F7942" }}>
        <Text style={styles.title9}>Donation Selected!</Text>
        <Text style={styles.subtitle9}>Please Contact The Food Donor Below:</Text>
        <View style={{borderRadius: 20,borderColor:"white",borderWidth:1, width:300, height:140, backgroundColor:"white", alignContent:"center", alignItems:"center", marginLeft:-55, marginBottom:20,}}>
        <ListItem style={styles.listbutton}>
          <ListItem.Content style={{marginBottom:-50}}>
            <ListItem.Title style={{color:"#4F7942", fontWeight:"bold"}}>Aarav Patel</ListItem.Title>
            <ListItem.Subtitle style={{color:"#4F7942", fontWeight:"400"}}>Flour</ListItem.Subtitle>
            <ListItem.Subtitle style={{color:"#4F7942", fontWeight:"400"}}>5 lbs</ListItem.Subtitle>
            <ListItem.Subtitle style={{color:"#4F7942", fontWeight:"400"}}>patel.aarav@icloud.com</ListItem.Subtitle>
            <ListItem.Subtitle style={{color:"#4F7942", fontWeight:"400"}}>Car/SUV</ListItem.Subtitle>
            <ListItem.Subtitle style={{color:"#4F7942", fontWeight:"400"}}>1:15 PM</ListItem.Subtitle>
            <ListItem.Subtitle style={{color:"#4F7942", fontWeight:"400"}}>{this.state.custom_req}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        </View>
        <TouchableOpacity style={styles.nextbutton8} onPress={() => {count=true;showText=false; navigation.navigate('HomeScreen')}}>
          <Text style={{fontWeight:"400", fontSize:30, textAlign:"center", marginTop:-7, marginLeft:-5, color:"white"}}>Done</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  CustomRequestScreen({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center', backgroundColor:"#4F7942" }}>
        <Text style={styles.title8}>Be Specific</Text>
        <Text style={styles.subtitle8}>What Would You Like To Request?</Text>
        <TextInput style={styles.inputBox3} placeholder={"ex. Eggs, One Dozen"} placeholderTextColor="white" onChangeText= {(text) => {
          this.setState({ custom_req: text});
        }}
        multiline={true}></TextInput>
        <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center',  alignItems: 'center', backgroundColor:"#4F7942", marginRight:-190, marginTop:-360 }}>
        <TouchableOpacity style={styles.nextbutton} onPress={() => 
          firebase.firestore()
            .collection('request')
            .add({
              custom_req:this.state.custom_req
            })
            .then(()=> {
            navigation.navigate('RequestScreen3')
             })}>
          <Text style={{fontWeight:"400", fontSize:30, textAlign:"center", marginTop:-7, marginLeft:-5, color:"white"}}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextbutton} onPress={() => navigation.navigate('RequestScreen2')}>
          <Text style={{fontWeight:"400", fontSize:30, textAlign:"center", marginTop:-7, marginLeft:-5, color:"white"}}>Back</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  
  

  render() {
    return (
      <NavigationContainer>
        <HomeStack.Navigator screenOptions={{
          headerShown: false
        }}>
          <HomeStack.Screen name="HomeScreen" component={this.HomeScreen} />  
          <HomeStack.Screen name="DonationScreen3" component={this.DonationScreen3} />
          <HomeStack.Screen name="CustomDonationScreen" component={this.CustomDonationScreen} /> 
          <HomeStack.Screen name="DonationScreen1" component={this.DonationScreen1} />
          <HomeStack.Screen name="DonationScreen2" component={this.DonationScreen2} />
          <HomeStack.Screen name="DonationScreen4" component={this.DonationScreen4} />
          <HomeStack.Screen name="DonationScreen5" component={this.DonationScreen5} />
          <HomeStack.Screen name="RequestScreen1" component={this.RequestScreen1} />
          <HomeStack.Screen name="RequestScreen2" component={this.RequestScreen2} />
           <HomeStack.Screen name="RequestScreen3" component={this.RequestScreen3} />
          <HomeStack.Screen name="CustomRequestScreen" component={this.CustomRequestScreen}/>
        </HomeStack.Navigator>
      </NavigationContainer>
    );
   }
  }
//add 260    
const styles = StyleSheet.create({
  title:{
    fontSize:50,
    fontWeight:"bold",
    alignItems:"left",
    marginLeft:-105,
    marginTop:-20,
    color:"white"
  },
  title2:{
    width:400,
    fontSize:50,
    fontWeight:"bold",
    alignItems:"left",
    marginRight:-35,
    marginTop:50,
    marginBottom:40,
    color:"white",
  },
  title3:{
    width:400,
    fontSize:50,
    fontWeight:"bold",
    alignItems:"left",
    marginLeft:-60,
    marginTop:50,
    marginBottom:35,
    marginRight:-100,
    color:"white"
  },
  title4:{
    width:400,
    fontSize:50,
    fontWeight:"bold",
    alignItems:"left",
    marginLeft:-125,
    marginTop:45,
    marginBottom:15,
    marginRight:-170,
    color:"white"
  },
  title5:{
    width:400,
    fontSize:50,
    fontWeight:"bold",
    alignItems:"left",
    marginLeft:-15,
    marginTop:50,
    marginBottom:15,
    marginRight:-45,
    color:"white"
  },
  title6:{
    width:350,
    fontSize:50,
    fontWeight:"bold",
    alignItems:"left",
    marginLeft:-145,
    marginTop:-310,
    marginBottom:15,
    marginRight:-130,
    color:"white"
  },
  title7:{
    width:300,
    fontSize:50,
    fontWeight:"bold",
    alignItems:"left",
    marginLeft:-180,
    marginTop:45,
    marginBottom:15,
    marginRight:-120,
    color:"white"
  },
  title8:{
    width:400,
    fontSize:50,
    fontWeight:"bold",
    alignItems:"left",
    marginLeft:-5,
    marginTop:50,
    marginBottom:15,
    marginRight:-140,
    width:500,
    color:"white"
  },
  title9:{
    width:350,
    fontSize:50,
    fontWeight:"bold",
    alignItems:"left",
    marginLeft:-10,
    marginTop:-230,
    marginBottom:15,
    color:"white"
  },
  title10:{
    fontSize:40,
    fontWeight:"bold",
    alignItems:"left",
    marginLeft:-15,
    marginTop:50, 
    marginBottom:15,
    marginRight:-20,
    width:350,
    color:"white"
  },
  title11:{
    width:400,
    fontSize:45,
    fontWeight:"bold",
    alignItems:"left",
    marginLeft:-40,
    marginTop:100,
    marginBottom:20,
    marginRight:-30,
    width:350,
    color:"white"
  },
  title12:{
    width:400,
    fontSize:50,
    fontWeight:"bold",
    alignItems:"left",
    marginLeft:-5,
    marginTop:-450,
    marginBottom:30,
    marginRight:-605,
    width:1000,
    color:"white"
  },
  subtitle:{
    width:400,
    fontSize:35,
    fontWeight:"400",
    alignItems:"left",
    marginBottom:50,
    marginRight:-45,
    color:"white"
  },
  subtitle2:{
    width:400,
    fontSize:35,
    fontWeight:"400",
    alignItems:"left",
    marginBottom:50,
    marginRight:-40,
    color:"white"
  },
  subtitle3:{
    width:350,
    fontSize:35,
    fontWeight:"400",
    alignItems:"left",
    marginBottom:50,
    marginLeft:-10,
    color:"white"
  },
  subtitle4:{
    width:400,
    fontSize:32,
    fontWeight:"400",
    alignItems:"left",
    marginBottom:50,
    marginRight:-40,
    color:"white"
  },
  subtitle5:{
    width:350,
    fontSize:35,
    fontWeight:"400",
    alignItems:"left",
    marginBottom:70,
    marginLeft:-5,
    color:"white"
  },
  subtitle6:{
    width:350,
    fontSize:35,
    fontWeight:"400",
    alignItems:"left",
    marginBottom:20,
    marginLeft:-10,
    color:"white"
  },
  subtitle7:{
    width:350,
    fontSize:35,
    fontWeight:"400",
    alignItems:"left",
    marginBottom:50,
    marginLeft:-10,
    color:"white"
  },
  subtitle8:{
    width:400,
    fontSize:35,
    fontWeight:"400",
    alignItems:"left",
    marginBottom:100,
    marginRight:-35,
    width:400,
    color:"white"
  },
  subtitle9:{
    fontSize:35,
    fontWeight:"400",
    alignItems:"left",
    marginBottom:30,
    marginRight:-20,
    width:350,
    color:"white"
  },
  button: {
    width:270,
    height:70,
    borderRadius: 20,
    borderColor:"white",
    borderWidth:1,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    marginLeft:-25,
    marginBottom:30,
    textAlign:"center",
  },
  tinyLogo: {
    width:50,
    height:50,
    marginRight:-450,
    marginTop:-610,
    marginBottom:560,
    borderColor:"white",
    borderWidth:1
  },
  nextbutton: {
    width:100,
    height:50,
    borderRadius: 20,
    borderColor:"white",
    borderWidth:1,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    marginLeft:-130,
    marginRight:-110,
    marginBottom:20,
    color:"white",
    textAlign:"center"
  },
  nextbutton2: {
    width:110,
    height:50,
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    marginLeft:-270,
    marginBottom:30,
    marginRight:-5,
    borderColor:"white",
    borderWidth:1,
    color:"white",
    textAlign:"center"
  },
  nextbutton3: {
    width:190,
    height:50,
    borderRadius: 20,
    padding: 10,
    marginTop: 30,
    marginBottom: 30,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    marginLeft:-185,
    borderColor:"white",
    borderWidth:1,
    textAlign:"center"
  },
  nextbutton4: {
    width:190,
    height:50,
    borderRadius: 20,
    padding: 10,
    marginTop: 50,
    marginBottom: -10,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    marginLeft:-185,
    borderColor:"white",
    borderWidth:1
  },
  nextbutton5: {
    width:100,
    height:50,
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    marginLeft:-130,
    marginRight:-110,
    marginBottom:30,
    marginTop:-10,
    borderColor:"white",
    borderWidth:1,
    textAlign:"center"
  },
  nextbutton6: {
    width:100,
    height:50,
    borderRadius: 20,
    borderColor:"white",
    borderWidth:1,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    marginLeft:-275,
    marginBottom:30,
    color:"white",
    textAlign:"center"
  },
  nextbutton7: {
    width:100,
    height:50,
    borderRadius: 20,
    borderColor:"white",
    borderWidth:1,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    color:"white", 
    flexDirection: "column-reverse",
    justifyContent: "center",
    marginBottom:-85,
    marginTop:-20,
    marginLeft:-130,
    marginRight:-110,
    textAlign:"center"
  },
  nextbutton8: {
    width:100,
    height:50,
    borderRadius: 20,
    borderColor:"white",
    borderWidth:1,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    marginLeft:-240,
    marginBottom:20,
    color:"white",
    textAlign:"center"
  },
  listbutton: {
    width:260,
    borderWidth:1,
    borderColor:"white",
    justifyContent: "center",
    marginBottom:30,
  },
  inputBox: {
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    fontSize: 20,
    marginLeft:-70,
    marginTop:-40,
    marginBottom:30,
    borderColor:"white",
  },
  inputBox2: {
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    fontSize: 20,
    marginLeft:-70,
    marginTop:-40,
    marginBottom:60,
    borderColor:"white",
  },
  inputBox3: {
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor:"white",
    fontSize: 20,
    marginLeft:-70,
    marginTop:-40,
    marginBottom:20 
  },
  inputBox4: {
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    fontSize: 20,
    marginLeft:-60,
    marginTop:-30,
    marginBottom:20,
    borderColor:"white",
  },
  text: {
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor:"white",
    fontSize: 20,
    marginLeft:-70,
    marginTop:-40,
    marginBottom:20 
  },
  autocompleteContainer: {
    zIndex: 1,
  },
  searchResultsContainer: {
    width: 340,
    height: 200,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 50,
  },
  resultItem: {
    width: '100%',
    justifyContent: 'center',
    height: 40,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingLeft: 15,
  },
  searchBox: {
    width: 340,
    height: 50,
    fontSize: 18,
    borderRadius: 8,
    borderColor: '#aaa',
    color: '#000',
    backgroundColor: '#fff',
    borderWidth: 1.5,
    paddingLeft: 15,
  },
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
  },
  image:{
    marginTop:-30,
    width:700,
    height:700,
    marginBottom:-320,
    marginLeft:-5
  },
  ContentContainer1: {
    height: 50, width:200, flex: 1, justifyContent: 'center', marginRight:-10
  },
  ContentContainer2: {
    flex: 1, flexDirection:'row', justifyContent: 'center', backgroundColor:"#4F7942", marginRight:-190, marginTop:20
  }
})

//TO-DO : | change style of list of donations/requests |

        