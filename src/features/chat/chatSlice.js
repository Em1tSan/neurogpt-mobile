import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import fetchAxiosChatCompletion from '../../api/apiAxios';
import uuid from 'react-native-uuid'

const initialState = {
  conversations: {},
  nextConversationId: 1,
  currentId: null,
  loading: false,
  status: 'idle',
  error: null
}

export const getChatResponseThunk = createAsyncThunk(
  'chat/getResponse',
  async (message, { getState }) => {
    const id = getState().chat.currentId.toString();
    const context = getState().chat.conversations[id].messages;    
    const prompt = message;

    console.log('context from thunk:', context);
    console.log('prompt from thunk:', prompt);
    console.log('conversations from thunk:', getState().chat.conversations);

    try {
      const response = await fetchAxiosChatCompletion(context, prompt);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const chat = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addConversation: state => {
      const id = uuid.v4();
      state.currentId = id;
      state.conversations[id] = {
        created: new Date(),
        messages: []
      };

      console.log('new conversation added with id', id);
      console.log('redux state:', state);
    },
    updateMessages: (state, action) => {
      const id = state.currentId;
      console.log('id from updateMessages:', id);
      state.conversations[id].messages.push(action.payload);
    },
    deleteConversation: (state, action) => {
      const id = action.payload;
      
      delete state.conversations[id];

      console.log(`message with id: ${id} was deleted.`);

      state.currentId = null;

      console.log('state.currentId = null');
    },
    deleteConversations: () => {
      console.log('Messages deleted. State set to inital state:');
      return initialState;
    },
    updateCurrentId: (state, action) => {
      state.currentId = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getChatResponseThunk.pending, state => {
        state.status = 'loading';
        console.log('getChatResponseThunk loading...');
      })
      .addCase(getChatResponseThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        console.log('getChatResponseThunk succeeded...');

        const id = state.currentId.toString();
        const message = {
          content: action.payload.content,
          role: action.payload.role
        };

        state.conversations[id].messages.push(message);

        // Set status back to idle.
        console.log('setting status to idle...');
        state.status = 'idle';

        console.log('redux state:', state);
      })
      .addCase(getChatResponseThunk.rejected, (state, action) => {
        state.status = 'failed';
        console.log('getChatResponseThunk failed...');
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const { 
  updateMessages,
  deleteConversation, 
  deleteConversations,
  addConversation,
  updateCurrentId
} = chat.actions

export default chat.reducer;