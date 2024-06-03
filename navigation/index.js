import { NavigationContainer } from "@react-navigation/native";

import StackNavigator from "./stack";

export default function Navigation() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
