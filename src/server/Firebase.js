//~~ Dependencies ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'
//~~ Declarations ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

class Firebase {

    constructor() {
        
        // initialize firebase app
		app.initializeApp({
            apiKey: "AIzaSyAN_8ELqyY0KZrzF5eSCzhTshIK2YmxPf4",
            authDomain: "a1inft574-francisco-romano.firebaseapp.com",
            databaseURL: "https://a1inft574-francisco-romano.firebaseio.com",
            projectId: "a1inft574-francisco-romano",
            storageBucket: "a1inft574-francisco-romano.appspot.com",
            messagingSenderId: "1099462554424",
            appId: "1:1099462554424:web:080c0770cfff31ed3347cd",
            measurementId: "G-VH33V796NC"
        });

        // get firebase authentication handle
        this.auth = app.auth();
        
        // get firebase database/firestore handle
		this.db = app.firestore();
    };

    get User() { return this.auth.currentUser; };

    get Username() { return this.User.displayName; };
    
    SignIn(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password);
    };

    SignOut() {
        return this.auth.signOut();
    };

    async SignUp(name, email, password) {
        await this.auth.createUserWithEmailAndPassword(email, password);
        return this.auth.currentUser.updateProfile({
            "displayName": name
        });
    };

    Collection(name) {
        return this.db.collection(name)
    };

    IsInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		});
    };
    
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
export default new Firebase();
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//