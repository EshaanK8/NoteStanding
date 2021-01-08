import React from 'react';
import { Button, ScrollView, TouchableOpacity, TouchableNativeFeedback, StyleSheet, Text, View, FlatList, TextInput, TouchableHighlight, Platform} from 'react-native';
import Constants from 'expo-constants'
import Checkbox from 'expo-checkbox';
import {Dropdown } from 'react-native-material-dropdown';

import notes from './notes'
import AddNoteForm from './AddNote'
import EditNoteForm from './EditNote'

export default class App extends React.Component {
  state = {
    showNotes: true,
    showForm: false,
    showEditForm: false,
    showCheckBox: true,
    deleteKey: '',
    notes: notes,
    editKey: null
  }
  
  toggleNotes = () => {
    this.setState(prevState => ({showNotes: !prevState.showNotes}))
  }

  toggleCheckBox = () => {
    this.setState(prevState => ({showCheckBox: !prevState.showCheckBox}))
  }

  displayNote = () => {
    this.setState(prevState => ({showForm: !prevState.showForm}))
  }

  displayEditNote = () => {
    this.setState(prevState => ({showEditForm: !prevState.showEditForm}))
  }

  changeNotes = (newArray) => {
    this.setState({
      notes: newArray,
    });
  }

  notifyEdit = (newShowEditForm, key) => {
    this.setState({
      showEditForm: newShowEditForm,
      editKey: key
    })}

  editNote = (editedNote) => {
    let newNotesArray = [...this.state.notes]
    newNotesArray[editedNote.key] = editedNote
    this.setState(prevState => ({
      showEditForm: false,
      notes: newNotesArray
    }),()=>console.log(this.state.notes))
  }

  addNote = newNote => {
    this.setState(prevState => ({
      showForm: false,
      notes: [...prevState.notes, newNote],
    }), () => {console.log(this.state.notes)})//setState is asynchronous, so the ones here will take action immediately.
  }

  
  deleteNote = () => {
    //notes = [0,1,2,3,4,5,6,7,8,9]
    //4 is checked
    let newNotes = []
    var i;
    for (i = 0; i < this.state.notes.length; i++) {
      if (this.state.notes[i].checked === false) {
        newNotes.push(this.state.notes[i])
      }
    }

    //notes = [0,1,2,3,4,5,6,7,8,9]
    //newNotes = [0,1,2,3,5,6,7,8,9]

    //Loop through and refactor keys
    var i;
    for (i = 0; i < newNotes.length; i++) {
      newNotes[i].key = i
      newNotes[i].checked = false
    }
    this.setState({notes: newNotes}, () => {console.log(this.state.notes)})
  }

  renderItem = obj => <Row title={obj.item.title} message={obj.item.message} showCheckBox={this.state.showCheckBox} keys={obj.item.key} checked={obj.item.checked} notes={this.state.notes} changeNotes={this.changeNotes} notifyEdit={this.notifyEdit}/>
  
  render() {
    if (this.state.showForm) return <AddNoteForm onSubmit={this.addNote} keys = {this.state.notes.length}/>
    if (this.state.showEditForm) return <EditNoteForm onSubmit={this.editNote} keys = {this.state.editKey} title = {this.state.notes[this.state.editKey].title} message = {this.state.notes[this.state.editKey].message}/>


    return (
      <View style={styles.container}>
        <View style = {styles.welcomeContainer}>
          <Text style = {styles.welcomeTextGreeting}>Good Afternoon,</Text>
          <Text style = {styles.welcomeTextName}>Eshaan</Text>
        </View>

        <View style = {styles.toggleBar}>
          <Dropdown
            label="Toggle"
            data={data}
          />
        </View>

        <View style = {styles.toggleBar}>
          <TouchableOpacity style = {styles.toggleButton}>
            <Text style = {styles.elipses}>⋮</Text>
          </TouchableOpacity>
        </View>
        {/*}
        <Button title="toggle notes" onPress={this.toggleNotes}/>
        <Button title="Add Note" onPress={this.displayNote}/>
        <Button title="Select Notes" onPress={this.toggleCheckBox}/>
        
        {this.state.showCheckBox && (
          <Button title="Delete Note" onPress={this.deleteNote}/>
        )}
        */}
        {this.state.showNotes && (
          <FlatList
            style = {styles.list}
            renderItem = {this.renderItem}
            data = {this.state.notes}//maybe change to just notes
            keyExtractor={(item, index) => index.toString()}
          />
        )}
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
  },

  welcomeContainer: {
    flex:0.4,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderTopWidth: 0.5,
  },

  welcomeTextGreeting: {
    fontSize:30
  },

  welcomeTextName: {
    fontSize:30
  },

  toggleBar: {
    alignItems: 'flex-end',
    flex:0.08,
    justifyContent: 'center'
  },

  toggleButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
  },

  elipses: {
    fontSize:20
  },

  list: {
    flex:1,
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderTopWidth: 0.5,
  },

  row: {
    marginLeft:20,
    marginRight:20,
    marginBottom:50,
    height:200,
    padding:20,
    borderRadius:15,
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: 'black'
},

titleContainer: {
  flexDirection: 'row',
  height:30,
  marginBottom:20
},

messageContainer: {

},

checkBoxContainer: {
  borderBottomWidth: 0.5,
  borderLeftWidth: 0.5,
  borderRightWidth: 0.5,
  borderTopWidth: 0.5,

},

headingTextContainer: {
  borderBottomWidth: 0.5,
  borderLeftWidth: 0.5,
  borderRightWidth: 0.5,
  borderTopWidth: 0.5,
  flex:1,
  padding: 5,
}
});





///////////////////////////////////////////////////ROW COMPONENT///////////////////////////////////////////////////
class Row extends React.Component {

  state = {
    checked: this.props.checked,
  }

  componentWillReceiveProps({checked}) {
    this.setState({...this.state,checked})
  }

  setCheck = () => {
      this.setState(prevState => ({
          checked: !prevState.checked
      }), () => {
          this.props.notes[this.props.keys].checked = this.state.checked
          this.props.changeNotes(this.props.notes)
          console.log(this.props.notes)
      })
  }

  editNote = () => {
    //console.log("Pressed!", this.props.keys)
    this.props.notifyEdit(true, this.props.keys)
  }

  
  render(){
    //If IOS or Android, have different animations
    let TouchablePlatformSpecific = Platform.OS === 'ios' ? 
      TouchableOpacity : 
      TouchableNativeFeedback;

    let touchableStyle = Platform.OS === 'ios' ? 
      styles.iosTouchable : 
      styles.androidTouchable
      
      return (
        <TouchablePlatformSpecific onPress = {this.editNote}>
          <View key = {this.props.keys} style = {styles.row}>
            <View style = {styles.titleContainer}>
              <View style = {styles.checkBoxContainer}>
              {this.props.showCheckBox && (
                  <Checkbox
                  style={styles.checkbox}
                  value={this.state.checked}
                  onValueChange={this.setCheck}
                  />
              )}
              </View>

              <View style = {styles.headingTextContainer}>
                <Text numberOfLines={1}>{this.props.title}</Text>
              </View>
            </View>
              <Text numberOfLines={6}>{this.props.message}</Text>
          </View>
        </TouchablePlatformSpecific>
          
      )
    }
}