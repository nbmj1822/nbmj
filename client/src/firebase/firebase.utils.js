import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDc5YL4EugFWApAEFnC6gGUCHVSdy0Mqns",
    authDomain: "uzabo-51abd.firebaseapp.com",
    databaseURL: "https://uzabo-51abd.firebaseio.com",
    projectId: "uzabo-51abd",
    storageBucket: "uzabo-51abd.appspot.com",
    messagingSenderId: "265221715345",
    appId: "1:265221715345:web:ea6e41d23b25089fbc9630",
    measurementId: "G-L2HGMFPKZD"
}
export const createUserProfileDocument = async (userAuth,additionalData) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get();
    if(!snapShot.exists){
        const{displayName,email} = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,email,createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user',error)
        }
    }
    return userRef;
     
}
firebase.initializeApp(config);
export const addCollectionAndDocuments = async (collectionKey,objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef,obj);
    });
    return await batch.commit()
}
export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const {title,items} = doc.data();
        return {
            routeName: encodeURI(title.toLowerCase()),
            id : doc.id,
            title,
            items
        } 
    });
    return transformedCollection.reduce((accumulator,collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    },{});
}
export const getCurrentUser = () =>{
    return new Promise((resolve,reject)=>{
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth)
        },reject)
    })
}
export const addProduct = (product,documentTitle) =>{
    var c = []
    var docId = ''
    firestore.collection("collections").where('title','==',documentTitle).get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(async function(doc) {
                c.push(doc.data())
                docId = doc.id;
            });
            c[0].items.push(product)
            firestore.collection("collections").doc(docId).set({
                title: documentTitle,
                items: c[0].items           
            })
            .then(function() {
                alert('Item Added')
            })
            .catch(function(error) {
                alert('Item Could not be added')
            });
        })
        .catch(function(error) {
            alert("Item Could not be added");
        });
}
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
export default firebase;
