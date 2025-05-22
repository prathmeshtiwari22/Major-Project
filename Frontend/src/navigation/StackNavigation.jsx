import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../auth/Login';
import Register from '../auth/Register';
import SplashScreen from '../auth/SplashScreen';
import OnBoarding from '../auth/OnBoarding';
import Course from '../components/Course';
import BottomTab from './BottomTab';
import Notes from '../components/notes/Notes';
import Questionp from '../components/questions/Questionp';
import Streak from '../components/streak/Streak';
import Profile from '../components/profile/Profile';
import Todo from '../components/todo/Todo';
import ChapterList from '../components/notes/ChapterList';
import ShowPDF from '../components/notes/ShowPDF';
import ChapterList2 from '../components/questions/ChapterList2';
import Track from '../components/track/Track';
import Test from '../../src/test/Test'
import Results from '../../src/test/Results';
import Welcome from '../auth/Welcome';
import SemesterSelect from '../components/semester/SemesterSelect';
import CourseDetailScreen from '../components/track/CourseDetailScreen';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='SplashScreen'>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="SemesterSelect" component={SemesterSelect} />
        <Stack.Screen name='Course' component={Course} />
        <Stack.Screen name='BottomTab' component={BottomTab} />
        <Stack.Screen name='Notes' component={Notes} />
        <Stack.Screen name='Questionp' component={Questionp} />
        <Stack.Screen name='ChapterList' component={ChapterList} />
        <Stack.Screen name='ShowPDF' component={ShowPDF} />
        <Stack.Screen name='ChapterList2' component={ChapterList2} />

        <Stack.Screen
          name='Streak'
          component={Streak}
          options={{
            gestureDirection: 'vertical',
            cardStyleInterpolator: ({ current, layouts }) => ({
              cardStyle: {
                transform: [
                  {
                    translateY: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.height, 0], // Screen slides up from bottom
                    }),
                  },
                ],
              },
            }),
          }}
        />

        <Stack.Screen
          name='Profile'
          component={Profile}
          options={{
            gestureDirection: 'vertical',
            cardStyleInterpolator: ({ current, layouts }) => ({
              cardStyle: {
                transform: [
                  {
                    translateY: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.height, 0], // Screen slides up from bottom
                    }),
                  },
                ],
              },
            }),
          }}
        />

        <Stack.Screen name='Todo' component={Todo} />
        <Stack.Screen name='Track' component={Track} />
        <Stack.Screen name='CourseDetailScreen' component={CourseDetailScreen} />
        <Stack.Screen name='Test' component={Test} />
        <Stack.Screen name='Results' component={Results} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyStack;
