import React, { Component } from 'react'
import { colors} from '../assets/config/colors';
import { BackHandler, View, StyleSheet, TouchableOpacity, Image, Pressable, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {default as FontAwesome} from 'react-native-vector-icons/FontAwesome';
// import moment from 'moment';
import * as GLOBAL from '../assets/config/constants';
import Api from '../services/api';
import StorageController from '../services/storage';
import { getFontStyles, Utils } from '../services/utils';


import Header from '../components/Header';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.storageCtrl = new StorageController;
        this.apiCtrl = new Api;
        this.utils = new Utils;
        this.handleBackButton = this.handleBackButton.bind(this)
        const didFocusSubscription = this.props.navigation?.addListener(
          'focus',
          payload => {
            this.getStorageDate();
            BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
          }
        )
        const didBlurSubscription = this.props.navigation?.addListener(
          'blur',
          payload => {
            BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
          }
        );
        this.getStorageDate();
        // console.log('Role',value);
      }

      state = {
        showFilter: false,
        name: '',
        orderList: [],
        pendingOrderList: [],
        userSavings: [
          {
            amount: '',
            company_discount: ''
          }
        ],
        startdate: '',
        enddate: '',
        filterBy: '',
        // currentDate: moment().format("YYYY-MM-DD"),
        showStartDateModal: false,
        showEndDateModal: false,
      }

      
      
  getStorageDate() {
    this.storageCtrl.getItem('user_details').then(res => {
      console.log('RESSS', res);
      if (res) {
        GLOBAL.userDetails = JSON.parse(res);
        this.setState({ name: GLOBAL.userDetails.name }, () => {
        //   this.getDashboardDetails(-1);
        });
      }
    })
  }

  
  handleBackButton = () => {
    BackHandler.exitApp();
    return true;
  }


  render() {
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: '#ecf0f1' }]}>
            <Header rightImage={true} text={"Hello, " + this.state.name} bckBtn={false}
        // rightBtnPress={() => { this.setState({ showFilter: true }) }} 
        // rightBtnIcon="filter" 
        // iconType="FontAwesome" 
        // rightBtnIcon2="search" 
        // rightBtnPress2={() => { this.props.navigation.push('Search') }} 
        />
        <View style={[styles.row]}>
        <TouchableOpacity style={[styles.card, styles.elevation]} title="View Profile" onPress= {()=> navigation.navigate("New Vehicle")}>
   

            <Image   resizeMode="contain"style={[{width:"60%", alignSelf:"center", top:-40}]} source={require('../assets/images/group-5434.png')} />

      
            <Text  adjustsFontSizeToFit style={[styles.title]}>
            CREATE EVENT
            </Text>
    
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, styles.elevation]} onPress={() => this.props.navigation.navigate("EventList")}>
            <Image resizeMode="contain" style={[{width:"60%", alignSelf:"center", top:-40}]} source={require('../assets/images/group-5432.png')} />
    
            <Text style={[styles.title]}>
                EVENTS 
            </Text>
   
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, styles.elevation]}>
            <Image resizeMode="contain" style={[{width:"60%", alignSelf:"center", top:-40}]} source={require('../assets/images/group-5431.png')} />

            <Text style={[styles.title]}>
                VISITOR LISIT
            </Text>
    
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, styles.elevation]} onPress={() => this.props.navigation.navigate("AddVisitor")} >
    
            <Image resizeMode="contain" style={[{width:"60%", alignSelf:"center", top:-40}]} source={require('../assets/images/group-5435.png')} />
            <Icon name={"user"} color={'white'}  light size={45} style={[{position:'absolute', alignSelf:"center",top:35, zIndex: 99}]} />
            <Text style={[styles.title]}>
            ADD VISITOR
            </Text>
            
   
        </TouchableOpacity>
      
        </View>
      </SafeAreaView>
    )
  }
}



const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center',height:"100%" },
    row: {  flex:2, justifyContent: 'center', flexDirection: "row", flexWrap: "wrap"},
    card: {
      backgroundColor: 'white',
      borderRadius: 8,
    //   paddingVertical: 10,
    alignItems:"center",
      alignSelf: "flex-start",
      textAlign: "center",
      // paddingHorizontal: 25,
      width: '38%',
      margin: "2%",
      height:"auto",
    },
    elevation: {
      elevation: 20,
      shadowColor: '#52006A',
    },
    heading: {
      position:'relative',
      justifyContent:'center',
      alignItems:'center',
      padding:"10%",
      marginTop:"-20%",

    },
    title: {
      fontSize: 18,
      color: "#071A83",
      textAlign: "center",
      marginTop: "-20%",
    //   flex: 3,
      fontWeight: '700',
      marginBottom:20,

    },   
     icon: {
      position: 'absolute', zIndex: 102,
      // alignSelf: 'flex-end',
      right:"-4%",
      borderRadius:60,
      backgroundColor: "#fff",
      marginBottom: "-50%",
      // zIndex: 5
    },
    iconcircle: {
      position: 'absolute', zIndex: 100,
      // alignSelf: 'flex-end',
      right:"-10%",
      borderRadius:60,
      backgroundColor: "#fff",
      marginBottom: "-50%",
    }
  });

