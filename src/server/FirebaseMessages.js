//~~ Dependencies ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import Firebase from "./Firebase"
//~~ Declarations ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//


class FirebaseMessages {

    constructor() {
        this.collection = Firebase.Collection("messages");
    };

    Add(message) {
        return this.collection.add({
            "username": Firebase.Username,
            "message": message,
            "timestamp": new Date(),
        });
    };

    Get() {
        return this.collection.get()
    };

    OnSnapshot(callback) {
        return this.collection.onSnapshot(callback);
    };

};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
export default new FirebaseMessages();
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//