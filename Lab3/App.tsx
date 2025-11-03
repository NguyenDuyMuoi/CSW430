import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider, BottomNavigation } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";



import Products from "./Products/Products";
import Product_Add from "./Products/Product_Add";
import Product_Search from "./Products/Product_Search";
import Product_Detail from "./Products/Product_Detail";

const App = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "list", title: "Products", focusedIcon: "shopping" },
    { key: "add", title: "Add", focusedIcon: "plus-box" },
    { key: "search", title: "Search", focusedIcon: "magnify" },
    { key: "detail", title: "Detail", focusedIcon: "information" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    list: Products,
    add: Product_Add,
    search: Product_Search,
    detail: Product_Detail,
  });

  return (
    <PaperProvider>
      <SafeAreaProvider>
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
          renderIcon={({ route, focused, color }) => (
            <MaterialCommunityIcons
              name={route.focusedIcon}
              color={color}
              size={26}
            />
          )}
        />

      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default App;
