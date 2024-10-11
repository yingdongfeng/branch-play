import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const App = () => {
  const [dataPoints, setDataPoints] = useState([{ value: '' }]);
  const [chartData, setChartData] = useState([]);

  // Add a new input box
  const addInput = () => {
    setDataPoints([...dataPoints, { value: '' }]);
  };

  // Delete the last input box
  const removeInput = () => {
    if (dataPoints.length > 1) {
      setDataPoints(dataPoints.slice(0, -1));
    }
  };

  const handleInputChange = (text, index) => {
    const newDataPoints = [...dataPoints];
    newDataPoints[index].value = text;
    setDataPoints(newDataPoints);
  };

  const handleDrawChart = () => {
    const newData = dataPoints.map((point) => Number(point.value));
    setChartData(newData);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Please enter multiple data points</Text>
      {dataPoints.map((point, index) => (
        <TextInput
          key={index}
          style={styles.input}
          placeholder={`Data Points${index + 1}`}
          value={point.value}
          onChangeText={(text) => handleInputChange(text, index)}
          keyboardType="numeric"
        />
      ))}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={addInput}>
          <Text style={styles.buttonText}>Add an input box</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={removeInput}>
          <Text style={styles.buttonText}>Delete input box</Text>
        </TouchableOpacity>
      </View>

      <Button title="Draw a chart" onPress={handleDrawChart} />

      {chartData.length > 0 && (
        <ScrollView horizontal={true}>
          <View>
            <Text style={styles.chartTitle}>Data graph</Text>
            <LineChart
              data={{
                labels: chartData.map((_, index) => `${index + 1}`),
                datasets: [
                  {
                    data: chartData,
                  },
                ],
              }}
              width={Math.max(screenWidth, chartData.length * 60)} // Adjust chart width based on number of data points
              height={300}
              yAxisLabel=""
              chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: '#fb8c00',
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726',
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
        </ScrollView>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#1e90ff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  chartTitle: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default App;
