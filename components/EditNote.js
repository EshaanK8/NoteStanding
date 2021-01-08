import React from 'react'
import {View, Text, TextInput, Button, StyleSheet} from 'react-native'
import notes, {addKeyToNote} from './notes'

export default class editNote extends React.Component {

    state = {
        key: this.props.keys,
        title: this.props.title,
        message: this.props.message,
    }

    handleTitleChange = title => {
        this.setState({title})
    }

    handleMessageChange = message => {
        this.setState({message})
    }

    handleSubmit = () => {
        this.props.onSubmit({...this.state})
    }

    render(){
        return(
            <View style = {{justifyContent:'center', flex:1} }>
                <TextInput value = {this.state.title} style = {styles.input} onChangeText={this.handleTitleChange} placeholder="Title"/>
                <TextInput value = {this.state.message} style = {styles.input} onChangeText={this.handleMessageChange} placeholder="Message"/>
                <Button title = "Add Note" onPress={this.handleSubmit}/>
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    input: {
        padding: 5,
        borderColor: 'black',
        borderWidth: 1,
    }
})