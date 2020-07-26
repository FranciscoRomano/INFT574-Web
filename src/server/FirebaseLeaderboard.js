//~~ Dependencies ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import Firebase from "./Firebase"
//~~ Declarations ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

class FirebaseLeaderboard {

    constructor()
    {
        // fetch database collection
        this.collection = Firebase.Collection("leaderboard");
    };

    async Send(score)
    {
        // fetch document with user id
        let document = this.collection.doc(Firebase.UserId);
        let doc_json = await (await document.get()).data();
        if (doc_json && score <= doc_json.score) return;

        // update user document with new data
        return await document.set({
            "date": new Date(),
            "name": Firebase.Username,
            "score": score,
        });
    };

    OnSnapshot(callback)
    {
        // create sorted snapshot by score value
        return this.collection.orderBy("score", "desc").onSnapshot(callback);
    };

};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
export default new FirebaseLeaderboard();
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//