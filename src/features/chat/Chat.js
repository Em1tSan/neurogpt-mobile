import { StyleSheet, View } from 'react-native'
import { colors } from '../../styles/colors'
import ChatInput from './ChatInput'
import Messages from './Messages'

export default function Chat({ route }) {
  return (
    <View style={styles.container}>
      <View style={{width: '100%', height: '100%'}}>
        <Messages />
        <ChatInput />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.pri,
    justifyContent: 'flex-end',
    paddingVertical: 0,
    paddingHorizontal: 5,
    alignItems: 'center'
  },
  messagesWrapper: {
    backgroundColor: colors.pri,
    paddingHorizontal: 5,
  },
  messageWrapperUser: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 10
  },
  messageWrapperAssistant: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 10
  },
  messageUser: {
    backgroundColor: colors.messageUser,
    color: colors.text,
    borderRadius: 20,
    borderTopRightRadius: 2,
    padding: 10,
  },
  messageAssistant: {
    backgroundColor: colors.messageAssistant,
    color: colors.text,
    borderRadius: 20,
    borderTopLeftRadius: 2,
    padding: 10,
  }
});
