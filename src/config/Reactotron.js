import Reactotron from "reactotron-react-native";

// Redux Integration
import { reactotronRedux } from "reactotron-redux";

if (process.env.__DEV__) {
    const tron = Reactotron.configure({ host: "127.0.0.1" })
        .useReactNative()
        .use(reactotronRedux)
        .connect();
    console.tron = tron;

    tron.clear();
}
