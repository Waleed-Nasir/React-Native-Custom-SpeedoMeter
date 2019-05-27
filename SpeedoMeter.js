import React from 'react';
import { Image, TouchableOpacity,Animated,Easing, StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo'
let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
// import Up from '../../assets/Up.png'
export default class SpeedoMeter extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            Progress_Value:0
        }
        this.speedometerValue = new Animated.Value(100);
      }
  static navigationOptions = {
    header: null,
  }
  validateSize = (current, original) =>{
    let currentSize = original;
    if (!isNaN(current)) {
      currentSize = parseInt(current);
    }
    return currentSize;
  }

  limitValue = (value, minValue, maxValue) => {
    let currentValue = 0;
    if (!isNaN(value)) {
      currentValue = parseInt(value);
    }
    return Math.min(Math.max(currentValue, minValue), maxValue);
  }
  componentWillReceiveProps(nextProps){
    const {totalRange } = nextProps
   this.setState({
     Progress_Value:totalRange
   })
  }
  render() {
      const rotate = this.speedometerValue.interpolate({
        inputRange: [0, 100],
        outputRange: ['-100deg', '100deg'],
      });
      const {size, deviceWidth }=this.props
      const currentSize = this.validateSize(300, screenWidth);
      Animated.timing(
        this.speedometerValue,
        {
          toValue: this.limitValue(this.state.Progress_Value , 0, 100),
          duration: 500,
          easing: Easing.linear,
        },
      ).start();
      const valRange =this.state.Progress_Value <50?`-${60-this.state.Progress_Value}deg`:`${this.state.Progress_Value}deg`
      const  { ShowTemp = 0} = this.props
    return (
        <View style={styles.container}>
        {/* <View style={styles.outercontainer}> */}
       
        <LinearGradient
                start={{ x: 0, y: 0.55 }} end={{ x: 1, y: 0.45 }}
                colors={['#d25040' ,'#d25040' , '#d17c70'  , '#d17c70'  , '#7fa0c1' , '#79aad0']}
                style={styles.outercontainer}
              >
        <View style={styles.innercontainer}>
        {Math.round(Math.abs(this.state.Progress_Value)) == 0 &&<View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>No Data Found</Text>
                    </View>}
        <View  style={styles.range}>
        <Animated.View style={[styles.imageWrapper,
            {
              top: -(currentSize / 15),
              transform: [{ rotate }],
            },
            {}]}
          >
            <Image
              style={[styles.image,
                {
                  width: currentSize-40,
                  height: currentSize,
                }, {}]}
              source={require('../../assets/speedometer-needle.png')}
            />
         
          </Animated.View>
        </View>
        </View>
       
        <View style={styles.bottomcontainer}>
       <View style={styles.bottomText}>
        <Text style={styles.bottomTextrape}>{ShowTemp?"-40F":"0"}</Text>
       </View>
       <View  style={styles.bottomMiddle}>
        <Text style={styles.bottomMiddlerapeText}>{ShowTemp?"Temperature":"Humidity"}</Text>
       <Text style={styles.bottomMiddlerape}>{Math.round(Math.abs(this.state.Progress_Value))}{ShowTemp?'F':'%'}
       <Image source={Up}  style={{width:20,height:20}}/>
       </Text>
       </View>
       <View style={styles.bottomText}>
        <Text style={styles.bottomTextrape}>{ShowTemp?"134F":"100"}</Text>
       </View>
        </View>
        {/* </View> */}
        </LinearGradient>
        <View style={styles.bottompointcontainer}>
        <View style={styles.bottomViewleftrape}></View>        
        <View style={styles.bottomViewRightrape}></View>        
        </View>
        </View>

     
    );
  }
}

const styles = StyleSheet.create({
    container: {
    flex: 3,
    width: screenWidth-40,
    // paddingTop:10,
    // backgroundColor:'red',
  alignItems: 'center',
    
},
  mainContainer: {
    flex:3,
    width: screenWidth-40,
  },
  Niddle:{
     width:'40%',
  height:20,
  backgroundColor:'black'
  },
  outercontainer:{
    // flex:3.7,
  width:300,
  height:300,
  borderRadius:100*4,
  padding:20,
  marginLeft:15,
  alignItems: 'center',
  marginRight:15
  },
  innercontainer:{
    backgroundColor:'white',
    width:'100%',
    height:'101%',
    borderRadius:100*4,
    padding:10
},
  TextContainer: {
    flexDirection:'column'
  },
  Tab: {
    flex: 1,
    width: '88%',
    flexDirection:'row',
  },
  Text: {
    flex: 1,
    width: '88%',
    // justifyContent: 'start',
    flexDirection:'row'
  },
  HomeText: {
    fontSize: 38,
    fontWeight: 'bold',
  },
  Homestate: {
    fontSize: 16,
    fontWeight: 'bold',

},
HomestateHeat:{
    fontSize: 18,
    fontWeight: 'bold',
    color:'red'
},
imageWrapper: {
    position: 'absolute',
    left: 0,
    marginTop:50,
    zIndex: 10,
},
bottomViewleftrape:{
  height: 18,
  width: 19,
backgroundColor:'#d25040',
// '#cb5949' ,  '#d17c70'  , '#7fa0c1' , '#79aad0'
// borderRadius:100*4,
marginTop:-2,
marginLeft:-2,
borderBottomRightRadius:10,
borderBottomLeftRadius:9,
borderTopRightRadius:9,
},
bottomViewRightrape:{
  height:18,
  width: 19,
backgroundColor:'#79aad0',
// borderRadius:100*4,
marginTop:-2,
marginRight:-2,
borderBottomLeftRadius:10,
borderBottomRightRadius:9,
borderTopLeftRadius:9
},
  image: {
    resizeMode: 'stretch',
    height: screenWidth - 80,
    width: screenWidth - 80,
  },
  range:{
    //  resizeMode: 'stretch',
    // height: '100%',
    // width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  bottompointcontainer:{
    // flex:0.3,
    height: 40,
    backgroundColor:'white',
    width: 250,
    marginTop:-80,
    flexDirection:'row',
    zIndex: 99,
    // marginLeft:50,
    paddingLeft:-3.5,
    paddingRight:-3.5,
    // paddingTop:8,
    justifyContent: 'space-between',


  },
  bottomcontainer:{
    height: 80,
    // position: 'absolute',
    backgroundColor:'white',
    zIndex: 9999,
    width: 300,
    marginTop:-42,
    flexDirection:'row'
  },
  bottomText:{
      width:'30%',
      height:'100%',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding:20,
  },
  bottomMiddle:{
    width:'40%',
    height:'100%',
    justifyContent: 'center',
    alignItems: 'center',
},
bottomTextrape:{
    fontSize:14,
    fontWeight:'bold'
},
bottomMiddlerape:{
    fontSize:20,
    fontWeight:'bold'
},
bottomMiddlerapeText:{
  fontSize:14,
  fontWeight:'bold',
  color:'gray'
}
});
