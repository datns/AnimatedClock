import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Dimensions, View, Animated } from 'react-native';
import dayjs from 'dayjs';
const { width } = Dimensions.get('screen');
const SIZE = width;
const TICK_INTERVAL = 1000;

export default function App() {
  const index  = useRef(new Animated.Value(0)).current;
  const tick = useRef(new Animated.Value(0)).current;
  const [timer, setTimer] = useState(0);

  useEffect(()=>{
    const current = dayjs();
    const diff = current.endOf('day').diff(current, 'seconds');
    const oneDay = 24 * 60 * 60;
    setTimer(oneDay - diff);
    tick.setValue(timer);
    animate();
    const ticker = setInterval(() => {
      setTimer(timer+1);
      tick.setValue(timer);
    });
    return () => {
      clearInterval(ticker);
    }
  },[]);

  const animate = () => {
    Animated.timing(index, {
      toValue: tick,
      duration: TICK_INTERVAL/2,
      useNativeDriver: true,
    }).start();
  };

  const rotateSeconds = '25deg';
  const transformSeconds = {
    transform: [{ rotate: rotateSeconds }]
  };

  const rotateMinutes = '125deg';
  const transformMinutes = {
    transform: [{ rotate: rotateMinutes }]
  };

  const rotateHours = '65deg';
  const transformHours = {
    transform: [{ rotate: rotateHours }]
  };

  return (
    <View style={styles.container}>
      <View style={[styles.bigQuadran]} />
      <View style={[styles.mediumQuadran]} />
      <View style={[styles.mover, transformHours]}>
        <View style={[styles.hours]}/>
      </View>
      <View style={[styles.mover, transformMinutes]}>
        <View style={[styles.minutes]}/>
      </View>
      <View style={[styles.mover, transformSeconds]}>
        <View style={[styles.seconds]}/>
      </View>
      <View style={[styles.smallQuadran]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mover: {
    position: 'absolute',
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE/2,
    alignItems: 'center',
  },
  hours: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    height: '35%',
    marginTop: '15%',
    width:4,
    borderRadius: 4,
  },
  minutes: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    height: '45%',
    marginTop: '5%',
    width:3,
    borderRadius: 3,
  },
  seconds: {
    backgroundColor: 'rgba(227, 71, 134, 1)',
    height: '50%',
    width:2,
    borderRadius: 2,
  },
  bigQuadran: {
    width: SIZE * 0.8,
    height: SIZE * 0.8,
    borderRadius: SIZE * 0.4,
    backgroundColor: 'rgba(200, 200, 200, 0.2)',
    position: 'absolute',
  },
  mediumQuadran: {
    width: SIZE * 0.5,
    height: SIZE * 0.5,
    borderRadius: SIZE * 0.25,
    backgroundColor: 'rgba(200, 200, 200, 0.4)',
    position: 'absolute',
  },
  smallQuadran: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(227, 71, 134, 1)',
    position: 'absolute',
  }
});
