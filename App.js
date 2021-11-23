import React, {useState} from 'react';
import {
  Button,
  View,
  StyleSheet,
  FlatList
} from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = (goalTitle) => {
    console.log(goalTitle);
    // we should use inline function to the current snapshot of courseGoals state
    // rather than this
    // setCourseGoals([...courseGoals, enteredGoal])

    // now this is guaranteed way to always get the current snapshot of a state
    setCourseGoals(currentGoals => [...currentGoals, {id: Math.random().toString(), value: goalTitle}]);

    setIsAddMode(false);

  };

  const removeGoalHandler = goalId => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter((goal) => goal.id !== goalId);
    });


  };

  const cancelHandler = () => {
    setIsAddMode(false);
  }

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)} />
      <GoalInput visible={isAddMode} onAddGoal={addGoalHandler} onCancel={cancelHandler} />
      <FlatList 
        data={courseGoals}
        renderItem = {itemData => 
          <GoalItem 
            id={itemData.item.id}
            onDelete={removeGoalHandler}
            title={itemData.item.value} />}
        
      />
        
    </View>
  );
}


const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
});