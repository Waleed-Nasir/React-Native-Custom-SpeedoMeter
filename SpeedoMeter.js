import React from 'react';
import { Image, TouchableOpacity,Animated,Easing, StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
 ////////////////LinearGradient or Use React Native LinearGradient//////////////////////
import { LinearGradient } from 'expo'
let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

export default class SpeedoMeter extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            Progress_Value:28
        }
        this.speedometerValue = new Animated.Value(50);
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
  render() {
      const rotate = this.speedometerValue.interpolate({
        inputRange: [this.state.Progress_Value, 100],
        outputRange: ['-90deg', '90deg'],
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
    return (
        <View style={styles.container}>
        {/* <View style={styles.outercontainer}> */}
        <LinearGradient
                start={{ x: 0, y: 0.75 }} end={{ x: 1, y: 0.25 }}
                colors={['#cb5949' ,  '#d17c70'  , '#7fa0c1' , '#79aad0']}
                style={styles.outercontainer}
              >
        <View style={styles.innercontainer}>
        <View  style={styles.range}>
        <Animated.View style={[styles.imageWrapper,
            {
              top: -(currentSize / 15),
              transform: [{ rotate:'45deg' }],
            },
            {}]}
          >
            <Image
              style={[styles.image,
                {
                  width: currentSize,
                  height: currentSize,
                }, {}]}
              source={require('Place Your image')}
            />
          </Animated.View>
        </View>
        </View>
       
        <View style={styles.bottomcontainer}>
       <View style={styles.bottomText}>
        <Text style={styles.bottomTextrape}>Temp</Text>
       </View>
       <View  style={styles.bottomMiddle}>
        <Text style={styles.bottomMiddlerape}>28%</Text>
       </View>
       <View style={styles.bottomText}>
        <Text style={styles.bottomTextrape}>Hum</Text>
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
    width: screenWidth,
    backgroundColor:'white',

},
  mainContainer: {
    flex:4,
    width: screenWidth,
    padding:20,

  },
  outercontainer:{
  width:'90%',
  height:screenHeight/2,
  borderRadius:100*4,
  padding:20
  },
  innercontainer:{
    backgroundColor:'white',
    width:'100%',
    height:screenHeight/2-40,
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
  height: 27,
  width: 27,
backgroundColor:'#cb5949',
borderRadius:100*4,
},
bottomViewRightrape:{
  height: 27,
  width: 27,
backgroundColor:'#79aad0',
borderRadius:100*4,
},
  image: {
    resizeMode: 'stretch',
    height: screenWidth - 80,
    width: screenWidth - 80,
  },
  range:{
    position: 'absolute',
    top: 0,
    left: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  bottompointcontainer:{
    height: 20,
    // backgroundColor:'red',
    width:screenWidth - 100,
    marginTop:-72,
    flexDirection:'row',
    zIndex: 99,
    marginLeft:30,
    paddingLeft:9,
    paddingRight:6,
    justifyContent: 'space-between',


  },
  bottomcontainer:{
    resizeMode: 'stretch',
    height: 80,
    // position: 'absolute',
    backgroundColor:'white',
    width:'100%',
    marginTop:-40,
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
}
});
