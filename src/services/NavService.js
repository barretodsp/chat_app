import { NavigationActions,  DrawerActions, StackActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function reset(params){
  _navigator.dispatch(
    StackActions.reset(params)
  );
}

function replace(dest){
  _navigator.dispatch(
    StackActions.replace(dest)
  );
}

function popToTop(){
  _navigator.dispatch(
    StackActions.popToTop()
  )
}

function goBack() {
  _navigator.dispatch(
    StackActions.pop({n: 1})
  );
}

function openDrawer(){
  _navigator.dispatch(
    DrawerActions.openDrawer()
  )
}

function toggleDrawer(){
  _navigator.dispatch(
    DrawerActions.toggleDrawer()
  )
}

export default {
  navigate,
  setTopLevelNavigator,
  openDrawer,
  toggleDrawer,
  goBack,
  reset,
  popToTop
};