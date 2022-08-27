import { View} from 'react-native';
import {styles, colors} from '../../../assets/Style';
import React, { useEffect } from 'react';
import { TextInput, gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { useAppDispatch, useAppSelector } from '../../handle/redux/hooks';
import { UpdateNoteArg } from '../../handle/models';
import { updateEditsContent, updateEditsHead, updateNote } from '../../handle/redux/reducers/notes/noteEditor';
import { useDispatch } from 'react-redux';

const NotesView = () => {
  const [headerValue, onChangeText] = React.useState('');
  const [noteValue, onChangeNote] = React.useState('');
  const [isFocused, onFocusingHeader] = React.useState(false);
  const dispatch = useAppDispatch();

  const noteEditor = useAppSelector(state => state.noteEditor);
  const user = useAppSelector(state => state.userEnter);

  const onFinishedEdit = () => {
    if (noteEditor.status !== "success" || noteEditor.note_id === '') {
      return;
    }
    setTimeout(() => {
      dispatch(updateEditsContent(noteValue)).then(() => {
        dispatch(updateEditsHead(headerValue)).then(() => {
          setTimeout(() => {
            if (noteEditor.head === headerValue && noteEditor.content === noteValue) {
              const arg: UpdateNoteArg = { user: user, noteMsg: noteEditor };
              dispatch(updateNote(arg));
              console.log(`Finished update dispatch. Note obj => ${JSON.stringify(noteEditor)}`);
            }
            else {
              console.log(`Content cannot be changed due to changes`);
              
            }
          }, 1000);
        })
      });
    }, 200);
    

  };

  useEffect(()=>{
    onChangeNote(noteEditor.content);
    onChangeText(noteEditor.head);
    console.log(`There is editing, head \"${noteEditor.content}\", content: \"${noteEditor.head}\"`);
  },[noteEditor]);

  return (
    <View style={[styles.notesBox, styles.container]}>
      {/*Header Start*/}
      <TextInput
        style={[
          styles.notesHeaderStyle,
          styles.inputAreaColorSecond,
          { backgroundColor: isFocused ?
              colors['--background-tertiary'] : colors['--background-default'],
          },]}
        onFocus={() => {onFocusingHeader(true);}}
        onBlur={() => {onFocusingHeader(false);}}
        onChangeText={onChangeText}
        placeholder={noteEditor.head === "" || noteEditor.head=== null ? "Unnamed Note "+noteEditor.note_id:noteEditor.head}
        placeholderTextColor={colors['--foreground-tertiary']}
        value={headerValue}
      />
      {/*Header End*/}
      {/*Notes Edit Start*/}
      <TextInput
        multiline={true}
        textAlignVertical={'top'}
        style={[styles.notesEditStyle, styles.inputAreaColor]}
        onChangeText={onChangeNote}
        onEndEditing={onFinishedEdit}
        value={noteValue}
      />
      {/*Notes Edit End*/}
    </View>
  );
};

// export default gestureHandlerRootHOC(NotesView);
export default NotesView;
