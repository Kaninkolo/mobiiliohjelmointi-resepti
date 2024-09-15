import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, FlatList, ActivityIndicator, Image } from 'react-native';
import { useState} from 'react';

export default function App() {

  const [keyword, setKeyword] = useState('');
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetch = () => {
    setLoading(true);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    .then(response => {
      if (!response.ok)
        throw new Error("Error in fetch:" + response.statusText);
        
      return response.json()
    })
    .then(data => setMeals(data.meals))
    .catch(err => console.error(err))
    .finally(() => setLoading(false));
  }
  return (
    <View style={styles.container}>
      <Text>RECIPES!</Text>
      <TextInput 
        placeholder='keyword'
        value={keyword}
        onChangeText={text => setKeyword(text)}
        style={styles.input}
      />
      <Button title="find" onPress={handleFetch} />

      {loading && <ActivityIndicator size="large" />}
      
      <FlatList
        data={meals} 
        keyExtractor={(item) => item.idMeal}
        renderItem={({item}) =>
        <View>
          <Text style={{fontSize: 18, fontWeight: "bold"}}>
          {item.strMeal}
          </Text>
          <Image
            source={{uri: item.strMealThumb}}
            style={styles.thumb}
          />
        </View>}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumb: {
    width: 50,
    height: 40,
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'black',
    borderWidth: 2,
    marginBottom: 20,
    
  },
});
