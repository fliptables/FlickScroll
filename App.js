import React from 'react';
import { StyleSheet, Text, View, ScrollView, Animated, Dimensions, LayoutAnimation } from 'react-native';
import { MapView } from 'expo';

const DEVICE = Dimensions.get('window');
const DEVICE_HEIGHT = DEVICE.height;
const DEVICE_WIDTH = DEVICE.width;
const MAP_HEIGHT = DEVICE_HEIGHT - 140;
const SNAP_TO = MAP_HEIGHT - 200;

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this._onScroll = this._onScroll.bind(this);

        this.state = {
            scrollY: new Animated.Value(0),
            column: true
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this._sv && this._sv._component && this._sv._component.scrollTo({y: SNAP_TO});
        }, 100);
    }

    _onScroll({ nativeEvent }) {
        const y = nativeEvent.contentOffset.y;
        const { column } = this.state;
        if (y <= 5) {
            LayoutAnimation.spring();
            this.setState({
                column: false
            });
        } else if (y > 5) {
            LayoutAnimation.spring();
            this.setState({
                column: true
            });
        }
    }

  render() {
    const { scrollY, column } = this.state;
    const mapY = scrollY.interpolate({
        inputRange: [0, MAP_HEIGHT],
        outputRange: [0, -MAP_HEIGHT],
        extrapolate: 'clamp'
    });
    const mapTransforms = {
        transform: [
            { translateY: mapY }
        ]
    };
    return (
      <View style={styles.container}>
        <Animated.ScrollView
            style={styles.scrollView}
            ref={sv => this._sv = sv}
            snapToInterval={SNAP_TO}
            decelerationRate='fast'
            scrollEventThrottle={1} // <-- Use 1 here to make sure no events are ever missed
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { 
                    useNativeDriver: true,
                    listener: this._onScroll
                }
            )}
        >
            <View style={{
                height: MAP_HEIGHT,
                backgroundColor: 'yellow'
            }} />
            <ScrollView horizontal={!column}>
                <View style={{
                    flexDirection: column ? 'column' : 'row'
                }}>
                    <View style={column ? styles.item : styles.itemSmall} />
                    <View style={column ? styles.item : styles.itemSmall} />
                    <View style={column ? styles.item : styles.itemSmall} />
                    <View style={column ? styles.item : styles.itemSmall} />
                    <View style={column ? styles.item : styles.itemSmall} />
                    <View style={column ? styles.item : styles.itemSmall} />
                    <View style={column ? styles.item : styles.itemSmall} />
                    <View style={column ? styles.item : styles.itemSmall} />
                    <View style={column ? styles.item : styles.itemSmall} />
                    <View style={column ? styles.item : styles.itemSmall} />
                    <View style={column ? styles.item : styles.itemSmall} />
                    <View style={column ? styles.item : styles.itemSmall} />
                    <View style={column ? styles.item : styles.itemSmall} />
                    <View style={column ? styles.item : styles.itemSmall} />
                    <View style={column ? styles.item : styles.itemSmall} />
                    <View style={column ? styles.item : styles.itemSmall} />
                    <View style={column ? styles.item : styles.itemSmall} />
                </View>
            </ScrollView>
        </Animated.ScrollView>
        <Animated.View style={mapTransforms}>
            <MapView
                style={{height: MAP_HEIGHT}}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    marginHorizontal: 10,
    marginTop: 10,
    height: 50,
    width: DEVICE_WIDTH - 20,
    backgroundColor: 'blue'
  },
  itemSmall: {
    marginLeft: 10,
    marginTop: 10,
    height: 120,
    width: (DEVICE_WIDTH / 2) - 20,
    backgroundColor: 'blue'
  },
  scrollView: {
    backgroundColor: 'red',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});
