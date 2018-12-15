require('dotenv').config();
import { observable, action, computed } from "mobx";
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

class FBStore {
    constructor () {
        this.loadServerData = this.loadServerData.bind(this);
        this.addStudentToServer = this.addStudentToServer.bind(this);
        this.deleteStudentFromServer = this.deleteStudentFromServer.bind(this);
        this.updateServerData = this.updateServerData.bind(this);

        this.initializeFirebaseDB();
        this.loadServerData();
    }

    @observable
    studentData = {};
  
    initializeFirebaseDB() {
      const fb = firebase.initializeApp({
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        databaseURL: process.env.REACT_APP_DATABASE_URL,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
      });
  
      this.db = fb.database();
      this.auth = fb.auth();
    }

    //
    // DATABASE
    //
    @action
    loadServerData() {
      const stdref = this.db.ref('/students/');
      stdref.on('value', snapshot => {
        if (snapshot.val()){
          this.studentData = snapshot.val();
        }
      });
    }
  
    addStudentToServer(name, course, grade) {
      const stdref = this.db.ref('/students/');
      const key = stdref.push().key;
      stdref.child(key).set({
        course: course,
        name: name,
        grade: grade,
        entry_id: key
      })
    }
  
    deleteStudentFromServer(entry_id){
      const stdref = this.db.ref('/students/');
      stdref.child(entry_id).remove();
    }
  
    updateServerData(entry_id, name, course, grade) {
      const stdref = this.db.ref('/students/');
      stdref.child(entry_id).update({
        name: name,
        course: course,
        grade: grade
      });
    }

    //
    // AUTH
    //
    registerUser = (email, password) => {
      console.log( email, password)
      this.auth.createUserWithEmailAndPassword(email, password).catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        
        console.error(errorMessage);
      });
    }

    loginUser = (email, password) => {
      this.auth.signInWithEmailAndPassword(email, password).catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.error(errorMessage);
      });
    }

    loginState = () => {
      return this.auth;
    }
}

export default FBStore;