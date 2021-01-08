import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native';


//Takes in an obj and renders a row with the object's note
renderItem = obj => <Row note = {obj.item.note} />

//Takes in an object and renders the object's header
renderSectionHeader = obj => <Text>{props.title}</Text>

//List component
export const List = props => {
    return (
        <FlatList
            renderItem = {props.renderItem}
            data = {props.notes}
        />
    )
}

//Row component
export const Row = props => (
    <View style = {styles.row} key = {props.key}>
        <Text>{props.notes}</Text>
    </View>
)

const styles = StyleSheet.create({
    row: {
        padding: 20,
    }
})
