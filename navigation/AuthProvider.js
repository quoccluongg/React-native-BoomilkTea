import React, { createContext, useState } from 'react'

import auth from "@react-native-firebase/auth";

 import { GoogleSignin } from '@react-native-google-signin/google-signin';
 import firestore from '@react-native-firebase/firestore';


export const AuthContext = createContext();


export const AuthProvider =({children}) => {

    const [user,setUser] = useState(null);

    return(
        <AuthContext.Provider
        value={{
                user,
                setUser,
                login: async (email,password) => {
                        try {
                           await auth().signInWithEmailAndPassword(email,password);
                        } catch (e) {
                            console.log(e);
                        }
                },
                googleLogin: async () => {
                    try {
                        // Get the users ID token
                        const { idToken } = await GoogleSignin.signIn();

                        // Create a Google credential with the token
                        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

                        // Sign-in the user with the credential
                        await auth().signInWithCredential(googleCredential)
                        .then(() => {
                            //Once the user creation has been successfully , we can 
                            //with the appropriate details.
                            firestore().collection('users').doc(auth().currentUser.uid)
                            .set({
                                fname:"",
                                lname:"",
                                email:email,
                                createdAt:firestore.Timestamp.fromDate(new Date()),
                                userImg:null,
                            })
                            .catch(error => {
                                console.log(error);
                            })
                        })
                    } catch (error) {
                        console.log(error);
                    }
                },
                register: async (email,password) => {
                    try {
                        await auth().createUserWithEmailAndPassword(email,password)
                        .then(() => {
                            //Once the user creation has been successfully , we can 
                            //with the appropriate details.
                            firestore().collection('users').doc(auth().currentUser.uid)
                            .set({
                                fname:"",
                                lname:"",
                                email:email,
                                createdAt:firestore.Timestamp.fromDate(new Date()),
                                userImg:null,
                            })
                            .catch(error => {
                                console.log(error);
                            })
                        })
                    } catch (e) {
                        console.log(e);
                    }
                },
                logout: async () => {
                    try {
                        await auth().signOut();
                    } catch (e) {
                        console.log(e);
                    }
                }
        }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;