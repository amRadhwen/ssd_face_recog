import firebase from "../config/firebase";
const db = firebase.ref("/suspects");
class SuspectDataService {
  getAll() {
    return db;
  }
  create(suspect) {
    return db.push(suspect);
  }
  update(key, value) {
    return db.child(key).update(value);
  }
  delete(key) {
    return db.child(key).remove();
  }
  deleteAll() {
    return db.remove();
  }
}
export default new SuspectDataService();
