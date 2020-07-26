//~~ Dependencies ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import Firebase from "./Firebase"
//~~ Declarations ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//


class FirebaseMessages {

    constructor() {
        this.collection = Firebase.Collection("messages");
    };

    Send(message) {
        return this.collection.add({
            "date": new Date(),
            "name": Firebase.Username,
            "userId": Firebase.UserId,
            "message": message,
        });
    };

    OnSnapshot(callback) {
        return this.collection.orderBy("date").onSnapshot(callback);
    };

};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
export default new FirebaseMessages();
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//