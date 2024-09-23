import './App.css'
import MainView from './Views/MainView';
import MainModel from './Models/MainModel';
import MainController from './Controllers/MainController';

function App() {
  return (
    <MainView model = {MainModel} controller = {MainController}></MainView>
  )
}

export default App
