require('dotenv').config();
import { observable, action, computed } from "mobx";
import firebase from 'firebase';

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

    @computed
    get avgGrade() {
      let sum = 0;
  
      if (Object.keys(this.studentData).length === 0) return sum;
  
      for (let key in this.studentData){
        sum += Number(this.studentData[key].grade); 
      }
  
      return Math.round(sum / Object.keys(this.studentData).length);
    };
  
    initializeFirebaseDB() {
      let fb = firebase.initializeApp({
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        databaseURL: process.env.REACT_APP_DATABASE_URL,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
      });
  
      this.db = fb.database();
    }

    @action
    loadServerData() {
      let stdref = this.db.ref('/students/');
      stdref.on('value', snapshot => {
        if (snapshot.val()){
          this.studentData = snapshot.val();
        }
      });
    }
  
    addStudentToServer(name, course, grade) {
      let stdref = this.db.ref('/students/');
      let key = stdref.push().key;
      stdref.child(key).set({
        course: course,
        name: name,
        grade: grade,
        entry_id: key
      })
    }
  
    deleteStudentFromServer(entry_id){
      let stdref = this.db.ref('/students/');
      stdref.child(entry_id).remove();
    }
  
    updateServerData(entry_id, name, course, grade) {
      let stdref = this.db.ref('/students/');
      stdref.child(entry_id).update({
        name: name,
        course: course,
        grade: grade
      });
    }
}

export default FBStore;