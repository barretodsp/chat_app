import { StyleSheet } from 'react-native';

const global = StyleSheet.create({

    card: {
        marginTop: 0,
        marginBottom: 2,
        marginLeft: 0,
        marginRight: 0,
        borderRadius: 0,
        paddingVertical: 5,
    },

    cardItem: {
        paddingRight: 1,
    },

    cardInfos: {
        width: 170,
        flexDirection: 'column'
    },

    header: {
        height: 60,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 4,
        position: 'relative',
        backgroundColor: '#0A4067',
    },

    backIcon: {
        color: '#FFFFFF'
    },

    simpleHeaderRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },

    simpleHeaderTitle: {
        fontSize: 18,
        fontFamily: 'Roboto',
        color: '#FFFFFF',
        paddingHorizontal: 40
    },

    defaultText: {
        marginBottom: 10,
        fontFamily: 'Varela Round',
        color: '#6a6a6a'

    },

    largeItemInput: {
        backgroundColor: '#FFF',
        borderColor: '#CECECE',
        height: 35,
        marginBottom: 15,
        alignItems: 'center'
    },

    largeInputText: {
        color: '#B3B3B3',
        fontSize: 16,
        fontFamily: 'roboto',
        fontWeight: 'normal',
        paddingLeft: 15
    },

    defaultContentContainer: {
        marginTop: 30,
        marginLeft: 50,
        marginRight: 50,
        marginBottom: 20
    },

    containerBtnForm: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 30,
        marginBottom: 20,
        flexDirection: 'column'
    },

    btnLargeBlue: {
        borderRadius: 20,
        borderColor: '#A3A3A3',
        justifyContent: 'center',
        backgroundColor: '#0A4067',
        height: 32,
    },
    hr: {
        height: 1,
        backgroundColor: '#CCCCCC',
        marginTop: 5,
        marginBottom: 15,
        marginLeft: 20,
        marginRight: 20
    },


})

export default global;